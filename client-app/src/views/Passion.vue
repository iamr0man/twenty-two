<template>
  <div class="passion">
    <div class="passion__header">
      <h3>Passion</h3>
    </div>
    <router-link
      :to="{
        name: 'PassionDetails',
        params: { profileId: current, noteId: v._id }
      }"
      class="passion__item"
      v-for="(v, i) in passions"
      :key="i"
    >
      <div class="passion__item-circle">
        <p>{{ v.name }}</p>
      </div>
      <div class="passion__item-level">{{ v.level }}</div>
      <p class="passion__item-resource">{{ v.resource }}</p>
    </router-link>
    <!-- <v-btn color="#2196f382" class="passion__add-button">Add</v-btn> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("profile", ["current"]),
    ...mapGetters("passion", ["passions"])
  },
  mounted() {
    this.$store.dispatch("passion/getPassionCards", {
      profileId: this.current
    });
  }
};
</script>

<style lang="scss" scoped>
.passion {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #fa7143;

  &__header {
    border-radius: 10px;
    margin: 7px 15px 0;
    color: #1b1b1b;

    h3 {
      font-size: 34px;
      font-weight: 900;
    }
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    color: #000;
    text-decoration: none;
    font-weight: 600;
    padding: 20px;
    margin: 20px;
    border-radius: 50px;
    background: #fa7143;
    box-shadow: 10px 10px 15px #cfbcbc, -10px -10px 15px #fffefe;

    &-circle {
      width: 90px;
      height: 90px;
      background-color: chartreuse;
      border-radius: 50%;
      display: flex;
      align-items: center;

      p {
        position: relative;
        left: 38px;
        text-transform: capitalize;
        font-weight: 700;
        font-size: 24px;
      }
    }

    &-image {
      width: 100%;
      border-radius: 50px;
    }

    &-description {
      padding: 20px;
      margin-top: 16px;
      border-radius: 50px;
      background: #f3dddd;
      box-shadow: inset 10px 10px 30px #cfbcbc, inset -10px -10px 30px #fffefe;
    }
    &-edit {
      width: 30px;
      margin-top: 20px;
    }
  }

  &__add-button {
    width: 40%;
    height: 8%;
    margin: 10px auto;
    background-color: #04f615;
    border-radius: 3px;
    text-align: center;
  }

  @media screen and (min-width: 600px) {
    &__item {
      max-width: 600px;
    }
  }
}
</style>
