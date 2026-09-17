/*
 * js/components/JobOverview.js
 * JobOverview – the job overview component.
 * Shown on the right when the "Overview" router-link is active (route "/").
 */
const JobOverview = {
  name: "JobOverview",
  template: /* html */ `
    <div class="detail-panel">
      <h2 class="h4 text-primary mb-3">Job Overview</h2>

      <p>
        Insight Hire connects people with opportunities across Artificial
        Intelligence, Data Science, Cybersecurity, DevOps and Software
        Development. Our board pulls roles from tech companies, research labs
        and innovation hubs — internships, part-time work and full-time
        positions for new graduates and experienced professionals alike.
      </p>

      <p>
        Whether you are a student breaking into the industry, a researcher
        after your next challenge, or a developer looking for a step up, each
        listing includes the detail you need: required skills, salary,
        supervisor and application deadline.
      </p>

      <p class="mb-0">
        Pick a job ID from the list on the left to see the full details for
        that role.
      </p>
    </div>
  `
};
