import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getText } from '../../i18n';
import './Home.scss';

const Home: React.FC = () => {
  const { language } = useLanguage();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const fullText = "Nguyen Tien Dat - Fullstack Dev";
  const typingSpeed = 150;
  const deletingSpeed = 100;

  useEffect(() => {
    if (!isDeleting && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    } else if (currentIndex === fullText.length && !isDeleting) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    } else if (currentIndex === 0 && isDeleting) {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isDeleting, fullText]);

  return (
    <section id="home" className="home">
      <div className="home__container">
        <div className="home__content">
          <div className="home__greeting">
            <span className="home__greeting-text">{getText('home.greeting', language)}</span>
            <div className="home__greeting-binary">01001000 01100101 01101100 01101100 01101111</div>
          </div>

          <h1 className="home__title">
            <span className="home__title-prefix">&gt; </span>
            <span className="home__title-text">{displayText}</span>
            <span className="home__title-cursor">|</span>
          </h1>

          <p className="home__subtitle">
            {getText('home.subtitle', language)}
          </p>

          <div className="home__description">
            <p>
              {getText('home.description', language)}
            </p>
          </div>

          <div className="home__stats">
            <div className="home__stat">
              <span className="home__stat-number">1</span>
              <span className="home__stat-label">{getText('home.stats.experience', language)}</span>
            </div>
            <div className="home__stat">
              <span className="home__stat-number">3</span>
              <span className="home__stat-label">{getText('home.stats.projects', language)}</span>
            </div>
            <div className="home__stat">
              <span className="home__stat-number">100%</span>
              <span className="home__stat-label">{getText('home.stats.satisfaction', language)}</span>
            </div>
          </div>

          <div className="home__cta">
            <a href="#projects" className="home__cta-button home__cta-button--primary">
              {getText('home.cta.viewWork', language)}
            </a>
            <a href="#contact" className="home__cta-button home__cta-button--secondary">
              {getText('home.cta.getInTouch', language)}
            </a>
          </div>
        </div>

        <div className="home__visual">
          <div className="home__code-block">
            <div className="home__code-header">
              <span className="home__code-dot home__code-dot--red"></span>
              <span className="home__code-dot home__code-dot--yellow"></span>
              <span className="home__code-dot home__code-dot--green"></span>
              <span className="home__code-title">developer.js</span>
            </div>
            <div className="home__code-content">
              <pre><code>{`class Developer {
  constructor(name, role) {
    this.name = "${fullText.split(' - ')[0]}";
    this.role = "${fullText.split(' - ')[1]}";
    this.skills = ['React', 'TypeScript', 'Node.js', 'ASP.NET', 'MySQL'];
  }
  
  code() {
    return "${getText('home.code.building', language)}";
  }
  
  learn() {
    return "${getText('home.code.learning', language)}";
  }
}

const me = new Developer();
me.code(); // "${getText('home.code.building', language)}"`}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
