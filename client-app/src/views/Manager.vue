<template>
  <div class="manager">
    <v-card-title class="manager__header header"
      ><h3>Main Tasks</h3></v-card-title
    >
    <task v-for="(v, i) in mainTasks" :task="v" :key="i" />
    <v-card-title class="manager__subheader header"
      ><h3>Secondary Tasks</h3></v-card-title
    >
    <task v-for="(v, i) in secondaryTasks" :task="v" :key="i + 3" />
    <div class="manager__add-section">
      <v-text-field
        disabled
        class="add-section__field"
        v-model="newTask"
        label="I want to..."
        solo
      />
      <router-link :to="{ name: 'NewTask', params: { managerId:current } }" class="add-section__button">Add</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Task from "../components/Task";
export default {
  components: {
    Task
  },
  async mounted() {
    await this.$store.dispatch("task/createBoard", {
      profileId: this.current
    });
    await this.$store.dispatch("task/getTaskCards", {
      profileId: this.current
    });
  },
  computed: {
    ...mapGetters("profile", ["current"]),
    ...mapGetters("task", ["mainTasks", "secondaryTasks"])
  },
  data() {
    return {
      newTask: ""
    };
  }
};
</script>

<style lang="scss">
.manager {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  margin: 0px 25px;

  .header {
    background-color: violet;
    border-radius: 10px;
    box-shadow: 0px 4px 20px 3px #2196f382;
    margin-top: 7px;

    h3 {
      color: #fff;
    }
  }

  &__add-section {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: baseline;
    padding: 3px;
    background: #2196f382;

    .add-section__field {
      border-radius: 20px;

      .v-input__slot {
        width: 98%;
      }
    }

    .add-section__button {
      width: 20%;
      height: 45px;
      margin: 10px auto;
      background-color: violet;
      color: #fff;
      border-radius: 30px;
      text-align: center;
    }
  }
}
</style>
