import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProcessPage } from './pages/ProcessPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [initialProblemCategory, setInitialProblemCategory] = useState<string | undefined>();

  // Synchronize with URL hash for browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = ['home', 'services', 'process', 'about', 'faq', 'contact'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId, problemCategory?: string) => {
    if (problemCategory) {
      setInitialProblemCategory(problemCategory);
    }
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#060b18] text-slate-100 flex flex-col justify-between bg-tech-grid">
      
      {/* 3-Zone Top Bar Navigation */}
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage onNavigate={navigateTo} />
        )}
        {currentPage === 'services' && (
          <ServicesPage onNavigate={navigateTo} />
        )}
        {currentPage === 'process' && (
          <ProcessPage onNavigate={navigateTo} />
        )}
        {currentPage === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}
        {currentPage === 'faq' && (
          <FaqPage onNavigate={navigateTo} />
        )}
        {currentPage === 'contact' && (
          <ContactPage initialProblemCategory={initialProblemCategory} />
        )}
      </main>

      {/* Minimal Footer with Verified Facts Only */}
      <Footer onNavigate={navigateTo} />

      {/* Exactly ONE Floating WhatsApp Button - Fixed to Bottom-Left Corner */}
      <FloatingWhatsApp />

    </div>
  );
}
