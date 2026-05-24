# Role: Senior Architect (React + TypeScript)

## Project Overview
A modern web application for managing lawn maintenance schedules and reminders, tracking tasks, and integrating with weather forecast APIs.

## Technology Stack
- React + Vite, TypeScript, Tailwind CSS, Zustand

## Project Structure
All source files live inside the `src/` folder:
- `src/components/` - Reusable UI components
- `src/pages/`      - App pages and routing
- `src/services/`   - API integration layer (All fetch/axios calls go here)
- `src/hooks/`      - Custom React hooks
- `src/store/`      - Zustand state management
- `src/utils/`      - Helper functions

## Core Coding Rules
- **Strict Separation:** Separate API logic entirely into `src/services/`. Never put fetch/axios calls directly inside UI components.
- Keep components small, modular, and reusable.
- Ensure the UI is highly responsive using Tailwind mobile-first utility classes.

## Dev Environment Commands
- **Install:** `npm install`
- **Run Dev:** `npm run dev`
- **Build:** `npm run build`
- **Test:** `npm run test`