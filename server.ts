import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import rateLimit from "express-rate-limit";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/next"

import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { sendContactEmail } from "./contactemailer/mailer.ts";

  // rate limiter for contact form to prevent abuse
  const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,              // limit each IP to 5 requests per minute
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


  const app = express();
  const PORT = 3000;

  // Set EJS as the view engine
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));


async function startServer() {

  // Mock Data for the Portfolio
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
      image: "/static_images/Workinprogress.JPG"
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
    "React", "TypeScript", "Node.js", "Tailwind CSS", 
    "PostgreSQL", "Next.js", "Git", "Docker", "AWS"
  ];

  // API Route for Contact Form (Example)
app.use(express.json());


app.post("/api/contact", contactLimiter, async (req, res) => {
    console.log("Contact Form Submission:", req.body);

    try {
      const { name, email, message, website } = req.body;

      // Honeypot
      if (website && website.trim() !== "") {
        console.log("Bot detected — honeypot triggered:", website);
        return res.status(400).json({
          success: false,
          message: "Invalid submission"
        });
      }

      if (!name || !email || !message) {
        return res
          .status(400)
          .json({ success: false, message: "Missing fields" });
      }

      await sendContactEmail({ name, email, message });

      return res.json({
        success: true,
        message: "Message sent successfully!"
      });
    } catch (err) {
      console.error("Contact form email error:", err);
      return res
        .status(500)
      .json({ success: false, message: "Failed to send message" });
    }
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // We are using EJS, so we don't want Vite to handle the HTML
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
  }

  // Serve static files from public directory
  app.use(express.static(path.join(__dirname, "public")));

  // Main Route
  app.get("/", (req, res) => {
    res.render("index", { projects, skills, year: new Date().getFullYear() });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
