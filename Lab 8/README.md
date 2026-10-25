# Lab 08 – Retrieving External Data

COS30043 Interface Design and Development. Vite + Vue 3 + Vue Router.

| Page | File | What it does |
|---|---|---|
| Task 1 (`#/task1`) | `src/components/Task1.vue` | jQuery `$.getJSON()` gets the 100 posts from https://jsonplaceholder.typicode.com/posts and shows only `id -- title` for each one. |
| Task 2 (`#/task2`) | `src/components/Task2.vue` | JavaScript `fetch()` reads `public/units.json` and shows the 12 units in a table (Code, Description, cp, Type). |

The router is in `src/router/index.js`. `/` opens Task 1.

## Run locally
```
npm install
npm run dev
```
Open the localhost link it prints (e.g. http://localhost:5173/).

## Build and deploy to Mercury
```
npm run build
```
Upload everything **inside** the `dist` folder (`index.html`, `assets`, `favicon.svg`, `units.json`)
to a `lab08` folder on Mercury, then submit that folder's URL on Canvas.

`base: './'` in `vite.config.js` and hash routing (`#/task2`) let it work from any folder.
