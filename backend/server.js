import { createHash, randomUUID } from 'node:crypto';
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MongoClient, ServerApiVersion } from 'mongodb';
import nodemailer from 'nodemailer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPaths = [
  // Keep payment-specific overrides highest priority when present.
  join(__dirname, '..', 'Server_payment', '.env.local'),
  join(__dirname, '..', 'Server_payment', '.env'),
  join(__dirname, '.env.local'),
  join(__dirname, '.env'),
  join(__dirname, '..', '.env.local'),
  join(__dirname, '..', '.env'),
];

loadEnvFiles(envPaths);

let dataDir = normalizeDataDir(process.env.CMS_DATA_DIR);
let careerOpeningsFile;
let careerApplicationsFile;
let careersSettingsFile;
let blogPostsFile;
let blogCommentsFile;
let newsletterStoreFile;

setDataStorePaths(dataDir);

const PORT = Number(process.env.PORT || 5001);
const DEFAULT_ALLOWED_ORIGINS = [
  'https://www.infomeya.com',
  'https://infomeya.com',
  'https://infomeya.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];
const FRONTEND_URL = process.env.FRONTEND_URL || '';
const ALLOWED_ORIGINS = [
  ...FRONTEND_URL.split(','),
  ...DEFAULT_ALLOWED_ORIGINS,
]
  .map((origin) => origin.trim())
  .filter(Boolean)
  .filter((origin, index, origins) => origins.indexOf(origin) === index);

const CONTACT_TO_EMAIL = (process.env.CONTACT_TO_EMAIL || 'info@infomeya.com').trim();
const MCT_ENROLLMENT_TO_EMAILS = parseCsvList(
  process.env.MCT_ENROLLMENT_TO_EMAILS,
  ['info@infomeya.com', 'sangeeta@infomeya.com']
);
const MCT_TRAINER_REGISTRATION_TO_EMAILS = parseCsvList(
  process.env.MCT_TRAINER_REGISTRATION_TO_EMAILS,
  ['sangeeta@infomeya.com']
);
const MCT_TRAINER_REGISTRATION_CC_EMAILS = parseCsvList(
  process.env.MCT_TRAINER_REGISTRATION_CC_EMAILS,
  ['info@infomeya.com']
);
const CONTACT_FROM_EMAIL = (
  process.env.CONTACT_FROM_EMAIL ||
  process.env.GRAPH_FROM_EMAIL ||
  process.env.SMTP_USER ||
  CONTACT_TO_EMAIL
).trim();
const HR_TO_EMAIL = (process.env.HR_TO_EMAIL || CONTACT_TO_EMAIL).trim();
const NEWSLETTER_TO_EMAIL = (process.env.NEWSLETTER_TO_EMAIL || CONTACT_TO_EMAIL).trim();
const PUBLIC_SITE_URL = normalizeSiteUrl(
  process.env.PUBLIC_SITE_URL || parseCsvList(FRONTEND_URL)[0] || 'https://www.infomeya.com'
);
const CAREERS_ADMIN_TOKEN = (
  process.env.CAREERS_ADMIN_TOKEN || 'change-me-careers-admin-token'
).trim();
const BLOG_ADMIN_TOKEN = (
  process.env.BLOG_ADMIN_TOKEN || 'change-me-blog-admin-token'
).trim();
const MONGODB_URI = (process.env.MONGODB_URI || process.env.MONGO_URI || '').trim();
const MONGODB_DB_NAME = (process.env.MONGODB_DB_NAME || 'infomeya').trim();
const MONGODB_REQUIRE_CONNECTION = parseBoolean(
  process.env.MONGODB_REQUIRE_CONNECTION,
  Boolean(MONGODB_URI)
);
const MONGODB_IMPORT_JSON_ON_EMPTY = parseBoolean(
  process.env.MONGODB_IMPORT_JSON_ON_EMPTY,
  false
);
const CLOUDINARY_CLOUD_NAME = (process.env.CLOUDINARY_CLOUD_NAME || '').trim();
const CLOUDINARY_API_KEY = (process.env.CLOUDINARY_API_KEY || '').trim();
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '';
const CLOUDINARY_FOLDER = (process.env.CLOUDINARY_FOLDER || 'infomeya/blog').trim();

const SMTP_HOST = (process.env.SMTP_HOST || '').trim();
const SMTP_PORT = Number.parseInt(process.env.SMTP_PORT || '', 10) || 587;
const SMTP_SECURE = parseBoolean(process.env.SMTP_SECURE, SMTP_PORT === 465);
const SMTP_USER = (process.env.SMTP_USER || '').trim();
const SMTP_PASS = process.env.SMTP_PASS || '';
const GRAPH_FROM_EMAIL = (process.env.GRAPH_FROM_EMAIL || CONTACT_FROM_EMAIL).trim();
const GRAPH_TENANT_ID = (process.env.GRAPH_TENANT_ID || '').trim();
const GRAPH_CLIENT_ID = (process.env.GRAPH_CLIENT_ID || '').trim();
const GRAPH_CLIENT_SECRET = process.env.GRAPH_CLIENT_SECRET || '';

const DEFAULT_CAREERS_SETTINGS = {
  careersPageTitle: 'Careers',
  careersPageSubtitle: 'Build your future with Infomeya',
  generalCtaTitle: 'Send Us Your Resume',
  generalCtaDescription:
    'Share your profile with us and tell us what kind of role you are looking for. If a matching opportunity opens up, our team will get in touch.',
  notificationEmail: HR_TO_EMAIL,
};

let contactTransporter = null;
let contactTransporterVerified = false;
let mongoClient = null;
let mongoDb = null;
let mongoConnectionPromise = null;
const hydratedMongoCollections = new Set();

ensureDataStore();

const server = BunLikeServe({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    if (req.method === 'OPTIONS') {
      return withCors(req, new Response(null, { status: 204 }));
    }

    if (req.method === 'GET' && url.pathname === '/api/health') {
      return json(
        200,
        {
          ok: true,
          service: 'infomeya-backend',
          timestamp: new Date().toISOString(),
        },
        req
      );
    }

    if (req.method === 'POST' && url.pathname === '/api/contact') {
      return handleContactForm(req);
    }

    if (req.method === 'POST' && url.pathname === '/api/mct-enrollment') {
      return handleMctEnrollment(req);
    }

    if (req.method === 'POST' && url.pathname === '/api/mct-trainer-registration') {
      return handleMctTrainerRegistration(req);
    }

    if (req.method === 'POST' && url.pathname === '/api/careers') {
      return handleCareerApplication(req);
    }

    if (req.method === 'GET' && url.pathname === '/api/careers/openings') {
      return handleCareerOpeningsRequest(req);
    }

    if (req.method === 'GET' && url.pathname === '/api/blog/posts') {
      return handleBlogPostsRequest(req);
    }

    if (url.pathname.startsWith('/api/blog/posts/') && url.pathname.endsWith('/comments')) {
      const slug = decodeURIComponent(
        url.pathname.replace('/api/blog/posts/', '').replace(/\/comments$/, '')
      );

      if (req.method === 'GET') {
        return handleBlogCommentsList(req, slug);
      }

      if (req.method === 'POST') {
        return handleBlogCommentCreate(req, slug);
      }
    }

    if (req.method === 'GET' && url.pathname.startsWith('/api/blog/posts/')) {
      const slug = decodeURIComponent(url.pathname.replace('/api/blog/posts/', ''));
      return handleBlogPostDetailsRequest(req, slug);
    }

    if (url.pathname === '/api/admin/blog/posts') {
      if (req.method === 'GET') {
        return handleAdminBlogPostsList(req);
      }

      if (req.method === 'POST') {
        return handleAdminBlogPostCreate(req);
      }
    }

    if (url.pathname === '/api/admin/blog/upload-image' && req.method === 'POST') {
      return handleAdminBlogImageUpload(req);
    }

    if (url.pathname.startsWith('/api/admin/blog/posts/')) {
      const postId = decodeURIComponent(url.pathname.replace('/api/admin/blog/posts/', ''));

      if (req.method === 'PATCH' || req.method === 'PUT') {
        return handleAdminBlogPostUpdate(req, postId);
      }

      if (req.method === 'DELETE') {
        return handleAdminBlogPostDelete(req, postId);
      }
    }

    if (url.pathname === '/api/admin/careers/openings') {
      if (req.method === 'GET') {
        return handleAdminCareerOpeningsList(req);
      }

      if (req.method === 'POST') {
        return handleAdminCareerOpeningCreate(req);
      }
    }

    if (url.pathname.startsWith('/api/admin/careers/openings/')) {
      const openingId = decodeURIComponent(
        url.pathname.replace('/api/admin/careers/openings/', '')
      );

      if (req.method === 'PATCH' || req.method === 'PUT') {
        return handleAdminCareerOpeningUpdate(req, openingId);
      }

      if (req.method === 'DELETE') {
        return handleAdminCareerOpeningDelete(req, openingId);
      }
    }

    if (url.pathname === '/api/admin/careers/applications') {
      if (req.method === 'GET') {
        return handleAdminCareerApplicationsList(req);
      }
    }

    if (url.pathname.startsWith('/api/admin/careers/applications/')) {
      const applicationId = decodeURIComponent(
        url.pathname.replace('/api/admin/careers/applications/', '')
      );

      if (req.method === 'PATCH' || req.method === 'PUT') {
        return handleAdminCareerApplicationUpdate(req, applicationId);
      }
    }

    if (url.pathname === '/api/admin/careers/settings') {
      if (req.method === 'GET') {
        return handleAdminCareersSettingsGet(req);
      }

      if (req.method === 'PATCH' || req.method === 'PUT') {
        return handleAdminCareersSettingsUpdate(req);
      }
    }

    if (req.method === 'POST' && url.pathname === '/api/newsletter/subscribe') {
      return handleNewsletterSubscribe(req);
    }

    return json(404, { error: 'Not found' }, req);
  },
});

