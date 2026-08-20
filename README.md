# Clean Code Canvas

A modern portfolio platform for showcasing multi-vendor marketplaces, real-time bidding engines, and high-scale commerce systems.

## Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd clean-code-canvas
npm install
npm run dev
```

The app will start at `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint
- `npm run format` — Format code with Prettier

## Tech Stack

- **Frontend**: React 19, TanStack Router, TanStack Query
- **Styling**: Tailwind CSS, Radix UI
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite
- **Animation**: Framer Motion

## Project Structure

```
src/
├── routes/          # TanStack Router pages
├── components/      # Reusable UI components
├── lib/            # Utilities and helpers
├── styles.css      # Global styles
└── main.tsx        # Entry point
```

## Features

- Responsive design with Tailwind CSS
- Type-safe routing with TanStack Router
- Form validation with Zod
- Dark/light theme support
- Smooth scroll animations
- i18n ready

## License

MIT

