<template>
  <div id="app">
    <Navbar/>
    <Main />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Main from './components/Main.vue'
export default {
  name: 'App',
  components: {
    Navbar,
    Main
  }
}
</script>

<style>
html {
    height: 100%;
}

body {
    height: 100%;
    margin: 0;
    background-color: whitesmoke;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
