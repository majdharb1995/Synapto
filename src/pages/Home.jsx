import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

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

function Home() {
  const { t, setCurrentPage } = useApp();

  return (
    <motion.div
      className="page-home"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
    >
      <motion.div className="status-badge" variants={itemVariants}>
        <span className="status-dot" aria-hidden="true"></span>
        {t.home.systemOnline}
      </motion.div>

      <motion.h1 className="main-title" variants={itemVariants}>
        {t.home.title1}
        <br />
        <span className="title-gradient">{t.home.title2}</span>
      </motion.h1>

      <motion.p className="description" variants={itemVariants}>
        {t.home.desc}
      </motion.p>

      <motion.div className="trust-bar" variants={itemVariants}>
        <div className="trust-item">
          <span className="dot live" aria-hidden="true"></span>
          {t.home.trust1}
        </div>
        <div className="trust-item">
          <span className="dot" aria-hidden="true"></span>
          {t.home.trust2}
        </div>
        <div className="trust-item">
          <span className="dot" aria-hidden="true"></span>
          {t.home.trust3}
        </div>
      </motion.div>

      <motion.div className="btn-group" variants={itemVariants}>
        <button
          className="cta-button primary"
          onClick={() => setCurrentPage('solution')}
        >
          {t.home.btnPrimary}
          <ArrowRight size={16} className="arrow" aria-hidden="true" />
        </button>
        <button
          className="cta-button ghost"
          onClick={() => setCurrentPage('ailab')}
        >
          {t.home.btnGhost}
          <ArrowUpRight size={16} className="arrow" aria-hidden="true" />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default Home;
