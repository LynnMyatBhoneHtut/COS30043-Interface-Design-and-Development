/*
 * js/router.js
 * router – the router configuration.
 * Two routes:
 *   /            -> JobOverview  (the default "Overview" view)
 *   /job/:id     -> JobDetail    (:id passed to the component as a prop)
 * Uses hash history so the app works when opened directly from the web server
 * without extra server-side rewrite rules.
 */
const routes = [
  { path: "/", name: "overview", component: JobOverview },
  { path: "/job/:id", name: "jobDetail", component: JobDetail, props: true }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  linkActiveClass: "active",
  routes: routes
});
