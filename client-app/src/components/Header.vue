<template>
  <header class="header">
    <img class="header__logo" src="../assets/images/up_logo.jpg" alt="logo" />
    <div class="header__rating">
      <div class="rating__label">Your balance:</div>
      <div class="rating__amount">_{{ rating }}_</div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async mounted() {
    await this.$store.dispatch('task/getRating', { profileId: this.current })
  },
  computed: {
    ...mapGetters('profile', ['current']),
    ...mapGetters('task', ['rating'])
  }
};
</script>

<style lang="scss">
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;

  &__logo {
    width: 60px;
    height: 60px;
  }

  &__rating {
    padding: 15px 15px;

    .rating__label {
      font-weight: 400;
    }

    .rating__amount {
      font-weight: 900;
    }
  }
}
</style>
