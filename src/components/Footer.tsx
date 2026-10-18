import React from 'react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-slate-800 bg-[#040814] text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Verified Brand & Service Category */}
          <div className="space-y-3">
            <span className="text-xl font-bold tracking-tight text-white block">
              Fine Computer
            </span>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Computer repair and technical support service operating in C Block, Burewala. Providing hardware diagnosis, fault assessment, and software troubleshooting.
            </p>
            <div className="text-xs text-slate-400 space-y-1 pt-1 font-mono">
              <div>Category: Computer repair &amp; technical support</div>
              <div>Diagnosis required prior to repair quotation</div>
            </div>
          </div>

          {/* Col 2: Navigation Mirror */}
          <div className="space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-200 block font-mono">
              Site Navigation
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-teal-400 transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-teal-400 transition-colors cursor-pointer text-left"
                >
                  Repair Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('process')}
                  className="hover:text-teal-400 transition-colors cursor-pointer text-left"
                >
                  Repair Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-teal-400 transition-colors cursor-pointer text-left"
                >
                  About Fine Computer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-teal-400 transition-colors cursor-pointer text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-teal-400 transition-colors cursor-pointer text-left"
                >
                  Contact &amp; Enquiry
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Verified Contact & Location */}
          <div className="space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-200 block font-mono">
              Verified Contact &amp; Location
            </span>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-xs text-slate-400 block font-mono">Telephone:</span>
                <a
                  href="tel:+923027644344"
                  className="text-white hover:text-teal-400 font-mono transition-colors inline-block"
                >
                  +92 302 7644344
                </a>
              </div>
              <div className="pt-2">
                <span className="text-xs text-slate-400 block font-mono">Location:</span>
                <p className="text-slate-300">
                  C Block, Burewala, District Vehari, Punjab, Pakistan.
                </p>
              </div>
              <p className="text-xs text-slate-400 pt-2 leading-relaxed">
                Customers are advised to call in advance to confirm physical assessment availability before bringing equipment.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom row: Quiet copyright and privacy statement */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Fine Computer. All rights reserved.
          </div>
          <div className="text-slate-400 font-mono">
            C Block, Burewala, Punjab, Pakistan
          </div>
        </div>
      </div>
    </footer>
  );
};
