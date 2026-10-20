import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Bootstrap CSS (grid, components) and JavaScript (carousel)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './style.css'

createApp(App).use(router).mount('#app')
