This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Railway (Backend): https://revoubackend6-production.up.railway.app/

## Backend URL

The frontend reads the backend origin from `NEXT_PUBLIC_API_URL`.

For local development, create `.env.local` with:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

For production, set it to:

```env
NEXT_PUBLIC_API_URL=https://revoubackend6-production.up.railway.app
```

Without an override, development defaults to localhost and production defaults to Railway.


Netlify (Frontend): https://uniklohfe.netlify.app/


Postman: https://cloudy-rocket-335939.postman.co/workspace/UniklohRailway~4990efb5-2859-427a-9fdb-79453b473d87/request/27407956-5e00e1eb-0003-4ec6-b6e2-12e3d9308378?action=share&creator=27407956&ctx=documentation


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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



Unik Loh! – Readme

![Project Logo](/image/logo.png)
Unik Loh! 🎭✨

Unik Loh! is a cosplay shop platform built for cosplay enthusiasts. The platform allows users to buy and rent costumes, as well as book professional photography services using either a physical photo studio or a portable photo studio.

This project is a full‑stack web application built using modern technologies with a strong focus on scalability, security, and developer productivity.

🚀 Tech Stack
Frontend

Next.js – React framework for server-side rendering and static generation

TypeScript – Strong typing with interfaces and types

Tailwind CSS – Utility-first CSS framework for styling

Context API + useEffect – State management and side effects

Middleware (Next.js) – Protect private routes/pages

npm – Package manager

Netlify – Frontend deployment

Backend

NestJS – Scalable Node.js backend framework

TypeScript – Type safety across backend services

Prisma ORM – Database modeling and queries

JWT (JSON Web Token) – Authentication & authorization

Passport & Guards – Secure route protection

bcryptjs – Password hashing

pnpm – Package manager

Railway – Backend deployment

Database

Supabase – Database hosting and deployment

Testing & Tooling

Postman – API testing

GitHub Copilot – Debugging & productivity

ChatGPT & Claude Code – Troubleshooting and development assistance

🔐 Authentication & Security

The project implements a secure authentication system, including:

User signup, login, and logout

JWT-based authentication

Passport strategies for validation

NestJS Guards to protect backend routes

Next.js Middleware to restrict frontend access to private pages

bcryptjs for secure password hashing

📄 Pages & Features
Core Pages

🛍️ Product Page – Browse cosplay costumes for sale or rent

![Product Page](/image/productpage.png)

👤 User Page – User profile and related actions

🔐 Login Page

![Login Page](/image/loginpage.png)

📝 Signup Page

🚪 Logout Functionality

Additional Pages

📰 Blog Page – Built using Static Site Generation (SSG)

❓ FAQ Page – Also using Static Site Generation (SSG)

🧠 State Management

React Context API is used to manage global state

useEffect is used for data fetching, authentication checks, and syncing state

📸 Photography Services

Unik Loh! also offers photography services:

🏢 Physical Photo Studio – On-site professional photoshoots

🎒 Portable Photo Studio – Mobile setup for flexible locations

![Photoshoot Page](/image/photoshootpage.png)

📦 Deployment Architecture

Frontend: Netlify

Backend: Railway

Database: Supabase

🧑‍💻 Development Notes

The entire project is written in TypeScript

Interfaces and types are explicitly defined for:

API requests & responses

Database models

![ERD](/image/EDB.png)

Frontend state and props

📌 Summary

Unik Loh! is a modern, full-stack cosplay e-commerce and service platform that combines:

Secure authentication

Scalable architecture

Clean UI design

Professional development tooling

Built with ❤️ for cosplay enthusiasts.
