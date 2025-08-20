import React from 'react';
import './Contact.scss';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        <div className="contact__header">
          <h2 className="contact__title">
            <span className="contact__title-prefix">&gt; </span>
            Get In Touch
          </h2>
          <p className="contact__subtitle">
            Ready to start a project or just want to chat? Let's connect!
          </p>
        </div>

        <div className="contact__content">
          <div className="contact__info">
            <div className="contact__info-item">
              <div className="contact__info-icon">📍</div>
              <div className="contact__info-content">
                <h3>Location</h3>
                <p>Thu Duc City</p>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">📱</div>
              <div className="contact__info-content">
                <h3>Phone</h3>
                <p>0977844114</p>
                <a href="tel:0977844114" className="contact__info-link">
                  Call Now
                </a>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">📧</div>
              <div className="contact__info-content">
                <h3>Email</h3>
                <p>datnguyentien.work@gmail.com</p>
                <a href="mailto:datnguyentien.work@gmail.com" className="contact__info-link">
                  Send Email
                </a>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">💼</div>
              <div className="contact__info-content">
                <h3>LinkedIn</h3>
                <p>Connect with me professionally</p>
                <a
                  href="https://www.linkedin.com/in/aleamz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__info-link"
                >
                  View Profile
                </a>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">🐙</div>
              <div className="contact__info-content">
                <h3>GitHub</h3>
                <p>Check out my code and projects</p>
                <a
                  href="https://github.com/AleamZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__info-link"
                >
                  Visit GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact__footer">
          <div className="contact__footer-text">
            <p>Let's build something amazing together! 🚀</p>
            <p>Fullstack Developer with 2+ years experience in React, Node.js, and ASP.NET.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
