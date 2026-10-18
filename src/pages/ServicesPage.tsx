import React from 'react';
import { PageId, ServiceItem } from '../types';

interface ServicesPageProps {
  onNavigate: (page: PageId, problemCategory?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const verifiedServices: ServiceItem[] = [
    {
      id: 'computer-diagnostics',
      code: 'SRV-01',
      title: 'Computer Diagnostics & Fault Isolation',
      problemCategoryValue: 'Computer Diagnostics',
      summary: 'Systematic hardware and software testing to identify why a desktop or laptop is failing to start, restarting unpredictably, or behaving abnormally.',
      scope: [
        'Power Supply Unit (PSU) voltage and rail output verification',
        'RAM module memory integrity and parity testing',
        'Storage drive health checks (SMART evaluation and bad sector detection)',
        'Motherboard power plane inspection for short circuits or degraded capacitors',
        'POST (Power-On Self-Test) error code diagnostic analysis'
      ],
      assessmentNote: 'Physical inspection at C Block, Burewala is necessary to isolate electrical or circuit issues before any component replacement quotation can be prepared.'
    },
    {
      id: 'software-troubleshooting',
      code: 'SRV-02',
      title: 'Operating System & Software Troubleshooting',
      problemCategoryValue: 'Software Troubleshooting',
      summary: 'Resolving operating system boot crashes, persistent driver conflicts, software corruption, and system performance hindrances.',
      scope: [
        'Operating system boot error diagnosis (BSOD / system crash loops)',
        'Corrupt system file repair and clean reinstallation assessment',
        'Hardware driver re-configuration and compatibility conflict resolution',
        'Resolution of startup freezes and persistent background process locks',
        'Basic configuration assistance for essential workstation productivity tools'
      ],
      assessmentNote: 'Customers must maintain personal backups of irreplaceable data. Passwords or sensitive recovery credentials should never be sent via digital forms.'
    },
    {
      id: 'hardware-repair',
      code: 'SRV-03',
      title: 'Hardware Assessment & Component Repair',
      problemCategoryValue: 'Hardware Repair',
      summary: 'Hands-on examination of internal hardware components to establish whether repair, cleaning, contact refurbishment, or component substitution is viable.',
      scope: [
        'Cooling assembly cleaning and thermal interface material (paste) re-application',
        'Internal cable, ribbon, and connector seating inspection',
        'Graphics card, sound card, and PCIe expansion slot testing',
        'Desktop power switch, front I/O header, and chassis wire verification',
        'Feasibility evaluation for hardware replacement components'
      ],
      assessmentNote: 'Component replacement depends strictly on parts availability and physical compatibility. Quotations are provided following direct inspection.'
    },
    {
      id: 'laptop-support',
      code: 'SRV-04',
      title: 'Laptop Support & Portable Systems',
      problemCategoryValue: 'Laptop Support',
      summary: 'Technical inspection specifically geared towards the compact architecture and integrated components of portable notebook computers.',
      scope: [
        'DC power input jack looseness and power delivery assessment',
        'Thermal dissipation inspection, blower fan cleaning, and vent de-clogging',
        'Display panel cable wear and backlight/inverter diagnosis',
        'Internal battery charging circuit and power adapter testing',
        'Integrated keyboard and touchpad communication diagnostic'
      ],
      assessmentNote: 'Laptops require careful disassembly for internal inspection. Bring the original power adapter to facilitate diagnostic testing.'
    },
    {
      id: 'performance-troubleshooting',
      code: 'SRV-05',
      title: 'Performance Troubleshooting & System Tuning',
      problemCategoryValue: 'Performance Troubleshooting',
      summary: 'Investigating chronic slowdowns, unresponsiveness under load, thermal throttling, and excessive disk write bottlenecks.',
      scope: [
        'Disk bottleneck analysis (100% active time diagnosis and throughput checks)',
        'Thermal profile monitoring during processor and graphics workloads',
        'Memory bandwidth and background process resource consumption audits',
        'Thermal paste dry-out evaluation on older systems',
        'System startup application pruning recommendations'
      ],
      assessmentNote: 'We assess the underlying bottleneck before proposing any hardware modifications or software alterations.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="border border-slate-800 bg-[#070e22] p-8 sm:p-12 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-teal-400">
          <span>Service Directory</span>
          <span aria-hidden="true">&middot;</span>
          <span>Fine Computer &middot; C Block, Burewala</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Technical Repair &amp; Diagnostic Services
        </h1>
        <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
          Fine Computer provides focused technical assistance for computer hardware and operating system issues in C Block, Burewala. Review our core service categories below to understand what our diagnostic evaluations cover.
        </p>
        <div className="pt-2 text-xs text-slate-400 font-mono">
          Note: We do not publish speculative repair prices, turnaround guarantees, or parts promises online. Accurate quotations are provided solely after hands-on equipment diagnosis.
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-8">
        {verifiedServices.map((service) => (
          <article
            key={service.id}
            className="border border-slate-800 bg-[#091126] p-6 sm:p-8 hover:border-slate-700 transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Code, Title, Summary */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-teal-400">
                    {service.code}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Physical Assessment Required
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {service.title}
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {service.summary}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono font-bold uppercase text-slate-400 block">
                    Diagnostic Scope &amp; Evaluation Areas:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                    {service.scope.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-teal-400">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: In-Person Note & Action Link */}
              <div className="lg:col-span-5 border border-slate-800 bg-[#060b18] p-5 space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Assessment Protocol:
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {service.assessmentNote}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <button
                    onClick={() => onNavigate('contact', service.problemCategoryValue)}
                    className="w-full py-3 text-xs font-bold tracking-wider uppercase text-slate-950 bg-teal-400 hover:bg-teal-300 active:scale-[0.98] transition-all cursor-pointer text-center"
                  >
                    Enquire About This Service &rarr;
                  </button>
                  <div className="text-[11px] text-center text-slate-400 font-mono">
                    Direct shop phone: +92 302 7644344
                  </div>
                </div>
              </div>

            </div>
          </article>
        ))}
      </div>

      {/* Responsible Policy Notice */}
      <div className="border border-slate-800 bg-[#070e22] p-8 space-y-4 text-xs text-slate-400 font-mono">
        <div className="text-white font-bold text-sm">
          Service Transparency Statement
        </div>
        <p className="leading-relaxed">
          Fine Computer strictly avoids unsupported claims or blanket guarantees. Turnaround times, parts availability, and total costs depend entirely on the specific make, model, age, and extent of component degradation. If a machine cannot be reliably repaired or if replacement components exceed the practical value of the hardware, our technician will provide an honest recommendation so you can make an informed choice.
        </p>
      </div>

    </div>
  );
};
