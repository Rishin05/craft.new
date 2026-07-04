# craft.new

An AI-powered in-browser app builder, inspired by tools like Bolt.new and v0. Describe an app in plain language and get a live, editable code environment generated for you.

Live demo: [craft-new.vercel.app](https://craft-new.vercel.app)

## Features

- AI-driven code generation powered by Google's Gemini API
- Live, in-browser code editor and preview via Sandpack
- Google OAuth sign-in
- Real-time backend and data sync with Convex
- PayPal integration for credits/subscriptions
- Responsive UI built with Radix UI, Tailwind CSS, and shadcn-style components

## Tech Stack

- **Framework:** Next.js 15 (App Router), React 19
- **AI:** Google Generative AI (Gemini)
- **Live Code Sandbox:** Sandpack (`@codesandbox/sandpack-react`)
- **Backend / Database:** Convex
- **Auth:** Google OAuth (`@react-oauth/google`)
- **Payments:** PayPal
- **UI:** Radix UI, Tailwind CSS, `lucide-react`, `next-themes`
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- A Convex account/project
- A Google Generative AI (Gemini) API key
- A Google OAuth client ID
- A PayPal client ID (for payment features)

### Installation

```bash
git clone https://github.com/Rishin05/craft.new.git
cd craft.new
npm install
```

### Environment Variables

Create a `.env.local` file in the project root with the keys required by the app, including your Gemini API key, Convex deployment URL, Google OAuth client ID, and PayPal client ID.

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
craft.new/
├── app/           # Next.js App Router pages and routes
├── components/    # UI components
├── configs/       # App configuration
├── context/       # React context providers
├── convex/        # Convex backend functions and schema
├── data/          # Static data
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── public/        # Static assets
```

## Deployment

Deployed on [Vercel](https://vercel.com) at [craft-new.vercel.app](https://craft-new.vercel.app).

## Contact

- **Portfolio:** [rishin.info](https://rishin.info)
- **LinkedIn:** [linkedin.com/in/patelrishin](https://www.linkedin.com/in/patelrishin/)
- **GitHub:** [github.com/Rishin05](https://github.com/Rishin05)
