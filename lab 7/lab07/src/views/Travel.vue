<template>
  <div>
    <h1 class="mb-3">Travel Destinations</h1>

    <!-- Search box and "search by" option: stacked on small screens, side by side on medium+ -->
    <div class="row g-2 mb-3">
      <div class="col-12 col-md-8">
        <input
          v-model="searchText"
          type="text"
          class="form-control"
          placeholder="Search by name, country, description or category..."
          aria-label="Search destinations"
        >
      </div>
      <div class="col-12 col-md-4">
        <select v-model="searchBy" class="form-select" aria-label="Search by">
          <option value="all">Search all fields</option>
          <option value="name">Name</option>
          <option value="country">Country</option>
          <option value="description">Description</option>
          <option value="category">Category</option>
        </select>
      </div>
    </div>

    <p class="text-muted">
      Showing {{ filteredDestinations.length }} of {{ destinations.length }} destinations
    </p>

    <!-- Destination cards: 1 per row on phones, 2 on tablets, 3 on desktops -->
    <div class="row g-4">
      <div
        v-for="destination in filteredDestinations"
        :key="destination.id"
        class="col-12 col-md-6 col-lg-4"
      >
        <div class="card h-100 shadow-sm">
          <img :src="destination.image" class="card-img-top card-img" :alt="destination.name">
          <div class="card-body">
            <h5 class="card-title">{{ destination.name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ destination.country }}</h6>
            <span class="badge bg-primary mb-2">{{ destination.category }}</span>
            <p class="card-text">{{ destination.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredDestinations.length === 0" class="alert alert-warning mt-3">
      No destinations match "{{ searchText }}".
    </div>
  </div>
</template>

<script>
// Destination list is read from the local JSON file
import destinations from '../data/destinations.json'

export default {
  name: 'Travel',
  data() {
    return {
      destinations: destinations,
      searchText: '',
      searchBy: 'all',
    }
  },
  computed: {
    filteredDestinations() {
      const text = this.searchText.trim().toLowerCase()

      // Empty search box: show every destination
      if (text === '') {
        return this.destinations
      }

      return this.destinations.filter((destination) => {
        if (this.searchBy === 'all') {
          // Match the text against name, country, description and category
          return (
            destination.name.toLowerCase().includes(text) ||
            destination.country.toLowerCase().includes(text) ||
            destination.description.toLowerCase().includes(text) ||
            destination.category.toLowerCase().includes(text)
          )
        }
        // Match the text against the one chosen field only
        return destination[this.searchBy].toLowerCase().includes(text)
      })
    },
  },
}
</script>
