import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const CONTACT_EMAIL = 'majdharb1995@gmail.com';

function Contact() {
  const { t, lang, setCurrentPage } = useApp();
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const channels = [
    { id: 1, icon: Mail, label: t.contact.emailLabel, value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { id: 2, icon: MapPin, label: t.contact.locationLabel, value: t.contact.locationValue, href: null },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || '—',
          message: form.message,
          _subject: `استفسار جديد من ${form.name}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setForm({ name: '', email: '', company: '', message: '' });
    setStatus('idle');
  };

  return (
    <motion.div
      className="page-contact"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
    >
      <motion.div className="section-header" variants={itemVariants}>
        <span className="section-tag">{t.contact.tag}</span>
        <h1 className="main-title">
          {t.contact.title1} <span className="title-gradient">{t.contact.title2}</span>
        </h1>
        <p className="description">{t.contact.desc}</p>
      </motion.div>

      <div className="contact-layout">
        <motion.div className="contact-form-wrapper" variants={itemVariants}>
          {status === 'success' ? (
            <div className="contact-success">
              <div className="success-node">
                <CheckCircle2 size={40} aria-hidden="true" />
              </div>
              <h2 className="panel-title">{t.contact.successTitle}</h2>
              <p className="panel-desc">{t.contact.successDesc}</p>
              <button className="ghost-link" onClick={reset}>
                {t.contact.successBtnNew}
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="input-grid">
                <div className="input-group">
                  <label className="field-label" htmlFor="c-name">
                    {t.contact.lblName}
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    className="cyber-input"
                    placeholder={t.contact.phName}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="input-group">
                  <label className="field-label" htmlFor="c-email">
                    {t.contact.lblEmail}
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    className="cyber-input"
                    placeholder={t.contact.phEmail}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    autoComplete="email"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="field-label" htmlFor="c-company">
                  {t.contact.lblCompany}
                </label>
                <input
                  id="c-company"
                  type="text"
                  className="cyber-input"
                  placeholder={t.contact.phCompany}
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  autoComplete="organization"
                />
              </div>

              <div className="input-group">
                <label className="field-label" htmlFor="c-message">
                  {t.contact.lblMessage}
                </label>
                <textarea
                  id="c-message"
                  className="cyber-textarea"
                  placeholder={t.contact.phMessage}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                />
              </div>

              {status === 'error' && (
                <div className="form-error" style={{ color: '#ff4d6a', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  {lang === 'en' ? 'Failed to send. Please try again.' : 'فشل الإرسال. يرجى المحاولة مرة أخرى.'}
                </div>
              )}

              <button
                type="submit"
                className="cta-button primary submit-btn"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <div className="spin-loader" aria-hidden="true"></div>
                ) : (
                  <>
                    {t.contact.btnSubmit}
                    <Send size={16} className="arrow" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        <motion.div className="contact-channels" variants={itemVariants}>
          <h3 className="channels-title">{t.contact.channelsTitle}</h3>
          <ul className="channels-list">
            {channels.map((ch) => {
              const Icon = ch.icon;
              const content = (
                <>
                  <div className="channel-icon">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <div className="channel-info">
                    <div className="channel-label">{ch.label}</div>
                    <div className="channel-value">{ch.value}</div>
                  </div>
                </>
              );
              return (
                <li key={ch.id}>
                  {ch.href ? (
                    <a href={ch.href} target="_blank" rel="noopener noreferrer" className="channel-link">
                      {content}
                    </a>
                  ) : (
                    <div className="channel-link">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>

      <motion.button
        className="back-btn"
        onClick={() => setCurrentPage('home')}
        variants={itemVariants}
      >
        <ArrowLeft size={14} aria-hidden="true" />
        <span>{lang === 'en' ? 'Back to HQ' : 'العودة للمقر'}</span>
      </motion.button>
    </motion.div>
  );
}

export default Contact;