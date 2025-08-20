import React, { useState } from 'react';
import './Contact.scss';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your message! I will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

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
              <div className="contact__info-icon">📧</div>
              <div className="contact__info-content">
                <h3>Email</h3>
                <p>nguyentiendat@example.com</p>
                <a href="mailto:nguyentiendat@example.com" className="contact__info-link">
                  Send Email
                </a>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">💼</div>
              <div className="contact__info-content">
                <h3>LinkedIn</h3>
                <p>Connect with me professionally</p>
                <a href="#" className="contact__info-link">
                  View Profile
                </a>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">🐙</div>
              <div className="contact__info-content">
                <h3>GitHub</h3>
                <p>Check out my code and projects</p>
                <a href="#" className="contact__info-link">
                  Visit GitHub
                </a>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">🌐</div>
              <div className="contact__info-content">
                <h3>Location</h3>
                <p>Ho Chi Minh City, Vietnam</p>
                <span className="contact__info-text">Graduate from University of Greenwich</span>
              </div>
            </div>
          </div>

          <div className="contact__form-container">
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__form-group">
                <label htmlFor="name" className="contact__form-label">
                  Name <span className="contact__form-required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="contact__form-input"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="email" className="contact__form-label">
                  Email <span className="contact__form-required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="contact__form-input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="subject" className="contact__form-label">
                  Subject <span className="contact__form-required">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="contact__form-input"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="message" className="contact__form-label">
                  Message <span className="contact__form-required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="contact__form-textarea"
                  placeholder="Tell me about your project or idea..."
                  rows={6}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className={`contact__form-button ${isSubmitting ? 'contact__form-button--loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="contact__form-button-spinner"></span>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
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
