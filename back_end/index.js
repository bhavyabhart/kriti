import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import multer from "multer"; // Import multer for file uploads
import Anthropic from "@anthropic-ai/sdk";
import bodyParser from "body-parser";
import fs from "fs";

// Load environment variables
dotenv.config();

const app = express();
const port = 3001;

// Middleware
// app.use(cors({ origin: "http://localhost:3001" })); // Adjust for deployment
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));

// ✅ Ensure the `uploads/` directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Initialize multer for file uploads
const upload = multer({ dest: uploadDir });

// Initialize the Claude API
const apiKey = process.env.CLAUDE_API_KEY;
const anthropic = new Anthropic({ apiKey });

// Track pending requests
const pending = { total: 0, queue: [] };
const minPromptSize = 16;
const timeoutInSec = 15 * 60;

const endRequest = (id, reason) => {
  pending.queue = pending.queue.filter((item) => item !== id);
  console.log(`Request ${id} ended due to: ${reason}`);
};

// ✅ File Upload Handling
app.post("/api/file", upload.single("file"), async (req, res) => {
  console.log("Request received at /api/file");
  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file);

  const { websiteType, businessName, additionalInfo, palette, font, layout } = req.body;
  if (!websiteType || !businessName || !additionalInfo || !layout || !req.file) {
    return res.status(400).json({ error: "All fields and a file are required" });
  }

  try {
    const fileContent = fs.readFileSync(req.file.path, "utf8");
    const extractedData = fileContent.substring(0, 500);

    const finalPrompt = `
    # Task
    Generate a website with the following user inputs:
    - Website Type: ${websiteType}
    - Business Name: ${businessName}
    - Additional Info: ${additionalInfo}
    - Color Palette: ${palette}
    - Font: ${font}
    - Layout: ${layout}
    - File Content: """
    ${extractedData}
    """
    Generate a fully functional, interactive, and long single-page website with a beautiful UI, modern design, and rich interactive components.
    
    ## Guidelines
    - Write directly in code format without any text output
    - Write clean HTML, CSS, and JavaScript directly inside one file.
    - Use Tailwind CSS and DaisyUI for styling.
    - Ensure all buttons and links are functional.
    - Embed JavaScript inside <script> tags.
    - Ensure smooth scrolling and responsiveness.
    - Use Alpine.js for interactivity (toggle buttons, accordions, dark mode).
    - Avoid placeholder text (Lorem Ipsum).
    
    ## HTML Output
    <html><head></head><body>`;

    const chat = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 5000,
      messages: [{ role: "user", content: finalPrompt }],
    });

    const aiResponse = chat.content[0].text.trim();
    res.json({ message: aiResponse });
  } catch (error) {
    res.status(500).json({ error: "Error processing file and request" });
  }
});

// ✅ Chat Handling for Non-File Prompt
app.post("/api/chat", async (req, res) => {
  const { websiteType, businessName, additionalInfo, palette, font, layout } = req.body;
  if (!websiteType || !businessName || !additionalInfo || !layout) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const finalPrompt = `
    # Task
    Generate a website with the following user inputs:
    - Website Type: ${websiteType}
    - Business Name: ${businessName}
    - Additional Info: ${additionalInfo}
    - Color Palette: ${palette}
    - Font: ${font}
    - Layout: ${layout}
    
    Generate a fully functional, interactive, and long single-page website with a beautiful UI, modern design, and rich interactive components.
    
    ## Guidelines
    - Write directly in code format without any text output
    - Write clean HTML, CSS, and JavaScript directly inside one file.
    - Use Tailwind CSS and DaisyUI for styling.
    - Ensure all buttons and links are functional.
    - Embed JavaScript inside <script> tags.
    - Ensure smooth scrolling and responsiveness.
    - Use Alpine.js for interactivity (toggle buttons, accordions, dark mode).
    - Avoid placeholder text (Lorem Ipsum).
    
    ## HTML Output
    <html><head></head><body>`;

    console.log("Sending prompt to Claude AI...");
    const chat = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 5000,
      messages: [{ role: "user", content: finalPrompt }],
    });

    const aiResponse = chat.content[0].text.trim();
    res.json({ message: aiResponse });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: "Error processing request" });
  }
});

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
