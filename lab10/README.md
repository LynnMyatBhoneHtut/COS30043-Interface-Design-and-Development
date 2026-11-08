# Lab 10 – CRUD Application with MySQL

COS30043 Interface Design and Development. Vite + Vue 3 + Bootstrap 5 + vuejs-paginate + PHP + MySQL.

| Requirement | Where |
|---|---|
| 1. MySQL table from travel.csv, with a primary key | `sql/travel.sql` – table `travel`, `id INT AUTO_INCREMENT PRIMARY KEY`, all 15 rows |
| 2. Web app made with Vite | this project |
| 3. Read – records in a table with pagination | `src/App.vue` – Bootstrap table, `<paginate>` with 5 rows per page |
| 3. Create – insert | "+ Add destination" → form in `src/components/TravelForm.vue` |
| 3. Update | "Edit" on a row → same form, filled in with that row |
| 3. Delete | "Delete" on a row → confirm box → row removed |
| 3. Easy-to-use UI | form checks every field, success/error messages, edited row highlighted, works on phones |
| 4. Tested | see checks below |

`public/api/travel.php` is the only file that talks to MySQL (the browser can't connect to MySQL directly).
The Vue app calls it with `fetch()`:

| Request | Does |
|---|---|
| `GET api/travel.php` | returns every row (Read) |
| `POST { action: 'create', ... }` | inserts a row (Create) |
| `POST { action: 'update', id, ... }` | updates a row (Update) |
| `POST { action: 'delete', id }` | deletes a row (Delete) |

It uses prepared statements (no SQL injection) and checks the data again on the server.

**Note on the library:** the original `vuejs-paginate` only works with Vue 2, so this app uses
`vuejs-paginate-next`, the Vue 3 version of the same component (same `<paginate>` tag and props).

## 1. Create the table on Mercury
Log in to Mercury (SSH) and run, from the folder with `travel.sql`:
```
mysql -h feenix-mariadb.swin.edu.au -u s105973835 -p s105973835_db < travel.sql
```
(or paste the contents of `sql/travel.sql` into phpMyAdmin's SQL tab).

## 2. Put in your MySQL password
Open `public/api/settings.php` and replace `YOUR_MYSQL_PASSWORD` with your MySQL password.

## 3. Build and deploy
```
npm install
npm run build
```
Upload everything **inside** the `dist` folder (`index.html`, `assets`, `api`) to a `lab10`
folder on Mercury, then submit that folder's URL on Canvas.

`base: './'` in `vite.config.js` lets it work from any folder.

## Run locally (optional)
Needs PHP and a local MySQL with the table loaded; point `settings.php` at it (e.g. `localhost`). Then, in two terminals:
```
php -S localhost:8000 -t public
npm run dev
```
Vite passes `api/` calls on to the PHP server (see `server.proxy` in `vite.config.js`).

## Tests (all passed, against a real MySQL/MariaDB database)
- Opens with destinations 1–5, pages 1, 2, 3 and "Showing 1–5 of 15".
- Page numbers, Prev and Next show the right rows.
- Add with empty boxes → all 5 fields show an error; rating 4.85 or 9 → rating error.
- Add a valid destination → "Destination added.", jumps to the new last page, row is in MySQL.
- Edit → form is filled in, row highlighted; save → "Destination updated.", MySQL changed.
- Cancel → nothing changed. Clicking Edit on another row loads that row.
- Delete → confirm box; Cancel keeps the row, OK deletes it from MySQL; an empty last page goes back one page.
- Reloading the page shows the data from MySQL. No console errors. Table scrolls sideways on phones.
- Server rejects bad data (empty name, wrong category, rating 7), unknown actions, and blocks SQL injection.
