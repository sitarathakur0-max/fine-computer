import React from 'react';
import { PageId } from '../types';

interface ProcessPageProps {
  onNavigate: (page: PageId) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate }) => {
  const steps = [
    {
      number: '01',
      title: 'Submit a Repair Enquiry',
      subheading: 'Initial contact via online form or telephone',
      description: 'Begin by submitting our repair enquiry form or calling +92 302 7644344. Provide your basic contact information and identify the type of machine requiring assistance (desktop PC, laptop, or workstation).',
      checklist: [
        'Provide your reachable phone number',
        'State whether the machine is portable (laptop) or desktop',
        'Specify any brand or model markings if known'
      ]
    },
    {
      number: '02',
      title: 'Describe the Device and Problem',
      subheading: 'Detailing symptoms, errors, and timeline',
      description: 'Explain the visible or audible symptoms you are observing. Focus on observable facts—such as whether the unit turns on, if any fans spin, whether an error screen appears, or if sudden shut-downs occur under load.',
      checklist: [
        'Mention recent updates or hardware changes',
        'Note whether the issue happens immediately or after time',
        'Do not share passwords or security keys in the form'
      ]
    },
    {
      number: '03',
      title: 'Confirm Assessment Arrangements',
      subheading: 'Coordinating device drop-off or physical handover',
      description: 'Coordinate with the shop to confirm when you can bring the system to our premises at C Block, Burewala, Punjab. Calling ahead confirms the technician is available to receive the hardware and perform initial intake.',
      checklist: [
        'Bring the AC power adapter for laptops',
        'Ensure power cables and peripherals remain at home unless requested',
        'Confirm intake location at C Block, Burewala'
      ]
    },
    {
      number: '04',
      title: 'Obtain Diagnosis & Quotation Before Work',
      subheading: 'Physical fault isolation and transparent estimation',
      description: 'The technician tests the system hardware and software components to determine the exact fault. Once the diagnosis is determined, a clear quotation detailing proposed work or component requirements is provided to you.',
      checklist: [
        'Review the technician’s diagnostic explanation',
        'Evaluate the quotation against your device requirements',
        'Ask any clarifying questions about the required work'
      ]
    },
    {
      number: '05',
      title: 'Proceed Only After Customer Approval',
      subheading: 'Work commences strictly upon explicit agreement',
      description: 'Repair work commences only after you have reviewed and expressly agreed to the proposed diagnosis and quote. If you choose not to proceed with the repair work, your equipment is returned as assessed without unauthorized alterations.',
      checklist: [
        'Explicit customer approval is required',
        'No surprise fees or unauthorized part substitutions',
        'Arrangements made for equipment pickup once completed'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="border border-slate-800 bg-[#070e22] p-8 sm:p-12 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-teal-400">
          <span>Customer Workflow</span>
          <span aria-hidden="true">&middot;</span>
          <span>Fine Computer &middot; C Block, Burewala</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Suggested Repair Workflow
        </h1>
        <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
          To ensure clarity, transparency, and customer consent, we recommend following this five-step workflow when requesting computer repair services in C Block, Burewala.
        </p>

        {/* Advisory Identification Box */}
        <div className="border border-teal-500/40 bg-[#08152c] p-4 text-xs font-mono text-teal-300">
          <strong className="text-white block mb-1">Customer Advisory Notice:</strong>
          This represents a suggested customer workflow for transparent repair transactions and mutual understanding, not an automated or rigid company-specific policy. Specific scheduling, parts lead times, and diagnostic procedures are confirmed directly with the shop.
        </div>
      </div>

      {/* 5-Step Detailed Visual Timeline */}
      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="border border-slate-800 bg-[#091126] p-6 sm:p-8 relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Step indicator & title */}
              <div className="lg:col-span-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-teal-400">
                    STEP {step.number}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Workflow Stage
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white">
                  {step.title}
                </h2>
                <div className="text-xs font-mono text-slate-400">
                  {step.subheading}
                </div>
              </div>

              {/* Step explanation */}
              <div className="lg:col-span-5 space-y-3">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Checklist / Action items */}
              <div className="lg:col-span-3 border border-slate-800 bg-[#060b18] p-4 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 block font-bold">
                  Stage Checkpoints:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                  {step.checklist.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-teal-400">&bull;</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Preparation Advice */}
      <div className="border border-slate-800 bg-[#070e22] p-8 space-y-6">
        <h3 className="text-xl font-bold text-white">
          What to Prepare Before Bringing Equipment
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
          <div className="border border-slate-800 bg-[#060b18] p-5 space-y-2">
            <div className="text-teal-400 font-bold font-mono uppercase">01. For Laptop Computers</div>
            <p className="text-slate-300">
              Please bring the original AC power adapter and charger cable. Proprietary laptop charging voltages are required to conduct proper battery and power board diagnostics.
            </p>
          </div>

          <div className="border border-slate-800 bg-[#060b18] p-5 space-y-2">
            <div className="text-teal-400 font-bold font-mono uppercase">02. For Desktop PCs</div>
            <p className="text-slate-300">
              Only bring the CPU / desktop tower unit unless a specific monitor or peripheral is experiencing the fault. We provide test displays, keyboards, and power cables in the shop.
            </p>
          </div>

          <div className="border border-slate-800 bg-[#060b18] p-5 space-y-2">
            <div className="text-teal-400 font-bold font-mono uppercase">03. Important Privacy Rule</div>
            <p className="text-slate-300">
              Do not provide sensitive passwords, banking credentials, or personal files online. Any diagnostic system logon requirements should be discussed in person during equipment intake.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-slate-800">
          <div className="text-xs text-slate-400 font-mono">
            Have questions about this process? Call direct: <strong className="text-white">+92 302 7644344</strong>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 text-xs font-bold tracking-wider uppercase text-slate-950 bg-teal-400 hover:bg-teal-300 cursor-pointer text-center"
          >
            Start By Submitting an Enquiry &rarr;
          </button>
        </div>
      </div>

    </div>
  );
};
