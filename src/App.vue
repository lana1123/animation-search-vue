<template>
  <div id="app">
    <navbar></navbar>
   <router-view></router-view>
  </div>
</template>

<script>
import navbar from './views/Navbar'

export default {
  name: 'app',
  components: {
    navbar
  },
  data() {
    return {

    }
  }
}

</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  background-color: black;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

</style>
