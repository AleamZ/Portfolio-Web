import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getText } from '../../i18n';
import './Contact.scss';

const Contact: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        <div className="contact__header">
          <h2 className="contact__title">
            <span className="contact__title-prefix">&gt; </span>
            {getText('contact.title', language)}
          </h2>
          <p className="contact__subtitle">
            {getText('contact.subtitle', language)}
          </p>
        </div>

        <div className="contact__content">
          <div className="contact__info">
            <div className="contact__info-item">
              <div className="contact__info-icon">📍</div>
              <div className="contact__info-content">
                <h3>{getText('contact.location.title', language)}</h3>
                <p>{getText('contact.location.value', language)}</p>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">📱</div>
              <div className="contact__info-content">
                <h3>{getText('contact.phone.title', language)}</h3>
                <p>0977844114</p>
                <a href="tel:0977844114" className="contact__info-link">
                  {getText('contact.phone.call', language)}
                </a>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">📧</div>
              <div className="contact__info-content">
                <h3>{getText('contact.email.title', language)}</h3>
                <p>datnguyentien.work@gmail.com</p>
                <a href="mailto:datnguyentien.work@gmail.com" className="contact__info-link">
                  {getText('contact.email.send', language)}
                </a>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">💼</div>
              <div className="contact__info-content">
                <h3>{getText('contact.linkedin.title', language)}</h3>
                <p>{getText('contact.linkedin.description', language)}</p>
                <a
                  href="https://www.linkedin.com/in/aleamz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__info-link"
                >
                  {getText('contact.linkedin.view', language)}
                </a>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">🐙</div>
              <div className="contact__info-content">
                <h3>{getText('contact.github.title', language)}</h3>
                <p>{getText('contact.github.description', language)}</p>
                <a
                  href="https://github.com/AleamZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__info-link"
                >
                  {getText('contact.github.visit', language)}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact__footer">
          <div className="contact__footer-text">
            <p>{getText('contact.footer.message', language)}</p>
            <p>{getText('contact.footer.description', language)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
