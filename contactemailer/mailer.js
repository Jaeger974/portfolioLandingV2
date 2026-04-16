import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendContactEmail({ name, email, message }) {
  // Use Ethereal for dev OR your real SMTP credentials
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
      tls: {
    rejectUnauthorized: false,        // <-- REQUIRED for Outlook on localhost
    minVersion: "TLSv1"
  },
family: 4 
});

try {

  const info = await transporter.sendMail({
    from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECEIVER, // your real email
    subject: `New Contact Form Message from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}
    `
  });


  return { info };
} catch (err) {
  console.error("Email send error:", err);
  throw err;
}
};
