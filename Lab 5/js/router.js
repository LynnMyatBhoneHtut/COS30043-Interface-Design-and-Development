
const routes = [
  { path: "/", name: "overview", component: JobOverview },
  { path: "/job/:id", name: "jobDetail", component: JobDetail, props: true }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  linkActiveClass: "active",
  routes: routes
});
