# Lab 05 — Components and Router (Insight Hire)

Vue 3 + Bootstrap + Vue Router. Every component lives in its own file, and all
frameworks are served locally from `vendor/` (no CDN), as the lab requires.

## Folder structure

```
lab05/
├── index.html                 # loads local vendor libs + app files, in order
├── css/
│   └── style.css              # small custom styles on top of Bootstrap
├── js/
│   ├── data/
│   │   └── jobs.js            # job list hard-coded as a JS array (global `jobs`)
│   ├── components/
│   │   ├── App.js             # root component (layout)
│   │   ├── JobList.js         # left column: Overview + job-ID router-links
│   │   ├── JobDetail.js       # right column: all fields for one job
│   │   ├── JobOverview.js     # right column: default overview text
│   │   └── ToDoList.js        # add / delete / toggle-priority tasks
│   ├── router.js              # route config (Overview + JobDetail)
│   └── main.js                # entry point (createApp + use(router) + mount)
└── vendor/                    # local copies — not a CDN
    ├── vue.global.js          # Vue 3.5
    ├── vue-router.global.js   # Vue Router 4
    ├── bootstrap.min.css      # Bootstrap 5.3
    └── bootstrap.bundle.min.js
```

## How to run

Because it uses Vue Router and multiple script files, open it through a web
server (not by double-clicking the file). From inside the `lab05` folder:

```
python3 -m http.server 8080
```

Then visit http://localhost:8080/ — or just use the Live Server extension in
VS Code.

## Notes on the components

- **Job Explorer** uses Vue Router. `JobList` renders an `Overview` link plus
  one `<router-link>` per job ID. The right panel is a `<router-view>`:
  - `/`            → `JobOverview`
  - `/job/:id`     → `JobDetail` (the `id` is passed in as a prop)
- **To-Do List** (`ToDoList`): new tasks are added to the **start** of the
  array. Each task has a **Delete** button and a **Toggle Priority** button.
  Priority is High or Low; the task text shows `(High Priority)` / `(Low
  Priority)` and the button caption toggles between `Mark as High Priority`
  and `Mark as Low Priority`.
```
