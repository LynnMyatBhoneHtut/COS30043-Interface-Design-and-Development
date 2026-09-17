/*
 * js/main.js
 * Entry point: create the Vue app from the App root component,
 * install the router, and mount to #app.
 */
const app = Vue.createApp(App);
app.use(router);
app.mount("#app");
