# agri-hydro

> E-commerce catalogue for **STE Agri Hydro Solution** — a water treatment company based in Oujda, Morocco.

**Live site:** https://agri-hydro.agri-hydro-frontend.workers.dev/

---

## About the Project

A fully responsive product catalogue built for a local business specializing in osmosis systems, water filters and pumps. Users can browse products, filter by category, view product details, and reach the company via WhatsApp.

---

## Features

- Product catalogue with search, category filter, promotions and sort options
- Individual product pages with descriptions and images
- WhatsApp contact form (pre-fills a message)
- About page and contact information
- Deployed and live on Cloudflare Workers

---

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-F38020?style=flat&logo=cloudflare&logoColor=white)

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build    # generates frontend/dist
```

---

## Project Structure

```
agri-hydro/
  frontend/
    src/
    public/
    wrangler.jsonc   # Cloudflare deployment config
```

---

## Status

Stage 4 of 6 — frontend complete (UI, catalogue, product pages, contact).
Backend (PHP/MySQL) and admin panel planned for stages 5–6.
