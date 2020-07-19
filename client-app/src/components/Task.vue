<template>
  <div class="task">
    <button @click="refreshStatus">
      <img :src="statusSVG(task)" class="task__status" alt="not finished" />
    </button>
    <button @click="showDetails(task)">
      <div class="task__name">{{ task.name }}</div>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import router from "../router/";
export default {
  props: ["task"],
  methods: {
    statusSVG: function(task) {
      return task.status === "completed"
        ? require("../assets/images/circle.svg")
        : require("../assets/images/checkmark.svg");
    },
    refreshStatus: function(task) {
      this.$store.dispatch('task/updateTaskCard', {
        profileId: this.current,
        noteId: this.noteId,
        newTask: { status: task.status === 'main' ? 'secondary' : 'main' }
      })
    },
    showDetails: function(task) {
      // do mutation for single task
      router.push({
        name: "TaskDetails",
        params: { managerId: this.current, taskId: task._id }
      });
    },
  },
  computed: {
    ...mapGetters('profile', ['current'])
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
