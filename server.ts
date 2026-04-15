import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set EJS as the view engine
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));

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
      image: "/static_images/SparUphomepagepreview.JPG"
    },
    {
      id: 3,
      title: "Weather Sphere",
      description: "A beautiful 3D weather application with global coverage and interactive maps.",
      tags: ["React", "Three.js", "OpenWeather API"],
      githubUrl: "https://github.com/username/weather-sphere",
      liveUrl: "https://weather-sphere.netlify.app",
      image: "https://picsum.photos/seed/weather/800/600"
    }
  ];

  const skills = [
    "React", "TypeScript", "Node.js", "Tailwind CSS", 
    "PostgreSQL", "Next.js", "Git", "Docker", "AWS"
  ];

  // API Route for Contact Form (Example)
  app.use(express.json());
  app.post("/api/contact", (req, res) => {
    console.log("Contact Form Submission:", req.body);
    // In a real app, you'd send an email here
    setTimeout(() => {
      res.json({ success: true, message: "Message sent successfully!" });
    }, 1000);
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
