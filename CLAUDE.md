# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wedding invitation website for Diego & Maca (June 6, 2026, Hacienda San Jorge, Pereira, Colombia). Built with Next.js 16 App Router, TypeScript, Tailwind CSS v4, Zustand, and Framer Motion (`motion`).

## Commands

```bash
npm run dev       # Start development server
npm run build     # Run prebuild (generates credentials file) + next build
npm run lint      # Run ESLint
```

There is no test suite.

## Architecture

### Data Layer: Google Sheets as a database

All RSVP, FAQ, and gift message data is stored in a Google Sheets spreadsheet (`SPREADSHEET_ID` in `app/api/constants/index.ts`). API routes in `app/api/` use the `googleapis` library with a service account to read/write data.

**Credentials setup**: `prebuild.js` reads Google service account credentials from `.env` and writes them to `google-api-credentials.json` at build time. This file must exist before the app starts. Required env vars: `GOOGLE_PRIVATE_KEY_ID`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_CLIENT_EMAIL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_X509_CERT_URL`.

### App Structure

- `app/page.tsx` — Home page (main wedding info)
- `app/pereira/` — Pereira travel guide page
- `app/rsvp/` — RSVP confirmation page
- `app/faq/` — FAQ page
- `app/regalos/` — Gift registry page
- `app/api/` — API routes: `add-rsvp`, `add-faq`, `add-message`, `fetch-attendees`, `fetch-faqs`, `fetch-messages`, `like-message`

### Key Conventions

- `app/_cards/` — Self-contained content sections rendered as cards (ceremony, dress code, RSVP, etc.)
- `app/_components/` — Shared UI components (`Grid`, `TCard`, `Navbar`, `BottomMenu`, `Heroe`, etc.)
- `app/_hooks/` — Custom hooks
- `app/_interfaces/index.ts` — Shared TypeScript types (`Invitation`, `Question`, `GiftMessage`)
- `app/_store/` — Zustand stores (currently `useHideStore` for the intro animation hide/show state)

### Layout Pattern

Pages use the `Grid` component (`app/_components/grid.tsx`) which implements a responsive layout: single column on mobile, two staggered columns on desktop. Cards are passed as an array of `ReactNode` and split into even/odd columns on desktop.

### Path Aliases

`@/` maps to the project root (configured in `tsconfig.json`), so imports like `@/_interfaces` resolve correctly.

### Images

Remote images from Vercel Blob Storage (`fugvavcdkqda2ylw.public.blob.vercel-storage.com`) are allowed via `next.config.ts`.
