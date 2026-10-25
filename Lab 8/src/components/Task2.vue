<template>
  <div>
    <h1 class="h3 mb-3">Units</h1>

    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>cp</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <!-- One row for each unit in units.json -->
          <tr v-for="unit in units" :key="unit.code">
            <td>{{ unit.code }}</td>
            <td>{{ unit.desc }}</td>
            <td>{{ unit.cp }}</td>
            <td>{{ unit.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task2',

  data() {
    return {
      units: [],        // the 12 units from units.json
      errorMessage: ''
    }
  },

  // mounted() runs once the page is on screen, so the data is loaded straight away
  mounted() {
    // JavaScript fetch(): units.json sits in the public folder,
    // so it ends up next to index.html when the app is built
    fetch('units.json')
      .then((response) => response.json())   // turn the file's text into an array
      .then((data) => {
        this.units = data
      })
      .catch(() => {
        this.errorMessage = 'Could not load units.json.'
      })
  }
}
</script>
