import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getText } from '../../i18n';
import './Skills.scss';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  desc?: string;
}

const Skills: React.FC = () => {
  const { language } = useLanguage();

  const [skills] = useState<Skill[]>([
    { name: 'React', level: 95, category: 'Frontend', icon: '⚛️', desc: 'Hooks, Router, Context, performance' },
    { name: 'TypeScript', level: 90, category: 'Frontend', icon: '📘', desc: 'Types, generics, utility types' },
    { name: 'JavaScript', level: 92, category: 'Frontend', icon: '🟨', desc: 'ES6+, async, DOM, patterns' },
    { name: 'Vite', level: 88, category: 'Frontend', icon: '⚡', desc: 'Fast dev builds, code splitting' },
    { name: 'Ant Design', level: 85, category: 'Frontend', icon: '🎨', desc: 'Design system, theming' },
    { name: 'Next.js', level: 87, category: 'Frontend', icon: '⏭️', desc: 'SSR/SSG, routing, API routes' },
    { name: 'Tailwind CSS', level: 85, category: 'Frontend', icon: '🌬️', desc: 'Utility-first styling' },
    { name: 'Node.js', level: 80, category: 'Backend', icon: '🟢', desc: 'REST APIs, streams' },
    { name: 'Express.js', level: 75, category: 'Backend', icon: '🚀', desc: 'Routing, middleware, auth' },
    { name: 'ASP.NET', level: 70, category: 'Backend', icon: '🔷', desc: 'MVC, EF Core, APIs' },
    { name: 'MongoDB', level: 70, category: 'Database', icon: '🍃', desc: 'Schema design, indexes' },
    { name: 'MySQL', level: 65, category: 'Database', icon: '🐬', desc: 'Joins, opt, procedures' },
    { name: 'Git', level: 85, category: 'Tools', icon: '📝', desc: 'Branching, rebase, CI' },
    { name: 'Figma', level: 75, category: 'Tools', icon: '🎯', desc: 'Wireframes, prototyping' }
  ]);

  const [animatedSkills, setAnimatedSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedSkills(skills);
    }, 500);

    return () => clearTimeout(timer);
  }, [skills]);

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];
  const [activeCategory, setActiveCategory] = useState<string>('All');
  type ViewMode = '3D' | 'Grid';
  const [viewMode, setViewMode] = useState<ViewMode>('3D');

  // 3D Wheel state
  const wheelRef = React.useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [radius, setRadius] = useState<number>(360);
  const dragState = React.useRef<{ isDragging: boolean; startX: number; startRotation: number }>({ isDragging: false, startX: 0, startRotation: 0 });

  useEffect(() => {
    if (!wheelRef.current) return;
    const update = () => {
      if (!wheelRef.current) return;
      const w = wheelRef.current.clientWidth;
      const next = Math.min(520, Math.max(260, w / 2 - 40));
      setRadius(next);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(wheelRef.current);
    return () => ro.disconnect();
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragState.current = { isDragging: true, startX: e.clientX, startRotation: rotation };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.isDragging) return;
    const dx = e.clientX - dragState.current.startX;
    setRotation(dragState.current.startRotation + dx * 0.25);
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    dragState.current.isDragging = false;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const getCategorySkills = (category: string) => {
    if (category === 'All') return skills;
    return skills.filter(skill => skill.category === category);
  };

  return (
    <section id="skills" className="skills">
      <div className="skills__container">
        <div className="skills__header">
          <h2 className="skills__title">
            <span className="skills__title-prefix">&gt; </span>
            {getText('skills.title', language)}
          </h2>
          <p className="skills__subtitle">
            {getText('skills.subtitle', language)}
          </p>
        </div>

        <div className="skills__tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`skills__tab ${activeCategory === category ? 'skills__tab--active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="skills__view-toggle">
          <button
            className={`skills__view-btn ${viewMode === '3D' ? 'skills__view-btn--active' : ''}`}
            onClick={() => setViewMode('3D')}
          >
            {getText('skills.view.3d', language)}
          </button>
          <button
            className={`skills__view-btn ${viewMode === 'Grid' ? 'skills__view-btn--active' : ''}`}
            onClick={() => setViewMode('Grid')}
          >
            {getText('skills.view.grid', language)}
          </button>
        </div>

        {viewMode === '3D' ? (
          <div className="skills__wheel" ref={wheelRef} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}>
            {(() => {
              const items = getCategorySkills(activeCategory); const ring = radius + 500; return (
                <>
                  <div className="skills__wheel-track" style={{ transform: `translateZ(-${ring}px) rotateY(${rotation}deg)` }}>
                    {items.map((skill, index, arr) => {
                      const step = 360 / arr.length;
                      const angle = index * step;
                      return (
                        <div key={skill.name} className="skills__card3d" style={{ transform: `rotateY(${angle}deg) translateZ(${ring}px)` }}>
                          <div className="skills__card3d-inner">
                            <div className="skills__card3d-face skills__card3d-face--front">
                              <div className="skills__gauge">
                                <div className="skills__holo-ring"></div>
                                <svg className="skills__gauge-svg" viewBox="0 0 100 100">
                                  <circle className="skills__gauge-bg" cx="50" cy="50" r={36} />
                                  <circle
                                    className="skills__gauge-progress"
                                    cx="50"
                                    cy="50"
                                    r={36}
                                    style={{
                                      strokeDasharray: `${2 * Math.PI * 36} ${2 * Math.PI * 36}`,
                                      strokeDashoffset: `${(2 * Math.PI * 36) * (1 - skill.level / 100)}`
                                    }}
                                  />
                                </svg>
                                <div className="skills__gauge-center">
                                  <div className="skills__skill-icon">{skill.icon}</div>
                                  <div className="skills__skill-level-number">{skill.level}%</div>
                                </div>
                              </div>
                              <div className="skills__skill-info">
                                <div className="skills__skill-name">{skill.name}</div>
                                {skill.desc && <div className="skills__skill-desc">{skill.desc}</div>}
                              </div>
                            </div>
                            <div className="skills__card3d-face skills__card3d-face--back">
                              <div className="skills__card3d-backcontent">
                                <div className="skills__skill-name">{skill.name}</div>
                                <div className="skills__skill-desc">Proficiency: {skill.level}%</div>
                                <div className="skills__skill-desc">Category: {skill.category}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="skills__wheel-nav">
                    <button className="skills__wheel-btn" onClick={() => setRotation(r => r - (360 / Math.max(1, getCategorySkills(activeCategory).length)))}>‹</button>
                    <button className="skills__wheel-btn" onClick={() => setRotation(r => r + (360 / Math.max(1, getCategorySkills(activeCategory).length)))}>›</button>
                  </div>
                </>
              );
            })()}
          </div>
        ) : (
          <div className="skills__category">
            <h3 className="skills__category-title">{activeCategory}</h3>
            <div className="skills__category-grid">
              {getCategorySkills(activeCategory).map((skill, index) => {
                const radius = 36;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference * (1 - skill.level / 100);
                const animate = animatedSkills.includes(skill);
                return (
                  <div
                    key={skill.name}
                    className="skills__skill-card"
                    onMouseMove={(e) => {
                      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                      const x = (e.clientX - rect.left) / rect.width;
                      const y = (e.clientY - rect.top) / rect.height;
                      const ry = (x - 0.5) * 16;
                      const rx = (0.5 - y) * 12;
                      e.currentTarget.style.setProperty('--rx', `${rx}deg`);
                      e.currentTarget.style.setProperty('--ry', `${ry}deg`);
                      e.currentTarget.style.setProperty('--gx', `${x * 100}%`);
                      e.currentTarget.style.setProperty('--gy', `${y * 100}%`);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.setProperty('--rx', `0deg`);
                      e.currentTarget.style.setProperty('--ry', `0deg`);
                    }}
                  >
                    <div className="skills__gauge">
                      <div className="skills__holo-ring"></div>
                      <svg className="skills__gauge-svg" viewBox="0 0 100 100">
                        <circle className="skills__gauge-bg" cx="50" cy="50" r={radius} />
                        <circle
                          className="skills__gauge-progress"
                          cx="50"
                          cy="50"
                          r={radius}
                          style={{
                            strokeDasharray: `${circumference} ${circumference}`,
                            strokeDashoffset: animate ? offset : circumference,
                            transitionDelay: `${index * 100}ms`
                          }}
                        />
                      </svg>
                      <div className="skills__gauge-center">
                        <div className="skills__skill-icon">{skill.icon}</div>
                        <div className="skills__skill-level-number">{skill.level}%</div>
                      </div>
                    </div>
                    <div className="skills__skill-info">
                      <div className="skills__skill-name">{skill.name}</div>
                      {skill.desc && <div className="skills__skill-desc">{skill.desc}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="skills__experience">
          <h3 className="skills__experience-title">{getText('skills.hobbies.title', language)}</h3>
          <div className="skills__experience-grid">
            <div className="skills__experience-item">
              <div className="skills__experience-icon">🏍️</div>
              <h4>{getText('skills.hobbies.travel', language)}</h4>
              <p>{getText('skills.hobbies.travel.desc', language)}</p>
            </div>
            <div className="skills__experience-item">
              <div className="skills__experience-icon">⚽</div>
              <h4>{getText('skills.hobbies.football', language)}</h4>
              <p>{getText('skills.hobbies.football.desc', language)}</p>
            </div>
            <div className="skills__experience-item">
              <div className="skills__experience-icon">🎮</div>
              <h4>{getText('skills.hobbies.gaming', language)}</h4>
              <p>{getText('skills.hobbies.gaming.desc', language)}</p>
            </div>
            <div className="skills__experience-item">
              <div className="skills__experience-icon">🌾</div>
              <h4>{getText('skills.hobbies.farming', language)}</h4>
              <p>{getText('skills.hobbies.farming.desc', language)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
