# COS30043 Lab 07 – Vite (Wanderlust Travel)

Vue.js 3 + Vue Router + Bootstrap 5 app created with Vite.

## Pages
- **Home** (`src/views/Home.vue`) – title, welcome paragraph, Bootstrap carousel (4 images).
- **Destinations** (`src/views/Travel.vue`) – list read from `src/data/destinations.json`
  (name, country, description, category), search by all fields or by one chosen field.
- **About** (`src/views/About.vue`) – about paragraph, first/last name inputs with welcome
  message, Ocean/Mountain radio buttons that change the image.

## Responsive layouts (Bootstrap grid)
- Phone (< 768px): hamburger menu, everything stacked, 1 destination card per row.
- Tablet (768px+): menu in a row, 2 cards per row, About page in two columns.
- Desktop (992px+): Home text and carousel side by side, 3 cards per row.

## Run locally
```
npm install
npm run dev
```

## Build and deploy to Mercury
```
npm run build
```
Upload everything **inside** the `dist` folder (index.html, assets, images, favicon.svg)
to a folder on Mercury, e.g. `lab07`, then submit that folder's URL on Canvas.
`base: './'` in `vite.config.js` and hash routing (`#/travel`) let it work from any folder.

Images in `public/images` are simple drawn placeholders – replace any of them with a real
photo using the same file name if you like.
