import nodemailer, { SendMailOptions } from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT
  ? Number(process.env.SMTP_PORT)
  : undefined;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || "no-reply@example.com";

let transporter: nodemailer.Transporter | null = null;

async function createTransporter(): Promise<nodemailer.Transporter> {
  if (transporter) return transporter;

  // Use configured SMTP when available (production-like)
  if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    return transporter;
  }

  // Fallback: create an Ethereal test account for local/dev testing
  const testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  console.warn(
    "SMTP not configured — using Ethereal test account. Preview URL will be logged."
  );
  return transporter;
}

function stripHtml(html?: string) {
  if (!html) return undefined;
  return html.replace(/<[^>]+>/g, "").trim();
}

export type EmailOptions = {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  attachments?: SendMailOptions["attachments"];
};

export async function sendEmail(options: EmailOptions) {
  const t = await createTransporter();
  const from = options.from ?? SMTP_FROM;

  const mailOptions: SendMailOptions = {
    from,
    to: options.to,
    subject: options.subject,
    text: options.text ?? stripHtml(options.html) ?? undefined,
    html: options.html,
    attachments: options.attachments,
  };

  try {
    const info = await t.sendMail(mailOptions);

    // If using Ethereal, nodemailer provides a preview URL
    try {
      const preview = (nodemailer as any).getTestMessageUrl
        ? (nodemailer as any).getTestMessageUrl(info)
        : null;
      if (preview) console.log("Ethereal preview URL:", preview);
    } catch (e) {
      // ignore
    }

    return info;
  } catch (err) {
    console.error("sendEmail error:", err);
    throw err;
  }
}

export default sendEmail;
