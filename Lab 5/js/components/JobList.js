/*
 * js/components/JobList.js
 * JobList – the job list component.
 * Renders the left column: an "Overview" link at the top, then one
 * <router-link> per job ID. Receives the jobs array via a prop.
 */
const JobList = {
  name: "JobList",
  props: {
    jobs: {
      type: Array,
      required: true
    }
  },
  template: /* html */ `
    <nav class="list-group">
      <router-link
        class="list-group-item list-group-item-action"
        :to="{ name: 'overview' }"
      >
        Overview
      </router-link>

      <router-link
        v-for="job in jobs"
        :key="job.job_id"
        class="list-group-item list-group-item-action"
        :to="{ name: 'jobDetail', params: { id: job.job_id } }"
      >
        {{ job.job_id }}
      </router-link>
    </nav>
  `
};
