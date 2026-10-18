import React from 'react';
import { PageId } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="border border-slate-800 bg-[#070e22] p-8 sm:p-12 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-teal-400">
          <span>About Fine Computer</span>
          <span aria-hidden="true">&middot;</span>
          <span>Verified Business Profile</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Local Computer Repair &amp; Technical Support
        </h1>
        <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
          Fine Computer is a dedicated computer repair and technical support business situated in C Block, Burewala, District Vehari, Punjab, Pakistan.
        </p>
      </div>

      {/* Verified Business Information Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="border border-slate-800 bg-[#091126] p-8 space-y-6">
          <span className="text-xs font-mono font-bold uppercase text-teal-400 block">
            Public Registry Information
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Business Profile &amp; Location
          </h2>
          
          <div className="space-y-4 text-sm">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-slate-400 block">Trading Name</span>
              <span className="text-white font-semibold">Fine Computer</span>
            </div>

            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-slate-400 block">Service Classification</span>
              <span className="text-white font-semibold">Computer repair and technical support</span>
            </div>

            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-slate-400 block">Verified Telephone</span>
              <a href="tel:+923027644344" className="text-teal-400 font-mono font-semibold hover:underline">
                +92 302 7644344
              </a>
            </div>

            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-slate-400 block">Physical Location</span>
              <span className="text-white font-semibold">
                C Block, Burewala, District Vehari, Punjab, Pakistan
              </span>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-400 font-mono leading-relaxed">
            Note: All business records and customer communications should reference the verified telephone number +92 302 7644344.
          </div>
        </div>

        {/* Operating Philosophy & Ethical Principles */}
        <div className="border border-slate-800 bg-[#091126] p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase text-teal-400 block">
              Core Principles
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The Purpose of Local Technical Support
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Modern personal computing systems and workplace desktops are essential for communication, education, and daily business. When a computer fails—whether due to thermal exhaustion, power surge damage, corrupt operating system files, or physical wear—having an honest local technician who can inspect the hardware directly is invaluable.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Our focus is straightforward: diagnose the fault systematically, provide a realistic assessment of repair viability, and ensure customers are never subjected to hidden costs or unauthorized component swaps.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full py-3 text-xs font-bold tracking-wider uppercase text-slate-950 bg-teal-400 hover:bg-teal-300 cursor-pointer text-center"
            >
              Contact Fine Computer &rarr;
            </button>
          </div>
        </div>

      </div>

      {/* Our Operating Standards */}
      <div className="border border-slate-800 bg-[#070e22] p-8 sm:p-12 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-teal-400 block">
            Operating Standards
          </span>
          <h3 className="text-2xl font-bold text-white">
            What Customers Can Expect
          </h3>
          <p className="text-sm text-slate-300 max-w-2xl">
            We adhere to straightforward, transparent technical repair ethics:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-slate-800 bg-[#060b18] p-6 space-y-3">
            <div className="text-teal-400 font-mono text-xs font-bold uppercase">
              01. In-Person Diagnosis
            </div>
            <div className="text-white font-semibold text-sm">
              Hands-On Inspection First
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We do not give speculative repair prices over the phone without examining the hardware, because physical testing is the only reliable way to pinpoint failing circuitry.
            </p>
          </div>

          <div className="border border-slate-800 bg-[#060b18] p-6 space-y-3">
            <div className="text-teal-400 font-mono text-xs font-bold uppercase">
              02. Explicit Approval
            </div>
            <div className="text-white font-semibold text-sm">
              No Work Without Consent
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We explain the findings and quotation clearly. Work only commences once you have given explicit consent to proceed with the proposed plan.
            </p>
          </div>

          <div className="border border-slate-800 bg-[#060b18] p-6 space-y-3">
            <div className="text-teal-400 font-mono text-xs font-bold uppercase">
              03. Privacy &amp; Integrity
            </div>
            <div className="text-white font-semibold text-sm">
              Confidentiality Respected
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We advise customers to keep passwords and personal credentials private. Digital forms never collect or store confidential passwords or login keys.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
