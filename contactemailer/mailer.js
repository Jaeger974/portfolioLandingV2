import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

export async function sendContactEmail({
  name,
  email,
  message
}) {
 
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // STARTTLS on 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
    rejectUnauthorized: false
  }

  });

  const info = await transporter.sendMail({
    from: `"Portfolio Contact Form" <dynamic.kandj@gmail.com>`,
    to: process.env.CONTACT_RECEIVER,
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

  console.log("Brevo message sent, id:", info.messageId);
  return info;
}