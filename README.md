# Product-Dev – AI-Powered Website Generator

**product-dev** is a full-stack web application that empowers users to generate fully functional, modern websites using artificial intelligence. Users simply enter their website requirements—such as the type of website, business name, description, color palette, font, layout, and even upload files for content extraction and product-dev generates a complete, interactive website based on their input.

---

## Project Overview

**product-dev** makes website creation fast, accessible, and code-free. With a beautiful, intuitive interface, users can customize every aspect of their site and instantly preview the result—no coding skills required.

---

## Key Features

- **AI Website Generation:**  
  Transforms user prompts and design choices into ready-to-use HTML, CSS (Tailwind/DaisyUI), and JavaScript (with Alpine.js for interactivity).

- **Rich Input Collection:**  
  Multi-step forms gather website type, business name, detailed descriptions, color palettes, font choices, layout preferences, and allow file uploads for content extraction.

- **Modern & Responsive Output:**  
  Generated websites are responsive, visually appealing, and interactive (smooth scrolling, toggles, accordions, dark mode), with real content (no placeholder text).

- **Live Preview:**  
  Instantly preview the generated website in a secure iframe within the app.

- **No Coding Required:**  
  The process is entirely no-code, making website creation accessible to anyone.

---

## Technologies Used

- **Frontend:** React (Create React App), Tailwind CSS, DaisyUI, JavaScript, HTML/CSS  
- **Backend:** Node.js, Express, File Handling, AI API Integration  
- **Output:** Alpine.js for frontend interactivity in generated sites

---

## Directory Structure

- `front_end/`: React app for user input and live preview  
- `back_end/`: Express server for prompt handling, file processing, and AI integration

---

## Getting Started

### Prerequisites

- **Node.js** (v14+ recommended)  
- **npm** (comes with Node.js)  
- (Optional) **Yarn**  
- **AI API key** (or required AI API credentials)

### 1. Clone the Repository

- git clone https://github.com/bhavyabhart/product-dev.git
- cd product-dev
 
### 2. Install Dependencies

**Backend**

- cd back_end
- npm install
  
**Frontend**

- cd ../front_end
- npm install
 
### 3. Set Up Environment Variables

In `back_end`, create a `.env` file and add your API keys or configuration:

- AI_API_KEY=your_api_key_here
 
### 4. Run the Backend Server

- cd back_end
- npm start

### 5. Run the Frontend App

- cd ../front_end
- npm start
 
### 6. Start Building!

1. Fill in your website details (type, name, description, etc.)
2. Choose a color palette and font
3. Select or describe a layout
4. (Optional) Upload a file for content extraction
5. Click **Generate Website** to preview your AI-generated site

---

## Useful Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [DaisyUI Documentation](https://daisyui.com/)
- [Node.js Documentation](https://nodejs.org/)
- [Express Documentation](https://expressjs.com/)

---
