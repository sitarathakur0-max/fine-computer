import React, { useState } from 'react';
import { PageId, FaqItem } from '../types';

interface FaqPageProps {
  onNavigate: (page: PageId) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs: FaqItem[] = [
    {
      category: 'Repair Preparation',
      question: 'What information should I provide when requesting a repair?',
      answer: 'When reaching out or filling out our repair enquiry, please provide: (1) whether the machine is a desktop PC or portable laptop; (2) the brand and model if marked on the case; (3) what happens when you press the power button (e.g., lights turn on, fans spin, screen stays black); and (4) any visible error messages or unusual sounds. Please do not provide passwords or sensitive private credentials.'
    },
    {
      category: 'Diagnostic Guidance',
      question: 'How should I describe a computer problem accurately?',
      answer: 'Describe the visible and audible symptoms rather than attempting to diagnose the internal cause. For example, explain: "The computer powers on, the internal fan spins loudly, but the display stays black with two short beeps," or "Windows freezes completely whenever multiple browser tabs or video applications are opened." Noting when the problem began or if it followed a power surge or update is also helpful.'
    },
    {
      category: 'Visiting & Contact',
      question: 'Should customers call before visiting the shop in C Block, Burewala?',
      answer: 'Yes, calling ahead at +92 302 7644344 is strongly recommended. Calling in advance allows us to confirm that a technician is on hand to receive the equipment, discuss the preliminary symptoms, and advise you on what accessories (like specific laptop power adapters) you should bring along.'
    },
    {
      category: 'Quotations & Pricing',
      question: 'How do I ask for a repair quotation?',
      answer: 'You can request a repair quotation by submitting an online repair enquiry or calling +92 302 7644344. A technician will arrange an initial diagnostic assessment at our C Block, Burewala shop. Once the physical device is inspected and the specific faulty component or software issue is isolated, we will provide a clear quotation before any repair work commences.'
    },
    {
      category: 'Diagnostic Rationale',
      question: 'Why is hands-on diagnosis necessary before estimating repair costs?',
      answer: 'In computer hardware, vastly different component failures produce identical outward symptoms. For instance, a desktop computer that fails to turn on might be caused by an inexpensive blown fuse in a power cable, a dead power supply unit (PSU), a shorted motherboard capacitor, oxidized RAM contacts, or a damaged front-panel power switch. Without hands-on electrical and bench testing, any estimated price would be pure guesswork.'
    },
    {
      category: 'Privacy & Credentials',
      question: 'Can I submit my computer login password through the repair form?',
      answer: 'No. We strictly advise customers never to submit operating system passwords, recovery keys, email logins, or personal documents through web forms. If a technician requires system access to verify software behavior during hands-on testing, that arrangement is handled in person at the shop under your supervision or with a temporary guest user account.'
    },
    {
      category: 'Enquiry Tracking',
      question: 'How do I check the status of my repair enquiry?',
      answer: 'When you submit a repair enquiry on our website, you receive a unique technical reference number (formatted like FC-YYYYMMDD-XXXX). You can use our "Track Existing Enquiry" tool on the Contact page, or call +92 302 7644344 and cite your reference number to check on your assessment.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="border border-slate-800 bg-[#070e22] p-8 sm:p-12 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-teal-400">
          <span>Knowledge &amp; Support</span>
          <span aria-hidden="true">&middot;</span>
          <span>Fine Computer &middot; Burewala</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
          Clear answers to common questions regarding diagnostic procedures, symptom reporting, and requesting repair estimates in C Block, Burewala.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-slate-800 bg-[#091126] transition-colors hover:border-slate-700"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 block">
                    {faq.category}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-white block">
                    {faq.question}
                  </span>
                </div>

                {/* Pure CSS expand/collapse indicator - ZERO SVG */}
                <div
                  className={`w-7 h-7 shrink-0 flex items-center justify-center border font-mono font-bold text-sm transition-colors ${
                    isOpen
                      ? 'border-teal-400 bg-teal-400 text-slate-950'
                      : 'border-slate-700 text-slate-300'
                  }`}
                  aria-hidden="true"
                >
                  {isOpen ? '−' : '+'}
                </div>
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-5 sm:px-6 pb-6 pt-2 text-sm text-slate-300 border-t border-slate-800/80 leading-relaxed font-sans"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="border border-slate-800 bg-[#070e22] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h3 className="text-lg font-bold text-white">
            Have a question not addressed here?
          </h3>
          <p className="text-xs text-slate-300">
            Call Fine Computer directly at <strong className="text-white font-mono">+92 302 7644344</strong> or submit an enquiry describing your equipment.
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 text-xs font-bold tracking-wider uppercase text-slate-950 bg-teal-400 hover:bg-teal-300 whitespace-nowrap cursor-pointer"
        >
          Submit an Enquiry &rarr;
        </button>
      </div>

    </div>
  );
};
