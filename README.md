# Quijada Dev - Personal Portfolio

A modern, responsive personal portfolio website built with Next.js 14, featuring smooth animations, dark/light theme support, and a custom cursor effect.

## ✨ Features

- **Modern Stack**: Built with Next.js 14, React 18, and TypeScript
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Theme toggle with system preference support using next-themes
- **Smooth Animations**: Powered by Framer Motion for fluid transitions and effects
- **Custom Cursor**: Interactive custom cursor for enhanced user experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Geist Font**: Beautiful typography using Vercel's Geist font family

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quijada-dev.git
   cd quijada-dev
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

```
quijada-dev/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Home page
├── components/
│   ├── About.tsx        # About section
│   ├── CustomCursor.tsx # Custom cursor effect
│   ├── Footer.tsx       # Footer component
│   ├── Hero.tsx         # Hero/landing section
│   ├── Navbar.tsx       # Navigation bar
│   ├── Projects.tsx     # Projects showcase
│   ├── ThemeProvider.tsx# Theme context provider
│   └── ThemeToggle.tsx  # Dark/light mode toggle
├── types/
│   └── view-transitions.d.ts # TypeScript definitions
├── tailwind.config.ts   # Tailwind CSS configuration
├── next.config.js       # Next.js configuration
└── tsconfig.json        # TypeScript configuration
```

## 🛠️ Built With

- [Next.js 14](https://nextjs.org/) - React framework for production
- [React 18](https://react.dev/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management for Next.js
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icon library
- [Geist Font](https://vercel.com/font) - Vercel's typeface family

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the app for production |
| `npm run start` | Runs the built app in production mode |
| `npm run lint` | Runs ESLint for code linting |

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.ts` to customize the color palette and theme settings.

### Content
Update the components in the `components/` folder to modify the content displayed on your portfolio.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Lucía Quijada**

- Website: [quijada.dev](https://quijada.dev)
- GitHub: [@luciaquijada](https://github.com/luciaquijada)

---

⭐ If you find this project useful, please consider giving it a star!
