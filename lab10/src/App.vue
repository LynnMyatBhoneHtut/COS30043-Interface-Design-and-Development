<template>
  <main class="container py-4">
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
      <h1 class="h3 mb-0">Travel Destinations</h1>
      <button type="button" class="btn btn-success" @click="openAdd" :disabled="showForm && !editing">
        + Add destination
      </button>
    </div>

    <!-- Success / error message after each action -->
    <div v-if="message" class="alert d-flex justify-content-between align-items-center py-2"
         :class="isError ? 'alert-danger' : 'alert-success'" role="alert">
      <span>{{ message }}</span>
      <button type="button" class="btn-close" aria-label="Close" @click="message = ''"></button>
    </div>

    <!-- Add / edit form. :key makes a fresh form each time a different row is opened. -->
    <TravelForm
      v-if="showForm"
      ref="form"
      :key="editing ? editing.id : 'new'"
      :record="editing"
      :saving="saving"
      @save="saveDestination"
      @cancel="closeForm"
    />

    <!-- ========== READ: table of destinations ========== -->
    <div class="card">
      <div class="card-body">
        <p v-if="loading" class="mb-0">Loading destinations…</p>

        <template v-else>
          <div class="table-responsive">
            <table class="table table-striped table-hover align-middle mb-3">
              <thead class="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Rating</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- Only the rows on the current page. The row being edited is highlighted. -->
                <tr v-for="item in pagedDestinations" :key="item.id"
                    :class="{ 'table-warning': editing && editing.id === item.id }">
                  <td>{{ item.id }}</td>
                  <td class="fw-semibold">{{ item.name }}</td>
                  <td>{{ item.country }}</td>
                  <td><span class="badge text-bg-secondary">{{ item.category }}</span></td>
                  <td class="description">{{ item.description }}</td>
                  <td class="text-nowrap">★ {{ item.rating.toFixed(1) }}</td>
                  <td class="text-end text-nowrap">
                    <button type="button" class="btn btn-sm btn-outline-primary me-1" @click="openEdit(item)">Edit</button>
                    <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteDestination(item)">Delete</button>
                  </td>
                </tr>
                <tr v-if="destinations.length === 0">
                  <td colspan="7" class="text-center text-body-secondary">No destinations yet. Click "Add destination".</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="d-flex flex-wrap justify-content-between align-items-center gap-2">
            <small class="text-body-secondary">
              Showing {{ firstShown }}–{{ lastShown }} of {{ destinations.length }} destinations
            </small>

            <!-- vuejs-paginate (Vue 3 version), using Bootstrap's pagination classes -->
            <paginate
              v-if="pageCount > 1"
              v-model="currentPage"
              :page-count="pageCount"
              :click-handler="changePage"
              :prev-text="'Prev'"
              :next-text="'Next'"
              :container-class="'pagination mb-0'"
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
      </div>
    </div>
  </main>
</template>

<script>
import Paginate from 'vuejs-paginate-next'
import TravelForm from './components/TravelForm.vue'

// The PHP file that reads and writes the MySQL table (public/api/travel.php)
const API_URL = 'api/travel.php'

export default {
  name: 'App',

  components: {
    paginate: Paginate,
    TravelForm
  },

  data() {
    return {
      destinations: [],   // every row of the travel table
      perPage: 5,         // rows shown on each page
      currentPage: 1,
      loading: true,
      showForm: false,
      editing: null,      // the row being edited, or null when adding
      saving: false,
      message: '',
      isError: false
    }
  },

  computed: {
    pageCount() {
      return Math.ceil(this.destinations.length / this.perPage)
    },

    // The rows to show on the current page
    pagedDestinations() {
      const start = (this.currentPage - 1) * this.perPage
      return this.destinations.slice(start, start + this.perPage)
    },

    // For the "Showing 1–5 of 15" text
    firstShown() {
      return this.destinations.length === 0 ? 0 : (this.currentPage - 1) * this.perPage + 1
    },
    lastShown() {
      return Math.min(this.currentPage * this.perPage, this.destinations.length)
    }
  },

  watch: {
    // After a delete the last page may be gone, so step back to the new last page
    pageCount(count) {
      if (this.currentPage > count) this.currentPage = Math.max(count, 1)
    }
  },

  methods: {
    // Send a request to travel.php and return its JSON. Throws an Error if it failed.
    async callApi(body) {
      const options = body
        ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
        : { method: 'GET' }

      const response = await fetch(API_URL, options)
      let data
      try {
        data = await response.json()
      } catch {
        throw new Error('The server did not send back valid data. Check api/settings.php.')
      }
      if (!response.ok) throw new Error(data.error || 'Something went wrong.')
      return data
    },

    showMessage(text, isError = false) {
      this.message = text
      this.isError = isError
    },

    // ---------- READ ----------
    async loadDestinations() {
      try {
        this.destinations = await this.callApi()
      } catch (error) {
        this.showMessage('Could not load destinations. ' + error.message, true)
      } finally {
        this.loading = false
      }
    },

    changePage(pageNum) {
      this.currentPage = pageNum
    },

    openAdd() {
      this.editing = null
      this.showForm = true
      this.message = ''
      this.scrollToForm()
    },

    openEdit(item) {
      this.editing = item
      this.showForm = true
      this.message = ''
      this.scrollToForm()
    },

    closeForm() {
      this.showForm = false
      this.editing = null
    },

    // Bring the form into view (useful when editing a row lower down the page)
    scrollToForm() {
      this.$nextTick(() => {
        if (this.$refs.form) this.$refs.form.$el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    },

    // ---------- CREATE and UPDATE ----------
    async saveDestination(formData) {
      this.saving = true
      try {
        const isNew = !this.editing
        const body = isNew
          ? { action: 'create', ...formData }
          : { action: 'update', id: this.editing.id, ...formData }

        const result = await this.callApi(body)
        this.closeForm()
        await this.loadDestinations()

        // A new destination goes to the end of the table, so show the last page
        if (isNew) this.currentPage = this.pageCount
        this.showMessage(result.message)
      } catch (error) {
        this.showMessage(error.message, true)
      } finally {
        this.saving = false
      }
    },

    // ---------- DELETE ----------
    async deleteDestination(item) {
      if (!confirm(`Delete "${item.name}"? This cannot be undone.`)) return

      try {
        const result = await this.callApi({ action: 'delete', id: item.id })
        if (this.editing && this.editing.id === item.id) this.closeForm()
        await this.loadDestinations()
        this.showMessage(result.message)
      } catch (error) {
        this.showMessage(error.message, true)
      }
    }
  },

  // mounted() runs once the page is on screen, so the data is loaded straight away
  mounted() {
    this.loadDestinations()
  }
}
</script>

<style scoped>
/* Stops the description being squashed on phones; the table scrolls sideways instead */
.description {
  min-width: 16rem;
}
</style>
