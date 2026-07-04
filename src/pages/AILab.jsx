import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
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

function AILab() {
  const { lang, setCurrentPage } = useApp();

  return (
    <motion.div
      className="page-ailab"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '60vh', 
        textAlign: 'center' 
      }}
    >
      {/* قسم العنوان التجريبي */}
      <motion.div className="section-header" variants={itemVariants}>
        <span className="section-tag">
          {lang === 'en' ? 'Coming Soon' : 'قريباً'}
        </span>
        <h1 className="main-title" style={{ marginTop: '1rem' }}>
          {lang === 'en' ? 'AI Lab' : 'مختبر الذكاء الاصطناعي'}
        </h1>
        <p className="description" style={{ maxWidth: '500px', margin: '1rem auto' }}>
          {lang === 'en' 
            ? 'This section is currently under development. Stay tuned for exciting AI experiments!' 
            : 'هذا القسم قيد التطوير حالياً. انتظروا تجارب ومشاريع مميزة في الذكاء الاصطناعي قريباً!'}
        </p>
      </motion.div>

      {/* عنصر الديزاين الفارغ / المؤشر البصري */}
      <motion.div 
        variants={itemVariants} 
        className="experiment-card" 
        style={{ 
          padding: '3rem', 
          marginTop: '2rem', 
          marginBottom: '2rem',
          maxWidth: '400px',
          width: '100%',
          border: '2px dashed rgba(255,255,255,0.1)',
          background: 'transparent'
        }}
      >
        <div className="status-pulse" style={{ margin: '0 auto 1rem auto' }}></div>
        <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>
          {lang === 'en' ? 'Under Construction...' : 'قيد العمل...'}
        </span>
      </motion.div>

      {/* زر العودة للمقر الرئيسي */}
      <motion.button
        className="back-btn"
        onClick={() => setCurrentPage('home')}
        variants={itemVariants}
      >
        <ArrowLeft size={14} aria-hidden="true" style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
        <span>{lang === 'en' ? 'Back to HQ' : 'العودة للمقر'}</span>
      </motion.button>
    </motion.div>
  );
}

export default AILab;