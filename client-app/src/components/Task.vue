<template>
  <div class="task">
    <button @click="refreshStatus(task)">
      <img :src="statusSVG(task)" class="task__status" alt="not finished" />
    </button>
    <button @click="showDetails(task)">
      <div class="task__name">{{ task.name }}</div>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import router from "../router/";
export default {
  props: ["task", "parentTask"],
  methods: {
    statusSVG: function(task) {
      return task.status === "completed"
        ? require("../assets/images/checkmark.svg")
        : require("../assets/images/circle.svg");
    },
    refreshStatus: async function(task) {
      let noteId = '';
      const newTask = {};
      if (!this.parentTask) {
        noteId = `${task._id}`
        newTask.status = task.status === "not finished" ? "completed" : "not finished";
      } else {
        noteId = `${this.parentTask._id}`
        const subtask = this.parentTask.subtasks.filter(
          v => `${v._id}` === `${task._id}`
        )[0];
        subtask.status = subtask.status === "not finished" ? "completed" : "not finished";
        newTask.isSubtasks = true;
        newTask.subtasks = this.parentTask.subtasks;
      }

      await this.$store.dispatch("task/updateTaskCard", {
        profileId: this.current,
        noteId,
        newTask
      });
      // think about dynamic switch
    },
    showDetails: function(task) {
      // do mutation for single task
      router.push({
        name: "TaskDetails",
        params: { managerId: this.current, taskId: task._id }
      });
    }
  },
  computed: {
    ...mapGetters("profile", ["current"])
  }
};
</script>

<style lang="scss">
.task {
  display: flex;
  color: #000000bd;
  text-align: left;
  padding: 10px;
  margin: 6px;

  &__status {
    width: 24px;
    margin-right: 15px;
  }
}
</style>