server.start();

function BunLikeServe({ port, fetch }) {
  return {
    start() {
      import('node:http').then(({ createServer }) => {
        const httpServer = createServer(async (req, res) => {
          const chunks = [];

          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', async () => {
            const bodyBuffer = Buffer.concat(chunks);
            const request = new Request(`http://${req.headers.host}${req.url}`, {
              method: req.method,
              headers: req.headers,
              body:
                req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS'
                  ? undefined
                  : bodyBuffer,
            });

            request.rawBody = bodyBuffer;

            let response;

            try {
              response = await fetch(request);
            } catch (error) {
              console.error('Unhandled backend error:', error);
              response = json(
                500,
                {
                  error: 'Server error while processing the request.',
                },
                request
              );
            }

            res.statusCode = response.status;
            response.headers.forEach((value, key) => {
              res.setHeader(key, value);
            });

            const responseBuffer = Buffer.from(await response.arrayBuffer());
            res.end(responseBuffer);
          });
        });

        httpServer.listen(port, async () => {
          console.log(`Infomeya backend listening on http://localhost:${port}`);

          try {
            await ensureMongoIndexes();

            if (isGraphEmailConfigured()) {
              console.log('Microsoft Graph mail provider is configured.');
            } else if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
              const transporter = getContactTransporter();
              await verifyContactTransporter(transporter);
            } else {
              console.warn(
                'Email sending is not configured yet. Add Microsoft Graph or SMTP settings.'
              );
            }
          } catch (error) {
            console.error('Email startup verification failed:', error);
          }
        });
      });
    },
  };
}

async function handleContactForm(req) {
  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateContactPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  const contactRecord = await persistContactSubmission(validation.data);

  try {
    await sendContactEmail(validation.data);
    await updateContactSubmissionStatus(contactRecord.id, 'email_sent');
    return json(200, { ok: true, message: 'Message sent successfully.' }, req);
  } catch (error) {
    console.error('Contact email delivery failed:', error);
    await updateContactSubmissionStatus(
      contactRecord.id,
      'email_failed',
      error instanceof Error ? error.message : 'Unknown email delivery error.'
    );

    const message = isContactEmailConfigError(error)
      ? error.message
      : error?.message || 'Unable to send your message right now.';

    return json(
      isContactEmailConfigError(error) ? 500 : 502,
      { error: message },
      req
    );
  }
}

async function handleMctEnrollment(req) {
  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateMctEnrollmentPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  try {
    await sendMctEnrollmentEmail(validation.data);
    return json(
      200,
      {
        ok: true,
        message:
          'Enrollment request submitted successfully. Our team will contact you soon.',
      },
      req
    );
  } catch (error) {
    console.error('MCT enrollment email delivery failed:', error);

    const message = isContactEmailConfigError(error)
      ? error.message
      : error?.message || 'Unable to submit your enrollment request right now.';

    return json(
      isContactEmailConfigError(error) ? 500 : 502,
      { error: message },
      req
    );
  }
}

async function handleMctTrainerRegistration(req) {
  const body = await safeFormData(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid form submission.' }, req);
  }

  const validation = await validateMctTrainerRegistrationPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  try {
    await sendMctTrainerRegistrationEmail(validation.data);
    await sendMctTrainerWelcomeEmail(validation.data);
    return json(
      200,
      {
        ok: true,
        message: 'Registration submitted successfully.',
      },
      req
    );
  } catch (error) {
    console.error('MCT trainer registration email delivery failed:', error);

    const message = isContactEmailConfigError(error)
      ? error.message
      : error?.message || 'Unable to submit your registration right now.';

    return json(
      isContactEmailConfigError(error) ? 500 : 502,
      { error: message },
      req
    );
  }
}

async function sendContactEmail(contact) {
  const submittedAt = new Date().toISOString();

  await sendNotificationEmail({
    from: {
      name: 'Infomeya Website',
      address: CONTACT_FROM_EMAIL,
    },
    to: CONTACT_TO_EMAIL,
    replyTo: {
      name: sanitizeEmailHeaderValue(contact.fullName),
      address: contact.email,
    },
    subject: `New contact request from ${sanitizeEmailHeaderValue(contact.fullName)}`,
    text: buildContactEmailText(contact, submittedAt),
    html: buildContactEmailHtml(contact, submittedAt),
  });
}

async function sendMctEnrollmentEmail(enrollment) {
  const submittedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  await sendNotificationEmail({
    from: {
      name: 'Infomeya MCT Enrollment',
      address: CONTACT_FROM_EMAIL,
    },
    to: MCT_ENROLLMENT_TO_EMAILS,
    replyTo: {
      name: sanitizeEmailHeaderValue(enrollment.fullName),
      address: enrollment.email,
    },
    subject: `MCT enrollment request from ${sanitizeEmailHeaderValue(
      enrollment.fullName
    )}`,
    text: buildMctEnrollmentEmailText(enrollment, submittedAt),
    html: buildMctEnrollmentEmailHtml(enrollment, submittedAt),
  });
}

async function sendMctTrainerRegistrationEmail(registration) {
  const submittedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  await sendNotificationEmail({
    from: {
      name: 'Infomeya Trainer Network',
      address: CONTACT_FROM_EMAIL,
    },
    to: MCT_TRAINER_REGISTRATION_TO_EMAILS,
    cc: MCT_TRAINER_REGISTRATION_CC_EMAILS,
    replyTo: {
      name: sanitizeEmailHeaderValue(registration.fullName),
      address: registration.email,
    },
    subject: `MCT trainer registration from ${sanitizeEmailHeaderValue(
      registration.fullName
    )}`,
    text: buildMctTrainerRegistrationEmailText(registration, submittedAt),
    html: buildMctTrainerRegistrationEmailHtml(registration, submittedAt),
    attachments: [
      {
        filename: registration.resume.name,
        contentType: registration.resume.contentType,
        contentBytes: registration.resume.contentBytes,
      },
    ],
  });
}

async function sendMctTrainerWelcomeEmail(registration) {
  await sendNotificationEmail({
    from: {
      name: 'Infomeya Learning & Training Team',
      address: CONTACT_FROM_EMAIL,
    },
    to: registration.email,
    subject: 'Welcome to the Infomeya Trainer Network',
    text: buildMctTrainerWelcomeEmailText(registration),
    html: buildMctTrainerWelcomeEmailHtml(registration),
  });
}

async function sendNotificationEmail(message) {
  if (isGraphEmailConfigured()) {
    await sendGraphEmail(message);
    return;
  }

  const transporter = getContactTransporter();
  await verifyContactTransporter(transporter);
  await transporter.sendMail({
    ...message,
    attachments: message.attachments?.map((attachment) => ({
      filename: attachment.filename,
      content: attachment.content || Buffer.from(attachment.contentBytes || '', 'base64'),
      contentType: attachment.contentType,
    })),
  });
}

function isEmailSendingConfigured() {
  return isGraphEmailConfigured() || Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);
}

function isGraphEmailConfigured() {
  return Boolean(GRAPH_FROM_EMAIL && GRAPH_TENANT_ID && GRAPH_CLIENT_ID && GRAPH_CLIENT_SECRET);
}

async function sendGraphEmail(message) {
  validateGraphEmailConfig();

  const accessToken = await getGraphAccessToken();
  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(GRAPH_FROM_EMAIL)}/sendMail`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: toGraphMessage(message),
        saveToSentItems: false,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Microsoft Graph sendMail failed: ${await response.text()}`);
  }
}

