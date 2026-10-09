This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Authentication

Authentication uses Better Auth with MongoDB. Copy `.env.example` to `.env.local`,
set `MONGODB_URI` to your MongoDB connection string, and optionally change
`MONGODB_DATABASE` to select the database name. Set `BETTER_AUTH_SECRET` to a
random secret of at least 32 characters. Email/password sign-in works without
OAuth credentials.

To enable Google and GitHub sign-in, create OAuth apps with the callback URL
`http://localhost:3000/api/auth/callback/google` and
`http://localhost:3000/api/auth/callback/github`, respectively, then add the
client ID and secret values to `.env.local`. Use your deployed app's origin when
configuring OAuth for production.

Product detail pages require an authenticated session. Visitors are sent to
sign-in and returned to the requested product after signing in or creating an
account.

Signed-in users can view their account details at `/profile` and update their
name at `/profile/update`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
