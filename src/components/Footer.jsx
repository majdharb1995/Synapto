import React from 'react';
import { useApp } from '../context/AppContext.jsx';

function Footer() {
  const { t } = useApp();
  return (
    <footer className="site-footer" role="contentinfo">
      <p>{t.footer}</p>
      <p className="footer-credits">{t.footerCredits}</p>
    </footer>
  );
}

export default Footer;
