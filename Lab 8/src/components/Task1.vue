<template>
  <div>
    <h1 class="h3 mb-3">Posts</h1>

    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

    <!-- Show only the id and title of each post -->
    <p v-for="post in posts" :key="post.id">
      {{ post.id }} -- {{ post.title }}
    </p>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Task1',

  data() {
    return {
      posts: [],        // the 100 posts from JsonPlaceholder
      errorMessage: ''
    }
  },

  // mounted() runs once the page is on screen, so the data is loaded straight away
  mounted() {
    // jQuery getJSON(): get the JSON from the URL, then run the function with the data
    $.getJSON('https://jsonplaceholder.typicode.com/posts', (data) => {
      this.posts = data
    }).fail(() => {
      this.errorMessage = 'Could not load the posts. Please check your internet connection.'
    })
  }
}
</script>
