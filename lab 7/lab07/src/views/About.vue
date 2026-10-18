<template>
  <!-- Two columns on medium+ screens, stacked on small screens -->
  <div class="row g-4">
    <div class="col-12 col-md-6">
      <h1>About This App</h1>
      <p>
        Wanderlust Travel is a simple travel guide web application built with Vue.js 3, Vue Router
        and the Bootstrap grid system, and created with the Vite build tool. You can browse a
        carousel of featured places on the Home page, and search travel destinations by name,
        country, description or category on the Destinations page.
      </p>
      <p>
        Tell us your name and choose the kind of trip you like to get a personal welcome.
      </p>
    </div>

    <div class="col-12 col-md-6">
      <div class="card shadow-sm">
        <div class="card-body text-center">
          <h2 class="h3">{{ welcomeMessage }}</h2>
          <p class="text-muted">What is your name?</p>

          <div class="row mb-2 align-items-center">
            <label for="firstName" class="col-4 col-form-label text-end">First Name</label>
            <div class="col-8">
              <input id="firstName" v-model="firstName" type="text" class="form-control">
            </div>
          </div>

          <div class="row mb-3 align-items-center">
            <label for="lastName" class="col-4 col-form-label text-end">Last Name</label>
            <div class="col-8">
              <input id="lastName" v-model="lastName" type="text" class="form-control">
            </div>
          </div>

          <div class="mb-3">
            <div class="form-check form-check-inline">
              <input id="ocean" v-model="tripType" class="form-check-input" type="radio" value="Ocean">
              <label class="form-check-label" for="ocean">Ocean</label>
            </div>
            <div class="form-check form-check-inline">
              <input id="mountain" v-model="tripType" class="form-check-input" type="radio" value="Mountain">
              <label class="form-check-label" for="mountain">Mountain</label>
            </div>
          </div>

          <!-- Image changes based on the selected radio button -->
          <img :src="selectedImage" :alt="tripType" class="img-fluid rounded about-img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      firstName: '',
      lastName: '',
      tripType: 'Mountain',
      images: {
        Ocean: 'images/ocean.jpg',
        Mountain: 'images/mountain.jpg',
      },
    }
  },
  computed: {
    welcomeMessage() {
      const fullName = (this.firstName.trim() + ' ' + this.lastName.trim()).trim()
      return fullName === '' ? 'Welcome!' : 'Welcome ' + fullName + '!'
    },
    selectedImage() {
      return this.images[this.tripType]
    },
  },
}
</script>
