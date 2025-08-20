import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Language } from '../../i18n';
import './LanguageSwitcher.scss';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
  ];

  return (
    <div className="language-switcher">
      <div className="language-switcher__current">
        <span className="language-switcher__flag">{languages.find(lang => lang.code === language)?.flag}</span>
        <span className="language-switcher__name">{languages.find(lang => lang.code === language)?.name}</span>
      </div>
      <div className="language-switcher__dropdown">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`language-switcher__option ${language === lang.code ? 'language-switcher__option--active' : ''}`}
            onClick={() => setLanguage(lang.code)}
          >
            <span className="language-switcher__flag">{lang.flag}</span>
            <span className="language-switcher__name">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
