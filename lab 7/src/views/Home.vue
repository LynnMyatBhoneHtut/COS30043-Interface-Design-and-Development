<template>
  <div class="row g-4 align-items-center">
    <!-- Title and welcome paragraph: full width on small screens, left column on large screens -->
    <div class="col-12 col-lg-5">
      <h1 class="display-5 fw-bold">Discover the World</h1>
      <p class="lead">
        Welcome to Wanderlust Travel! Explore snowy mountains, clear blue oceans, sunny beaches
        and exciting cities from around the world. Find your next adventure and start planning
        your dream holiday today.
      </p>
      <router-link to="/travel" class="btn btn-primary btn-lg">View Destinations</router-link>
    </div>

    <!-- Bootstrap carousel: full width on small screens, right column on large screens -->
    <div class="col-12 col-lg-7">
      <div id="travelCarousel" ref="carousel" class="carousel slide">
        <div class="carousel-indicators">
          <button
            v-for="(slide, index) in slides"
            :key="'dot-' + slide.image"
            type="button"
            data-bs-target="#travelCarousel"
            :data-bs-slide-to="index"
            :class="{ active: index === 0 }"
            :aria-current="index === 0 ? 'true' : null"
            :aria-label="'Slide ' + (index + 1)"
          ></button>
        </div>

        <div class="carousel-inner rounded shadow">
          <div
            v-for="(slide, index) in slides"
            :key="slide.image"
            class="carousel-item"
            :class="{ active: index === 0 }"
          >
            <img :src="slide.image" class="d-block w-100 carousel-img" :alt="slide.title">
            <div class="carousel-caption">
              <h5>{{ slide.title }}</h5>
              <p class="d-none d-md-block">{{ slide.text }}</p>
            </div>
          </div>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#travelCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#travelCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel } from 'bootstrap'

export default {
  name: 'Home',
  data() {
    return {
      slides: [
        { image: 'images/alps.jpg', title: 'Swiss Alps, Switzerland', text: 'Snowy peaks and fresh mountain air.' },
        { image: 'images/maldives.jpg', title: 'Maldives', text: 'Crystal clear water in the Indian Ocean.' },
        { image: 'images/langkawi.jpg', title: 'Langkawi, Malaysia', text: 'Soft sand and tropical sunshine.' },
        { image: 'images/tokyo.jpg', title: 'Tokyo, Japan', text: 'A city that never sleeps.' },
      ],
    }
  },
  mounted() {
    // Start the carousel auto-play every time the Home page is opened
    this.carousel = new Carousel(this.$refs.carousel, { interval: 3000, ride: 'carousel' })
  },
  beforeUnmount() {
    this.carousel.dispose()
  },
}
</script>
