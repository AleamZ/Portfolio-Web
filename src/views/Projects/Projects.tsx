import React, { useEffect, useRef, useState } from 'react';
import ProjectDemo from '../../components/ProjectDemo/ProjectDemo';
import { useLanguage } from '../../contexts/LanguageContext';
import { getText } from '../../i18n';
import './Projects.scss';

interface Project {
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
  previewImage?: string;
}

const Projects: React.FC = () => {
  const { language } = useLanguage();
  const [selectedKey, setSelectedKey] = useState<'all' | 'frontend' | 'backend' | 'fullstack'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const projects: Project[] = [
    {
      id: 1,
      title: getText('projects.webStore.title', language),
      description: getText('projects.webStore.description', language),
      technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Vite', 'Ant Design'],
      image: '🛒',
      github: '',
      live: 'https://www.bluetoothmobile.vn',
      category: 'Full-Stack',
      demoUrl: 'https://www.bluetoothmobile.vn',
      sourcePrivate: true,
      previewImage: 'https://image.thum.io/get/width/1280/crop/720/https://www.bluetoothmobile.vn'
    },
    {
      id: 2,
      title: getText('projects.salesManagement.title', language),
      description: getText('projects.salesManagement.description', language),
      technologies: ['React', 'TypeScript', 'Vite', 'Ant Design', 'React Query'],
      image: '📊',
      github: 'https://github.com/AleamZ/Sales-Management',
      live: 'https://sales-management-henna.vercel.app',
      category: 'Full-Stack',
      demoUrl: 'https://sales-management-henna.vercel.app',
      previewImage: 'https://image.thum.io/get/width/1280/crop/720/https://sales-management-henna.vercel.app'
    },
    {
      id: 3,
      title: getText('projects.ciResearch.title', language),
      description: getText('projects.ciResearch.description', language),
      technologies: ['ASP.NET', 'C#', 'Big Data', 'MySQL', 'Performance Optimization'],
      image: '🏢',
      github: '',
      live: 'https://ciresearch.vn/dn',
      category: 'Full-Stack',
      demoUrl: 'https://ciresearch.vn/dn',
      sourcePrivate: true,
      previewImage: 'https://image.thum.io/get/width/1280/crop/720/https://ciresearch.vn/dn'
    },
    {
      id: 4,
      title: getText('projects.amazingTech.title', language),
      description: getText('projects.amazingTech.description', language),
      technologies: ['React', 'JavaScript', 'SCSS', 'Ant Design', 'API Integration'],
      image: '💻',
      github: '',
      live: 'https://demo-noah-quiz.vercel.app/',
      category: 'Frontend',
      demoUrl: 'https://demo-noah-quiz.vercel.app/',
      sourcePrivate: true,
      previewImage: 'https://image.thum.io/get/width/1280/crop/720/https://demo-noah-quiz.vercel.app/'
    },
    {
      id: 5,
      title: getText('projects.portfolio.title', language),
      description: getText('projects.portfolio.description', language),
      technologies: ['React', 'TypeScript', 'SCSS', 'Vite'],
      image: '💼',
      github: 'https://github.com/AleamZ/Portfolio-Web',
      live: 'https://www.aleamz.info.vn/',
      category: 'Frontend',
      demoUrl: 'https://www.aleamz.info.vn/',
      previewImage: 'https://image.thum.io/get/width/1280/crop/720/https://www.aleamz.info.vn/'
    },
    {
      id: 6,
      title: getText('projects.maxius.title', language),
      description: getText('projects.maxius.description', language),
      technologies: ['React', 'TypeScript', 'Vite', 'Ant Design'],
      image: '🧪',
      github: 'https://github.com/AleamZ/TOAST-TEST-JOB',
      live: 'https://toast-test-job.vercel.app/',
      category: 'Frontend',
      demoUrl: 'https://toast-test-job.vercel.app/',
      previewImage: 'https://image.thum.io/get/width/1280/crop/720/https://toast-test-job.vercel.app/'
    },
    {
      id: 7,
      title: getText('projects.amanotes.title', language),
      description: getText('projects.amanotes.description', language),
      technologies: ['React', 'TypeScript', 'Vite', 'Ant Design', 'React Query'],
      image: '🎵',
      github: 'https://github.com/AleamZ/Amanotes-Test-Job',
      live: 'https://amanotes-test-job.vercel.app/',
      category: 'Frontend',
      demoUrl: 'https://amanotes-test-job.vercel.app/',
      previewImage: 'https://image.thum.io/get/width/1280/crop/720/https://amanotes-test-job.vercel.app/'
    }
  ];

  const categories = [
    { key: 'all' as const, label: getText('projects.filter.all', language) },
    { key: 'frontend' as const, label: getText('projects.filter.frontend', language) },
    { key: 'backend' as const, label: getText('projects.filter.backend', language) },
    { key: 'fullstack' as const, label: getText('projects.filter.fullstack', language) }
  ];

  const toProjectCategory = (key: 'all' | 'frontend' | 'backend' | 'fullstack'): 'Frontend' | 'Backend' | 'Full-Stack' | 'All' => {
    if (key === 'frontend') return 'Frontend';
    if (key === 'backend') return 'Backend';
    if (key === 'fullstack') return 'Full-Stack';
    return 'All';
  };

  const filteredProjects = selectedKey === 'all'
    ? projects
    : projects.filter(project => project.category === toProjectCategory(selectedKey));

  useEffect(() => {
    setActiveIndex(Math.floor(filteredProjects.length / 2));
  }, [selectedKey, filteredProjects.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveIndex(prev => (prev + 1) % filteredProjects.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex(prev => (prev - 1 + filteredProjects.length) % filteredProjects.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [filteredProjects.length]);

  const goPrev = () => setActiveIndex(prev => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  const goNext = () => setActiveIndex(prev => (prev + 1) % filteredProjects.length);

  const CardThumb: React.FC<{ url?: string; fallbackImg?: string }> = ({ url, fallbackImg }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const DESKTOP_W = 1280;
    const DESKTOP_H = 720;
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      if (!containerRef.current) return;
      const update = () => {
        if (!containerRef.current) return;
        const { clientWidth, clientHeight } = containerRef.current;
        const nextScale = Math.min(clientWidth / DESKTOP_W, clientHeight / DESKTOP_H);
        const scaledW = DESKTOP_W * nextScale;
        const scaledH = DESKTOP_H * nextScale;
        const offsetX = Math.max(0, (clientWidth - scaledW) / 2);
        const offsetY = Math.max(0, (clientHeight - scaledH) / 2);
        setTranslate({ x: offsetX / nextScale, y: offsetY / nextScale });
        setScale(nextScale);
      };
      update();
      const ro = new ResizeObserver(update);
      ro.observe(containerRef.current);
      window.addEventListener('resize', update);
      return () => {
        ro.disconnect();
        window.removeEventListener('resize', update);
      };
    }, []);

    return (
      <div className="projects__thumb-container" ref={containerRef}>
        {url ? (
          <div
            className="projects__thumb-wrapper"
            style={{
              width: `${DESKTOP_W}px`,
              height: `${DESKTOP_H}px`,
              transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
              transformOrigin: 'top left'
            }}
          >
            <iframe
              src={url}
              title="Project thumbnail"
              className="projects__thumb-iframe"
              style={{ width: `${DESKTOP_W}px`, height: `${DESKTOP_H}px` }}
              loading="lazy"
              onLoad={() => setLoaded(true)}
            />
            {!loaded && (
              <div className="projects__thumb-placeholder">{getText('projects.preview.loading', language)}</div>
            )}
          </div>
        ) : fallbackImg ? (
          <img src={fallbackImg} alt="Site preview" className="projects__thumb-image" />
        ) : (
          <div className="projects__thumb-placeholder">{getText('projects.preview.unavailable', language)}</div>
        )}
      </div>
    );
  };

  return (
    <section id="projects" className="projects">
      <div className="projects__container">
        <div className="projects__header">
          <h2 className="projects__title">
            <span className="projects__title-prefix">&gt; </span>
            {getText('projects.title', language)}
          </h2>
          <p className="projects__subtitle">
            {getText('projects.subtitle', language)}
          </p>
        </div>

        <div className="projects__filters">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              className={`projects__filter-btn ${selectedKey === key ? 'projects__filter-btn--active' : ''}`}
              onClick={() => setSelectedKey(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="projects__carousel">
          <button className="projects__nav projects__nav--prev" onClick={goPrev} aria-label={getText('common.prev', language)}>
            ‹
          </button>
          <div className="projects__carousel-track">
            {filteredProjects.map((project, index) => {
              const n = filteredProjects.length || 1;
              let offset = index - activeIndex;
              if (offset > n / 2) offset -= n;
              if (offset < -n / 2) offset += n;
              const translateX = offset * 320;
              const rotateY = -25 * offset;
              const translateZ = -120 * Math.abs(offset);
              const scale = Math.max(0.8, 1 - Math.abs(offset) * 0.08);
              const zIndex = 100 - Math.abs(offset);
              return (
                <div
                  key={project.id}
                  className={`projects__card3d ${index === activeIndex ? 'projects__card3d--active' : ''}`}
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex
                  }}
                  onClick={() => {
                    if (index !== activeIndex) setActiveIndex(index); else setSelectedProject(project);
                  }}
                >
                  <div className="projects__card3d-inner">
                    <div className="projects__thumb">
                      <CardThumb url={project.demoUrl || project.live} fallbackImg={project.previewImage} />
                    </div>
                    <div className="projects__meta">
                      <h3 className="projects__card-title">{project.title}</h3>
                      <div className="projects__meta-actions">
                        {!project.sourcePrivate && project.github && (
                          <a href={project.github} className="projects__meta-btn">GitHub</a>
                        )}
                        <a href={project.live} className="projects__meta-btn">{getText('projects.view.live', language)}</a>
                        <button className="projects__meta-btn projects__meta-btn--primary" onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}>{getText('common.open', language)}</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="projects__nav projects__nav--next" onClick={goNext} aria-label={getText('common.next', language)}>
            ›
          </button>
        </div>

        <div className="projects__cta">
          <p className="projects__cta-text">
            {getText('projects.cta.text', language)}
          </p>
          <a href="#contact" className="projects__cta-button">
            {getText('contact.form.send', language)}
          </a>
        </div>
      </div>

      {selectedProject && (
        <ProjectDemo
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
