const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate-website', (req, res) => {
  const { prompt } = req.body;

  // Generate a single HTML file with embedded CSS and JavaScript
  const generatedWebsite = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Website</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f8f9fa;
      color: #333;
      text-align: center;
    }
    .container {
      max-width: 1200px;
      margin: auto;
      padding: 20px;
    }
    .header {
      background-color: #007bff;
      color: white;
      padding: 20px;
      font-size: 24px;
      font-weight: bold;
      cursor: pointer;
    }
    .footer {
      background-color: #e0e0e0;
      padding: 10px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">${prompt || 'Welcome to the AI Generated Website'}</div>
    <div class="content">This is an AI-generated website preview.</div>
    <div class="footer">© 2025 Your Brand</div>
  </div>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelector('.header').addEventListener('click', () => {
        alert('Header Clicked!');
      });
    });
  </script>
</body>
</html>
  `;

  res.json({ html: generatedWebsite });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
