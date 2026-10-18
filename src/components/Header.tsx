import React, { useState } from 'react';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'process', label: 'Process' },
    { id: 'about', label: 'About' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#070d1e]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Text-based wordmark reading "Fine Computer" */}
          <button
            onClick={() => handleNav('home')}
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-white hover:text-teal-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Fine Computer
          </button>

          {/* Zone 2: Nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
                  currentPage === link.id
                    ? 'text-teal-400 border-teal-400 font-semibold'
                    : 'border-transparent text-slate-300 hover:text-white hover:border-slate-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action button */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={() => handleNav('contact')}
              className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-slate-950 bg-teal-400 hover:bg-teal-300 active:scale-[0.98] rounded-none transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-sm shadow-teal-500/20"
            >
              Request a Repair
            </button>
          </div>

          {/* Mobile hamburger button - Pure CSS bars, ZERO SVG */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-200 transform ${
                    mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-200 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-200 transform ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#091126] px-4 pt-4 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors cursor-pointer border-l-2 ${
                currentPage === link.id
                  ? 'border-teal-400 text-teal-400 bg-slate-900/60 font-semibold'
                  : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-900/40'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3">
            <button
              onClick={() => handleNav('contact')}
              className="w-full py-3 text-center text-xs font-semibold tracking-wider uppercase text-slate-950 bg-teal-400 hover:bg-teal-300 cursor-pointer"
            >
              Request a Repair
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
