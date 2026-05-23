# Next.js 16 Portfolio Client (Migrated)

This is the newly migrated, SEO-optimized, high-performance portfolio client built using **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

It communicates with the existing Express.js backend for data fetching, dynamic project loading, resume downloads, and contact submissions.

---

## 🚀 Key Improvements & Features

### 1. Technical SEO & Indexability
*   **Folder-Based Routes**: Replaced hash-scrolling with dedicated page paths (`/about`, `/skills`, `/projects`, `/contact`) to make every section search-engine indexable.
*   **Dynamic Sitemap**: Automatically generated at `/sitemap.xml` using `app/sitemap.ts` which fetches all project summaries from the backend API.
*   **robots.txt**: Configured via `app/robots.ts` to allow indexing of public routes while blocking `/admin` paths and `/api` proxies.
*   **JSON-LD Structured Data**: Emits `Person`, `WebSite`, `BreadcrumbList`, and `SoftwareApplication` (for project details) structured schemas on target routes.
*   **Canonical URLs**: Set up on all routes via Next.js metadata API to prevent duplicate content issues.

### 2. Performance & Web Vitals
*   **Server-Side Rendering & ISR**: Revalidation is configured on `/projects` and `/projects/[id]` to statically cache pages and regenerate hourly (Incremental Static Regeneration).
*   **Optimized Image Delivery**: Replaced all custom `<img>` elements with `next/image` to prevent Layout Shifts (CLS) and leverage AVIF/WebP formats.
*   **Optimized Font Loading**: Loaded using `next/font/google` for zero-render blocking and minimal layout shift.
*   **Reduced Bundle Size**: Heavy interactive components (like Framer Motion custom cursor) are loaded asynchronously.

### 3. State-of-the-Art Styling
*   **Tailwind CSS v4**: Built using the modern `@import "tailwindcss";` pipeline.
*   **Anti-FOUT Theme System**: Integrates an inline blocking script inside `<head>` to check `localStorage`/system settings and apply the `dark` class before hydration.

---

## 📂 Folder Structure

```
nextjs-client/
├── app/
│   ├── layout.tsx         # Root Layout, Metadata, Fonts, Global Providers
│   ├── globals.css        # Tailwind V4 import + scrollbar & custom styles
│   ├── sitemap.ts         # Dynamic sitemap generator
│   ├── robots.ts          # robots.txt rules
│   ├── page.tsx           # / -> Home (Hero)
│   ├── about/             # /about -> About Section
│   ├── skills/            # /skills -> Technical Arsenal
│   ├── projects/          # /projects -> All projects grid (ISR)
│   │   └── [id]/          # /projects/[id] -> Project Details View
│   ├── contact/           # /contact -> Contact form & social cards
│   └── admin/             # /admin -> Protected admin login & stats dashboard
├── components/            # Layout, UI, and Section-specific React components
├── hooks/                 # Theme context hooks
├── lib/                   # API definitions, Type definitions, and fetch helpers
└── public/                # Favicon, developer PNGs, and assets
```

---

## 🛠️ Getting Started

### Prerequisites
*   Node.js (v24 or higher) via **NVM** (recommended).

### Local Setup

1.  **Environment Setup**:
    Copy the example file to create your environment variables:
    ```bash
    cp .env.local.example .env.local
    ```
    Set your variables:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5001
    NEXT_PUBLIC_SITE_URL=http://localhost:3000
    ```

2.  **Using NVM (Node Version Manager)**:
    Since Node is installed via NVM in this environment, always source it or load it before executing commands:
    ```bash
    . ~/.nvm/nvm.sh
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Build and Start (Production)**:
    ```bash
    npm run build
    npm run start
    ```
