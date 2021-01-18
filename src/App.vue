<template>
  <div id="app">
    <div id="nav">
      <img class="nav-bar-logo" src="./assets/lottiefiles_logo.svg" alt="logo">
      
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      
    </div>
    
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
  },
  data() {
    return {

    }
  },
  
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

#nav {
  background-color: white;
  display: flex;
  justify-content: space-around;
}

.nav-bar-logo {
  height: 32px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
