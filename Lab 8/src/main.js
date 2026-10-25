import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'
import router from './router'

// Start the Vue app and plug in Vue Router
createApp(App).use(router).mount('#app')
