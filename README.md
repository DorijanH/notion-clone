<h1 align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/icons/logo-dark.svg">
    <img width="128" height="128" alt="logo" src="public/icons/logo.svg">
  </picture>

  <p>Jotion</h1>
</h1>

<div align="center">
  <p>Full-stack <a href="https://www.notion.so/" target="_blank">Notion</a> clone made by following the <a href="https://github.com/AntonioErdeljac/notion-clone-tutorial" target="_blank">tutorial</a>.</p>

  <div>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="typescript" width="40" />
    </a>
    <a href="https://react.dev/" target="_blank">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" alt="react" width="40" />
    </a>
    <a href="https://nextjs.org/" target="_blank">
      <img src="https://user-images.githubusercontent.com/643171/203530354-f898ddfc-864f-460e-9780-4f3717256130.png" alt="nextjs" width="40" />
    </a>
    <a href="https://www.convex.dev/" target="_blank">
      <img src="https://avatars.githubusercontent.com/u/81530787" alt="convex" width="40" />
    </a>
    <a href="https://edgestore.dev/" target="_blank">
      <img src="https://avatars.githubusercontent.com/u/121528638" alt="edge store" width="40" />
    </a>
    <a href="https://zustand-demo.pmnd.rs/" target="_blank">
      <img src="https://raw.githubusercontent.com/pmndrs/zustand/main/examples/demo/public/favicon.ico" alt="zustand" width="40" />
    </a>
    <a href="https://tailwindcss.com/" target="_blank">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="tailwindcss" width="40" />
    </a>
    <a href="https://ui.shadcn.com/" target="_blank">
      <img src="https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/favicon.ico" alt="shadcn-ui" width="40" />
    </a>
    <a href="https://clerk.com/" target="_blank">
      <img src="https://raw.githubusercontent.com/clerkinc/clerk-docs/main/public/favicon.ico" alt="clerk" width="40" />
    </a>
  </div>
</div>

<br />

<div>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/home-page-dark.png">
    <img alt="logo" src="docs/home-page-light.png">
  <picture>
</div>
  
## 🛠 Prerequisites
+ [Node](https://nodejs.org/en) version >= 18.x
+ [pnpm](https://pnpm.io/) package manager
+ Code editor ([Visual Studio Code](https://code.visualstudio.com/) recommended)

## 🔰 Getting started

### Clone the repository
The easiest way to get started is to scaffoled a copy of the repository by using [degit](https://github.com/Rich-Harris/degit).

```bash
pnpm dlx degit https://github.com/DorijanH/notion-clone notion-clone
```

### Installing dependencies
Installing dependencies is done by running the following command

```bash
pnpm i
```

### Environmental variables
Create a local configuration file `.env.local` using the `.env.local.example` template

### Running the application
In order for the application to work, both the backend and frontend need to be running in their own terminals:

#### Running the Convex backend
```bash
pnpm dlx convex dev
```

#### Running the frontend app
```bash
pnpm dev
```
