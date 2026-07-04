import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function Solutions() {
  const { t, lang, setCurrentPage, setSelectedModel } = useApp();

  // الإبقاء فقط على بيانات الـ Smart Feedback (الموديل الأول سابقاً)
  const smartFeedbackModel = {
    id: 1,
    title: t.solutions.model1Title,
    sub: t.solutions.model1Sub,
    description: t.solutions.model1Desc,
    hasPreview: true,
  };

  const handleLaunch = () => {
    const fullModel = {
      ...smartFeedbackModel,
      steps: t.workflow.steps[smartFeedbackModel.id],
    };
    setSelectedModel(fullModel);
    setCurrentPage('workflow');
  };

  return (
    <motion.div
      className="page-solutions"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
    >
      <motion.div className="section-header" variants={itemVariants}>
        <span className="section-tag">{t.solutions.tag}</span>
        <h1 className="main-title">
          {t.solutions.title1} <span className="title-gradient">{t.solutions.title2}</span>
        </h1>
      </motion.div>

      {/* عرض بطاقة الـ Smart Feedback فقط بدون عمل map */}
      <motion.div className="services-grid" variants={itemVariants}>
        <motion.article
          className="service-card"
          variants={itemVariants}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25 }}
        >
          <div className="card-glow" aria-hidden="true"></div>
          <div className="card-content">
            <span className="card-sub">{smartFeedbackModel.sub}</span>
            <h3 className="card-title">{smartFeedbackModel.title}</h3>
            <p className="card-description">{smartFeedbackModel.description}</p>

            <div className="card-actions">
              <button
                className="learn-more"
                onClick={handleLaunch}
                aria-label={`${t.solutions.btnLaunch}: ${smartFeedbackModel.title}`}
              >
                {t.solutions.btnLaunch}
                <ArrowUpRight size={14} className="arrow" aria-hidden="true" />
              </button>

              <button
                className="learn-more preview-btn"
                onClick={() => setCurrentPage('feedback')}
                aria-label={`${t.solutions.btnPreview}: ${smartFeedbackModel.title}`}
              >
                {t.solutions.btnPreview}
                <ExternalLink size={14} className="arrow" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.article>
      </motion.div>

      <motion.button
        className="back-btn"
        onClick={() => setCurrentPage('home')}
        variants={itemVariants}
      >
        <ArrowLeft size={14} aria-hidden="true" style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
        <span>{lang === 'en' ? 'Back to HQ' : 'العودة للصفحة الرئيسية'}</span>
      </motion.button>
    </motion.div>
  );
}

export default Solutions;