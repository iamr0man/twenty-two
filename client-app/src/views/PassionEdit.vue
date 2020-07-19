<template>
  <div class="passion">
    <div class="passion__header">
      <h3>Passion Edit</h3>
    </div>
    <v-form>
      <div class="passion__item">
        <v-file-input
          class="passion__item-image"
          prepend-icon="mdi-camera"
          v-model="newImage"
          multiple
          label="Image: Testing"
          disabled
        />
        <v-text-field
          class="passion__item-name"
          v-model="newName"
          label="Name:"
        />
        <v-text-field
          class="passion__item-resource"
          v-model="newResource"
          label="Resource:"
        />
        <v-text-field
          class="passion__item-level"
          v-model="newLevel"
          label="Level:"
        />
        <v-textarea
          class="passion__item-description"
          v-model="newDescription"
          label="Description:"
        />
        <button
          type="submit"
          class="passion__item-edit"
          @click.prevent="acceptEdits"
        >
          <img src="../assets/images/tick.svg" alt="accept button" />
        </button>
      </div>
    </v-form>
    <!-- <v-btn color="#2196f382" class="passion__add-button">Add</v-btn> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      newImage: [],
      newName: "",
      newResource: "",
      newDescription: "",
      newLevel: ""
    };
  },
  async mounted() {
    await this.$store.dispatch("passion/getPassionCard", {
      profileId: this.$route.params.profileId,
      noteId: this.$route.params.noteId
    });
    this.newName = this.currentPassion.name;
    this.newResource = this.currentPassion.resource;
    this.newLevel = this.currentPassion.level;
    this.newDescription = this.currentPassion.description;
  },
  computed: {
    ...mapGetters("passion", ["currentPassion"])
  },
  methods: {
    async acceptEdits() {
      const newNote = {};
      // if (this.newImage) {
      //   const formData = new FormData();
      //   formData.append("upload_preset", "q8isaqyd");
      //   formData.append("file", this.newImage[0]);
      //   const url = await this.$store.dispatch("passion/getImageLink", {
      //     formData
      //   });
      //   newNote.newImage = url;
      // }
      if (this.newName) newNote.name = this.newName;
      if (this.newLevel) newNote.level = this.newLevel;
      if (this.newResource) newNote.resource = this.newResource;
      if (this.newDescription) newNote.description = this.newDescription;

      await this.$store.dispatch("passion/updatePassionCard", {
        profileId: this.$route.params.profileId,
        noteId: this.currentPassion._id,
        newNote
      });
      this.$router.push({ name: "Passion" });
    }
  }
};
</script>

<style lang="scss" scoped>
.passion {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    margin: 20px;
    border-radius: 50px;
    background: #fa7143;
    box-shadow: 10px 10px 15px #cfbcbc, -10px -10px 15px #fffefe;

    &-image {
      width: 100%;
      border-radius: 50px;
    }

    &-description {
      padding: 20px;
      margin-top: 16px;
      border-radius: 50px;
      background: #fa7143;
      box-shadow: inset 5px 5px 8px #cfbcbc, inset -5px -5px 12px #fffefe;
    }
    &-edit {
      margin-top: 20px;
      img {
        width: 30px;
        height: 30px;
        background: url("../assets/images/tick.svg");
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
    align-items: center;
    &__item { 
      min-width: 600px;
    }
  }
}
</style>
