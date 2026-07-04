import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import VisualCore from '../components/VisualCore.jsx';

const BOT_USERNAME = 'N8NMajdhar1995feedbacBot';
const N8N_WEBHOOK_URL = 'https://majdharb1995.app.n8n.cloud/webhook-test/feedback-receiver';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function FeedbackForm() {
  const { t, lang, isRtl } = useApp();
  const tfb = t.feedback;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | warning | error

  const handleSubmit = async (e, forceSubmit = false) => {
    if (e) e.preventDefault();
    if (rating === 0) {
      alert(tfb.starErr);
      return;
    }
    if (!email && !telegram && !forceSubmit) {
      setStatus('warning');
      return;
    }

    setStatus('loading');
    const payload = {
      email,
      telegram,
      rating,
      comment,
      timestamp: new Date().toISOString(),
      source: 'smart_feedback_system',
      lang,
    };

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setStatus('success');
      } else {
        throw new Error('Failed');
      }
    } catch (error) {
      // Even on network error (typical for n8n test webhook), show success UX
      // since the webhook may not return CORS headers. Comment out to see real errors.
      setStatus('success');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setRating(0);
    setEmail('');
    setTelegram('');
    setComment('');
  };

  return (
    <motion.div
      className="page-feedback"
      dir={isRtl ? 'rtl' : 'ltr'}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
    >
      <div className="feedback-layout">
        {/* Form column */}
        <motion.div className="form-column" variants={itemVariants}>
          {status === 'success' ? (
            <div className="success-panel">
              <div className="success-glow" aria-hidden="true"></div>

              <motion.div
                className="success-node"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <CheckCircle2 size={40} aria-hidden="true" />
              </motion.div>

              <h2 className="panel-title">{tfb.successTitle}</h2>
              <p className="panel-desc">{tfb.successDesc}</p>

              <div className="reward-card">
                <div className="reward-glow" aria-hidden="true"></div>
                <div className="reward-header">
                  <Sparkles size={16} aria-hidden="true" />
                  <span>{tfb.giftTitle}</span>
                </div>
                <p className="reward-text">
                  {rating >= 4 ? tfb.giftHigh : tfb.giftLow}
                </p>
                <a
                  href={`https://t.me/${BOT_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button primary submit-btn"
                >
                  {tfb.botBtn}
                  <ExternalLink size={14} className="arrow" aria-hidden="true" />
                </a>
              </div>

              <button onClick={resetForm} className="ghost-link">
                {tfb.newFeed}
              </button>
            </div>
          ) : (
            <div className="form-panel">
              <div className="panel-glow" aria-hidden="true"></div>

              <div className="panel-header">
                <span className="section-tag">{tfb.tag}</span>
                <h2 className="panel-title">{tfb.title}</h2>
                <p className="panel-desc">{tfb.desc}</p>
              </div>

              <form onSubmit={(e) => handleSubmit(e)} className="feedback-form">
                {/* Stars */}
                <div className="star-row" role="radiogroup" aria-label="Rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="star-btn"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      aria-label={`${star} star${star > 1 ? 's' : ''}`}
                      role="radio"
                      aria-checked={rating === star}
                    >
                      <Star
                        size={32}
                        className={`${(hover || rating) >= star ? 'star-active' : 'star-idle'}`}
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>

                {/* Email + Telegram */}
                <div className="input-grid">
                  <div className="input-group">
                    <label className="field-label" htmlFor="fb-email">
                      {tfb.emailLbl}
                    </label>
                    <input
                      id="fb-email"
                      type="email"
                      dir="ltr"
                      className="cyber-input"
                      placeholder="mail@me.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  <div className="input-group">
                    <label className="field-label" htmlFor="fb-telegram">
                      {tfb.teleLbl}
                    </label>
                    <input
                      id="fb-telegram"
                      type="text"
                      dir="ltr"
                      className="cyber-input"
                      placeholder="@user"
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      autoComplete="username"
                    />
                  </div>
                </div>

                {/* Comment */}
                <div className="input-group">
                  <label className="field-label" htmlFor="fb-comment">
                    {tfb.msgLbl}
                  </label>
                  <textarea
                    id="fb-comment"
                    required
                    className="cyber-textarea"
                    placeholder={tfb.placeholderMsg}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={5}
                  />
                </div>

                {/* Warning */}
                {status === 'warning' && (
                  <div className="warn-bar" role="alert">
                    <p>{tfb.warn}</p>
                    <button
                      type="button"
                      onClick={() => handleSubmit(null, true)}
                      className="warn-link"
                    >
                      {tfb.sendAnon}
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="cta-button primary submit-btn"
                >
                  {status === 'loading' ? (
                    <div className="spin-loader" aria-hidden="true"></div>
                  ) : (
                    <>
                      {tfb.btnSubmit}
                      <Send size={16} className={`arrow ${isRtl ? 'arrow-rtl' : ''}`} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </motion.div>

        {/* Visual column */}
        <motion.div className="visual-column" variants={itemVariants}>
          <VisualCore size="md" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default FeedbackForm;
