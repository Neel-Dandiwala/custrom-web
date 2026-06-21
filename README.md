# Custrom — Landing Page

Marketing landing page for Custrom: revenue intelligence for B2B teams — score inbound leads and flag churn risk using the CRM and activity data you already have.

Built with [Nuxt 4](https://nuxt.com) + [Nuxt UI](https://ui.nuxt.com) + Tailwind CSS v4.

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
```

## Build

```bash
npm run generate  # static output in .output/public
npm run preview   # preview the production build
```

## Deploy (Render)

This repo includes a `render.yaml` blueprint that deploys the site as a **Static Site**:

- Build command: `npm ci && npm run generate`
- Publish directory: `.output/public`

See the deploy steps in the project notes, or point Render at this repo and it will pick up `render.yaml` automatically.
