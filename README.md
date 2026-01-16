# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd profile3
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your EmailJS credentials:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes security scan)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run security:scan` - Scan for potential secrets

## Deployment

### Vercel (Automatic)

This project is configured for automatic deployment via Vercel Git Integration:

- **Production deployments**: Automatically triggered on pushes to the `main` branch
- **Preview deployments**: Automatically created for pull requests
- **Environment variables**: Configure in Vercel dashboard under Settings → Environment Variables

### GitHub Actions CI

GitHub Actions runs quality checks on every pull request and push to `main`:

- ✅ Linting (`npm run lint`)
- ✅ Type checking (`npm run typecheck`)
- ✅ Security scanning (`npm run security:scan`)
- ✅ Build verification (`npm run build`)

The CI workflow must pass before merging pull requests.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## Project Structure

```
profile3/
├── .github/
│   ├── workflows/
│   │   └── ci.yml          # GitHub Actions CI workflow
│   └── pull_request_template.md
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── components/         # React components
│   ├── data/              # Static data files
│   └── lib/               # Utility functions
├── scripts/               # Build scripts
├── .env.example          # Environment variables template
└── SECURITY.md           # Security documentation
```

## Security

See [SECURITY.md](./SECURITY.md) for detailed security documentation, including:
- Security model and limitations
- What is considered a secret
- Current public variables
- Security features and best practices

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel Platform](https://vercel.com)
