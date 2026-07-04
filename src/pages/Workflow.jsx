import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Mail, Send, Clock, CheckCircle2 } from 'lucide-react';
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

function Workflow() {
  const { t, lang, selectedModel, setCurrentPage } = useApp();
  
  // حالات التحكم بالفورم والطلب
  const [showContactCard, setShowContactCard] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  if (!selectedModel) {
    return (
      <div className="page-workflow">
        <p>{lang === 'en' ? 'No model selected.' : 'لم يتم اختيار نموذج.'}</p>
        <button className="back-btn" onClick={() => setCurrentPage('solution')}>
          {t.workflow.btnBackSol}
        </button>
      </div>
    );
  }

  // دالة معالجة إرسال طلب الخدمة للـ API
  const handleServiceSubmit = async (e) => {
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
          service: selectedModel.title, // تضمين اسم النموذج المطلوب تلقائياً
          message: form.message,
          _subject: `طلب خدمة جديد لـ [${selectedModel.title}] من ${form.name}`,
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

  const resetForm = () => {
    setForm({ name: '', email: '', message: '' });
    setStatus('idle');
  };

  return (
    <motion.div
      className="page-workflow"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
    >
      <motion.span className="section-tag" variants={itemVariants}>
        {t.workflow.tag}
      </motion.span>

      <motion.h1 className="main-title" variants={itemVariants}>
        {t.workflow.title1} <span className="title-gradient">{t.workflow.title2}</span>
      </motion.h1>

      <motion.h3 className="workflow-model-title" variants={itemVariants}>
        {selectedModel.title}
      </motion.h3>

      <motion.p className="description" variants={itemVariants}>
        {t.workflow.desc}
      </motion.p>

      {/* مخطط مسار العمل */}
      <motion.div className="workflow-diagram" variants={itemVariants}>
        <img 
          src="../src/img/n8n-fedback.png" 
          alt="n8n Workflow Diagram" 
          style={{ 
            width: '100%', 
            maxWidth: '800px',
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            display: 'block',
            margin: '0 auto'
          }} 
        />
      </motion.div>

      {/* أزرار التحكم */}
      <motion.div 
        variants={itemVariants} 
        style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          alignItems: 'center',
          flexWrap: 'wrap',
          marginTop: '2.5rem' 
        }}
      >
        <button
          className="learn-more"
          onClick={() => {
            setShowContactCard(!showContactCard);
            if(status === 'success') resetForm();
          }}
          style={{ padding: '0.8rem 2rem', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}
        >
          <span>{lang === 'en' ? 'Request This Service' : 'طلب هذه الخدمة'}</span>
        </button>

        <button className="back-btn" onClick={() => setCurrentPage('solution')} style={{ marginTop: 0 }}>
          {lang === 'en' ? <ArrowLeft size={14} aria-hidden="true" /> : <ArrowRight size={14} aria-hidden="true" />}
          <span>{lang === 'en' ? 'Back to Solutions' : 'العودة للحلول'}</span>
        </button>
      </motion.div>

      {/* الكرت الذكي التفاعلي المتكامل مع نظام الإرسال */}
      <AnimatePresence>
        {showContactCard && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="service-card"
            style={{ maxWidth: '550px', margin: '2rem auto 0 auto', padding: '2.5rem', position: 'relative' }}
          >
            <div className="card-glow" aria-hidden="true"></div>
            <div className="card-content">
              
              {status === 'success' ? (
                /* واجهة النجاح */
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{ color: 'var(--color-primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                    <CheckCircle2 size={48} />
                  </div>
                  <h4 className="card-title" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                    {lang === 'en' ? 'Order Sent Successfully!' : 'تم إرسال طلبك بنجاح!'}
                  </h4>
                  <p style={{ opacity: 0.8, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                    {lang === 'en' 
                      ? 'Thank you! We will get back to you shortly.' 
                      : 'شكراً لك! تواصلنا معك سيكون قريباً جداً عبر البريد الإلكتروني.'}
                  </p>
                  <button className="back-btn" onClick={resetForm} style={{ margin: '0 auto' }}>
                    {lang === 'en' ? 'Send Another Request' : 'إرسال طلب آخر'}
                  </button>
                </div>
              ) : (
                /* واجهة الفورم وقنوات الاتصال البديلة */
                <>
                  <h4 className="card-title" style={{ marginBottom: '0.5rem', fontSize: '1.3rem', textAlign: 'center' }}>
                    {lang === 'en' ? 'Instant Service Request' : 'طلب فوري للخدمة'}
                  </h4>
                  <p style={{ opacity: 0.6, fontSize: '0.85rem', textAlign: 'center', marginBottom: '1.5rem' }}>
                    {lang === 'en' ? 'Model: ' : 'النموذج: '} <strong style={{ color: 'var(--color-primary)' }}>{selectedModel.title}</strong>
                  </p>

                  <form onSubmit={handleServiceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: lang === 'ar' ? 'right' : 'left' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', opacity: 0.8 }}>{lang === 'en' ? 'Your Name' : 'الاسم الكريم'}</label>
                      <input
                        type="text"
                        className="cyber-input"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={lang === 'en' ? 'John Doe' : 'أدخل اسمك هنا'}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', opacity: 0.8 }}>{lang === 'en' ? 'Email Address' : 'البريد الإلكتروني'}</label>
                      <input
                        type="email"
                        className="cyber-input"
                        required
                        dir="ltr"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="name@example.com"
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', opacity: 0.8 }}>{lang === 'en' ? 'Project Requirements' : 'تفاصيل أو متطلبات إضافية'}</label>
                      <textarea
                        className="cyber-textarea"
                        required
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={lang === 'en' ? 'Briefly describe your use case...' : 'اكتب موجزاً عن آلية الربط أو التخصيص التي تحتاجها...'}
                      />
                    </div>

                    {status === 'error' && (
                      <div style={{ color: '#ff4d6a', fontSize: '0.85rem', textAlign: 'center' }}>
                        {lang === 'en' ? 'Failed to send. Please try again.' : 'فشل الإرسال. يرجى المحاولة مرة أخرى.'}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="cta-button primary submit-btn"
                      disabled={status === 'loading'}
                      style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}
                    >
                      {status === 'loading' ? (
                        <div className="spin-loader" aria-hidden="true"></div>
                      ) : (
                        <>
                          <span>{lang === 'en' ? 'Confirm and Send' : 'تأكيد وإرسال الطلب'}</span>
                          <Send size={16} style={{ marginRight: lang === 'en' ? '0' : '0.5rem', marginLeft: lang === 'en' ? '0.5rem' : '0' }} />
                        </>
                      )}
                    </button>
                  </form>

                  <div style={{ margin: '1.5rem 0', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
                  
                  {/* قنوات التواصل المباشرة والبديلة أسفل الفورم */}
                  <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', opacity: 0.7 }}>
                    <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Mail size={14} /> <span>{CONTACT_EMAIL}</span>
                    </a>
                    <a href="https://wa.me/963991187039" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Send size={14} style={{ color: '#25D366' }} /> <span dir="ltr">WhatsApp Connect</span>
                    </a>
                  </div>

                  <div style={{ margin: '1.2rem 0 0 0', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />

                  {/* رسالة الالتزام بالوقت */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: 0.9, marginTop: '1rem' }}>
                    <Clock size={15} style={{ color: '#f59e0b' }} />
                    <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '500', textAlign: 'center' }}>
                      {lang === 'en' 
                        ? 'Guaranteed expert response within 12 hours.' 
                        : 'سيقوم فريقنا بمراجعة طلبك والرد عليك خلال 12 ساعة كحد أقصى.'}
                    </p>
                  </div>
                </>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Workflow;