

const app = Vue.createApp({
  data() {
    return {
      // Field values – each one is bound to an input in index.html with v-model
      form: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        streetAddress: '',
        suburb: '',
        postcode: '',
        mobileNumber: '',
        jobCategory: ''
      },

      // Options for the Preferred Job Category dropdown
      jobCategories: ['AI', 'Data Science', 'Web Development', 'Cyber Security',
                      'Software Engineering', 'UI/UX Design'],

      showTerms: false,   // is the Terms and Conditions text visible?
      submitted: false,   // has Submit been pressed yet? (errors only show after that)
      dobBadInput: false  // does the date box hold a date the browser can't read?
    };
  },

  computed: {
    // One message per invalid field, e.g. { postcode: '...' }. The rules are in validation.js.
    // Being a computed property, it re-runs by itself whenever a field changes.
    errors() {
      return validateApplication(this.form, this.jobCategories, this.dobBadInput);
    },

    errorCount() {
      return Object.keys(this.errors).length;
    }
  },

  methods: {
    // The message to show under a field: nothing until the first Submit,
    // then it updates as the user types, so it disappears once the field is fixed.
    errorFor(field) {
      if (!this.submitted) return '';
      return this.errors[field] || '';
    },

    // A half-typed or impossible date (e.g. 31/02/2000) leaves v-model empty,
    // so ask the browser whether the date box holds something it couldn't read.
    updateDobValidity() {
      this.dobBadInput = this.$refs.dateOfBirth.validity.badInput;
    },

    // Runs when the form is submitted. If anything is invalid,
    // stop the form being sent (the Lecture 6 checkForm pattern).
    checkForm(event) {
      this.submitted = true;      // show every field's error from now on
      this.updateDobValidity();   // in case Enter was pressed inside a half-typed date

      if (this.errorCount > 0) {
        event.preventDefault();   // don't send the form to formtest.php

        // Once Vue has redrawn the errors, put the cursor in the first field to fix
        this.$nextTick(() => {
          const firstInvalid = this.$refs.form.querySelector('.is-invalid');
          if (firstInvalid) firstInvalid.focus();
        });
      }
      // No errors: the browser sends the form to formtest.php as normal
    }
  }
});

app.mount('#app');
