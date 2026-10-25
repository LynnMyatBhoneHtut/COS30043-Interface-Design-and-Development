import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Travel from '../views/Travel.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/travel', name: 'travel', component: Travel },
  { path: '/about', name: 'about', component: About },
  // Any unknown address goes back to the home page
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  // Hash mode (#/travel) so page refresh works on Mercury without server setup
  history: createWebHashHistory(),
  routes,
  // Use Bootstrap's "active" class for the current nav link
  linkExactActiveClass: 'active',
})

export default router
