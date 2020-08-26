<template>
  <div class="language">
    <div class="language__header">
      <h3>Language</h3>
    </div>
    <router-link
      :to="{
        name: 'LanguageDetails',
        params: { profileId: current, noteId: v._id }
      }"
      class="language__item"
      v-for="(v, i) in languageCards"
      :key="i"
    >
      <div class="language__item-circle">
        <p>{{ v.videoLink }}</p>
      </div>
      <div class="language__item-level">{{ parsedLink(v.articleLink) }}</div>
      <p class="language__item-resource">{{ hideWords(v.words) }}</p>
    </router-link>
    <!-- <v-btn color="#2196f382" class="language__add-button">Add</v-btn> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      symbols: ['%&*)']
    }
  },
  methods: {
    parsedLink: function(link) {
      const splited = link.split('/')
      return splited[splited.length-1]
    },
    hideWords: function(words){
      return words.map(v => this.addAsterisk(v, v.length)).join(' ')
    },
    addAsterisk: function(v, l) {
      for(let i = 0; i <= l / 2; i++) {
        const rand = Math.floor(Math.random() * l - 1)
        v = v.substr(0, rand) + (this.symbols[rand] || '?') + v.substr(rand+1)
      }
      return v
    }
  },
  computed: {
    ...mapGetters("profile", ["current"]),
    ...mapGetters("language", ["languageCards"]),
  },
  mounted() {
    this.$store.dispatch("language/getLanguageCards", {
      profileId: this.current
    });
  }
};
</script>

<style lang="scss" scoped>
.language {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #5eff00;

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
    flex-direction: column;
    width: 95%;
    color: #000;
    text-decoration: none;
    font-weight: 600;
    padding: 20px;
    margin: 20px;
    border-radius: 50px;
    background: #5eff00;
    box-shadow: 10px 10px 15px #cfbcbc, -10px -10px 15px #fffefe;

    &-circle {
      width: 90px;
      height: 90px;
      background-color: rgb(0, 255, 213);
      border-radius: 50%;
      display: flex;
      align-items: center;

      p {
        position: relative;
        left: 38px;
        text-transform: capitalize;
        font-weight: 700;
        font-size: 10px;
      }
    }

    &-level {
      padding: 10px;
      border: 2px solid black;
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
    background-color: rgb(0, 255, 213);
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
