<template>
  <div class="card mb-4 border-primary">
    <div class="card-body">
      <h2 class="h5 mb-3">{{ record ? 'Edit destination #' + record.id : 'Add a new destination' }}</h2>

      <!-- novalidate: Vue checks the fields itself (checkForm) -->
      <form novalidate @submit.prevent="checkForm">
        <div class="row g-3">

          <div class="col-md-6">
            <label for="name" class="form-label">Name</label>
            <input type="text" id="name" class="form-control" maxlength="100"
                   v-model.trim="form.name" :class="{ 'is-invalid': errorFor('name') }">
            <div class="invalid-feedback">{{ errorFor('name') }}</div>
          </div>

          <div class="col-md-6">
            <label for="country" class="form-label">Country</label>
            <input type="text" id="country" class="form-control" maxlength="60"
                   v-model.trim="form.country" :class="{ 'is-invalid': errorFor('country') }">
            <div class="invalid-feedback">{{ errorFor('country') }}</div>
          </div>

          <div class="col-md-6">
            <label for="category" class="form-label">Category</label>
            <select id="category" class="form-select"
                    v-model="form.category" :class="{ 'is-invalid': errorFor('category') }">
              <option value="" disabled>-- Please select --</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
            <div class="invalid-feedback">{{ errorFor('category') }}</div>
          </div>

          <div class="col-md-6">
            <label for="rating" class="form-label">Rating (0 – 5)</label>
            <input type="number" id="rating" class="form-control" min="0" max="5" step="0.1"
                   v-model="form.rating" :class="{ 'is-invalid': errorFor('rating') }">
            <div class="invalid-feedback">{{ errorFor('rating') }}</div>
          </div>

          <div class="col-12">
            <label for="description" class="form-label">Description</label>
            <textarea id="description" class="form-control" rows="2" maxlength="255"
                      v-model.trim="form.description" :class="{ 'is-invalid': errorFor('description') }"></textarea>
            <div class="invalid-feedback">{{ errorFor('description') }}</div>
          </div>

        </div>

        <div class="d-flex gap-2 mt-3">
          <button type="submit" class="btn btn-primary" :disabled="saving">
            {{ saving ? 'Saving…' : (record ? 'Save changes' : 'Add destination') }}
          </button>
          <button type="button" class="btn btn-outline-secondary" @click="$emit('cancel')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TravelForm',

  props: {
    record: { type: Object, default: null },   // null = adding, an object = editing that row
    saving: { type: Boolean, default: false }  // true while the request is being sent
  },

  emits: ['save', 'cancel'],

  data() {
    // Start with the row being edited, or empty boxes when adding
    const r = this.record
    return {
      form: {
        name: r ? r.name : '',
        country: r ? r.country : '',
        category: r ? r.category : '',
        description: r ? r.description : '',
        rating: r ? r.rating : ''
      },
      categories: ['Beach', 'City', 'Mountain', 'Ocean'],
      submitted: false   // errors only show after the first Save
    }
  },

  computed: {
    // One message per invalid field, e.g. { name: 'Please enter a name.' }
    errors() {
      const f = this.form
      const errors = {}

      if (!f.name) errors.name = 'Please enter a name.'
      if (!f.country) errors.country = 'Please enter a country.'
      if (!this.categories.includes(f.category)) errors.category = 'Please select a category.'
      if (!f.description) errors.description = 'Please enter a description.'

      if (f.rating === '' || f.rating === null) {
        errors.rating = 'Please enter a rating.'
      } else if (f.rating < 0 || f.rating > 5) {
        errors.rating = 'Rating must be between 0 and 5.'
      } else if (!/^\d(\.\d)?$/.test(String(f.rating))) {
        errors.rating = 'Use at most one decimal place, e.g. 4.8.'
      }

      return errors
    }
  },

  methods: {
    errorFor(field) {
      return this.submitted ? this.errors[field] || '' : ''
    },

    // Runs on Save. Only send the data to App.vue when every field is valid.
    checkForm() {
      this.submitted = true
      if (Object.keys(this.errors).length > 0) return
      this.$emit('save', { ...this.form, rating: Number(this.form.rating) })
    }
  }
}
</script>
