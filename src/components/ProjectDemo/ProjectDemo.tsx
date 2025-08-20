import React, { useEffect, useRef, useState } from 'react';
import './ProjectDemo.scss';

interface FileNode {
    name: string;
    type: 'file' | 'folder';
    path: string;
    content?: string;
    children?: FileNode[];
    loaded?: boolean;
}

interface ProjectDemoProps {
    project: {
        id: number;
        title: string;
        description: string;
        technologies: string[];
        image: string;
        github: string;
        live: string;
        category: string;
        demoUrl?: string;
        sourcePrivate?: boolean;
        fileStructure?: FileNode[];
    };
    onClose: () => void;
}

const ProjectDemo: React.FC<ProjectDemoProps> = ({ project, onClose }) => {
    const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
    const [fileStructureState, setFileStructureState] = useState<FileNode[] | null>(null);
    const [isLoadingTree, setIsLoadingTree] = useState<boolean>(false);
    const [loadingFilePath, setLoadingFilePath] = useState<string | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [repo, setRepo] = useState<{ owner: string; repo: string; branch: string } | null>(null);

    // Desktop preview sizing and scaling
    const DESKTOP_PREVIEW_WIDTH = 1280;
    const DESKTOP_PREVIEW_HEIGHT = 720; // keep 16:9
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [iframeLoaded, setIframeLoaded] = useState<boolean>(false);
    const [showIframeFallback, setShowIframeFallback] = useState<boolean>(false);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const updateScale = () => {
            if (!containerRef.current) return;
            const { clientWidth, clientHeight } = containerRef.current;
            const nextScale = Math.min(
                clientWidth / DESKTOP_PREVIEW_WIDTH,
                clientHeight / DESKTOP_PREVIEW_HEIGHT
            );

            // Center the scaled preview in the container
            const scaledWidth = DESKTOP_PREVIEW_WIDTH * nextScale;
            const scaledHeight = DESKTOP_PREVIEW_HEIGHT * nextScale;
            const offsetX = Math.max(0, (clientWidth - scaledWidth) / 2);
            const offsetY = Math.max(0, (clientHeight - scaledHeight) / 2);

            // Because translate is applied before scale, divide offsets by scale
            setTranslate({ x: offsetX / nextScale, y: offsetY / nextScale });
            setScale(nextScale);
        };

        updateScale();

        const ro = new ResizeObserver(updateScale);
        ro.observe(containerRef.current);
        window.addEventListener('orientationchange', updateScale);
        window.addEventListener('resize', updateScale);

        return () => {
            ro.disconnect();
            window.removeEventListener('orientationchange', updateScale);
            window.removeEventListener('resize', updateScale);
        };
    }, []);

    // Show fallback if iframe does not load (e.g., site blocks embedding)
    useEffect(() => {
        setIframeLoaded(false);
        setShowIframeFallback(false);
        const timer = window.setTimeout(() => {
            if (!iframeLoaded) setShowIframeFallback(true);
        }, 3000);
        return () => window.clearTimeout(timer);
    }, [project.demoUrl, project.live]);

    // ---------- GitHub integration ----------
    const parseGithubRepo = (url: string): { owner: string; repo: string } | null => {
        try {
            const match = url.match(/github\.com\/(.*?)\/(.*?)(?:$|\.|\/)/i);
            if (!match) return null;
            return { owner: match[1], repo: match[2] };
        } catch {
            return null;
        }
    };

    const fetchJson = async (url: string) => {
        const res = await fetch(url, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
        });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json();
    };

    const loadRepoInfoAndRoot = async () => {
        if (!project.github) return;
        const parsed = parseGithubRepo(project.github);
        if (!parsed) return;
        setIsLoadingTree(true);
        setLoadError(null);
        try {
            const repoData = await fetchJson(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`);
            const branch: string = repoData.default_branch || 'main';
            setRepo({ owner: parsed.owner, repo: parsed.repo, branch });
            const rootNodes = await loadFolderContents('', { owner: parsed.owner, repo: parsed.repo, branch });
            setFileStructureState(rootNodes);
        } catch (e: any) {
            setLoadError('Failed to load repository. Showing mock structure.');
            setFileStructureState(null);
        } finally {
            setIsLoadingTree(false);
        }
    };

    type RepoCtx = { owner: string; repo: string; branch: string };

    const loadFolderContents = async (path: string, ctx?: RepoCtx): Promise<FileNode[]> => {
        const context = ctx || repo;
        if (!context) return [];
        const endpoint = path
            ? `https://api.github.com/repos/${context.owner}/${context.repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(context.branch)}`
            : `https://api.github.com/repos/${context.owner}/${context.repo}/contents?ref=${encodeURIComponent(context.branch)}`;
        const list = await fetchJson(endpoint);
        if (!Array.isArray(list)) return [];
        const nodes: FileNode[] = list
            .filter((item: any) => item.type === 'dir' || item.type === 'file')
            .map((item: any) => ({
                name: item.name,
                type: item.type === 'dir' ? 'folder' : 'file',
                path: path ? `${path}/${item.name}` : item.name,
                children: item.type === 'dir' ? [] : undefined,
                loaded: item.type === 'dir' ? false : true
            } as FileNode));
        // Sort: folders first, then files; both alphabetically (case-insensitive)
        nodes.sort((a, b) => {
            if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
            const an = a.name.toLowerCase();
            const bn = b.name.toLowerCase();
            if (an < bn) return -1;
            if (an > bn) return 1;
            return 0;
        });
        return nodes;
    };

    const loadFileContent = async (path: string): Promise<string> => {
        if (!repo) return '';
        const endpoint = `https://api.github.com/repos/${repo.owner}/${repo.repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(repo.branch)}`;
        const data = await fetchJson(endpoint);
        if (data && data.content && data.encoding === 'base64') {
            try {
                return atob(data.content.replace(/\n/g, ''));
            } catch {
                return '// Unable to decode file content';
            }
        }
        // Fallback: try to fetch raw
        const rawRes = await fetch(endpoint, { headers: { Accept: 'application/vnd.github.v3.raw' } });
        if (rawRes.ok) return await rawRes.text();
        return '// File content not available';
    };

    // Recursively update node children by path
    const setChildrenAtPath = (nodes: FileNode[], targetPath: string, children: FileNode[]): FileNode[] => {
        return nodes.map((n) => {
            if (n.path === targetPath) {
                return { ...n, children, loaded: true };
            }
            if (n.type === 'folder' && n.children) {
                return { ...n, children: setChildrenAtPath(n.children, targetPath, children) };
            }
            return n;
        });
    };

    useEffect(() => {
        // Load GitHub tree if available; otherwise fall back to mock
        if (project.github) {
            loadRepoInfoAndRoot();
        } else {
            setFileStructureState(null);
        }
        setSelectedFile(null);
        setExpandedFolders(new Set());
    }, [project.github]);

    const toggleFolder = async (node: FileNode) => {
        const newExpanded = new Set(expandedFolders);
        if (newExpanded.has(node.path)) {
            newExpanded.delete(node.path);
        } else {
            newExpanded.add(node.path);
            // Lazy load folder contents if not yet loaded
            if (node.type === 'folder' && !node.loaded) {
                try {
                    const children = await loadFolderContents(node.path);
                    setFileStructureState((prev) => prev ? setChildrenAtPath(prev, node.path, children) : prev);
                } catch {
                    // ignore
                }
            }
        }
        setExpandedFolders(newExpanded);
    };

    const renderFileTree = (nodes: FileNode[], level: number = 0) => {
        return nodes.map((node) => (
            <div key={node.path} style={{ marginLeft: `${level * 20}px` }}>
                <div
                    className={`project-demo__file-item ${node.type === 'folder' ? 'project-demo__file-item--folder' : 'project-demo__file-item--file'}`}
                    onClick={async () => {
                        if (node.type === 'folder') {
                            await toggleFolder(node);
                        } else {
                            setSelectedFile(node);
                            if (!node.content) {
                                try {
                                    setLoadingFilePath(node.path);
                                    const content = await loadFileContent(node.path);
                                    // update content in structure as well
                                    setFileStructureState((prev) => {
                                        if (!prev) return prev;
                                        const injectContent = (arr: FileNode[]): FileNode[] => arr.map((n) => {
                                            if (n.path === node.path) return { ...n, content };
                                            if (n.type === 'folder' && n.children) return { ...n, children: injectContent(n.children) };
                                            return n;
                                        });
                                        return injectContent(prev);
                                    });
                                    setSelectedFile((sf) => (sf && sf.path === node.path ? { ...sf, content } : sf));
                                } finally {
                                    setLoadingFilePath(null);
                                }
                            }
                        }
                    }}
                >
                    <span className="project-demo__file-icon">
                        {node.type === 'folder' ? '📁' : getFileIcon(node.name)}
                    </span>
                    <span className="project-demo__file-name">{node.name}</span>
                    {node.type === 'folder' && (
                        <span className="project-demo__file-expand">
                            {expandedFolders.has(node.path) ? '▼' : '▶'}
                        </span>
                    )}
                </div>
                {node.type === 'folder' &&
                    expandedFolders.has(node.path) &&
                    node.children &&
                    renderFileTree(node.children, level + 1)}
            </div>
        ));
    };

    const getFileIcon = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'js': return '🟨';
            case 'ts': return '📘';
            case 'jsx': return '⚛️';
            case 'tsx': return '⚛️';
            case 'css': return '🎨';
            case 'scss': return '🎨';
            case 'html': return '🌐';
            case 'json': return '📋';
            case 'md': return '📝';
            case 'gitignore': return '🚫';
            default: return '📄';
        }
    };

    // Mock file structure for fallback
    const mockFileStructure: FileNode[] = [
        {
            name: 'src',
            type: 'folder',
            path: 'src',
            children: [
                {
                    name: 'components',
                    type: 'folder',
                    path: 'src/components',
                    children: [
                        { name: 'Header.tsx', type: 'file', path: 'src/components/Header.tsx', content: '// Header component code here...' },
                        { name: 'Footer.tsx', type: 'file', path: 'src/components/Footer.tsx', content: '// Footer component code here...' }
                    ]
                },
                {
                    name: 'pages',
                    type: 'folder',
                    path: 'src/pages',
                    children: [
                        { name: 'Home.tsx', type: 'file', path: 'src/pages/Home.tsx', content: '// Home page component...' },
                        { name: 'Products.tsx', type: 'file', path: 'src/pages/Products.tsx', content: '// Products page component...' }
                    ]
                },
                {
                    name: 'utils',
                    type: 'folder',
                    path: 'src/utils',
                    children: [
                        { name: 'api.ts', type: 'file', path: 'src/utils/api.ts', content: '// API utility functions...' },
                        { name: 'helpers.ts', type: 'file', path: 'src/utils/helpers.ts', content: '// Helper functions...' }
                    ]
                },
                { name: 'App.tsx', type: 'file', path: 'src/App.tsx', content: '// Main App component...' },
                { name: 'index.tsx', type: 'file', path: 'src/index.tsx', content: '// Entry point...' }
            ]
        },
        {
            name: 'public',
            type: 'folder',
            path: 'public',
            children: [
                { name: 'index.html', type: 'file', path: 'public/index.html', content: '<!DOCTYPE html>...' },
                { name: 'favicon.ico', type: 'file', path: 'public/favicon.ico', content: 'Binary file...' }
            ]
        },
        { name: 'package.json', type: 'file', path: 'package.json', content: '{\n  "name": "project",\n  "version": "1.0.0"...' },
        { name: 'README.md', type: 'file', path: 'README.md', content: '# Project Title\n\nProject description...' },
        { name: '.gitignore', type: 'file', path: '.gitignore', content: 'node_modules/\n.env\nbuild/' }
    ];

    const fileStructure = fileStructureState ?? project.fileStructure ?? mockFileStructure;

    return (
        <div className="project-demo">
            <div className="project-demo__overlay" onClick={onClose}></div>
            <div className="project-demo__modal">
                <div className="project-demo__header">
                    <h2 className="project-demo__title">
                        <span className="project-demo__title-icon">{project.image}</span>
                        {project.title}
                    </h2>
                    <button className="project-demo__close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="project-demo__content">
                    <div className="project-demo__demo-section">
                        <h3 className="project-demo__section-title">Live Demo</h3>
                        <div className="project-demo__iframe-container" ref={containerRef}>
                            {(() => {
                                const demoSrc = project.demoUrl || project.live; return demoSrc ? (
                                    <div
                                        className="project-demo__iframe-wrapper"
                                        style={{
                                            width: `${DESKTOP_PREVIEW_WIDTH}px`,
                                            height: `${DESKTOP_PREVIEW_HEIGHT}px`,
                                            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                                            transformOrigin: 'top left'
                                        }}
                                    >
                                        <iframe
                                            src={demoSrc}
                                            title={`${project.title} Demo`}
                                            className="project-demo__iframe"
                                            frameBorder="0"
                                            ref={iframeRef}
                                            onLoad={() => setIframeLoaded(true)}
                                            style={{
                                                width: `${DESKTOP_PREVIEW_WIDTH}px`,
                                                height: `${DESKTOP_PREVIEW_HEIGHT}px`
                                            }}
                                        />
                                        {showIframeFallback && (
                                            <div className="project-demo__demo-placeholder" style={{ position: 'absolute', inset: 0 }}>
                                                <div className="project-demo__demo-placeholder-icon">🔓</div>
                                                <p>Site may block embedding in an iframe.</p>
                                                <a href={demoSrc} target="_blank" rel="noopener noreferrer" className="project-demo__demo-link">Open Live Demo</a>
                                            </div>
                                        )}
                                    </div>) : (
                                    <div className="project-demo__demo-placeholder">
                                        <div className="project-demo__demo-placeholder-icon">🚀</div>
                                        <p>Demo URL not available</p>
                                        <p>Check the live link for demo</p>
                                    </div>);
                            })()}
                        </div>
                        <div className="project-demo__demo-actions">
                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-demo__demo-link">
                                🌐 Open Live Demo
                            </a>
                            {project.sourcePrivate ? (
                                <span className="project-demo__file-loading">🔒 Source code is private for this project</span>
                            ) : (
                                project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-demo__demo-link">
                                        🐙 View on GitHub
                                    </a>
                                )
                            )}
                        </div>
                    </div>

                    <div className="project-demo__code-section">
                        <h3 className="project-demo__section-title">Source Code</h3>
                        {project.sourcePrivate ? (
                            <div className="project-demo__file-loading" style={{ padding: '1rem' }}>
                                🔒 This project's source code is private and cannot be displayed.
                            </div>
                        ) : (
                            <div className="project-demo__code-container">
                                <div className="project-demo__file-tree">
                                    <h4 className="project-demo__file-tree-title">📁 Project Structure</h4>
                                    <div className="project-demo__file-tree-content">
                                        {isLoadingTree ? (
                                            <div className="project-demo__file-loading">Loading repository...</div>
                                        ) : fileStructure ? (
                                            renderFileTree(fileStructure)
                                        ) : (
                                            <div className="project-demo__file-loading">Using fallback structure{loadError ? ` - ${loadError}` : ''}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="project-demo__code-viewer">
                                    <h4 className="project-demo__code-viewer-title">
                                        {selectedFile ? `📄 ${selectedFile.name}` : 'Select a file to view code'}
                                    </h4>
                                    <div className="project-demo__code-content">
                                        {selectedFile ? (
                                            loadingFilePath === selectedFile.path ? (
                                                <div className="project-demo__file-loading">Loading file...</div>
                                            ) : (
                                                <pre className="project-demo__code-text">
                                                    <code>{selectedFile.content || '// File content not available'}</code>
                                                </pre>
                                            )
                                        ) : (
                                            <div className="project-demo__code-placeholder">
                                                <div className="project-demo__code-placeholder-icon">💻</div>
                                                <p>Click on a file to view its source code</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="project-demo__footer">
                    <div className="project-demo__technologies">
                        <span className="project-demo__technologies-label">Technologies:</span>
                        {project.technologies.map((tech, index) => (
                            <span key={index} className="project-demo__tech-tag">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDemo;

