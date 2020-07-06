<template>
  <div class="task">
    <div class="task-name">{{ task.name }}</div>
  </div>
</template>

<script>
export default {
  props: ["task"]
};
</script>

<style lang="scss">
.task {
  width: 100%;
  height: 8%;
  background-color: #33333357;
  border-radius: 10px;
  padding: 10px;
}
</style>
