<template>
  <div id="nav">
  <div class="nav-container">
    <div class="nav-child">
      <img class="nav-bar-logo" src="../assets/lottiefiles_logo.svg" alt="logo">
    </div>
      <div class="nav-child">
      <input type="text" v-model="animation" placeholder="Search by title, color, author..." v-on:keyup="$emit('searchSubmit',animation)"/>
      </div>
      <div class="nav-child">
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
      </div>
  </div>
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
#nav {
  background-color: black;
  height: 64px;
  display: flex;
  justify-content: center;
}

.nav-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.nav-bar-logo {
  height: 32px;
}

#nav a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

#nav a.router-link-exact-active, #nav a:hover {
  color: #9bf0f0;
  cursor: pointer;
}

.nav-child {
    margin: auto;
}

input {
width: 500px;
height: 40px;
border: 1px solid black;
border-radius: 5px;
padding: 0 20px;
}
</style>