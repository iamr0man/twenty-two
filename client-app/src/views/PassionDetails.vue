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
        <p class="passion__details-level">
          <span>Level=?:</span> {{ currentPassion.level }}
        </p>
        <p class="passion__details-resource">
          <span>Resource=?:</span> {{ currentPassion.resource }}
        </p>
        <p class="passion__details-description">
          <span>Description=?:</span> {{ currentPassion.description }}
        </p>
        <img
          class="passion__details-edit"
          @click="jumpToDetails"
          src="../assets/images/pencil.svg"
          alt="edit pencil"
        />
      </div>
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
  align-items: center;
  width: 100%;
  background-color: #fa7143;

  &__header {
    border-radius: 10px;
    margin: 7px 15px 0;
    color: #1b1b1b;

    h3 {
      font-weight: 900;
    }
  }

  &__item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px;
    margin: 20px;
    border-radius: 50px;
    background: #fa7143;
    box-shadow: 10px 10px 15px #cfbcbc, -10px -10px 15px #fffefe;

    &-image {
      width: 100%;
      border-radius: 50px;
    }

    .passion__details {
      position: relative;
      padding: 20px;
      margin-top: 16px;
      border-radius: 50px;
      background: #fa7143;
      box-shadow: inset 5px 5px 8px #cfbcbc, inset -5px -5px 12px #fffefe;

      p span {
        font-weight: 900;
      }

      &-edit {
        width: 30px;
        margin-top: 20px;
        position: absolute;
        bottom: -45px;
        left: 184px;
      }
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

  @media screen and (min-width: 1000px) {
    height: 100vh;

    &__item {
      flex-direction: row;
      align-items: center;
      max-width: 800px;
      padding: 0;

      &-image {
        width: 50%;
      }

      .passion__details {
        margin: 0 10px;
      }
    }
  }
}
</style>
