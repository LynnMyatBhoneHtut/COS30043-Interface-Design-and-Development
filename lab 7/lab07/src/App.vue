<template>
  <!-- Navigation bar: links in a row on medium+ screens, hamburger menu on small screens -->
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/" @click="menuOpen = false">Wanderlust Travel</router-link>

      <button
        class="navbar-toggler"
        type="button"
        aria-controls="navMenu"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation"
        @click="menuOpen = !menuOpen"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navMenu" class="collapse navbar-collapse" :class="{ show: menuOpen }">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/" @click="menuOpen = false">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/travel" @click="menuOpen = false">Destinations</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about" @click="menuOpen = false">About</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- The selected page (Home, Travel or About) is shown here -->
  <main class="container py-4">
    <router-view />
  </main>

  <footer class="bg-dark text-white-50 text-center py-3">
    <small>COS30043 Lab 07 &middot; Lynn Myat Bhone Htut (105973835)</small>
  </footer>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      menuOpen: false,
    }
  },
}
</script>
