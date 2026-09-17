/*
 * js/components/ToDoList.js
 * ToDoList – manage a list of to-do tasks.
 *  - Add a task (new tasks go to the START of the array via unshift).
 *  - Delete a task.
 *  - Toggle priority between High and Low. The task text shows
 *    "(High Priority)" or "(Low Priority)", and the button caption toggles
 *    between "Mark as High Priority" and "Mark as Low Priority".
 */
const ToDoList = {
  name: "ToDoList",
  data() {
    return {
      newTask: "",
      // A couple of sample tasks so the list isn't empty on load.
      tasks: [
        { id: 1, text: "Submit job application form for Insight Hire", priority: "low" },
        { id: 2, text: "Prepare for the interview", priority: "high" }
      ]
    };
  },
  methods: {
    addTask() {
      const text = this.newTask.trim();
      if (text === "") return; // ignore empty input

      // New tasks are inserted at the beginning of the array.
      this.tasks.unshift({
        id: Date.now(),
        text: text,
        priority: "low"
      });
      this.newTask = "";
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    togglePriority(task) {
      task.priority = task.priority === "high" ? "low" : "high";
    },
    priorityLabel(task) {
      return task.priority === "high" ? "(High Priority)" : "(Low Priority)";
    },
    toggleCaption(task) {
      // Caption always offers the OTHER priority.
      return task.priority === "high" ? "Mark as Low Priority" : "Mark as High Priority";
    }
  },
  template: /* html */ `
    <div>
      <h2 class="h4 mb-3">To-Do List</h2>

      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Enter a new task"
          v-model="newTask"
          @keyup.enter="addTask"
        />
        <button class="btn btn-primary" type="button" @click="addTask">Add</button>
      </div>

      <ul class="list-group">
        <li
          v-for="(task, index) in tasks"
          :key="task.id"
          class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2"
        >
          <span>{{ task.text }} {{ priorityLabel(task) }}</span>

          <span class="d-flex gap-2">
            <button
              class="btn btn-sm btn-warning"
              type="button"
              @click="togglePriority(task)"
            >
              {{ toggleCaption(task) }}
            </button>
            <button
              class="btn btn-sm btn-danger"
              type="button"
              @click="deleteTask(index)"
            >
              Delete
            </button>
          </span>
        </li>

        <li v-if="tasks.length === 0" class="list-group-item text-muted">
          No tasks yet. Add one above.
        </li>
      </ul>
    </div>
  `
};
