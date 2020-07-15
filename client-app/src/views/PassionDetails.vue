<template>
  <div class="passion">
    <div class="passion__header">
      <h3>Passion Details</h3>
    </div>
    <div class="passion__item">
      <img
        class="passion__item-image"
        :src="currentPassion.image"
        alt="passion image"
      />
      <div class="passion__details">
        <p class="passion__details-level">{{ currentPassion.level }}</p>
        <p class="passion__details-resource">{{ currentPassion.resource }}</p>
      </div>
      <p class="passion__item-description">{{ currentPassion.description }}</p>
      <img
        class="passion__item-edit"
        @click="jumpToDetails"
        src="../assets/images/pencil.svg"
        alt="edit pencil"
      />
    </div>
    <!-- <v-btn color="#2196f382" class="passion__add-button">Add</v-btn> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async mounted() {
    await this.$store.dispatch("passion/getPassionCard", {
      profileId: this.$route.params.profileId,
      noteId: this.$route.params.noteId
    });
  },
  computed: {
    ...mapGetters("passion", ["currentPassion"])
  },
  methods: {
    jumpToDetails() {
      this.$router.push({
        name: "PassionEdit",
        params: {
          profileId: this.$route.params.profileId,
          noteId: this.$route.params.noteId
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.passion {
  display: flex;
  flex-direction: column;
  width: 100vw;
  background-color: #f3dddd;

  &__header {
    border-radius: 10px;
    margin: 7px 15px 0;
    color: #1b1b1b;

    h3 {
      font-weight: 900;
    }
  }

  &__item {
    padding: 60px;
    margin: 20px;
    border-radius: 50px;
    background: #f3dddd;
    box-shadow: 20px 20px 60px #cfbcbc, -20px -20px 60px #fffefe;

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
}
</style>
