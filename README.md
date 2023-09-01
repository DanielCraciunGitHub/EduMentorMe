# EMM - EduMentorMe

Framework: Next.js 13

## About this project

This project is designed as a hub of many different features. Each feature is unique and serves a common purpose, which is to boost the grades of all UK students.

## Features

- Blazingly fast performance.
- UI styled with `tailwind CSS`.
- Fully accessible; contains screen reader support.
- Optimized for SEO.
- Dark mode using the `shadcn-ui` library.
- Data validation using `zod`.
- Payment handling using `stripe`.
- Rate limiting API endpoints using `Upstash`.
- Protected routes using `middleware`.
- `Google Drive API` used to store and manage resources.
- `MDX content` in the main page, about us page, and contact us page via `contentlayer`.
- Website protected using `reCAPTCHA v3`.
- Search feature with dynamic routing, using `ISR` for each resource page.
- Todo feature uses `zustand` to manage the todos' state, and `Supabase` to sync these todos in a database.
- Simple study timer feature that implements `react-timer-hook`.
- Contact form uses `nodemailer` to receive user feedback.
- Login and sign-up feature with email verification using `Supabase`.

## Goals

- [x] ~Use `CSS variables` to easily allow changes in global theme.~
- [x] Add a `custom SMTP` provider when working with `Supabase`.
- [x] Monetize website features using `Stripe`.
- [ ] Implement the `OpenAI` API to create a custom chatbot.

## Known issues

- [x] Opengraph images don't work on `WhatsApp`
- [x] ~Search form selections not registering properly on mobile.~
- [x] Todos do not save after adding a todo then switching tab promptly.
- [ ] Large bundle size for the `login`, `sign up` and `contact us` pages.

## How to work on the repo yourself

1. Install dependencies using pnpm:

```sh
pnpm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Start the development server:

```sh
pnpm dev
```
