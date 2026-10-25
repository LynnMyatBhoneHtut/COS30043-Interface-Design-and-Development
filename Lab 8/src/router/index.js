import { createRouter, createWebHashHistory } from 'vue-router'
import Task1 from '../components/Task1.vue'
import Task2 from '../components/Task2.vue'

// The two pages of the app
const routes = [
  { path: '/', redirect: '/task1' },   // open Task 1 first
  { path: '/task1', component: Task1 },
  { path: '/task2', component: Task2 }
]

const router = createRouter({
  // Hash history (URLs like #/task2) works on Mercury with no server setup
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'            // Bootstrap's class for the current nav link
})

export default router
