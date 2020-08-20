<template>
  <div class="language">
    <div class="language__header">
      <h3>Language Details</h3>
    </div>
    <div class="language__item">
      <img
        class="language__item-image"
        :src="currentLanguage.image"
        alt="language image"
      />
      <div class="language__details">
        <youtube :video-id="videoCode(currentLanguage.videoLink)"></youtube>
        <p class="language__details-description">
          <span>Words=?:</span> {{ currentLanguage.words.join(' ') }}
        </p>
        <img
          class="language__details-edit"
          @click="jumpToDetails"
          src="../assets/images/pencil.svg"
          alt="edit pencil"
        />
      </div>
    </div>
    <!-- <v-btn color="#2196f382" class="language__add-button">Add</v-btn> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {}
  },
  async mounted() {
    await this.$store.dispatch("language/getLanguageCard", {
      profileId: this.$route.params.profileId,
      noteId: this.$route.params.noteId
    });
  },
  computed: {
    ...mapGetters("language", ["currentLanguage"])
  },
  methods: {
    videoCode: function(v) {
      return v.substr(v.indexOf('v=')+2)
    },
    jumpToDetails() {
      this.$router.push({
        name: "LanguageEdit",
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
.language {
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

    .language__details {
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

      .language__details {
        margin: 0 10px;
      }
    }
  }
}
</style>
