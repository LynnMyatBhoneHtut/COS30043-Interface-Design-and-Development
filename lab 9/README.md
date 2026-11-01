# Lab 09 – Pagination

COS30043 Interface Design and Development. Vite + Vue 3 + Bootstrap 5 + vuejs-paginate.

| Requirement | Where |
|---|---|
| 1. units.json from Canvas | `public/units.json` |
| 2. Vue app made with Vite | this project |
| 3. Read units.json and show it in a table | `fetch('units.json')` in `src/components/UnitTable.vue` |
| 4. Table styled with Bootstrap | `table table-striped table-bordered table-hover` |
| 5. Search box above the table (code, description, cp, type) | `filteredUnits` in `UnitTable.vue` |
| 6. vuejs-paginate, 5 rows per page | `<paginate>` in `UnitTable.vue`, `perPage: 5` |
| 7. Pagination works on the search results | page count comes from `filteredUnits`; searching goes back to page 1 |
| 8. Dropdown for rows per page | `perPage` dropdown (5, 10, 15) |
| 9. Tested in the browser | see checks below |

**Note on the library:** the original `vuejs-paginate` package only works with Vue 2.
This app uses Vue 3, so it uses `vuejs-paginate-next`, the Vue 3 version of the same
component (same `<paginate>` tag and props).

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
to a `lab09` folder on Mercury, then submit that folder's URL on Canvas.

`base: './'` in `vite.config.js` lets it work from any folder.

## Browser checks (all passed)
- Opens with 5 rows and pages 1, 2, 3 (12 units).
- Page numbers, Prev and Next change the rows.
- Searching "analysis" shows 7 units over 2 pages and jumps back to page 1.
- Search works on code ("COS"), description ("web dev"), cp ("12.5") and type ("core").
- A search with no match shows "No units found."
- Rows per page 10 → 2 pages; 15 → all 12 on 1 page.
