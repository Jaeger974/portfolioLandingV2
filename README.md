<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

James Mateer — Portfolio Landing Page
Live Site: https://jsamportfolio.netlify.app/
A modern, responsive portfolio website built to showcase my projects, technical skills, and professional experience as a junior web developer. This site serves as both a personal brand hub and a demonstration of my ability to design, build, and deploy production‑ready web applications.

🚀 Overview
This portfolio was designed and developed from scratch with a focus on:

- Clean, accessible UI/UX
- Mobile‑first responsive design
- Maintainable, modular code
- Real‑world features such as a working contact form with SMTP email integration
- Fast, reliable deployment using Netlify
  The goal is simple: give potential employers a clear, polished view of who I am as a developer and what I can build.

🛠️ Tech Stack
Frontend

- HTML5
- CSS3 (custom styling, responsive layout, animations)
- JavaScript (ES6+)
- TypeScript (for structured, maintainable logic)
  Backend
- Node.js + Express
- Nodemailer for email delivery
- Brevo SMTP for production‑- grade contact form messaging
- Rate limiting + honeypot for basic bot protection
  Deployment
- Netlify (static hosting + form routing)
- Render (backend hosting for the contact API)

✨ Features
📬 Fully Functional Contact Form

- Sends messages directly to my inbox using Brevo SMTP
- Includes:
- Honeypot bot protection
- Rate limiting
- Inline success/error messages (no intrusive alerts)
- Server‑side validation
  📱 Responsive Design
- Optimized for mobile, tablet, and desktop
- Smooth layout transitions
- Accessible color contrast and typography
  🎨 Clean, Modern UI
- Custom CSS
- Subtle animations
- Professional, recruiter‑friendly layout
  ⚡ Fast & Lightweight
- No heavy frameworks
- Minimal dependencies
-
- Optimized assets

📂 Project Structure
root/
│── public/ # Static assets (images, icons, etc.)
│── src/
│ ├── server.ts # Express server + contact API
│ ├── email/ # Nodemailer + Brevo integration
│ ├── scripts/ # Frontend JS
│ └── styles/ # CSS files
│── .env # Environment variables (not committed)
│── package.json
│── README.md

🧪 Local Development
Clone the repository:
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

Install dependencies:
npm install

Create a .env file:
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your-brevo-login-email
SMTP_PASS=your-smtp-key
CONTACT_RECEIVER=your-email

Run the development server:
npm run dev

📬 Contact Form API
The backend exposes a single POST endpoint:
POST /api/contact

Expected payload:
{
"name": "John Doe",
"email": "john@example.com",
"message": "Hello!",
"website": "" // Honeypot field (must stay empty)
}

Responses:

- 200 OK — message sent
- 400 Bad Request — validation or honeypot triggered
- 500 Server Error — email delivery failed

🎯 Goals of This Project
This portfolio is part of my journey as a junior developer to:

- Build real, production‑ready features
- Demonstrate clean architecture
- Showcase my ability to integrate external services (SMTP, APIs, hosting)
- Present myself professionally to employers and collaborators

📈 Future Improvements

- Add dark mode
- Add project filtering and animations
- Add a blog or dev‑notes section
- Expand backend to support project analytics

👋 About Me
I’m James Mateer, a junior web developer focused on building clean, accessible, and reliable web applications. I enjoy solving problems, learning new technologies, and creating polished user experiences.
If you’d like to connect or discuss opportunities, feel free to reach out through the contact form on the site.
