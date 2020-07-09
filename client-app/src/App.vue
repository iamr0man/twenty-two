<template>
  <div id="app" class="app">
    <div class="app__layout"></div>
    <div class="app__circle app__circle-top"></div>
    <router-view />
    <div class="app__circle app__circle-bottom"></div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Montserrat", sans-serif;
  text-align: center;
  color: #000;
  // background: url("./assets/images/background.jpeg");
  // background-position: 58% 47%;
}

.app {
  &__layout {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #b6b6d3;
    z-index: -2;
  }
  &__circle {
    position: absolute;
    top: -290px;
    left: -300px;
    width: 1000px;
    height: 1000px;
    border-radius: 50%;
    z-index: -1;

    &-top {
      background-color: #c7eff9;
    }
    &-bottom {
      background-color: #e3cdda;
      top: 420px;
      left: 1330px;
    }
  }
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
