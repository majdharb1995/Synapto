import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import VisualCore from './components/VisualCore.jsx';
import Home from './pages/Home.jsx';
import Solutions from './pages/Solutions.jsx';
import Workflow from './pages/Workflow.jsx';
import AILab from './pages/AILab.jsx';
import Contact from './pages/Contact.jsx';
import FeedbackForm from './pages/FeedbackForm.jsx';
import './styles/theme.css';
import './styles/App.css';
import './styles/feedback.css';

function AppContent() {
  const { currentPage } = useApp();

  // Pages that should render with a side visual core (right column on desktop)
  const pagesWithCore = ['home', 'solution', 'workflow', 'ailab', 'contact'];
  const showCore = pagesWithCore.includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'solution':
        return <Solutions />;
      case 'workflow':
        return <Workflow />;
      case 'ailab':
        return <AILab />;
      case 'contact':
        return <Contact />;
      case 'feedback':
        return <FeedbackForm />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="main-wrapper">
      <div className="cyber-grid" aria-hidden="true"></div>

      <Navbar />

      <main className="main-content" id="main-content">
        <div className={`content-grid ${!showCore ? 'single-column' : ''}`}>
          <div className="text-content">
            <AnimatePresence mode="wait">
              {renderPage()}
            </AnimatePresence>
          </div>

          {showCore && (
            <div className="image-content">
              <VisualCore size="lg" />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
