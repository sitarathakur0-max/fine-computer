import React, { useState } from 'react';
import { PageId } from '../types';

interface HomePageProps {
  onNavigate: (page: PageId, problemCategory?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [selectedSymptom, setSelectedSymptom] = useState<number>(0);

  const symptomGuides = [
    {
      title: 'Device does not power on or loses power suddenly',
      possibleCauses: 'Power supply unit fault, loose DC power jack, motherboard short, or faulty AC cable.',
      advice: 'Do not repeatedly force power switches. Note whether any internal fans spin or lights blink, then contact the shop.',
      category: 'Power & Boot Issues'
    },
    {
      title: 'Operating system crashes, boots to blue screen, or loops',
      possibleCauses: 'Corrupt system registry, failing storage sector, driver conflict, or recent interrupted update.',
      advice: 'Take note of exact error codes displayed on screen. Avoid running automated repair tools that might overwrite personal data.',
      category: 'Software & OS Errors'
    },
    {
      title: 'Screen remains dark or displays lines and distorted artifacts',
      possibleCauses: 'Display ribbon cable wear, faulty panel, graphics adapter failure, or RAM contact oxidation.',
      advice: 'If using a desktop, test external cable connection. For laptops, do not bend or flex the display casing.',
      category: 'Display & Screen Issues'
    },
    {
      title: 'Extreme sluggishness, freezing during tasks, or high fan noise',
      possibleCauses: 'Thermal paste degradation, dust blockage in heatsink, mechanical drive bottleneck, or background runaway process.',
      advice: 'Check if system feels unusually hot to the touch. Bring the machine in for thermal and drive diagnostic checks.',
      category: 'Performance & Freezing'
    }
  ];

  return (
    <div className="space-y-24 py-8">
      
      {/* HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed Metadata Header - ZERO PILLS */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-teal-400">
              <span>Technical Support &amp; Repair</span>
              <span aria-hidden="true">·</span>
              <span>C Block, Burewala, Punjab</span>
              <span aria-hidden="true">·</span>
              <span>Direct Phone: +92 302 7644344</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-[1.12]">
              Computer Problems? Let's Get You Back on Track.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Fine Computer delivers dependable computer repair and technical support for individuals and workstations in C Block, Burewala. From hardware fault isolation to operating system troubleshooting, we provide honest diagnostic assessments before recommending any repair.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 text-xs font-bold tracking-wider uppercase text-slate-950 bg-teal-400 hover:bg-teal-300 active:scale-[0.98] transition-all cursor-pointer text-center"
              >
                Request a Repair
              </button>
              
              <button
                onClick={() => onNavigate('services')}
                className="px-8 py-4 text-xs font-bold tracking-wider uppercase text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 active:scale-[0.98] transition-all cursor-pointer text-center"
              >
                Explore Our Services
              </button>
            </div>

            {/* Transparency Note */}
            <div className="pt-2 text-xs text-slate-400 font-mono">
              Notice: All estimates require physical device diagnosis at our C Block, Burewala shop. No unauthorized work.
            </div>
          </div>

          {/* Right Column: CSS-only Interactive Diagnostic Console (ZERO SVG / ZERO IMAGES) */}
          <div className="lg:col-span-5">
            <div className="border border-slate-700 bg-[#091126] p-6 tech-bracket-tl tech-bracket-br">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-teal-400">
                  Pre-Assessment Triage Guide
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Ref: FC-TRIAGE
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Select your device symptom to understand probable causes and what information to prepare for your repair enquiry:
              </p>

              {/* Symptom Selector Tabs */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {symptomGuides.map((guide, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSymptom(idx)}
                    className={`p-2.5 text-xs text-left font-mono transition-all cursor-pointer border ${
                      selectedSymptom === idx
                        ? 'border-teal-400 bg-teal-950/40 text-teal-300 font-bold'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[10px] text-slate-400">Symptom 0{idx + 1}</div>
                    <div className="truncate">{guide.category}</div>
                  </button>
                ))}
              </div>

              {/* Active Symptom Panel */}
              <div className="border border-slate-800 bg-[#060b18] p-4 space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 font-mono uppercase block text-[10px]">Identified Symptom:</span>
                  <div className="text-white font-medium mt-0.5">{symptomGuides[selectedSymptom].title}</div>
                </div>

                <div>
                  <span className="text-slate-400 font-mono uppercase block text-[10px]">Technical Factors:</span>
                  <div className="text-slate-300 mt-0.5 leading-relaxed">{symptomGuides[selectedSymptom].possibleCauses}</div>
                </div>

                <div className="pt-1 border-t border-slate-800/80">
                  <span className="text-teal-400 font-mono uppercase block text-[10px]">Recommended Action:</span>
                  <div className="text-slate-300 mt-0.5 leading-relaxed">{symptomGuides[selectedSymptom].advice}</div>
                </div>
              </div>

              <div className="mt-4 pt-3 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  Have this issue?
                </span>
                <button
                  onClick={() => onNavigate('contact', symptomGuides[selectedSymptom].category)}
                  className="text-xs font-mono font-semibold text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Enquire About This &rarr;
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: INTRODUCTION TO THE BUSINESS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="border border-slate-800 bg-[#070e22] p-8 sm:p-12">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-teal-400 block">
              About The Business
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
              Dedicated Computer Repair &amp; Technical Support in Burewala
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Fine Computer operates in C Block, Burewala, District Vehari, serving local residents and businesses requiring technical troubleshooting and computer repairs. We focus on diagnosing equipment issues methodically—determining whether a problem is rooted in hardware degradation, software conflict, thermal throttling, or peripheral failure.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              In an industry often clouded by vague promises, we maintain strict adherence to transparent communication: we conduct diagnostic testing, explain what was discovered, provide a direct quotation, and perform work only upon your explicit authorization.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-mono text-slate-300">
              <div className="p-4 border border-slate-800 bg-[#060b18]">
                <div className="text-teal-400 font-bold mb-1">Direct Location</div>
                <div>C Block, Burewala, District Vehari, Punjab, Pakistan</div>
              </div>
              <div className="p-4 border border-slate-800 bg-[#060b18]">
                <div className="text-teal-400 font-bold mb-1">Telephone Contact</div>
                <div>+92 302 7644344 (Call for assessment availability)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: STRUCTURED SERVICE OVERVIEW */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-teal-400 block mb-2">
              Our Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Structured Repair &amp; Diagnostic Services
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-mono font-semibold text-teal-400 hover:text-teal-300 transition-colors whitespace-nowrap cursor-pointer text-left sm:text-right"
          >
            View Full Service Directory &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Service 1 */}
          <div className="border border-slate-800 bg-[#091126] p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 block">SERVICE 01</span>
              <h3 className="text-lg font-bold text-white">Computer Diagnostics</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Thorough fault isolation for desktop and laptop systems experiencing unexplained crashes, refusal to boot, or intermittent power loss.
              </p>
              <div className="text-xs text-slate-400 space-y-1 font-mono pt-2">
                <div>&bull; Power supply &amp; circuit testing</div>
                <div>&bull; Memory (RAM) integrity verification</div>
                <div>&bull; Storage health &amp; sector evaluation</div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => onNavigate('contact', 'Computer Diagnostics')}
                className="text-xs font-mono font-bold text-teal-400 hover:text-teal-300 cursor-pointer"
              >
                Enquire for Diagnostics &rarr;
              </button>
            </div>
          </div>

          {/* Service 2 */}
          <div className="border border-slate-800 bg-[#091126] p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 block">SERVICE 02</span>
              <h3 className="text-lg font-bold text-white">Software Troubleshooting</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Resolving operating system boot loops, driver conflicts, update failures, malware interference, and system file corruption.
              </p>
              <div className="text-xs text-slate-400 space-y-1 font-mono pt-2">
                <div>&bull; Operating system recovery &amp; repair</div>
                <div>&bull; Driver and peripheral conflict resolution</div>
                <div>&bull; Registry &amp; startup optimization</div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => onNavigate('contact', 'Software Troubleshooting')}
                className="text-xs font-mono font-bold text-teal-400 hover:text-teal-300 cursor-pointer"
              >
                Enquire for Software Help &rarr;
              </button>
            </div>
          </div>

          {/* Service 3 */}
          <div className="border border-slate-800 bg-[#091126] p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 block">SERVICE 03</span>
              <h3 className="text-lg font-bold text-white">Hardware Repair Assessment</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Direct physical inspection of internal hardware components to determine repair viability or component replacement requirements.
              </p>
              <div className="text-xs text-slate-400 space-y-1 font-mono pt-2">
                <div>&bull; Motherboard &amp; connector inspection</div>
                <div>&bull; Cooling &amp; thermal paste refurbishment</div>
                <div>&bull; Component viability determination</div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => onNavigate('contact', 'Hardware Repair')}
                className="text-xs font-mono font-bold text-teal-400 hover:text-teal-300 cursor-pointer"
              >
                Enquire for Hardware &rarr;
              </button>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Service 4 */}
          <div className="border border-slate-800 bg-[#091126] p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 block">SERVICE 04</span>
              <h3 className="text-lg font-bold text-white">Laptop Technical Support</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Diagnostic assistance for portable computers including keyboard malfunctions, charging socket faults, cracked display assessments, and fan noise.
              </p>
              <div className="text-xs text-slate-400 space-y-1 font-mono pt-2">
                <div>&bull; Internal thermal &amp; fan inspection</div>
                <div>&bull; DC charging jack &amp; battery diagnosis</div>
                <div>&bull; Display hinge &amp; cable assessment</div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => onNavigate('contact', 'Laptop Support')}
                className="text-xs font-mono font-bold text-teal-400 hover:text-teal-300 cursor-pointer"
              >
                Enquire for Laptop Support &rarr;
              </button>
            </div>
          </div>

          {/* Service 5 */}
          <div className="border border-slate-800 bg-[#091126] p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 block">SERVICE 05</span>
              <h3 className="text-lg font-bold text-white">Performance Troubleshooting</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Investigating system unresponsiveness, 100% disk usage bottlenecks, thermal throttling, and application freezes.
              </p>
              <div className="text-xs text-slate-400 space-y-1 font-mono pt-2">
                <div>&bull; Storage health &amp; bottleneck identification</div>
                <div>&bull; Thermal benchmark testing under load</div>
                <div>&bull; System service &amp; resource audit</div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => onNavigate('contact', 'Performance Troubleshooting')}
                className="text-xs font-mono font-bold text-teal-400 hover:text-teal-300 cursor-pointer"
              >
                Enquire for Performance &rarr;
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: SUGGESTED REPAIR WORKFLOW PREVIEW */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="border border-slate-800 bg-[#070e22] p-8 sm:p-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-teal-400 block mb-2">
                Customer Workflow
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                How A Typical Repair Assessment Works
              </h2>
            </div>
            <button
              onClick={() => onNavigate('process')}
              className="text-xs font-mono font-semibold text-teal-400 hover:text-teal-300 transition-colors whitespace-nowrap cursor-pointer text-left sm:text-right"
            >
              Read Detailed Workflow &rarr;
            </button>
          </div>

          <p className="text-xs text-slate-400 font-mono">
            Note: This is a suggested customer workflow for transparent repair transactions, not an automated or fixed policy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Submit Enquiry',
                desc: 'Fill out the repair enquiry form or call +92 302 7644344 with your basic device info.'
              },
              {
                step: '02',
                title: 'Describe Symptoms',
                desc: 'Explain what happens (e.g. error codes, noises, sudden shutdowns) to prepare for diagnosis.'
              },
              {
                step: '03',
                title: 'Confirm Assessment',
                desc: 'Arrange device handover or visit at C Block, Burewala for physical inspection.'
              },
              {
                step: '04',
                title: 'Diagnosis & Quote',
                desc: 'Technician examines internal hardware and provides a transparent quotation.'
              },
              {
                step: '05',
                title: 'Agreed Work Only',
                desc: 'Repair work commences only after you explicitly approve the proposed diagnosis and quote.'
              }
            ].map((item, idx) => (
              <div key={idx} className="border border-slate-800 bg-[#060b18] p-4 space-y-2">
                <span className="text-xs font-mono font-bold text-teal-400 block">
                  Step {item.step}
                </span>
                <div className="text-sm font-bold text-white">{item.title}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: FAQ ACCORDION PREVIEW */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-teal-400 block mb-2">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Frequently Asked Technical Questions
            </h2>
          </div>
          <button
            onClick={() => onNavigate('faq')}
            className="text-xs font-mono font-semibold text-teal-400 hover:text-teal-300 transition-colors whitespace-nowrap cursor-pointer text-left sm:text-right"
          >
            Browse All Questions &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-800 bg-[#091126] p-6 space-y-2">
            <h3 className="text-sm font-bold text-white">
              Why is in-person diagnosis required before quoting a repair cost?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Identical symptoms (such as a black screen or failure to power on) can stem from wildly different sources: a dead power supply, damaged RAM, faulty motherboard capacitor, or loose display ribbon. Hands-on testing is required to isolate the exact component.
            </p>
          </div>

          <div className="border border-slate-800 bg-[#091126] p-6 space-y-2">
            <h3 className="text-sm font-bold text-white">
              Should I call before bringing my computer to C Block, Burewala?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Yes, calling +92 302 7644344 in advance is strongly recommended so the technician can discuss the initial symptoms and confirm assessment availability before you travel with your equipment.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: FINAL CONTACT & LOCATION BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="border border-teal-500/30 bg-[#09142e] p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-teal-400 block">
                Direct Contact
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Ready to Discuss Your Computer Problem?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                Contact Fine Computer directly at <strong className="text-white font-mono">+92 302 7644344</strong> or submit our online repair enquiry form to describe your device and arrange an assessment in C Block, Burewala.
              </p>
              <div className="text-xs font-mono text-slate-400 pt-1">
                Location: C Block, Burewala, District Vehari, Punjab, Pakistan.
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-4 text-xs font-bold tracking-wider uppercase text-slate-950 bg-teal-400 hover:bg-teal-300 transition-all cursor-pointer text-center"
              >
                Submit Repair Enquiry
              </button>
              <a
                href="tel:+923027644344"
                className="w-full py-4 text-xs font-bold tracking-wider uppercase text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 text-center font-mono cursor-pointer"
              >
                Call +92 302 7644344
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
