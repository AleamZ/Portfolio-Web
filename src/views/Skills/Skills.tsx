import React, { useState, useEffect } from 'react';
import './Skills.scss';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

const Skills: React.FC = () => {
  const [skills] = useState<Skill[]>([
    { name: 'React', level: 95, category: 'Frontend', icon: '⚛️' },
    { name: 'TypeScript', level: 90, category: 'Frontend', icon: '📘' },
    { name: 'JavaScript', level: 92, category: 'Frontend', icon: '🟨' },
    { name: 'Vite', level: 88, category: 'Frontend', icon: '⚡' },
    { name: 'Ant Design', level: 85, category: 'Frontend', icon: '🎨' },
    { name: 'Next.js', level: 87, category: 'Frontend', icon: '⏭️' },
    { name: 'Tailwind CSS', level: 85, category: 'Frontend', icon: '🌬️' },
    { name: 'Node.js', level: 80, category: 'Backend', icon: '🟢' },
    { name: 'Express.js', level: 75, category: 'Backend', icon: '🚀' },
    { name: 'ASP.NET', level: 70, category: 'Backend', icon: '🔷' },
    { name: 'MongoDB', level: 70, category: 'Database', icon: '🍃' },
    { name: 'MySQL', level: 65, category: 'Database', icon: '🐬' },
    { name: 'Git', level: 85, category: 'Tools', icon: '📝' },
    { name: 'Figma', level: 75, category: 'Tools', icon: '🎯' }
  ]);

  const [animatedSkills, setAnimatedSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedSkills(skills);
    }, 500);

    return () => clearTimeout(timer);
  }, [skills]);

  const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Cloud'];

  const getCategorySkills = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <section id="skills" className="skills">
      <div className="skills__container">
        <div className="skills__header">
          <h2 className="skills__title">
            <span className="skills__title-prefix">&gt; </span>
            My Skills
          </h2>
          <p className="skills__subtitle">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="skills__content">
          {categories.map(category => (
            <div key={category} className="skills__category">
              <h3 className="skills__category-title">{category}</h3>
              <div className="skills__category-grid">
                {getCategorySkills(category).map((skill, index) => (
                  <div key={skill.name} className="skills__skill-card">
                    <div className="skills__skill-header">
                      <span className="skills__skill-icon">{skill.icon}</span>
                      <span className="skills__skill-name">{skill.name}</span>
                    </div>
                    <div className="skills__skill-bar">
                      <div
                        className="skills__skill-progress"
                        style={{
                          width: `${animatedSkills.includes(skill) ? skill.level : 0}%`,
                          transitionDelay: `${index * 100}ms`
                        }}
                      ></div>
                    </div>
                    <div className="skills__skill-level">
                      {skill.level}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills__experience">
          <h3 className="skills__experience-title">Experience Highlights</h3>
          <div className="skills__experience-grid">
            <div className="skills__experience-item">
              <div className="skills__experience-icon">🎯</div>
              <h4>Frontend Excellence</h4>
              <p>Specialized in React ecosystem with Vite, TypeScript, and Ant Design</p>
            </div>
            <div className="skills__experience-item">
              <div className="skills__experience-icon">⚡</div>
              <h4>Performance Optimization</h4>
              <p>Expert in ASP.NET development and Big Data processing with 5M+ records</p>
            </div>
            <div className="skills__experience-item">
              <div className="skills__experience-icon">🔧</div>
              <h4>Full-Stack Development</h4>
              <p>End-to-end development with React, Node.js, Express, and MySQL</p>
            </div>
            <div className="skills__experience-item">
              <div className="skills__experience-icon">🚀</div>
              <h4>Modern Technologies</h4>
              <p>Experience with React Query, Vite, and modern deployment platforms</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
