# How to Contribute to This Repo

> If you are an outsider, in other words, not a member to this organization, fork the repository and create issue(s), be it pull request or bug report.

> If you are an insider, follow these steps

## Getting started

### Clone the repo
```
git clone https://github.com/kmbui/web-utama.git
```

### Install Dependencies
```
npm install
```

### Run Locally
```
npm run dev
```

## Branch Management and Project Structure (Must-read for devs)

There is main and dev branches in this repo, main branch corresponds to prod (https://kmbui.netlify.app/) and dev branch corresponds to dev environment (https://dev--kmbui.netlify.app/).

The way to contribute is make a branch with prefix `feat/`, for example, `feat/organization-page` and so on. Then, if certain that your work is "done", open a pull request to dev branch. Then, the author of this README will review your PR and give comment or approve the PR, if approved, proceed to merge the pull request. We will review together the changes merged into dev branch by taking a look at the deploy result of the dev branch (https://dev--kmbui.netlify.app/) and if there is nothing wrong, I will merge to main, and if there is, fix and PR to dev again.

This project follows this general structure

```
└── 📁web-utama
    └── 📁public
        ├── logo-kmbui.png
    └── 📁src
        └── 📁app
            └── 📁informasi-umum
            └── 📁organisasi
            └── 📁paramita
            ├── globals.css
            ├── layout.tsx
            ├── page.tsx
            ├── robots.ts
            ├── sitemap.ts
        └── 📁components
        └── 📁lib
    ├── .env
    ├── .gitignore
    ├── eslint.config.mjs
    ├── next-env.d.ts
    ├── next.config.ts
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── README.md
    └── tsconfig.json
```

The main app lives inside the `src/app/` directory and inside this directory, there are several more directories that each corresponds to pages that exist in the project. Inside each page's directory, you can add more directories like `components/`, `hooks/`, etc. alongside the components and hooks **as long as it only belongs to the corresponding page**. If any components or hooks or anything else are shared between pages, put it in the `components/` or `hooks/` outside of the app directory.
