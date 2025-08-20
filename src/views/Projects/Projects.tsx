import React, { useEffect, useRef, useState } from 'react';
import ProjectDemo from '../../components/ProjectDemo/ProjectDemo';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Web Store Project',
      description: 'A full-stack e-commerce application developed with ReactJS and Vite for frontend, Node.js with Express and TypeScript for backend. Features include product management, shopping cart, and user authentication.',
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
      title: 'Sales Management Web Project',
      description: 'A comprehensive sales management system built with ReactJS and Vite, featuring sales tracking, customer management, and reporting capabilities with optimized data handling using React Query.',
      technologies: ['React', 'TypeScript', 'Vite', 'Ant Design', 'React Query'],
      image: '📊',
      github: 'https://github.com/AleamZ/Sales-Management',
      live: 'https://sales-management-henna.vercel.app',
      category: 'Full-Stack',
      demoUrl: 'https://sales-management-henna.vercel.app'
    },
    {
      id: 3,
      title: 'CI Research Company Website',
      description: 'Developed a web application using ASP.NET for full-stack integration, managing over 5 million records of Vietnamese enterprise data with optimized performance and modern UI/UX design.',
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
      title: 'Amazing Tech Company Interface',
      description: 'Designed and developed the initial "First Page" interface using React and JavaScript, focusing on modular component structure and responsive design with SCSS and Ant Design integration.',
      technologies: ['React', 'JavaScript', 'SCSS', 'Ant Design', 'API Integration'],
      image: '💻',
      github: '#',
      live: '#',
      category: 'Frontend',
      demoUrl: 'https://amazing-tech-demo.vercel.app'
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with React and TypeScript, featuring smooth animations and a unique coder theme with binary background effects.',
      technologies: ['React', 'TypeScript', 'SCSS', 'Vite'],
      image: '💼',
      github: 'https://github.com/AleamZ/Portfolio-Web',
      live: 'https://www.aleamz.info.vn/',
      category: 'Frontend',
      demoUrl: 'https://www.aleamz.info.vn/',
      previewImage: 'https://image.thum.io/get/width/1280/crop/720/https://www.aleamz.info.vn/'
    }
  ];

  const categories = ['All', 'Frontend', 'Backend', 'Full-Stack'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCategory]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveIndex(prev => Math.min(prev + 1, filteredProjects.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [filteredProjects.length]);

  const goPrev = () => setActiveIndex(prev => Math.max(prev - 1, 0));
  const goNext = () => setActiveIndex(prev => Math.min(prev + 1, filteredProjects.length - 1));

  const CardThumb: React.FC<{ url?: string; fallbackImg?: string }> = ({ url, fallbackImg }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const DESKTOP_W = 1280;
    const DESKTOP_H = 720;
    const [loaded, setLoaded] = useState(false);
    const [fallback] = useState(false);

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
        {url && !fallback ? (
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
              <div className="projects__thumb-placeholder">Loading preview…</div>
            )}
          </div>
        ) : fallbackImg ? (
          <img src={fallbackImg} alt="Site preview" className="projects__thumb-image" />
        ) : (
          <div className="projects__thumb-placeholder">Preview not available</div>
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
            My Projects
          </h2>
          <p className="projects__subtitle">
            A showcase of my work and technical expertise
          </p>
        </div>

        <div className="projects__filters">
          {categories.map(category => (
            <button
              key={category}
              className={`projects__filter-btn ${selectedCategory === category ? 'projects__filter-btn--active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="projects__carousel">
          <button className="projects__nav projects__nav--prev" onClick={goPrev} aria-label="Previous" disabled={activeIndex === 0}>
            ‹
          </button>
          <div className="projects__carousel-track">
            {filteredProjects.map((project, index) => {
              const offset = index - activeIndex;
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
                        <a href={project.live} className="projects__meta-btn">Live</a>
                        <button className="projects__meta-btn projects__meta-btn--primary" onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}>View</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="projects__nav projects__nav--next" onClick={goNext} aria-label="Next" disabled={activeIndex === filteredProjects.length - 1}>
            ›
          </button>
        </div>

        <div className="projects__cta">
          <p className="projects__cta-text">
            Interested in working together? Let's discuss your project!
          </p>
          <a href="#contact" className="projects__cta-button">
            Get In Touch
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
