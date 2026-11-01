<template>
  <div>
    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

    <!-- Search box and rows-per-page dropdown, above the table -->
    <div class="row g-3 mb-3">
      <div class="col-md-8">
        <label for="search" class="form-label">Search</label>
        <input type="text" id="search" class="form-control"
               v-model="search" placeholder="Search by code, description, credit points or type">
      </div>
      <div class="col-md-4">
        <label for="perPage" class="form-label">Rows per page</label>
        <select id="perPage" class="form-select" v-model.number="perPage">
          <option v-for="option in perPageOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-bordered table-hover">
        <thead class="table-dark">
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>cp</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <!-- Only the units on the current page -->
          <tr v-for="unit in pagedUnits" :key="unit.code">
            <td>{{ unit.code }}</td>
            <td>{{ unit.desc }}</td>
            <td>{{ unit.cp }}</td>
            <td>{{ unit.type }}</td>
          </tr>
          <tr v-if="filteredUnits.length === 0">
            <td colspan="4" class="text-center text-body-secondary">No units found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- vuejs-paginate (Vue 3 version), using Bootstrap's pagination classes -->
    <paginate
      v-if="pageCount > 0"
      v-model="currentPage"
      :page-count="pageCount"
      :click-handler="changePage"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-class="'page-item'"
      :prev-link-class="'page-link'"
      :next-class="'page-item'"
      :next-link-class="'page-link'"
    >
    </paginate>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate-next'

export default {
  name: 'UnitTable',

  components: {
    paginate: Paginate
  },

  data() {
    return {
      units: [],                   // the 12 units from units.json
      search: '',                  // text typed in the search box
      perPage: 5,                  // rows shown on each page (5 by default)
      perPageOptions: [5, 10, 15], // choices in the rows-per-page dropdown
      currentPage: 1,
      errorMessage: ''
    }
  },

  computed: {
    // Units that match the search text in code, description, cp or type
    filteredUnits() {
      const text = this.search.trim().toLowerCase()
      if (text === '') return this.units

      return this.units.filter((unit) =>
        unit.code.toLowerCase().includes(text) ||
        unit.desc.toLowerCase().includes(text) ||
        unit.cp.toLowerCase().includes(text) ||
        unit.type.toLowerCase().includes(text)
      )
    },

    // Number of pages needed for the filtered units
    pageCount() {
      return Math.ceil(this.filteredUnits.length / this.perPage)
    },

    // The units to show on the current page
    pagedUnits() {
      const start = (this.currentPage - 1) * this.perPage
      return this.filteredUnits.slice(start, start + this.perPage)
    }
  },

  watch: {
    // A new search or a new page size starts again from page 1
    search() {
      this.currentPage = 1
    },
    perPage() {
      this.currentPage = 1
    }
  },

  methods: {
    // Runs when a page number, Prev or Next is clicked
    changePage(pageNum) {
      this.currentPage = pageNum
    }
  },

  // mounted() runs once the page is on screen, so the data is loaded straight away
  mounted() {
    // units.json sits in the public folder, so it ends up next to index.html when built
    fetch('units.json')
      .then((response) => response.json())
      .then((data) => {
        this.units = data
      })
      .catch(() => {
        this.errorMessage = 'Could not load units.json.'
      })
  }
}
</script>
