/*
 * js/components/App.js
 * App – the root component.
 * Lays out the page: a header, the Job Explorer section (JobList on the left
 * and a <router-view> on the right for JobOverview / JobDetail), and the
 * To-Do List section.
 */
const App = {
  name: "App",
  components: { JobList, ToDoList },
  data() {
    return {
      jobs: jobs // from js/data/jobs.js
    };
  },
  template: /* html */ `
    <div>
      <header class="app-header">
        <div class="container d-flex justify-content-between align-items-center">
          <span class="app-header__brand">Insight Hire</span>
          <nav class="app-header__nav">
            <a href="#job-explorer">Job Explorer</a>
            <a href="#todo">To-Do List</a>
          </nav>
        </div>
      </header>

      <main class="container my-4">
        <!-- Job Explorer -->
        <section id="job-explorer" class="mb-5">
          <h1 class="h3 mb-3">Job Explorer</h1>
          <div class="row g-4">
            <div class="col-12 col-md-4 col-lg-3">
              <job-list :jobs="jobs"></job-list>
            </div>
            <div class="col-12 col-md-8 col-lg-9">
              <div class="border rounded p-3 h-100">
                <router-view></router-view>
              </div>
            </div>
          </div>
        </section>

        <!-- To-Do List -->
        <section id="todo">
          <to-do-list></to-do-list>
        </section>
      </main>
    </div>
  `
};
