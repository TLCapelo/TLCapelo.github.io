# TLCapelo.github.io

Portfólio pessoal — https://tlcapelo.github.io

## Stack

React 19 · Vite 6 · Tailwind CSS 4 · lucide-react

## Rodar localmente

```bash
npm install
npm run dev
```

## Deploy

O deploy é automático: qualquer push na branch `main` dispara o workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que roda
`npm ci && npm run build` e publica a pasta `dist/` no GitHub Pages.

> Em **Settings → Pages**, a opção *Source* precisa estar em **GitHub Actions**.
> Se estiver em "Deploy from a branch", o Pages serve o código-fonte sem
> compilar e a página não carrega.

## Estrutura

```
index.html                     entrada do Vite
src/main.jsx                   bootstrap do React
src/Portfolio.jsx              a página inteira (+ o Tetris)
src/index.css                  import do Tailwind
vite.config.js                 base "./" para caminhos relativos
```
