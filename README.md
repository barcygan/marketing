# Katarzyna Cygan - Personal Marketing Portfolio

A professional, high-performance portfolio website for Katarzyna Cygan, an expert in Digital Marketing, E-commerce, and HR.

## Features
- **Bilingual Support**: Full support for English (`index.html`) and Polish (`index-pl.html`).
- **Smart Language Detection**: Automatically detects the user's browser language and redirects Polish users to the Polish version (once per session).
- **Manual Language Switcher**: Users can easily toggle between EN and PL.
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop.
- **Custom Aesthetic**: A unique "Cream, Salmon, and Dark Brown" color palette inspired by modern digital trends.
- **Performance**: Built with vanilla HTML, CSS, and JavaScript for maximum speed and minimal bloat.

## Project Structure
- `index.html`: Main English homepage.
- `index-pl.html`: Polish homepage.
- `style.css`: Global styles, variables, and responsive definitions.
- `main.js`: Logic for mobile menu, slider, and language detection.
- `assets/`: Images and icons.

## How to Run Locally
You can run this project with any static file server.

**Using Python:**
```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

**Using Node/NPM (if Vite is set up):**
```bash
npm run dev
```

## Deployment
This project is ready for deployment on GitHub Pages, Netlify, or Vercel.
Ensure the build settings serve the root directory.