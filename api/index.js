import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
  const PORT = 3000;

// EJS setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// Static files
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.get("/", (req, res) => {
 res.render("index", { // index.ejs 
    skills: [
      "JavaScript",
      "Node.js",
      "Express",
      "EJS",
      "CSS",
      "HTML",
      "PostgreSQL",
      "Vite",
      "Git",
      "Render",
      "Vercel",
      "projects"
    ]
  });
 
});

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  
// Export Express as a serverless function
export default app;