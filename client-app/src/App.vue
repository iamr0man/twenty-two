<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
#app {
  font-family: "Montserrat", sans-serif;
  text-align: center;
  color: #000;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
