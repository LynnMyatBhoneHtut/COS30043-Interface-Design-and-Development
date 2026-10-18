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

## Here is Mercury Link
https://mercury.swin.edu.au/cos30043/s105973835/Lab%207/#/
