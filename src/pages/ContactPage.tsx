import React, { useState, useEffect } from 'react';
import { RepairEnquiryFormData, EnquirySubmissionResult } from '../types';

interface ContactPageProps {
  initialProblemCategory?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialProblemCategory }) => {
  const [activeTab, setActiveTab] = useState<'new-enquiry' | 'track-status'>('new-enquiry');

  // Form State
  const [formData, setFormData] = useState<RepairEnquiryFormData>({
    customerName: '',
    contactNumber: '',
    deviceType: 'Desktop PC',
    brandModel: '',
    problemCategory: initialProblemCategory || 'General Diagnostic',
    description: '',
    preferredContact: 'Phone Call',
    honeypot: '' // Anti-spam field
  });

  useEffect(() => {
    if (initialProblemCategory) {
      setFormData((prev) => ({
        ...prev,
        problemCategory: initialProblemCategory
      }));
    }
  }, [initialProblemCategory]);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<EnquirySubmissionResult | null>(null);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Status Lookup State
  const [lookupCode, setLookupCode] = useState<string>('');
  const [isLookingUp, setIsLookingUp] = useState<boolean>(false);
  const [lookupResult, setLookupResult] = useState<{
    found: boolean;
    data?: {
      referenceNumber: string;
      deviceType: string;
      problemCategory: string;
      status: string;
      submittedAt: string;
      notes?: string;
    };
    error?: string;
  } | null>(null);

  // Client-side validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.customerName.trim() || formData.customerName.trim().length < 2) {
      errors.customerName = 'Please enter your full name (minimum 2 characters).';
    }

    const phoneRegex = /^[0-9+()\- ]{7,20}$/;
    if (!formData.contactNumber.trim() || !phoneRegex.test(formData.contactNumber.trim())) {
      errors.contactNumber = 'Please provide a valid phone number (e.g., 0302-7644344 or +92 302 7644344).';
    }

    if (!formData.deviceType.trim()) {
      errors.deviceType = 'Please select a device type.';
    }

    if (!formData.problemCategory.trim()) {
      errors.problemCategory = 'Please select a problem category.';
    }

    if (!formData.description.trim() || formData.description.trim().length < 10) {
      errors.description = 'Please describe the problem symptoms in detail (at least 10 characters).';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionResult(null);

    // Spam honeypot trigger
    if (formData.honeypot) {
      setFormErrors({ general: 'Spam detected. Submission aborted.' });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/repair-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionResult({
          success: true,
          message: data.message,
          enquiry: data.enquiry
        });
        // Reset form except category
        setFormData({
          customerName: '',
          contactNumber: '',
          deviceType: 'Desktop PC',
          brandModel: '',
          problemCategory: 'General Diagnostic',
          description: '',
          preferredContact: 'Phone Call',
          honeypot: ''
        });
        setFormErrors({});
      } else {
        setSubmissionResult({
          success: false,
          message: data.message || 'Failed to submit repair enquiry. Please check the inputs or call directly.',
          errors: data.errors
        });
        if (data.errors) {
          setFormErrors(data.errors);
        }
      }
    } catch (err: unknown) {
      setSubmissionResult({
        success: false,
        message: 'Could not connect to the backend server. Please verify your connection or call Fine Computer directly at +92 302 7644344.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupCode.trim()) return;

    setIsLookingUp(true);
    setLookupResult(null);

    try {
      const response = await fetch(`/api/repair-enquiry/${encodeURIComponent(lookupCode.trim())}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setLookupResult({
          found: true,
          data: data.enquiry
        });
      } else {
        setLookupResult({
          found: false,
          error: data.message || `No record located for reference "${lookupCode}".`
        });
      }
    } catch (err) {
      setLookupResult({
        found: false,
        error: 'Unable to reach the tracking service. Please call +92 302 7644344 for verbal verification.'
      });
    } finally {
      setIsLookingUp(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Top Banner */}
      <div className="border border-slate-800 bg-[#070e22] p-8 sm:p-12 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-teal-400">
          <span>Official Contact &amp; Intake</span>
          <span aria-hidden="true">&middot;</span>
          <span>C Block, Burewala, Punjab</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Contact &amp; Repair Enquiry
        </h1>
        <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
          Submit your equipment details below to register an initial repair enquiry, or contact Fine Computer directly via telephone to discuss hardware symptoms and assessment arrangements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Verified Business Information & Advisory */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Business Details Card */}
          <div className="border border-slate-800 bg-[#091126] p-6 sm:p-8 space-y-6">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-teal-400 block">
              Business Information
            </span>

            <div className="space-y-4 text-sm">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-400 block">Trading Business Name</span>
                <span className="text-white font-bold text-base">Fine Computer</span>
              </div>

              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-400 block">Verified Telephone</span>
                <a
                  href="tel:+923027644344"
                  className="text-teal-400 font-mono font-bold text-lg hover:underline block mt-0.5"
                >
                  +92 302 7644344
                </a>
                <span className="text-xs text-slate-400 font-mono block mt-1">
                  Call ahead to confirm diagnostic assessment intake
                </span>
              </div>

              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-400 block">Physical Location</span>
                <p className="text-white font-medium mt-0.5">
                  C Block, Burewala, District Vehari, Punjab, Pakistan.
                </p>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 block">Service Classification</span>
                <p className="text-slate-300 mt-0.5">
                  Computer repair and technical support
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Notice Box */}
          <div className="border border-amber-500/30 bg-[#161208] p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
              <span>&#9888; Mandatory Privacy Notice</span>
            </div>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              <strong>Do not submit passwords, recovery codes, personal PINs, or confidential files through this form.</strong>
            </p>
            <p className="text-xs text-amber-200/75 leading-relaxed">
              Fine Computer will never ask you to transmit sensitive system access keys over unencrypted web channels. If operating system access is necessary during testing, discuss it in person during equipment intake at C Block, Burewala.
            </p>
          </div>

          {/* Verification Disclaimer */}
          <div className="border border-slate-800 bg-[#070e22] p-6 space-y-3 text-xs font-mono text-slate-400 leading-relaxed">
            <div className="text-white font-bold uppercase">
              Notice on Quotations &amp; Turnaround
            </div>
            <p>
              Submitting this enquiry does not constitute a binding repair contract or a guarantee of repairability. Exact diagnostic findings and repair costs are determined strictly after hands-on evaluation of your hardware at our Burewala shop.
            </p>
          </div>

        </div>

        {/* Right Column: Tabbed Form (New Enquiry / Track Existing) */}
        <div className="lg:col-span-7">
          
          <div className="border border-slate-800 bg-[#091126] p-6 sm:p-8 space-y-6">
            
            {/* Tab Selector */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
              <button
                type="button"
                onClick={() => setActiveTab('new-enquiry')}
                className={`px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'new-enquiry'
                    ? 'border-teal-400 text-teal-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                1. Register New Repair Enquiry
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('track-status')}
                className={`px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'track-status'
                    ? 'border-teal-400 text-teal-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                2. Check Existing Ticket
              </button>
            </div>

            {/* TAB 1: NEW ENQUIRY FORM */}
            {activeTab === 'new-enquiry' && (
              <div className="space-y-6">
                
                {/* Success Banner */}
                {submissionResult?.success && submissionResult.enquiry && (
                  <div className="border border-teal-500/50 bg-[#081a24] p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-teal-400 uppercase">
                        &check; Enquiry Logged Successfully
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        Status: Pending Physical Intake
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs text-slate-300 font-mono">
                        Your Unique Diagnostic Reference Number:
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-mono font-extrabold text-white tracking-wider bg-slate-900 px-3 py-1.5 border border-slate-700">
                          {submissionResult.enquiry.referenceNumber}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(submissionResult.enquiry!.referenceNumber)}
                          className="px-3 py-1.5 text-xs font-mono bg-teal-400 text-slate-950 font-bold hover:bg-teal-300 cursor-pointer"
                        >
                          {copySuccess ? 'Copied &check;' : 'Copy Code'}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {submissionResult.message}
                    </p>

                    <div className="border-t border-slate-800 pt-3 text-xs text-slate-400 font-mono space-y-1">
                      <div>Customer: {submissionResult.enquiry.customerName}</div>
                      <div>Device Type: {submissionResult.enquiry.deviceType}</div>
                      <div>Preferred Contact: {submissionResult.enquiry.preferredContact}</div>
                      <div className="text-teal-300 pt-1">
                        Next Step: Please call +92 302 7644344 or arrange handover at C Block, Burewala.
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {submissionResult && !submissionResult.success && (
                  <div className="border border-red-500/40 bg-[#1f0d0d] p-4 text-xs font-mono text-red-300 space-y-1">
                    <div className="font-bold text-red-200">Submission Unsuccessful</div>
                    <div>{submissionResult.message}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  
                  {/* Anti-spam honeypot (hidden from human users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website-field">Leave this empty</label>
                    <input
                      id="website-field"
                      type="text"
                      name="website"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Customer Name */}
                  <div>
                    <label
                      htmlFor="customerName"
                      className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1.5"
                    >
                      Customer Name <span className="text-teal-400">*</span>
                    </label>
                    <input
                      id="customerName"
                      type="text"
                      required
                      placeholder="e.g. Muhammad Ahmad"
                      value={formData.customerName}
                      onChange={(e) => {
                        setFormData({ ...formData, customerName: e.target.value });
                        if (formErrors.customerName) {
                          setFormErrors({ ...formErrors, customerName: '' });
                        }
                      }}
                      className={`w-full px-4 py-3 bg-[#060b18] border text-white text-sm focus:outline-none focus:border-teal-400 transition-colors ${
                        formErrors.customerName ? 'border-red-500' : 'border-slate-800'
                      }`}
                    />
                    {formErrors.customerName && (
                      <p className="text-xs text-red-400 mt-1 font-mono">{formErrors.customerName}</p>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label
                      htmlFor="contactNumber"
                      className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1.5"
                    >
                      Contact Phone Number <span className="text-teal-400">*</span>
                    </label>
                    <input
                      id="contactNumber"
                      type="tel"
                      required
                      placeholder="e.g. 0302-XXXXXXX or +92 302 7644344"
                      value={formData.contactNumber}
                      onChange={(e) => {
                        setFormData({ ...formData, contactNumber: e.target.value });
                        if (formErrors.contactNumber) {
                          setFormErrors({ ...formErrors, contactNumber: '' });
                        }
                      }}
                      className={`w-full px-4 py-3 bg-[#060b18] border text-white text-sm font-mono focus:outline-none focus:border-teal-400 transition-colors ${
                        formErrors.contactNumber ? 'border-red-500' : 'border-slate-800'
                      }`}
                    />
                    {formErrors.contactNumber && (
                      <p className="text-xs text-red-400 mt-1 font-mono">{formErrors.contactNumber}</p>
                    )}
                  </div>

                  {/* Device Type & Optional Brand/Model */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="deviceType"
                        className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1.5"
                      >
                        Device Type <span className="text-teal-400">*</span>
                      </label>
                      <select
                        id="deviceType"
                        value={formData.deviceType}
                        onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                        className="w-full px-4 py-3 bg-[#060b18] border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-400 cursor-pointer"
                      >
                        <option value="Desktop PC">Desktop PC (Tower)</option>
                        <option value="Laptop">Laptop / Notebook</option>
                        <option value="All-in-One PC">All-in-One PC</option>
                        <option value="Other / Peripheral">Other System</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="brandModel"
                        className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1.5"
                      >
                        Brand &amp; Model (Optional)
                      </label>
                      <input
                        id="brandModel"
                        type="text"
                        placeholder="e.g. Dell OptiPlex, HP Pavilion, Custom Tower"
                        value={formData.brandModel}
                        onChange={(e) => setFormData({ ...formData, brandModel: e.target.value })}
                        className="w-full px-4 py-3 bg-[#060b18] border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-400"
                      >
                      </input>
                    </div>
                  </div>

                  {/* Problem Category */}
                  <div>
                    <label
                      htmlFor="problemCategory"
                      className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1.5"
                    >
                      Problem Category <span className="text-teal-400">*</span>
                    </label>
                    <select
                      id="problemCategory"
                      value={formData.problemCategory}
                      onChange={(e) => setFormData({ ...formData, problemCategory: e.target.value })}
                      className="w-full px-4 py-3 bg-[#060b18] border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-400 cursor-pointer"
                    >
                      <option value="General Diagnostic">General Diagnostic / Not Sure</option>
                      <option value="Power &amp; Boot Issues">Power &amp; Boot (No power, sudden restart)</option>
                      <option value="Software &amp; OS Errors">Software &amp; OS (Crash screen, boot loops)</option>
                      <option value="Display &amp; Screen Issues">Display &amp; Screen (No signal, distorted image)</option>
                      <option value="Hardware Repair">Hardware Assessment (Overheating, strange noises)</option>
                      <option value="Performance &amp; Freezing">Performance (Severe lag, freezing, 100% disk)</option>
                      <option value="Laptop Support">Laptop Support (Charger port, keyboard, hinges)</option>
                    </select>
                  </div>

                  {/* Problem Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1.5"
                    >
                      Describe the Observed Problem <span className="text-teal-400">*</span>
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      required
                      placeholder="Please describe what happens when you attempt to use the machine (e.g. power button behavior, fans, beeps, error messages on screen, whether it happened suddenly)..."
                      value={formData.description}
                      onChange={(e) => {
                        setFormData({ ...formData, description: e.target.value });
                        if (formErrors.description) {
                          setFormErrors({ ...formErrors, description: '' });
                        }
                      }}
                      className={`w-full px-4 py-3 bg-[#060b18] border text-white text-sm focus:outline-none focus:border-teal-400 transition-colors ${
                        formErrors.description ? 'border-red-500' : 'border-slate-800'
                      }`}
                    />
                    {formErrors.description && (
                      <p className="text-xs text-red-400 mt-1 font-mono">{formErrors.description}</p>
                    )}
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label
                      htmlFor="preferredContact"
                      className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1.5"
                    >
                      Preferred Contact Method
                    </label>
                    <select
                      id="preferredContact"
                      value={formData.preferredContact}
                      onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                      className="w-full px-4 py-3 bg-[#060b18] border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-400 cursor-pointer"
                    >
                      <option value="Phone Call">Phone Call</option>
                      <option value="SMS">SMS Message</option>
                      <option value="WhatsApp">WhatsApp</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 text-xs font-bold tracking-wider uppercase text-slate-950 bg-teal-400 hover:bg-teal-300 disabled:opacity-50 transition-all cursor-pointer text-center font-mono flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Logging Enquiry...</span>
                      ) : (
                        <span>Submit Repair Enquiry &rarr;</span>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 font-mono text-center pt-1">
                    Transmission is securely recorded to our local repair queue. No passwords are collected.
                  </p>
                </form>

              </div>
            )}

            {/* TAB 2: TRACK EXISTING ENQUIRY STATUS */}
            {activeTab === 'track-status' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white">
                    Check Enquiry Diagnostic Status
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Enter the reference code you received upon submitting your repair enquiry (format: FC-YYYYMMDD-XXXX).
                  </p>
                </div>

                <form onSubmit={handleLookup} className="space-y-4">
                  <div>
                    <label
                      htmlFor="lookupCode"
                      className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1.5"
                    >
                      Diagnostic Reference Number
                    </label>
                    <input
                      id="lookupCode"
                      type="text"
                      placeholder="e.g. FC-20261017-1042"
                      value={lookupCode}
                      onChange={(e) => setLookupCode(e.target.value)}
                      className="w-full px-4 py-3 bg-[#060b18] border border-slate-800 text-white text-sm font-mono uppercase focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLookingUp || !lookupCode.trim()}
                    className="w-full py-3 text-xs font-bold tracking-wider uppercase text-slate-950 bg-teal-400 hover:bg-teal-300 disabled:opacity-50 transition-all cursor-pointer font-mono"
                  >
                    {isLookingUp ? 'Querying Backend...' : 'Check Status'}
                  </button>
                </form>

                {/* Lookup Results */}
                {lookupResult && (
                  <div className="pt-4 border-t border-slate-800">
                    {lookupResult.found && lookupResult.data ? (
                      <div className="border border-slate-800 bg-[#060b18] p-5 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-mono text-teal-400 font-bold">
                            {lookupResult.data.referenceNumber}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            {new Date(lookupResult.data.submittedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="text-slate-400 font-mono block">Current Status:</span>
                            <span className="text-teal-300 font-bold block mt-0.5">
                              {lookupResult.data.status}
                            </span>
                          </div>

                          <div>
                            <span className="text-slate-400 font-mono block">Device Type:</span>
                            <span className="text-white block mt-0.5">
                              {lookupResult.data.deviceType} &middot; {lookupResult.data.problemCategory}
                            </span>
                          </div>

                          {lookupResult.data.notes && (
                            <div className="pt-2 border-t border-slate-800/80">
                              <span className="text-slate-400 font-mono block">Intake Guidance:</span>
                              <p className="text-slate-300 mt-0.5 leading-relaxed">
                                {lookupResult.data.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="border border-red-500/30 bg-[#1f0d0d] p-4 text-xs font-mono text-red-300">
                        {lookupResult.error}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
