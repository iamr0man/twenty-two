<template>
  <div class="task">
    <button @click="showDetails(task)">
      <div class="task__name">{{ task.name }}</div>
    </button>
    <button @click="testing">
      <img :src="statusSVG(task)" class="task__status" alt="not finished" />
    </button>
  </div>
</template>

<script>
import router from "../router/";
export default {
  props: ["task"],
  methods: {
    statusSVG: function(task) {
      return task.status === "completed"
        ? require("../assets/images/circle.svg")
        : require("../assets/images/checkmark.svg");
    },
    showDetails: function() {
      // do mutation for single task
      router.push({
        name: "TaskDetails",
        params: { managerId: "123", taskId: "456" }
      });
    },
    testing: function() {
      console.log(123);
    }
  }
};
</script>

<style lang="scss">
.task {
  display: flex;
  justify-content: space-between;
  color: #000000bd;
  text-align: left;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 6px;
  border-radius: 18px;
  box-shadow: 0px 2px 1px 1px #00000066;

  &__status {
    width: 24px;
  }
}
</style>
