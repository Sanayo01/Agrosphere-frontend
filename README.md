# Agrosphere

Agrosphere is a React web application for exploring agriculture-focused services in one place. The interface brings together a produce marketplace, farming guidance, expert consultations, and farm investment opportunities, with a Nigerian Naira and AgroCoin (AC) themed shopping and wallet experience.

This repository contains the **frontend**. It connects to an API for features such as account access, product listings, chat, and investment data. Several screens also include sample data or demo behavior so the interface can still be explored when the API is unavailable. Payment, wallet, and traceability elements should be treated as demonstration flows unless connected to their corresponding production services.

## Features

- Sign up, sign in, and protected application pages
- Dashboard with farming guidance and investment summaries
- Agro-Chat farming advisor interface
- Produce marketplace with cart, checkout, and order confirmation flows
- Product traceability details
- Expert directory and consultation booking flow
- Farm co-ownership opportunities and portfolio view
- AgroCoin-themed wallet and payment options
- Responsive navigation for mobile-sized screens

## Tech stack

- React 19 and TypeScript
- Vite 7 with the SWC React plugin
- React Router
- Tailwind CSS 4

## Getting started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm

### Install and run

```bash
npm ci
npm run dev
```

Vite prints the local development URL in the terminal when the server starts.

### Configure the API

The frontend uses `VITE_API_BASE_URL` as its API base URL. If it is not set, the app defaults to the Agrosphere API hosted on Render. To use another backend, create a `.env.local` file in the project root:

```dotenv
VITE_API_BASE_URL=http://localhost:8000
```

The app also reads optional `VITE_CONTRACT_ADDRESS` and `VITE_NETWORK_ID` values for its AgroCoin configuration. `VITE_NETWORK_ID` defaults to `sepolia`. Do not put private keys, credentials, or other secrets in Vite environment variables: values prefixed with `VITE_` are included in the client-side build.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check the project and create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## Project structure

```text
src/
  components/   Shared interface components
  context/      Authentication and cart state
  pages/        Application screens and user flows
  assets/       Images and other imported assets
  AppRouter.tsx Application routes
  config.ts     API and AgroCoin configuration
```

## Backend and demo behavior

Account access and data-backed experiences expect a compatible Agrosphere API. When the API is unavailable, some pages display local sample data or simulated results for demonstration; this does not mean that real payments, blockchain transactions, or persistent backend actions have taken place. Set `VITE_API_BASE_URL` to the URL of the backend environment you intend to use.

## Build and lint

Before submitting changes, run:

```bash
npm run build
npm run lint
```
