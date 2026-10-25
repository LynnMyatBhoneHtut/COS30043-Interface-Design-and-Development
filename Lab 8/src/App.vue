<template>
  <!-- Menu to switch between the two pages -->
  <nav class="navbar navbar-expand bg-dark" data-bs-theme="dark">
    <div class="container">
      <span class="navbar-brand">Lab 08</span>
      <div class="navbar-nav">
        <router-link to="/task1" class="nav-link">Task 1: getJSON</router-link>
        <router-link to="/task2" class="nav-link">Task 2: fetch</router-link>
      </div>
    </div>
  </nav>

  <!-- The current page (Task1 or Task2) is shown here -->
  <main class="container py-4">
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'App'
}
</script>