async function getGraphAccessToken() {
  const response = await fetch(
    `https://login.microsoftonline.com/${encodeURIComponent(
      GRAPH_TENANT_ID
    )}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: GRAPH_CLIENT_ID,
        client_secret: GRAPH_CLIENT_SECRET,
        grant_type: 'client_credentials',
        scope: 'https://graph.microsoft.com/.default',
      }),
    }
  );

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.access_token) {
    throw new Error(
      `Microsoft Graph token request failed: ${JSON.stringify(payload || { status: response.status })}`
    );
  }

  return payload.access_token;
}

function toGraphMessage(message) {
  const graphMessage = {
    subject: message.subject,
    body: {
      contentType: 'HTML',
      content: message.html || escapeHtml(message.text || ''),
    },
    toRecipients: toGraphRecipients(message.to),
    ccRecipients: message.cc ? toGraphRecipients(message.cc) : undefined,
    replyTo: message.replyTo ? toGraphRecipients(message.replyTo) : undefined,
    attachments: message.attachments?.map(toGraphAttachment),
  };

  if (!graphMessage.attachments?.length) {
    delete graphMessage.attachments;
  }

  if (!graphMessage.replyTo?.length) {
    delete graphMessage.replyTo;
  }

  if (!graphMessage.ccRecipients?.length) {
    delete graphMessage.ccRecipients;
  }

  return graphMessage;
}

function toGraphRecipients(value) {
  const recipients = Array.isArray(value) ? value : [value];

  return recipients
    .map((recipient) => {
      if (typeof recipient === 'string') {
        return {
          emailAddress: {
            address: recipient,
          },
        };
      }

      return {
        emailAddress: {
          name: recipient.name,
          address: recipient.address,
        },
      };
    })
    .filter((recipient) => recipient.emailAddress.address);
}

function toGraphAttachment(attachment) {
  return {
    '@odata.type': '#microsoft.graph.fileAttachment',
    name: attachment.filename,
    contentType: attachment.contentType || 'application/octet-stream',
    contentBytes:
      attachment.contentBytes ||
      Buffer.from(attachment.content || '').toString('base64'),
  };
}

function validateGraphEmailConfig() {
  if (!GRAPH_FROM_EMAIL) {
    throw createContactEmailConfigError('Missing GRAPH_FROM_EMAIL.');
  }

  if (!GRAPH_TENANT_ID) {
    throw createContactEmailConfigError('Missing GRAPH_TENANT_ID.');
  }

  if (!GRAPH_CLIENT_ID) {
    throw createContactEmailConfigError('Missing GRAPH_CLIENT_ID.');
  }

  if (!GRAPH_CLIENT_SECRET) {
    throw createContactEmailConfigError('Missing GRAPH_CLIENT_SECRET.');
  }
}

function getContactTransporter() {
  if (!SMTP_HOST) {
    throw createContactEmailConfigError('Missing SMTP_HOST.');
  }

  if (!SMTP_USER) {
    throw createContactEmailConfigError('Missing SMTP_USER.');
  }

  if (!SMTP_PASS) {
    throw createContactEmailConfigError('Missing SMTP_PASS.');
  }

  if (!CONTACT_TO_EMAIL) {
    throw createContactEmailConfigError('Missing CONTACT_TO_EMAIL.');
  }

  if (!CONTACT_FROM_EMAIL) {
    throw createContactEmailConfigError('Missing CONTACT_FROM_EMAIL.');
  }

  if (!contactTransporter) {
    contactTransporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });
  }

  return contactTransporter;
}

async function verifyContactTransporter(transporter) {
  if (contactTransporterVerified) {
    return;
  }

  await transporter.verify();
  contactTransporterVerified = true;
  console.log('SMTP server is ready to send emails.');
}

function buildContactEmailText(contact, submittedAt) {
  return [
    'New contact form submission',
    '',
    `Name: ${contact.fullName}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phone || 'NA'}`,
    `Service: ${contact.service}`,
    `Submitted at: ${submittedAt}`,
    '',
    'Message:',
    contact.message,
  ].join('\n');
}

function buildContactEmailHtml(contact, submittedAt) {
  const rows = [
    ['Name', contact.fullName],
    ['Email', contact.email],
    ['Phone', contact.phone || 'NA'],
    ['Service', contact.service],
    ['Submitted at', submittedAt],
  ]
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="padding: 8px 12px; border: 1px solid #ddd; background: #f7f7f7;">${escapeHtml(label)}</th>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');

  return `
    <!doctype html>
    <html lang="en">
      <body style="font-family: Arial, sans-serif; color: #222; line-height: 1.5;">
        <h2 style="margin: 0 0 16px;">New contact form submission</h2>
        <table style="border-collapse: collapse; margin-bottom: 18px;">
          ${rows}
        </table>
        <p style="margin: 0 0 8px;"><strong>Message</strong></p>
        <div style="white-space: pre-wrap; border: 1px solid #ddd; padding: 12px;">${escapeHtml(
          contact.message
        )}</div>
      </body>
    </html>`;
}

function buildMctEnrollmentEmailText(enrollment, submittedAt) {
  return [
    'New MCT enrollment request',
    '',
    `Name: ${enrollment.fullName}`,
    `Email: ${enrollment.email}`,
    `Phone: ${enrollment.phone}`,
    `Preferred date/time: ${enrollment.preferredDateTime}`,
    `Subject: ${enrollment.subject}`,
    `Submitted at: ${submittedAt}`,
    '',
    'Message:',
    enrollment.message,
  ].join('\n');
}

function buildMctEnrollmentEmailHtml(enrollment, submittedAt) {
  const rows = [
    ['Name', enrollment.fullName],
    ['Email', enrollment.email],
    ['Phone', enrollment.phone],
    ['Preferred date/time', enrollment.preferredDateTime],
    ['Subject', enrollment.subject],
    ['Submitted at', submittedAt],
  ]
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="padding: 8px 12px; border: 1px solid #ddd; background: #f7f7f7;">${escapeHtml(label)}</th>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');

  return `
    <!doctype html>
    <html lang="en">
      <body style="font-family: Arial, sans-serif; color: #222; line-height: 1.5;">
        <h2 style="margin: 0 0 16px;">New MCT enrollment request</h2>
        <table style="border-collapse: collapse; margin-bottom: 18px;">
          ${rows}
        </table>
        <p style="margin: 0 0 8px;"><strong>Message</strong></p>
        <div style="white-space: pre-wrap; border: 1px solid #ddd; padding: 12px;">${escapeHtml(
          enrollment.message
        )}</div>
      </body>
    </html>`;
}

function buildMctTrainerRegistrationEmailText(registration, submittedAt) {
  return [
    'New Microsoft Certified Trainer registration',
    '',
    `Name: ${registration.fullName}`,
    `Email: ${registration.email}`,
    `Phone: ${registration.phone}`,
    `Country: ${registration.country}`,
    `LinkedIn: ${registration.linkedInProfile || 'NA'}`,
    `MCT ID: ${registration.mctId}`,
    `MCT status: ${registration.mctStatus}`,
    `Years of training experience: ${registration.yearsOfExperience}`,
    `Areas of expertise: ${registration.expertise.join(', ') || 'NA'}`,
    `Preferred training mode: ${registration.preferredTrainingMode}`,
    `Languages spoken: ${registration.languagesSpoken}`,
    `Additional certifications: ${registration.additionalCertifications || 'NA'}`,
    `Resume: ${registration.resume.name}`,
    `Submitted at: ${submittedAt}`,
    '',
    'Professional summary:',
    registration.professionalSummary,
  ].join('\n');
}

function buildMctTrainerRegistrationEmailHtml(registration, submittedAt) {
  const rows = [
    ['Name', registration.fullName],
    ['Email', registration.email],
    ['Phone', registration.phone],
    ['Country', registration.country],
    ['LinkedIn', registration.linkedInProfile || 'NA'],
    ['MCT ID', registration.mctId],
    ['MCT status', registration.mctStatus],
    ['Years of training experience', registration.yearsOfExperience],
    ['Areas of expertise', registration.expertise.join(', ') || 'NA'],
    ['Preferred training mode', registration.preferredTrainingMode],
    ['Languages spoken', registration.languagesSpoken],
    ['Additional certifications', registration.additionalCertifications || 'NA'],
    ['Resume', registration.resume.name],
    ['Submitted at', submittedAt],
  ]
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="padding: 8px 12px; border: 1px solid #ddd; background: #f7f7f7;">${escapeHtml(label)}</th>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');

  return `
    <!doctype html>
    <html lang="en">
      <body style="font-family: Arial, sans-serif; color: #222; line-height: 1.5;">
        <h2 style="margin: 0 0 16px;">New Microsoft Certified Trainer registration</h2>
        <table style="border-collapse: collapse; margin-bottom: 18px;">
          ${rows}
        </table>
        <p style="margin: 0 0 8px;"><strong>Professional summary</strong></p>
        <div style="white-space: pre-wrap; border: 1px solid #ddd; padding: 12px;">${escapeHtml(
          registration.professionalSummary
        )}</div>
      </body>
    </html>`;
}

function buildMctTrainerWelcomeEmailText(registration) {
  return [
    'Hello ' + registration.fullName + ',',
    '',
    'Thank you for registering your interest in joining the Infomeya Trainer Network.',
    '',
    'We are excited to connect with talented Microsoft Certified Trainers from around the world and explore opportunities for collaboration across corporate training engagements, certification bootcamps, workshops, and Microsoft technology programs.',
    '',
    'Our team will review your profile and reach out when opportunities align with your expertise and experience.',
    '',
    'We look forward to working with you and building impactful learning experiences together.',
    '',
    'Best Regards,',
    'Infomeya Learning & Training Team',
    'Infomeya',
  ].join('\n');
}

function buildMctTrainerWelcomeEmailHtml(registration) {
  return `
    <!doctype html>
    <html lang="en">
      <body style="margin: 0; font-family: Arial, sans-serif; color: #222; line-height: 1.55; background: #f5f7fb;">
        <div style="max-width: 640px; margin: 0 auto; padding: 28px 16px;">
          <div style="background: #ffffff; border: 1px solid #e6e8ef; padding: 28px;">
            <h1 style="margin: 0 0 18px; font-size: 26px; color: #111827;">Welcome to the Infomeya Trainer Network</h1>
            <p>Hello ${escapeHtml(registration.fullName)},</p>
            <p>Thank you for registering your interest in joining the Infomeya Trainer Network.</p>
            <p>We are excited to connect with talented Microsoft Certified Trainers from around the world and explore opportunities for collaboration across corporate training engagements, certification bootcamps, workshops, and Microsoft technology programs.</p>
            <p>Our team will review your profile and reach out when opportunities align with your expertise and experience.</p>
            <p>We look forward to working with you and building impactful learning experiences together.</p>
            <p style="margin: 24px 0 0;">Best Regards,<br />Infomeya Learning &amp; Training Team<br />Infomeya</p>
          </div>
        </div>
      </body>
    </html>`;
}

function createContactEmailConfigError(message) {
  const error = new Error(message);
  error.code = 'CONTACT_EMAIL_CONFIG_ERROR';
  return error;
}

function isContactEmailConfigError(error) {
  return Boolean(
    error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'CONTACT_EMAIL_CONFIG_ERROR'
  );
}

function validateContactPayload(data) {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Request body is required.' };
  }

  const fullName = typeof data.fullName === 'string' ? data.fullName.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const phone = typeof data.phone === 'string' ? data.phone.trim() : '';
  const service = typeof data.service === 'string' ? data.service.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';

  if (!fullName) {
    return { ok: false, error: 'Full name is required.' };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'A valid email address is required.' };
  }

  if (!service) {
    return { ok: false, error: 'Service is required.' };
  }

  if (!message) {
    return { ok: false, error: 'Message is required.' };
  }

  return {
    ok: true,
    data: {
      fullName,
      email,
      phone,
      service,
      message,
    },
  };
}

function validateMctEnrollmentPayload(data) {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Request body is required.' };
  }

  const fullName = getObjectString(data, 'fullName');
  const email = getObjectString(data, 'email').toLowerCase();
  const phone = getObjectString(data, 'phone');
  const preferredDateTime = getObjectString(data, 'preferredDateTime');
  const subject = getObjectString(data, 'subject') || 'MCT Enrollment Inquiry';
  const message = getObjectString(data, 'message');

  if (!fullName) {
    return { ok: false, error: 'Full name is required.' };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'A valid email address is required.' };
  }

  if (!phone) {
    return { ok: false, error: 'Phone number is required.' };
  }

  if (!preferredDateTime) {
    return { ok: false, error: 'Preferred date/time is required.' };
  }

  if (!message) {
    return { ok: false, error: 'Message is required.' };
  }

  return {
    ok: true,
    data: {
      fullName,
      email,
      phone,
      preferredDateTime,
      subject,
      message,
    },
  };
}

async function validateMctTrainerRegistrationPayload(data) {
  const fullName = getFormString(data, 'fullName');
  const email = getFormString(data, 'email').toLowerCase();
  const phone = getFormString(data, 'phone');
  const country = getFormString(data, 'country');
  const linkedInProfile = getFormString(data, 'linkedInProfile');
  const mctId = getFormString(data, 'mctId');
  const mctStatus = getFormString(data, 'mctStatus');
  const yearsOfExperience = getFormString(data, 'yearsOfExperience');
  const expertise = data
    .getAll('expertise')
    .map((value) => (typeof value === 'string' ? value.trim() : ''))
    .filter(Boolean);
  const preferredTrainingMode = getFormString(data, 'preferredTrainingMode');
  const languagesSpoken = getFormString(data, 'languagesSpoken');
  const additionalCertifications = getFormString(data, 'additionalCertifications');
  const professionalSummary = getFormString(data, 'professionalSummary');
  const resumeFile = data.get('resume');

  if (!fullName) {
    return { ok: false, error: 'Full name is required.' };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'A valid email address is required.' };
  }

  if (!phone) {
    return { ok: false, error: 'Phone number is required.' };
  }

  if (!country) {
    return { ok: false, error: 'Country is required.' };
  }

  if (!mctId) {
    return { ok: false, error: 'Microsoft Certified Trainer ID is required.' };
  }

  if (!mctStatus) {
    return { ok: false, error: 'MCT status is required.' };
  }

  if (!yearsOfExperience) {
    return { ok: false, error: 'Years of training experience is required.' };
  }

  if (!expertise.length) {
    return { ok: false, error: 'Please select at least one area of expertise.' };
  }

  if (!preferredTrainingMode) {
    return { ok: false, error: 'Preferred training mode is required.' };
  }

  if (!languagesSpoken) {
    return { ok: false, error: 'Languages spoken is required.' };
  }

  if (!isUploadedFile(resumeFile)) {
    return { ok: false, error: 'Resume upload is required.' };
  }

  const maxResumeBytes = 10 * 1024 * 1024;

  if (resumeFile.size > maxResumeBytes) {
    return { ok: false, error: 'Resume must be 10 MB or smaller.' };
  }

  return {
    ok: true,
    data: {
      fullName,
      email,
      phone,
      country,
      linkedInProfile,
      mctId,
      mctStatus,
      yearsOfExperience,
      expertise,
      preferredTrainingMode,
      languagesSpoken,
      additionalCertifications,
      professionalSummary,
      resume: {
        name: sanitizeAttachmentName(resumeFile.name || 'resume'),
        contentType: resumeFile.type || 'application/octet-stream',
        contentBytes: Buffer.from(await resumeFile.arrayBuffer()).toString('base64'),
      },
    },
  };
}

function safeJson(req) {
  return req
    .json()
    .then((data) => ({ ok: true, data }))
    .catch(() => ({ ok: false }));
}

function safeFormData(req) {
  return req
    .formData()
    .then((data) => ({ ok: true, data }))
    .catch(() => ({ ok: false }));
}

function json(status, data, req = null) {
  return withCors(
    req,
    new Response(JSON.stringify(data, null, 2), {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
        'Surrogate-Control': 'no-store',
      },
    })
  );
}

function withCors(req, response) {
  const nextHeaders = new Headers(response.headers);
  const requestOrigin = req?.headers.get('origin');
  const requestHeaders = req?.headers.get('access-control-request-headers');
  const isAllowedLocalhostOrigin =
    typeof requestOrigin === 'string' &&
    /^http:\/\/(?:localhost|127\.0\.0\.1):\d+$/.test(requestOrigin);

  const allowOrigin =
    requestOrigin && (ALLOWED_ORIGINS.includes(requestOrigin) || isAllowedLocalhostOrigin)
      ? requestOrigin
      : ALLOWED_ORIGINS[0] || 'http://localhost:5173';

  nextHeaders.set('Access-Control-Allow-Origin', allowOrigin);
  nextHeaders.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  nextHeaders.set('Access-Control-Allow-Headers', buildAllowedCorsHeaders(requestHeaders));
  nextHeaders.set('Vary', 'Origin');

  return new Response(response.body, {
    status: response.status,
    headers: nextHeaders,
  });
}

function ensureDataStore() {
  if (!existsSync(dataDir)) {
    try {
      mkdirSync(dataDir, { recursive: true });
    } catch (error) {
      if (!isPermissionError(error)) {
        throw error;
      }

      const fallbackDataDir = join(__dirname, 'data');

      if (dataDir === fallbackDataDir) {
        throw error;
      }

      console.warn(
        `Cannot write to CMS_DATA_DIR "${dataDir}". Falling back to "${fallbackDataDir}".`
      );

      dataDir = fallbackDataDir;
      setDataStorePaths(dataDir);
      mkdirSync(dataDir, { recursive: true });
    }
  }

  ensureJsonFile(careerOpeningsFile, []);
  ensureJsonFile(careerApplicationsFile, []);
  ensureJsonFile(careersSettingsFile, DEFAULT_CAREERS_SETTINGS);
  ensureJsonFile(blogPostsFile, []);
  ensureJsonFile(blogCommentsFile, []);

  if (!existsSync(newsletterStoreFile)) {
    writeFileSync(newsletterStoreFile, '', 'utf8');
  }
}

function setDataStorePaths(directory) {
  careerOpeningsFile = join(directory, 'career-openings.json');
  careerApplicationsFile = join(directory, 'career-applications.json');
  careersSettingsFile = join(directory, 'careers-settings.json');
  blogPostsFile = join(directory, 'blog-posts.json');
  blogCommentsFile = join(directory, 'blog-comments.json');
  newsletterStoreFile = join(directory, 'newsletter-subscribers.jsonl');
}

async function getMongoDb() {
  if (!MONGODB_URI) {
    return null;
  }

  if (mongoDb) {
    return mongoDb;
  }

  if (!mongoConnectionPromise) {
    mongoConnectionPromise = MongoClient.connect(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
      },
    })
      .then((client) => {
        mongoClient = client;
        mongoDb = client.db(MONGODB_DB_NAME);
        console.log(`MongoDB connected: ${MONGODB_DB_NAME}`);
        return mongoDb;
      })
      .catch((error) => {
        console.error(
          MONGODB_REQUIRE_CONNECTION
            ? 'MongoDB connection failed. CMS storage is unavailable:'
            : 'MongoDB connection failed. Falling back to JSON storage:',
          error
        );
        mongoConnectionPromise = null;

        if (MONGODB_REQUIRE_CONNECTION) {
          throw error;
        }

        return null;
      });
  }

  return mongoConnectionPromise;
}

async function getCollection(name) {
  const db = await getMongoDb();
  return db ? db.collection(name) : null;
}

async function ensureMongoIndexes() {
  const db = await getMongoDb();

  if (!db) {
    return;
  }

  await Promise.all([
    db.collection('careerOpenings').createIndex({ id: 1 }, { unique: true }),
    db.collection('careerOpenings').createIndex({ slug: 1 }),
    db.collection('careerApplications').createIndex({ id: 1 }, { unique: true }),
    db.collection('careerApplications').createIndex({ submittedAt: -1 }),
    db.collection('careersSettings').createIndex({ id: 1 }, { unique: true }),
    db.collection('blogPosts').createIndex({ id: 1 }, { unique: true }),
    db.collection('blogPosts').createIndex({ slug: 1 }),
    db.collection('blogComments').createIndex({ id: 1 }, { unique: true }),
    db.collection('blogComments').createIndex({ postSlug: 1, createdAt: -1 }),
    db.collection('newsletterSubscriptions').createIndex({ email: 1 }, { unique: true }),
    db.collection('contactSubmissions').createIndex({ submittedAt: -1 }),
  ]);
}

function withoutMongoId(document) {
  if (!document || typeof document !== 'object') {
    return document;
  }

  const { _id, ...rest } = document;
  return rest;
}

async function readCollectionArray(collectionName, filePath, fallback = []) {
  const collection = await getCollection(collectionName);

  if (collection) {
    if (
      MONGODB_IMPORT_JSON_ON_EMPTY &&
      !hydratedMongoCollections.has(collectionName) &&
      existsSync(filePath)
    ) {
      const count = await collection.estimatedDocumentCount();
      const existingData = readJsonArrayFile(filePath, fallback);

      if (count === 0 && existingData.length) {
        await collection.insertMany(existingData, { ordered: false });
      }

      hydratedMongoCollections.add(collectionName);
    }

    return collection.find({}, { projection: { _id: 0 } }).toArray();
  }

  return readJsonArrayFile(filePath, fallback);
}

async function replaceCollectionArray(collectionName, filePath, data) {
  const collection = await getCollection(collectionName);

  if (collection) {
    await collection.deleteMany({});
    if (data.length) {
      await collection.insertMany(data, { ordered: false });
    }
    return;
  }

  writeJsonFile(filePath, data);
}

async function readCollectionObject(collectionName, filePath, fallback = {}) {
  const collection = await getCollection(collectionName);

  if (collection) {
    const document = await collection.findOne({ id: 'settings' }, { projection: { _id: 0 } });

    if (document) {
      return withoutMongoId(document);
    }

    const existingData = readJsonObjectFile(filePath, fallback);
    await collection.updateOne(
      { id: 'settings' },
      { $set: { id: 'settings', ...existingData } },
      { upsert: true }
    );
    return existingData;
  }

  return readJsonObjectFile(filePath, fallback);
}

async function writeCollectionObject(collectionName, filePath, data) {
  const collection = await getCollection(collectionName);

  if (collection) {
    await collection.updateOne(
      { id: 'settings' },
      { $set: { id: 'settings', ...data } },
      { upsert: true }
    );
    return;
  }

  writeJsonFile(filePath, data);
}


function parseBoolean(value, fallback = false) {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  return ['1', 'true', 'yes', 'on'].includes(String(value).trim().toLowerCase());
}

function parseCsvList(value, fallback = []) {
  if (!value || typeof value !== 'string') {
    return fallback;
  }

  const items = value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);

  return items.length ? items : fallback;
}

function normalizeSiteUrl(value) {
  const normalized = normalizeString(value).replace(/\/+$/, '');
  return normalized || 'https://www.infomeya.com';
}

function buildPublicUrl(path) {
  const normalizedPath = `/${String(path || '').replace(/^\/+/, '')}`;
  return `${PUBLIC_SITE_URL}${normalizedPath}`;
}

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isPermissionError(error) {
  return error?.code === 'EACCES' || error?.code === 'EPERM';
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[char];
  });
}

function sanitizeEmailHeaderValue(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim();
}

function loadEnvFiles(filePaths) {
  for (const filePath of filePaths) {
    loadEnvFile(filePath);
  }
}

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  const lines = readFileSync(filePath, 'utf8').split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = unquoteEnvValue(trimmed.slice(separatorIndex + 1).trim());

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function unquoteEnvValue(value) {
  const first = value.at(0);
  const last = value.at(-1);

  if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
    return value.slice(1, -1);
  }

  return value;
}

async function handleCareerApplication(req) {
  const body = await safeFormData(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid application form submission.' }, req);
  }

  const validation = await validateCareerApplicationPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  try {
    const record = await persistCareerApplicationRecord(validation.data);

    try {
      await sendCareerApplicationEmail(validation.data, record);
    } catch (error) {
      console.error('Career application email delivery failed:', error);
    }

    return json(
      200,
      {
        ok: true,
        message: 'Thank you for applying. Our HR team will review your details and contact you soon.',
      },
      req
    );
  } catch (error) {
    console.error('Career application persistence failed:', error);
    return json(500, { error: 'Unable to save your application right now.' }, req);
  }
}

async function handleCareerOpeningsRequest(req) {
  const openings = (await readCareerOpenings())
    .filter((opening) => opening.status === 'active')
    .sort((left, right) =>
      (right.postedAt || right.updatedAt).localeCompare(left.postedAt || left.updatedAt)
    );

  return json(200, { ok: true, openings }, req);
}

async function handleAdminCareerOpeningsList(req) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  const openings = (await readCareerOpenings()).sort((left, right) =>
    right.updatedAt.localeCompare(left.updatedAt)
  );
  return json(200, { ok: true, openings }, req);
}

async function handleAdminCareerOpeningCreate(req) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateCareerOpeningPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  const openings = await readCareerOpenings();
  const now = new Date().toISOString();
  const opening = {
    id: randomUUID(),
    ...validation.data,
    postedAt: validation.data.postedAt || now,
    updatedAt: now,
  };

  await saveCareerOpening(opening, [opening, ...openings]);

  if (opening.status === 'active') {
    await safelyNotifyNewsletterSubscribers('job opening', () =>
      sendJobOpeningNewsletterEmail(opening)
    );
  }

  return json(200, { ok: true, opening }, req);
}

async function handleAdminCareerOpeningUpdate(req, openingId) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateCareerOpeningPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  const openings = await readCareerOpenings();
  const currentOpening = openings.find((opening) => opening.id === openingId);

  if (!currentOpening) {
    return json(404, { error: 'Opening not found.' }, req);
  }

  const opening = {
    ...currentOpening,
    ...validation.data,
    postedAt: validation.data.postedAt || currentOpening.postedAt || currentOpening.updatedAt,
    updatedAt: new Date().toISOString(),
  };

  await saveCareerOpening(
    opening,
    openings.map((item) => (item.id === openingId ? opening : item))
  );

  if (currentOpening.status !== 'active' && opening.status === 'active') {
    await safelyNotifyNewsletterSubscribers('job opening', () =>
      sendJobOpeningNewsletterEmail(opening)
    );
  }

  return json(200, { ok: true, opening }, req);
}

async function handleAdminCareerOpeningDelete(req, openingId) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  const openings = await readCareerOpenings();

  if (!openings.some((opening) => opening.id === openingId)) {
    return json(404, { error: 'Opening not found.' }, req);
  }

  await deleteCareerOpening(openingId, openings.filter((opening) => opening.id !== openingId));
  return json(200, { ok: true }, req);
}

async function handleAdminCareerApplicationsList(req) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  const applications = (await readCareerApplications()).sort((left, right) =>
    right.submittedAt.localeCompare(left.submittedAt)
  );
  return json(200, { ok: true, applications }, req);
}

async function handleAdminCareerApplicationUpdate(req, applicationId) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateCareerApplicationStatusPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  const applications = await readCareerApplications();
  const currentApplication = applications.find((item) => item.id === applicationId);

  if (!currentApplication) {
    return json(404, { error: 'Application not found.' }, req);
  }

  const application = {
    ...currentApplication,
    status: validation.data.status,
    updatedAt: new Date().toISOString(),
  };

  await saveCareerApplication(
    application,
    applications.map((item) => (item.id === applicationId ? application : item))
  );

  return json(200, { ok: true, application }, req);
}

async function handleAdminCareersSettingsGet(req) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  return json(200, { ok: true, settings: await readCareersSettings() }, req);
}

async function handleAdminCareersSettingsUpdate(req) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateCareersSettingsPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  await writeCareersSettings(validation.data);
  return json(200, { ok: true, settings: validation.data }, req);
}

async function handleBlogPostsRequest(req) {
  const posts = (await readBlogPosts())
    .filter((post) => post.status === 'published')
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));

  return json(200, { ok: true, posts }, req);
}

async function handleBlogPostDetailsRequest(req, slug) {
  const post = (await readBlogPosts()).find(
    (item) => item.slug === slug && item.status === 'published'
  );

  if (!post) {
    return json(404, { error: 'Blog post not found.' }, req);
  }

  return json(200, { ok: true, post }, req);
}

async function handleBlogCommentsList(req, slug) {
  const post = (await readBlogPosts()).find(
    (item) => item.slug === slug && item.status === 'published'
  );

  if (!post) {
    return json(404, { error: 'Blog post not found.' }, req);
  }

  const comments = (await readBlogComments())
    .filter((comment) => comment.postSlug === slug && comment.status === 'approved')
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));

  return json(200, { ok: true, comments }, req);
}

async function handleBlogCommentCreate(req, slug) {
  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateBlogCommentPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  const post = (await readBlogPosts()).find(
    (item) => item.slug === slug && item.status === 'published'
  );

  if (!post) {
    return json(404, { error: 'Blog post not found.' }, req);
  }

  const now = new Date().toISOString();
  const comment = {
    id: randomUUID(),
    postSlug: slug,
    firstName: validation.data.firstName,
    lastName: validation.data.lastName,
    fullName: `${validation.data.firstName} ${validation.data.lastName}`.trim(),
    email: validation.data.email,
    phone: validation.data.phone,
    message: validation.data.message,
    status: 'approved',
    createdAt: now,
    updatedAt: now,
  };

  const comments = await readBlogComments();
  await saveBlogComment(comment, [comment, ...comments]);
  return json(201, { ok: true, comment }, req);
}

async function handleAdminBlogPostsList(req) {
  const authError = validateAdminRequest(req, 'blog');

  if (authError) {
    return authError;
  }

  const posts = (await readBlogPosts()).sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  return json(200, { ok: true, posts }, req);
}

async function handleAdminBlogPostCreate(req) {
  const authError = validateAdminRequest(req, 'blog');

  if (authError) {
    return authError;
  }

  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateBlogPostPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  const posts = await readBlogPosts();
  const now = new Date().toISOString();
  const post = {
    id: randomUUID(),
    ...validation.data,
    publishedAt: validation.data.status === 'published' ? now : '',
    createdAt: now,
    updatedAt: now,
  };

  await saveBlogPost(post, [post, ...posts]);

  if (post.status === 'published') {
    await safelyNotifyNewsletterSubscribers('blog post', () =>
      sendBlogPostNewsletterEmail(post)
    );
  }

  return json(200, { ok: true, post }, req);
}

async function handleAdminBlogPostUpdate(req, postId) {
  const authError = validateAdminRequest(req, 'blog');

  if (authError) {
    return authError;
  }

  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateBlogPostPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  const posts = await readBlogPosts();
  const currentPost = posts.find((post) => post.id === postId);

  if (!currentPost) {
    return json(404, { error: 'Post not found.' }, req);
  }

  const now = new Date().toISOString();
  const post = {
    ...currentPost,
    ...validation.data,
    publishedAt:
      validation.data.status === 'published'
        ? currentPost.publishedAt || now
        : currentPost.publishedAt,
    updatedAt: now,
  };

  await saveBlogPost(post, posts.map((item) => (item.id === postId ? post : item)));

  if (currentPost.status !== 'published' && post.status === 'published') {
    await safelyNotifyNewsletterSubscribers('blog post', () =>
      sendBlogPostNewsletterEmail(post)
    );
  }

  return json(200, { ok: true, post }, req);
}

async function handleAdminBlogPostDelete(req, postId) {
  const authError = validateAdminRequest(req, 'blog');

  if (authError) {
    return authError;
  }

  const posts = await readBlogPosts();

  if (!posts.some((post) => post.id === postId)) {
    return json(404, { error: 'Post not found.' }, req);
  }

  await deleteBlogPost(postId, posts.filter((post) => post.id !== postId));
  return json(200, { ok: true }, req);
}

async function handleAdminBlogImageUpload(req) {
  const authError = validateAdminRequest(req, 'blog');

  if (authError) {
    return authError;
  }

  const body = await safeFormData(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid upload request.' }, req);
  }

  const imageFile = body.data.get('image');

  if (!isUploadedFile(imageFile)) {
    return json(400, { error: 'A blog image is required.' }, req);
  }

  try {
    const image = await uploadBlogImageToCloudinary(imageFile);
    return json(200, { ok: true, image }, req);
  } catch (error) {
    return json(
      500,
      {
        error: error instanceof Error ? error.message : 'Unable to upload this image right now.',
      },
      req
    );
  }
}

async function handleNewsletterSubscribe(req) {
  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateNewsletterPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  if (validation.data.isBotSubmission) {
    return json(
      200,
      {
        ok: true,
        message: 'Thank you for subscribing to the Infomeya newsletter.',
      },
      req
    );
  }

  const existingSubscription = await getExistingNewsletterSubscription(validation.data.email);

  if (existingSubscription?.status === 'subscribed') {
    return json(
      200,
      {
        ok: true,
        alreadySubscribed: true,
        message: 'You are already subscribed to the Infomeya newsletter.',
      },
      req
    );
  }

  const subscription = {
    id: randomUUID(),
    email: validation.data.email,
    source: validation.data.source,
    status: 'subscribed',
    subscribedAt: new Date().toISOString(),
  };

  await persistNewsletterSubscription(subscription);

  try {
    await sendNewsletterSubscriptionEmail(subscription);
  } catch (error) {
    console.error('Newsletter email delivery failed:', error);
  }

  return json(
    200,
    {
      ok: true,
      message: 'Thank you for subscribing to the Infomeya newsletter.',
    },
    req
  );
}

async function sendCareerApplicationEmail(application, record) {
  const settings = await readCareersSettings();
  const submittedAt = new Date(record.submittedAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const targetEmail = settings.notificationEmail || HR_TO_EMAIL;

  await sendNotificationEmail({
    from: {
      name: 'Infomeya Careers',
      address: CONTACT_FROM_EMAIL,
    },
    to: targetEmail,
    replyTo: {
      name: sanitizeEmailHeaderValue(application.fullName),
      address: application.email,
    },
    subject: `Career application for ${sanitizeEmailHeaderValue(
      application.appliedPosition || application.roleTitle
    )}`,
    text: buildCareerApplicationEmailText(application, submittedAt),
    html: buildCareerApplicationEmailHtml(application, submittedAt),
    attachments: [
      {
        filename: application.resume.name,
        contentBytes: application.resume.contentBytes,
        contentType: application.resume.contentType,
      },
    ],
  });
}

async function sendNewsletterSubscriptionEmail(subscription) {
  if (!isEmailSendingConfigured() || !NEWSLETTER_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return;
  }

  const subscribedAt = new Date(subscription.subscribedAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  await sendNotificationEmail({
    from: {
      name: 'Infomeya Website',
      address: CONTACT_FROM_EMAIL,
    },
    to: NEWSLETTER_TO_EMAIL,
    subject: `New newsletter subscription: ${sanitizeEmailHeaderValue(subscription.email)}`,
    text: buildNewsletterSubscriptionEmailText(subscription, subscribedAt),
    html: buildNewsletterSubscriptionEmailHtml(subscription, subscribedAt),
  });
}

async function safelyNotifyNewsletterSubscribers(label, sendEmail) {
  try {
    const result = await sendEmail();

    if (result?.sent || result?.failed) {
      console.log(
        `Newsletter ${label} notification complete. Sent: ${result.sent}, failed: ${result.failed}.`
      );
    }
  } catch (error) {
    console.error(`Newsletter ${label} notification failed:`, error);
  }
}

async function sendBlogPostNewsletterEmail(post) {
  const url = buildPublicUrl(`/blog/${post.slug}`);

  return sendNewsletterBroadcast({
    subject: `New blog from Infomeya: ${sanitizeEmailHeaderValue(post.title)}`,
    text: buildBlogPostNewsletterText(post, url),
    html: buildBlogPostNewsletterHtml(post, url),
  });
}

async function sendJobOpeningNewsletterEmail(opening) {
  const url = buildPublicUrl(`/careers/${opening.slug}`);

  return sendNewsletterBroadcast({
    subject: `New job opening at Infomeya: ${sanitizeEmailHeaderValue(opening.title)}`,
    text: buildJobOpeningNewsletterText(opening, url),
    html: buildJobOpeningNewsletterHtml(opening, url),
  });
}

async function sendNewsletterBroadcast(message) {
  if (!isEmailSendingConfigured() || !CONTACT_FROM_EMAIL) {
    return { sent: 0, failed: 0, skipped: true };
  }

  const subscribers = await readNewsletterSubscribers();
  let sent = 0;
  let failed = 0;

  for (const subscriber of subscribers) {
    try {
      await sendNotificationEmail({
        from: {
          name: 'Infomeya Newsletter',
          address: CONTACT_FROM_EMAIL,
        },
        to: subscriber.email,
        ...message,
      });
      sent += 1;
    } catch (error) {
      failed += 1;
      console.error(`Newsletter delivery failed for ${subscriber.email}:`, error);
    }
  }

  return { sent, failed, skipped: false };
}

function buildCareerApplicationEmailText(application, submittedAt) {
  return [
    'New career application received',
    '',
    `Name: ${application.fullName}`,
    `Email: ${application.email}`,
    `Phone: ${application.phone}`,
    `Role: ${application.roleTitle}`,
    `Role slug: ${application.roleSlug}`,
    `Applied position: ${application.appliedPosition || 'NA'}`,
    `Submitted at: ${submittedAt}`,
    '',
    'Message:',
    application.message || 'NA',
  ].join('\n');
}

function buildCareerApplicationEmailHtml(application, submittedAt) {
  const rows = [
    ['Name', application.fullName],
    ['Email', application.email],
    ['Phone', application.phone],
    ['Role', application.roleTitle],
    ['Role slug', application.roleSlug],
    ['Applied position', application.appliedPosition || 'NA'],
    ['Submitted at', submittedAt],
  ]
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="padding: 8px 12px; border: 1px solid #ddd; background: #f7f7f7;">${escapeHtml(label)}</th>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');

  return `
    <!doctype html>
    <html lang="en">
      <body style="font-family: Arial, sans-serif; color: #222; line-height: 1.5;">
        <h2 style="margin: 0 0 16px;">New career application received</h2>
        <table style="border-collapse: collapse; margin-bottom: 18px;">
          ${rows}
        </table>
        <p style="margin: 0 0 8px;"><strong>Message</strong></p>
        <div style="white-space: pre-wrap; border: 1px solid #ddd; padding: 12px;">${escapeHtml(
          application.message || 'NA'
        )}</div>
      </body>
    </html>`;
}

function buildNewsletterSubscriptionEmailText(subscription, subscribedAt) {
  return [
    'New newsletter subscription',
    '',
    `Email: ${subscription.email}`,
    `Source: ${subscription.source}`,
    `Subscribed at: ${subscribedAt}`,
  ].join('\n');
}

function buildNewsletterSubscriptionEmailHtml(subscription, subscribedAt) {
  const rows = [
    ['Email', subscription.email],
    ['Source', subscription.source],
    ['Subscribed at', subscribedAt],
  ]
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="padding: 8px 12px; border: 1px solid #ddd; background: #f7f7f7;">${escapeHtml(label)}</th>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');

  return `
    <!doctype html>
    <html lang="en">
      <body style="font-family: Arial, sans-serif; color: #222; line-height: 1.5;">
        <h2 style="margin: 0 0 16px;">New newsletter subscription</h2>
        <table style="border-collapse: collapse;">${rows}</table>
      </body>
    </html>`;
}

function validateNewsletterPayload(data) {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Request body is required.' };
  }

  const email = getObjectString(data, 'email').toLowerCase();
  const source = getObjectString(data, 'source') || 'website-footer';
  const website = getObjectString(data, 'website');

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'A valid email address is required.' };
  }

  return {
    ok: true,
    data: {
      email,
      source,
      isBotSubmission: Boolean(website),
    },
  };
}

function validateCareerOpeningPayload(data) {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Request body is required.' };
  }

  const title = getObjectString(data, 'title');
  const slug = sanitizeSlug(getObjectString(data, 'slug') || title);
  const type = getObjectString(data, 'type');
  const location = getObjectString(data, 'location');
  const department = getObjectString(data, 'department');
  const experience = getObjectString(data, 'experience');
  const description = getObjectString(data, 'description');
  const fullDescription = getObjectString(data, 'fullDescription');
  const responsibilities = normalizeStringArray(data.responsibilities);
  const requirements = normalizeStringArray(data.requirements);
  const status = getObjectString(data, 'status') === 'draft' ? 'draft' : 'active';
  const featured = Boolean(data.featured);
  const postedAt = getObjectString(data, 'postedAt');
  const linkedinUrl = getObjectString(data, 'linkedinUrl');

  if (!title || !slug || !type || !location || !department || !experience) {
    return { ok: false, error: 'All job overview fields are required.' };
  }

  if (!fullDescription) {
    return { ok: false, error: 'Job full description is required.' };
  }

  if (!responsibilities.length || !requirements.length) {
    return { ok: false, error: 'Responsibilities and requirements are required.' };
  }

  if (postedAt && Number.isNaN(new Date(postedAt).getTime())) {
    return { ok: false, error: 'Posted date must be a valid date and time.' };
  }

  if (linkedinUrl && !/^https:\/\/([\w-]+\.)?linkedin\.com\//i.test(linkedinUrl)) {
    return { ok: false, error: 'LinkedIn job URL must be a valid linkedin.com link.' };
  }

  return {
    ok: true,
    data: {
      slug,
      title,
      type,
      location,
      department,
      experience,
      description,
      fullDescription,
      responsibilities,
      requirements,
      status,
      featured,
      postedAt: postedAt ? new Date(postedAt).toISOString() : '',
      linkedinUrl,
    },
  };
}

function validateCareerApplicationStatusPayload(data) {
  const status = getObjectString(data, 'status');
  const allowedStatuses = new Set(['new', 'reviewed', 'contacted', 'archived']);

  if (!allowedStatuses.has(status)) {
    return { ok: false, error: 'A valid application status is required.' };
  }

  return {
    ok: true,
    data: {
      status,
    },
  };
}

function validateCareersSettingsPayload(data) {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Settings payload is required.' };
  }

  const careersPageTitle = getObjectString(data, 'careersPageTitle');
  const careersPageSubtitle = getObjectString(data, 'careersPageSubtitle');
  const generalCtaTitle = getObjectString(data, 'generalCtaTitle');
  const generalCtaDescription = getObjectString(data, 'generalCtaDescription');
  const notificationEmail = getObjectString(data, 'notificationEmail');

  if (!careersPageTitle || !careersPageSubtitle || !generalCtaTitle || !generalCtaDescription) {
    return { ok: false, error: 'All careers settings fields are required.' };
  }

  if (!notificationEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(notificationEmail)) {
    return { ok: false, error: 'A valid notification email is required.' };
  }

  return {
    ok: true,
    data: {
      careersPageTitle,
      careersPageSubtitle,
      generalCtaTitle,
      generalCtaDescription,
      notificationEmail,
    },
  };
}

async function validateCareerApplicationPayload(data) {
  const fullName = getFormString(data, 'fullName');
  const email = getFormString(data, 'email').toLowerCase();
  const phone = getFormString(data, 'phone');
  const roleTitle = getFormString(data, 'roleTitle');
  const roleSlug = getFormString(data, 'roleSlug');
  const appliedPosition = getFormString(data, 'appliedPosition');
  const message = getFormString(data, 'message');
  const resumeFile = data.get('resume');

  if (!fullName) {
    return { ok: false, error: 'Full name is required.' };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'A valid email address is required.' };
  }

  if (!phone) {
    return { ok: false, error: 'Phone number is required.' };
  }

  if (!roleTitle) {
    return { ok: false, error: 'Role title is required.' };
  }

  if (!roleSlug) {
    return { ok: false, error: 'Role slug is required.' };
  }

  if (roleSlug === 'general-application' && !appliedPosition) {
    return { ok: false, error: 'Please enter the position you want to apply for.' };
  }

  if (!isUploadedFile(resumeFile)) {
    return { ok: false, error: 'Resume/CV is required.' };
  }

  const maxResumeBytes = 10 * 1024 * 1024;

  if (resumeFile.size > maxResumeBytes) {
    return { ok: false, error: 'Resume must be 10 MB or smaller.' };
  }

  return {
    ok: true,
    data: {
      fullName,
      email,
      phone,
      roleTitle,
      roleSlug,
      appliedPosition,
      message,
      resume: {
        name: sanitizeAttachmentName(resumeFile.name || 'resume'),
        contentType: resumeFile.type || 'application/octet-stream',
        contentBytes: Buffer.from(await resumeFile.arrayBuffer()).toString('base64'),
      },
    },
  };
}

function validateBlogPostPayload(data) {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Request body is required.' };
  }

  const title = getObjectString(data, 'title');
  const slug = sanitizeSlug(getObjectString(data, 'slug') || title);
  const excerpt = getObjectString(data, 'excerpt');
  const content = getObjectString(data, 'content');
  const category = getObjectString(data, 'category');
  const authorName = getObjectString(data, 'authorName');
  const imageUrl = getObjectString(data, 'imageUrl');
  const imagePublicId = getObjectString(data, 'imagePublicId');
  const seoTitle = getObjectString(data, 'seoTitle');
  const seoDescription = getObjectString(data, 'seoDescription');
  const status = getObjectString(data, 'status') === 'draft' ? 'draft' : 'published';
  const featured = Boolean(data.featured);
  const tags = normalizeStringArray(data.tags);

  if (!title || !slug || !excerpt || !content || !category || !authorName || !imageUrl) {
    return { ok: false, error: 'All required blog post fields must be filled in.' };
  }

  return {
    ok: true,
    data: {
      slug,
      title,
      excerpt,
      content,
      category,
      tags,
      authorName,
      imageUrl,
      imagePublicId,
      seoTitle,
      seoDescription,
      status,
      featured,
    },
  };
}

function validateBlogCommentPayload(data) {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Request body is required.' };
  }

  const firstName = getObjectString(data, 'firstName');
  const lastName = getObjectString(data, 'lastName');
  const email = getObjectString(data, 'email').toLowerCase();
  const phone = getObjectString(data, 'phone');
  const message = getObjectString(data, 'message');
  const website = getObjectString(data, 'website');

  if (website) {
    return { ok: false, error: 'Invalid comment submission.' };
  }

  if (!firstName || !lastName) {
    return { ok: false, error: 'First and last name are required.' };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'A valid email address is required.' };
  }

  if (!message) {
    return { ok: false, error: 'Comment is required.' };
  }

  if (message.length > 2000) {
    return { ok: false, error: 'Comment must be 2000 characters or fewer.' };
  }

  return {
    ok: true,
    data: {
      firstName: firstName.slice(0, 80),
      lastName: lastName.slice(0, 80),
      email: email.slice(0, 254),
      phone: phone.slice(0, 40),
      message: message.slice(0, 2000),
    },
  };
}

function buildBlogPostNewsletterText(post, url) {
  return [
    'New blog post from Infomeya',
    '',
    post.title,
    '',
    post.excerpt,
    '',
    `Read more: ${url}`,
  ].join('\n');
}

function buildBlogPostNewsletterHtml(post, url) {
  return buildNewsletterAnnouncementHtml({
    eyebrow: 'New Blog Post',
    title: post.title,
    description: post.excerpt,
    ctaLabel: 'Read the blog',
    url,
  });
}

function buildJobOpeningNewsletterText(opening, url) {
  return [
    'New job opening at Infomeya',
    '',
    opening.title,
    '',
    `${opening.department} | ${opening.location} | ${opening.experience}`,
    '',
    opening.description,
    '',
    `View role: ${url}`,
  ].join('\n');
}

function buildJobOpeningNewsletterHtml(opening, url) {
  return buildNewsletterAnnouncementHtml({
    eyebrow: 'New Job Opening',
    title: opening.title,
    description: opening.description,
    details: [opening.department, opening.location, opening.experience].filter(Boolean).join(' | '),
    ctaLabel: 'View role',
    url,
  });
}

function buildNewsletterAnnouncementHtml({ eyebrow, title, description, details = '', ctaLabel, url }) {
  return `
    <!doctype html>
    <html lang="en">
      <body style="margin: 0; font-family: Arial, sans-serif; color: #222; line-height: 1.5; background: #f5f7fb;">
        <div style="max-width: 640px; margin: 0 auto; padding: 28px 16px;">
          <div style="background: #ffffff; border: 1px solid #e6e8ef; padding: 28px;">
            <p style="margin: 0 0 10px; color: #0f52ba; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em;">${escapeHtml(
              eyebrow
            )}</p>
            <h1 style="margin: 0 0 14px; font-size: 26px; line-height: 1.25; color: #111827;">${escapeHtml(
              title
            )}</h1>
            ${
              details
                ? `<p style="margin: 0 0 16px; color: #4b5563; font-weight: 700;">${escapeHtml(
                    details
                  )}</p>`
                : ''
            }
            <p style="margin: 0 0 24px; color: #374151;">${escapeHtml(description)}</p>
            <a href="${escapeHtml(
              url
            )}" style="display: inline-block; background: #0f52ba; color: #ffffff; text-decoration: none; padding: 12px 18px; font-weight: 700;">${escapeHtml(
              ctaLabel
            )}</a>
            <p style="margin: 24px 0 0; color: #6b7280; font-size: 13px;">You are receiving this because you subscribed to the Infomeya newsletter.</p>
          </div>
        </div>
      </body>
    </html>`;
}

function getObjectString(data, key) {
  const value = data?.[key];
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeStringArray(value) {
  return Array.isArray(value)
    ? value
        .map((item) => (typeof item === 'string' ? item.trim() : ''))
        .filter(Boolean)
    : [];
}

function sanitizeSlug(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

function getFormString(formData, key) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function isUploadedFile(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof value.arrayBuffer === 'function' &&
      typeof value.size === 'number' &&
      value.size > 0
  );
}

function sanitizeAttachmentName(value) {
  return String(value).replace(/[\\/:*?"<>|]+/g, '-').trim() || 'attachment';
}

function validateAdminRequest(req, scope = 'careers') {
  const authorization = req.headers.get('authorization') || '';
  const tokenFromHeader = req.headers.get('x-admin-token') || '';
  const bearerToken = authorization.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length).trim()
    : '';
  const token = bearerToken || tokenFromHeader.trim();
  const expectedToken = scope === 'blog' ? BLOG_ADMIN_TOKEN : CAREERS_ADMIN_TOKEN;
  const label = scope === 'blog' ? 'blog' : 'careers';

  if (!token || !expectedToken || token !== expectedToken) {
    return json(401, { error: `Unauthorized ${label} CMS request.` }, req);
  }

  return null;
}

async function readCareerOpenings() {
  return readCollectionArray('careerOpenings', careerOpeningsFile, []);
}

async function writeCareerOpenings(openings) {
  await replaceCollectionArray('careerOpenings', careerOpeningsFile, openings);
}

async function saveCareerOpening(opening, fallbackOpenings) {
  const collection = await getCollection('careerOpenings');

  if (collection) {
    await collection.replaceOne({ id: opening.id }, opening, { upsert: true });
    return;
  }

  await writeCareerOpenings(fallbackOpenings);
}

async function deleteCareerOpening(openingId, fallbackOpenings) {
  const collection = await getCollection('careerOpenings');

  if (collection) {
    await collection.deleteOne({ id: openingId });
    return;
  }

  await writeCareerOpenings(fallbackOpenings);
}

async function readCareerApplications() {
  return readCollectionArray('careerApplications', careerApplicationsFile, []);
}

async function writeCareerApplications(applications) {
  await replaceCollectionArray('careerApplications', careerApplicationsFile, applications);
}

async function saveCareerApplication(application, fallbackApplications) {
  const collection = await getCollection('careerApplications');

  if (collection) {
    await collection.replaceOne({ id: application.id }, application, { upsert: true });
    return;
  }

  await writeCareerApplications(fallbackApplications);
}

async function persistCareerApplicationRecord(application) {
  const applications = await readCareerApplications();
  const now = new Date().toISOString();
  const record = {
    id: randomUUID(),
    fullName: application.fullName,
    email: application.email,
    phone: application.phone,
    roleTitle: application.roleTitle,
    roleSlug: application.roleSlug,
    appliedPosition: application.appliedPosition,
    message: application.message,
    resumeFileName: application.resume.name,
    resumeContentType: application.resume.contentType,
    status: 'new',
    submittedAt: now,
    updatedAt: now,
  };

  await saveCareerApplication(record, [record, ...applications]);
  return record;
}

async function readCareersSettings() {
  return {
    ...DEFAULT_CAREERS_SETTINGS,
    ...(await readCollectionObject('careersSettings', careersSettingsFile, DEFAULT_CAREERS_SETTINGS)),
  };
}

async function writeCareersSettings(settings) {
  await writeCollectionObject('careersSettings', careersSettingsFile, settings);
}

async function readBlogPosts() {
  return readCollectionArray('blogPosts', blogPostsFile, []);
}

async function writeBlogPosts(posts) {
  await replaceCollectionArray('blogPosts', blogPostsFile, posts);
}

async function saveBlogPost(post, fallbackPosts) {
  const collection = await getCollection('blogPosts');

  if (collection) {
    await collection.replaceOne({ id: post.id }, post, { upsert: true });
    return;
  }

  await writeBlogPosts(fallbackPosts);
}

async function deleteBlogPost(postId, fallbackPosts) {
  const collection = await getCollection('blogPosts');

  if (collection) {
    await collection.deleteOne({ id: postId });
    return;
  }

  await writeBlogPosts(fallbackPosts);
}

async function readBlogComments() {
  return readCollectionArray('blogComments', blogCommentsFile, []);
}

async function writeBlogComments(comments) {
  await replaceCollectionArray('blogComments', blogCommentsFile, comments);
}

async function saveBlogComment(comment, fallbackComments) {
  const collection = await getCollection('blogComments');

  if (collection) {
    await collection.replaceOne({ id: comment.id }, comment, { upsert: true });
    return;
  }

  await writeBlogComments(fallbackComments);
}

function readJsonArrayFile(filePath, fallback) {
  try {
    const parsed = JSON.parse(readFileSync(filePath, 'utf8'));

    if (!Array.isArray(parsed)) {
      throw new Error('Expected an array.');
    }

    return parsed;
  } catch (error) {
    console.error(`Unable to read ${filePath}, restoring fallback array:`, error);
    writeJsonFile(filePath, fallback);
    return fallback;
  }
}

function readJsonObjectFile(filePath, fallback) {
  try {
    const parsed = JSON.parse(readFileSync(filePath, 'utf8'));

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Expected an object.');
    }

    return parsed;
  } catch (error) {
    console.error(`Unable to read ${filePath}, restoring fallback object:`, error);
    writeJsonFile(filePath, fallback);
    return fallback;
  }
}

function writeJsonFile(filePath, data) {
  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

async function persistContactSubmission(contact) {
  const now = new Date().toISOString();
  const record = {
    id: randomUUID(),
    ...contact,
    status: 'received',
    submittedAt: now,
    updatedAt: now,
  };
  const collection = await getCollection('contactSubmissions');

  if (collection) {
    await collection.insertOne(record);
  }

  return record;
}

async function updateContactSubmissionStatus(id, status, errorMessage = '') {
  const collection = await getCollection('contactSubmissions');

  if (!collection) {
    return;
  }

  await collection.updateOne(
    { id },
    {
      $set: {
        status,
        errorMessage,
        updatedAt: new Date().toISOString(),
      },
    }
  );
}

async function getExistingNewsletterSubscription(email) {
  const collection = await getCollection('newsletterSubscriptions');

  if (collection) {
    return withoutMongoId(
      await collection.findOne(
        { email },
        { projection: { _id: 0 }, sort: { subscribedAt: -1 } }
      )
    );
  }

  if (!existsSync(newsletterStoreFile)) {
    return null;
  }

  const records = readFileSync(newsletterStoreFile, 'utf8')
    .split(/\r?\n/)
    .filter(Boolean);

  for (let index = records.length - 1; index >= 0; index -= 1) {
    try {
      const record = JSON.parse(records[index]);

      if (record?.email === email) {
        return record;
      }
    } catch {
      continue;
    }
  }

  return null;
}

async function readNewsletterSubscribers() {
  const collection = await getCollection('newsletterSubscriptions');

  if (collection) {
    const subscribers = await collection
      .find(
        { status: 'subscribed' },
        { projection: { _id: 0, email: 1, status: 1, subscribedAt: 1 } }
      )
      .toArray();

    return normalizeNewsletterSubscribers(subscribers);
  }

  if (!existsSync(newsletterStoreFile)) {
    return [];
  }

  const latestByEmail = new Map();
  const records = readFileSync(newsletterStoreFile, 'utf8')
    .split(/\r?\n/)
    .filter(Boolean);

  for (const record of records) {
    try {
      const subscription = JSON.parse(record);
      const email = typeof subscription?.email === 'string' ? subscription.email.toLowerCase() : '';

      if (email) {
        latestByEmail.set(email, {
          ...subscription,
          email,
        });
      }
    } catch {
      continue;
    }
  }

  return normalizeNewsletterSubscribers([...latestByEmail.values()]);
}

function normalizeNewsletterSubscribers(subscribers) {
  const uniqueEmails = new Set();

  return subscribers
    .map((subscriber) => ({
      ...subscriber,
      email: typeof subscriber?.email === 'string' ? subscriber.email.trim().toLowerCase() : '',
    }))
    .filter((subscriber) => {
      if (
        subscriber.status !== 'subscribed' ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subscriber.email) ||
        uniqueEmails.has(subscriber.email)
      ) {
        return false;
      }

      uniqueEmails.add(subscriber.email);
      return true;
    });
}

async function persistNewsletterSubscription(subscription) {
  const collection = await getCollection('newsletterSubscriptions');

  if (collection) {
    await collection.updateOne(
      { email: subscription.email },
      { $set: subscription },
      { upsert: true }
    );
    return;
  }

  appendFileSync(newsletterStoreFile, `${JSON.stringify(subscription)}\n`, 'utf8');
}

async function uploadBlogImageToCloudinary(imageFile) {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error(
      'Cloudinary is not fully configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
    );
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signCloudinaryParams({
    folder: CLOUDINARY_FOLDER,
    timestamp,
  });
  const formData = new FormData();
  const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
  const imageBlob = new Blob([imageBuffer], {
    type: imageFile.type || 'application/octet-stream',
  });

  formData.set('file', imageBlob, sanitizeAttachmentName(imageFile.name || 'blog-image'));
  formData.set('api_key', CLOUDINARY_API_KEY);
  formData.set('timestamp', String(timestamp));
  formData.set('folder', CLOUDINARY_FOLDER);
  formData.set('signature', signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );
  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.secure_url) {
    throw new Error(result?.error?.message || 'Cloudinary upload failed.');
  }

  return {
    url: result.secure_url,
    publicId: result.public_id || '',
    width: result.width || null,
    height: result.height || null,
  };
}

function signCloudinaryParams(params) {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return createHash('sha1')
    .update(`${payload}${CLOUDINARY_API_SECRET}`)
    .digest('hex');
}

function buildAllowedCorsHeaders(requestHeaders) {
  const defaults = [
    'Content-Type',
    'Authorization',
    'X-Admin-Token',
  ];
  const normalizedHeaders = new Map(
    defaults.map((header) => [header.toLowerCase(), header])
  );

  if (requestHeaders) {
    requestHeaders
      .split(',')
      .map((header) => header.trim())
      .filter(Boolean)
      .forEach((header) => {
        const normalizedHeader = header.toLowerCase();

        if (!normalizedHeaders.has(normalizedHeader)) {
          normalizedHeaders.set(normalizedHeader, header);
        }
      });
  }

  return Array.from(normalizedHeaders.values()).join(', ');
}

function ensureJsonFile(filePath, defaultValue) {
  if (!existsSync(filePath)) {
    writeJsonFile(filePath, defaultValue);
  }
}

function normalizeDataDir(value) {
  const normalized = normalizeString(value);

  if (!normalized) {
    return join(__dirname, 'data');
  }

  return isAbsolute(normalized) ? normalized : join(__dirname, normalized);
}

