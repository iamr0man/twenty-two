<template>
  <div class="passion">
    <v-card-title class="passion__header">
      <h3>Passion</h3>
    </v-card-title>
    <div class="passion-item" v-for="(v, i) in passions" :key="i">
      <img :src="v.image" alt="passion image">
      <p>{{ v.description }}</p>
    </div>
    <!-- <v-btn color="#2196f382" class="passion__add-button">Add</v-btn> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters('profile', ['current']),
    ...mapGetters('passion', ['passions'])
  },
  beforeMount(){
    this.$store.dispatch('passion/getPassionCards', { profileId: this.current })
  }
};
</script>

<style lang="scss">
.passion {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #fff;

  &__header {
    background-color: violet;
    border-radius: 10px;
    box-shadow: 0px 4px 20px 3px #2196f382;
    margin-top: 7px;
  }

  &__add-button {
    width: 40%;
    height: 8%;
    margin: 10px auto;
    background-color: #04f615;
    border-radius: 3px;
    text-align: center;
  }
}
</style>
