import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory + persistent fallback storage for repair enquiries
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'enquiries.json');

if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    console.error('Could not create data dir', e);
  }
}

interface RepairEnquiry {
  id: string;
  referenceNumber: string;
  customerName: string;
  contactNumber: string;
  deviceType: string;
  brandModel?: string;
  problemCategory: string;
  description: string;
  preferredContact: string;
  status: string;
  submittedAt: string;
  notes?: string;
}

let enquiries: RepairEnquiry[] = [];

if (fs.existsSync(DATA_FILE)) {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    enquiries = JSON.parse(raw);
  } catch (e) {
    enquiries = [];
  }
}

function saveEnquiries() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to write enquiries to disk', e);
  }
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Fine Computer Repair System',
    location: 'C Block, Burewala, District Vehari, Punjab, Pakistan',
    phone: '+92 302 7644344',
    timestamp: new Date().toISOString()
  });
});

// POST /api/repair-enquiry
app.post('/api/repair-enquiry', (req: Request, res: Response) => {
  const {
    customerName,
    contactNumber,
    deviceType,
    brandModel,
    problemCategory,
    description,
    preferredContact,
    honeypot
  } = req.body;

  // Anti-spam honeypot
  if (honeypot) {
    return res.status(400).json({
      success: false,
      error: 'Invalid submission detected.'
    });
  }

  // Field validation
  const errors: Record<string, string> = {};

  if (!customerName || typeof customerName !== 'string' || customerName.trim().length < 2) {
    errors.customerName = 'Please enter a valid customer name (at least 2 characters).';
  }

  if (!contactNumber || typeof contactNumber !== 'string' || contactNumber.trim().length < 7) {
    errors.contactNumber = 'Please provide a valid contact number (e.g. 0302-7644344 or +92 302 7644344).';
  }

  if (!deviceType || typeof deviceType !== 'string' || !deviceType.trim()) {
    errors.deviceType = 'Please select a device type.';
  }

  if (!problemCategory || typeof problemCategory !== 'string' || !problemCategory.trim()) {
    errors.problemCategory = 'Please choose a primary problem category.';
  }

  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    errors.description = 'Please describe the issue in detail (minimum 10 characters).';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed. Please review the highlighted fields.',
      errors
    });
  }

  // Generate technical reference code: FC-YYYYMMDD-XXXX
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const referenceNumber = `FC-${dateStr}-${randomSuffix}`;
  const id = `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const newEnquiry: RepairEnquiry = {
    id,
    referenceNumber,
    customerName: customerName.trim(),
    contactNumber: contactNumber.trim(),
    deviceType: deviceType.trim(),
    brandModel: (brandModel && typeof brandModel === 'string') ? brandModel.trim() : undefined,
    problemCategory: problemCategory.trim(),
    description: description.trim(),
    preferredContact: preferredContact || 'Phone Call',
    status: 'Logged & Ready for Physical Assessment',
    submittedAt: new Date().toISOString(),
    notes: 'Please coordinate handover or visit C Block, Burewala for in-person hardware diagnosis.'
  };

  enquiries.unshift(newEnquiry);
  if (enquiries.length > 500) {
    enquiries = enquiries.slice(0, 500);
  }
  saveEnquiries();

  return res.status(201).json({
    success: true,
    message: 'Repair enquiry successfully registered. Assessment pending in-person diagnostic at C Block, Burewala.',
    enquiry: {
      referenceNumber: newEnquiry.referenceNumber,
      customerName: newEnquiry.customerName,
      deviceType: newEnquiry.deviceType,
      problemCategory: newEnquiry.problemCategory,
      preferredContact: newEnquiry.preferredContact,
      status: newEnquiry.status,
      submittedAt: newEnquiry.submittedAt
    }
  });
});

// GET /api/repair-enquiry/:reference
app.get('/api/repair-enquiry/:reference', (req: Request, res: Response) => {
  const { reference } = req.params;
  const match = enquiries.find(
    (e) => e.referenceNumber.toLowerCase() === reference.trim().toLowerCase()
  );

  if (!match) {
    return res.status(404).json({
      success: false,
      message: `No repair enquiry found with reference "${reference}". Please check the code or contact Fine Computer directly at +92 302 7644344.`
    });
  }

  return res.json({
    success: true,
    enquiry: {
      referenceNumber: match.referenceNumber,
      deviceType: match.deviceType,
      problemCategory: match.problemCategory,
      status: match.status,
      submittedAt: match.submittedAt,
      notes: match.notes
    }
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fine Computer server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
