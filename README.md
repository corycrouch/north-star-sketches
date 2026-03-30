# North Star Sketches

Low-fi UI prototype built with React, shadcn/ui, Tailwind CSS, and SCSS.

## Quick Start

```bash
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Production build
npm run preview    # Preview production build
```

## Adding shadcn/ui Components

Browse available components at [ui.shadcn.com](https://ui.shadcn.com/docs/components) and add them with:

```bash
npx shadcn@latest add <component-name>
```

Examples:

```bash
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add tabs
```

Components are added to `src/components/ui/` and can be imported like:

```tsx
import { Card } from "@/components/ui/card"
```

## Project Structure

```
src/
├── components/
│   └── ui/          # shadcn/ui components (auto-generated)
├── lib/
│   └── utils.ts     # Utility functions (cn helper for classnames)
├── styles/
│   └── app.scss     # Custom SCSS styles
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Tailwind + shadcn theme config
```

## Styling Approach

- **shadcn/ui components**: Pre-built, accessible components (Button, Card, Dialog, etc.)
- **Tailwind CSS**: Utility classes for quick layout/spacing (`className="flex gap-4 p-6"`)
- **SCSS files**: Custom styles in `src/styles/` for more complex or reusable styling
