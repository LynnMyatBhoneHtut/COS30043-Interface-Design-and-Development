# Lab 10 – CRUD Application with MySQL

Vue 3 + Vite app with a PHP/MySQL backend to add, edit, delete and page through travel destinations.

Live: http://mercury.swin.edu.au/cos30043/s105973835/lab10/

- `sql/travel.sql` – travel table (primary key `id`) with the 15 rows from travel.csv
- `src/App.vue` – table with pagination (5 per page), Add / Edit / Delete
- `src/components/TravelForm.vue` – add/edit form with validation
- `public/api/travel.php` – reads and writes MySQL, returns JSON