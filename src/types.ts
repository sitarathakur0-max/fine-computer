export type PageId = 'home' | 'services' | 'process' | 'about' | 'faq' | 'contact';

export interface RepairEnquiryFormData {
  customerName: string;
  contactNumber: string;
  deviceType: string;
  brandModel: string;
  problemCategory: string;
  description: string;
  preferredContact: string;
  honeypot?: string;
}

export interface EnquirySubmissionResult {
  success: boolean;
  message: string;
  enquiry?: {
    referenceNumber: string;
    customerName: string;
    deviceType: string;
    problemCategory: string;
    preferredContact: string;
    status: string;
    submittedAt: string;
  };
  errors?: Record<string, string>;
}

export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  summary: string;
  problemCategoryValue: string;
  scope: string[];
  assessmentNote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
