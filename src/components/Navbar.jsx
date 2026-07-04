import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

/**
 * Navbar — Floating pill-style navigation bar.
 * Centered horizontally on the page, with rounded corners,
 * backdrop blur, and full mobile support via hamburger menu.
 *
 * Accessibility:
 *  - aria-label on nav, hamburger toggle, lang/theme toggles
 *  - keyboard operable (Enter/Space handled natively by <button>)
 *  - focus-visible rings via CSS
 *  - menu closes on Escape and on route change
 */
function Navbar() {
  const { t, lang, toggleLang, theme, toggleTheme, currentPage, setCurrentPage } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: t.nav.home },
    { key: 'solution', label: t.nav.solutions, match: ['solution', 'workflow'] },
    { key: 'ailab', label: t.nav.aiLab },
    { key: 'contact', label: t.nav.contact },
  ];

  const handleNavigate = (key) => {
    setCurrentPage(key);
    setIsMenuOpen(false);
  };

  // Close mobile menu on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActive = (item) => {
    if (item.match) return item.match.includes(currentPage);
    return currentPage === item.key;
  };

  return (
    <>
      <header className="navbar-header" role="banner">
        <nav className="floating-navbar" aria-label="Primary navigation">
          {/* Logo */}
          <button
            className="nav-logo"
            onClick={() => handleNavigate('home')}
            aria-label="SYNAPTO — back to home"
          >
            <span className="logo-icon" aria-hidden="true">⬡</span>
            <span className="logo-text">SYNAPTO</span>
            <span className="logo-tag">{t.brandTag}</span>
          </button>

          {/* Desktop nav links */}
          <ul className="nav-links-desktop" role="menubar">
            {navItems.map((item) => (
              <li key={item.key} role="none">
                <button
                  role="menuitem"
                  className={`nav-link ${isActive(item) ? 'active' : ''}`}
                  onClick={() => handleNavigate(item.key)}
                  aria-current={isActive(item) ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="nav-controls">
            <button
              className="icon-btn"
              onClick={toggleLang}
              aria-label={`Switch language. Current: ${lang === 'en' ? 'English' : 'Arabic'}`}
              title="Toggle language"
            >
              <Globe size={16} aria-hidden="true" />
              <span className="control-text">{lang === 'en' ? 'AR' : 'EN'}</span>
            </button>

            <button
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={`Switch theme. Current: ${theme}`}
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
              <span className="control-text">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>

            <button
              className="hamburger"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsMenuOpen(false);
        }}
      >
        <div className="mobile-menu-panel">
          <ul className="mobile-nav-links" role="menu">
            {navItems.map((item, idx) => (
              <li key={item.key}>
                <button
                  className={`mobile-nav-link ${isActive(item) ? 'active' : ''}`}
                  onClick={() => handleNavigate(item.key)}
                  style={{ animationDelay: `${idx * 60}ms` }}
                  role="menuitem"
                >
                  <span className="mobile-link-index">0{idx + 1}</span>
                  <span className="mobile-link-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mobile-controls">
            <button className="mobile-control-btn" onClick={toggleLang}>
              <Globe size={16} aria-hidden="true" />
              <span>{lang === 'en' ? 'العربية' : 'English'}</span>
            </button>
            <button className="mobile-control-btn" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
