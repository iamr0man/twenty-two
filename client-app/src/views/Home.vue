<template>
  <div class="home">
    <Header />
    <Main />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";

export default {
  name: "Home",
  components: {
    Header,
    Main
  }
};
</script>

<style lang="scss">
.home {
  height: 100vh;
}
</style>
