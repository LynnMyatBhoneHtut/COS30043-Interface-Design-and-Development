/*
 * js/components/JobDetail.js
 * JobDetail – the job detail component.
 * Route is "/job/:id"; the id is passed in as a prop (router uses props: true).
 * Looks the job up in the global `jobs` array and shows every field.
 */
const JobDetail = {
  name: "JobDetail",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    job() {
      return jobs.find((j) => j.job_id === this.id);
    }
  },
  template: /* html */ `
    <div class="detail-panel">
      <template v-if="job">
        <h2 class="h4 text-primary mb-3">
          {{ job.job_title }} <span class="text-muted">({{ job.job_id }})</span>
        </h2>

        <dl class="job-fields">
          <div><dt>Company</dt><dd>{{ job.company }}</dd></div>
          <div><dt>Location</dt><dd>{{ job.location }}</dd></div>
          <div><dt>Category</dt><dd>{{ job.category }}</dd></div>
          <div><dt>Employment Type</dt><dd>{{ job.employment_type }}</dd></div>
          <div><dt>Salary Range</dt><dd>{{ job.salary_range }}</dd></div>
          <div><dt>Job Level</dt><dd>{{ job.job_level }}</dd></div>

          <div>
            <dt>Required Skills</dt>
            <dd>
              <span
                v-for="skill in job.required_skills"
                :key="skill"
                class="badge text-bg-secondary me-1"
              >{{ skill }}</span>
            </dd>
          </div>

          <div>
            <dt>Preferred Qualifications</dt>
            <dd>
              <span
                v-for="q in job.preferred_qualifications"
                :key="q"
                class="badge text-bg-light border me-1"
              >{{ q }}</span>
            </dd>
          </div>

          <div class="job-fields__wide">
            <dt>Description</dt>
            <dd>{{ job.job_description }}</dd>
          </div>

          <div><dt>Application Deadline</dt><dd>{{ job.application_deadline }}</dd></div>
          <div><dt>Posted Date</dt><dd>{{ job.posted_date }}</dd></div>
          <div><dt>Supervisor</dt><dd>{{ job.supervisor }}</dd></div>
          <div><dt>Positions Available</dt><dd>{{ job.positions_available }}</dd></div>
          <div><dt>Start Date</dt><dd>{{ job.start_date }}</dd></div>

          <div class="job-fields__wide">
            <dt>Tags</dt>
            <dd>
              <span
                v-for="tag in job.tags"
                :key="tag"
                class="badge rounded-pill text-bg-primary me-1"
              >{{ tag }}</span>
            </dd>
          </div>
        </dl>
      </template>

      <p v-else class="text-danger mb-0">
        No job found for ID "{{ id }}". Pick another ID from the list.
      </p>
    </div>
  `
};
