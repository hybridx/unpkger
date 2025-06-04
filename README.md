# 📦 Unpkger

Convert your npm links to unpkg links effortlessly! A beautiful, modern web application that transforms npm package references into unpkg CDN links instantly.

## 🚀 Features

- **Multiple Input Formats**: Supports npm install commands, import statements, require calls, and direct package names
- **Real-time Conversion**: Instant conversion as you type with intelligent pattern recognition
- **One-click Copy**: Copy converted links to clipboard with a single click
- **Beautiful UI**: Modern, responsive design with glass morphism effects
- **Examples Included**: Quick-start examples to get you going

## 🌐 Live Demo

Visit the live application: [https://hybridx.github.io/unpkger/](https://hybridx.github.io/unpkger/)

## 🛠️ Supported Conversions

### Input Examples:
- `npm install react@18.2.0` → `<script src="https://unpkg.com/react@18.2.0"></script>`
- `import React from "react"` → `https://unpkg.com/react@latest`
- `require("lodash")` → `https://unpkg.com/lodash@latest`
- `https://www.npmjs.com/package/axios` → `https://unpkg.com/axios@latest`
- `@types/node@20.0.0` → `https://unpkg.com/@types/node@20.0.0`

## 🏗️ Development

### Prerequisites
- Node.js 18+ 
- npm

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/hybridx/unpkger.git
   cd unpkger
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions. Any push to the `main` branch will trigger a new deployment.

### Manual Deployment
You can also manually trigger the deployment from the GitHub Actions tab in your repository.

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **GitHub Pages** - Hosting
- **GitHub Actions** - CI/CD

## 📁 Project Structure

```
unpkger/
├── public/
│   └── unpkg-icon.svg          # Favicon
├── src/
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── .github/workflows/
│   └── deploy.yml              # GitHub Pages deployment
├── index.html                  # HTML template
├── package.json                # Dependencies & scripts
├── tailwind.config.js          # Tailwind configuration
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [unpkg.com](https://unpkg.com) - The amazing CDN service
- [Tailwind CSS](https://tailwindcss.com) - For the beautiful styling system
- [Lucide](https://lucide.dev) - For the beautiful icons

---

Made with ❤️ by [hybridx](https://github.com/hybridx)
