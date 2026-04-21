import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from "url";
import { sendContactEmail } from "../contactemailer/mailer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON from the contact form
app.use(express.json());

// EJS setup — tells Express where your .ejs template files live
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// Static files — tells Express where your CSS, JS, images live
app.use(express.static(path.join(__dirname, "../public")));

// Rate limiter — stops people spamming your contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Project data for your portfolio page
const projects = [
  {
    id: 1,
    title: "Amourly Subscription Service",
    description: "A full-stack E-Poem subscription service. Users can subscribe to send their SO a personalised poem on a regular basis.",
    tags: ["React", "Node.js", "PostgreSQL", "Express.js"],
    githubUrl: "https://github.com/Jaeger974/jmwebdev.io",
    liveUrl: "https://amourlyserviceproject-io.onrender.com/",
    image: "/static_images/Amourlyhomepagepreview.JPG"
  },
  {
    id: 2,
    title: "SparUp Matchmaking App",
    description: "A social networking app for connecting people with similar interests and goals.",
    tags: ["Python", "Node.js", "MongoDB", "Socket.IO"],
    githubUrl: "https://github.com/Jaeger974/SparUpProj2.git",
    liveUrl: "https://sparup.netlify.app",
    image: "/static_images/Workinprogress_img.JPG"
  },
  {
    id: 3,
    title: "TBC",
    description: "Project 3 is in development and will be added soon. Stay tuned for updates on this exciting new project!",
    tags: ["TBC"],
    githubUrl: "https://github.com/Jaeger974",
    liveUrl: "https://github.com/Jaeger974",
    image: "/static_images/Workinprogress_img.JPG"
  }
];

const skills = [
  "JavaScript", "Node.js", "Express", "EJS",
  "CSS", "HTML", "PostgreSQL", "Vite",
  "Git", "Render", "Vercel"
];

// Main page route — renders your index.ejs template
app.get("/", (req, res) => {
  res.render("index", {
    projects,
    skills,
    year: new Date().getFullYear()
  });
});

// Contact form route
app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const { name, email, message, website } = req.body;

    // Honeypot check — bots fill this field, humans don't see it
    if (website && website.trim() !== "") {
      return res.status(400).json({ success: false, message: "Invalid submission" });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    await sendContactEmail({ name, email, message });

    return res.json({ success: true, message: "Message sent successfully!" });

  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});