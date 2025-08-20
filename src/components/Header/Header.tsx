import React, { useState } from 'react';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useLanguage } from '../../contexts/LanguageContext';
import { getText } from '../../i18n';
import './Header.scss';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <span className="header__logo-text">AleamZ</span>
        </div>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <a href="#home" className="header__nav-link">{getText('nav.home', language)}</a>
            </li>
            <li className="header__nav-item">
              <a href="#projects" className="header__nav-link">{getText('nav.projects', language)}</a>
            </li>
            <li className="header__nav-item">
              <a href="#skills" className="header__nav-link">{getText('nav.skills', language)}</a>
            </li>
            <li className="header__nav-item">
              <a href="#contact" className="header__nav-link">{getText('nav.contact', language)}</a>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          <LanguageSwitcher />
        </div>

        <button
          className={`header__menu-toggle ${isMenuOpen ? 'header__menu-toggle--open' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
