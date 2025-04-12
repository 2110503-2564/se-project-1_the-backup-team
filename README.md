# Spaceflow

SpaceFlow is a modern workspace reservation platform built with Next.js and
TypeScript. It allows users to discover, browse, and book professional
workspaces, meeting rooms, and collaborative environments.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) with JWT strategy
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with
  [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)
- **UI Components**: Custom components built with
  [shadcn/ui](https://ui.shadcn.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with
  [Zod](https://github.com/colinhacks/zod) validation
- **Toast Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## Getting Started

### Prerequisites

- Node.js 23.11 or later
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/fe-spaceflow.git
cd fe-spaceflow
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your API endpoint and other configuration.

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see
   the application.

## Project Structure

```
src/
├── app/                  # Next.js App Router routes
│   ├── (auth)/           # Authentication pages (login/register)
│   ├── (main)/           # Main application pages
│   │   ├── spaces/       # Space discovery and details
│   │   ├── reservations/ # Reservation management
│   │   ├── account/      # User account settings
│   │   └── ...
│   └── api/              # API routes
├── components/           # React components
│   ├── ui/               # UI components based on shadcn/ui
│   └── ...               # Feature-specific components
├── context/              # React context providers
├── interfaces/           # TypeScript interfaces
├── lib/                  # Utility functions and libraries
├── repo/                 # API service functions
└── types/                # TypeScript type definitions
```

## Development Workflow

This project follows established coding standards and practices to ensure
consistency across the codebase:

- **Code Formatting**: Enforced using Prettier with project-specific
  configuration
- **Static Analysis**: ESLint checks code quality and prevents common errors
- **Import Organization**: Custom ESLint rules automatically sort imports into
  logical groups

### Code Quality Tools

Before committing code or creating pull requests, run these commands to ensure
your code meets project standards:

```bash
# Check for linting issues
npm run lint

# Automatically fix linting and formatting issues
npm run lint:fix
```

Running these commands helps maintain consistent code style throughout the
project, making collaboration easier and preventing common errors from being
committed to the repository.
