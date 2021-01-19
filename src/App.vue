<template>
  <div id="app">
    <navbar @searchSubmit="getSearchText"></navbar>
    <home :animation="searchText"></home>
  <!--<router-view></router-view>-->
  </div>
</template>

<script>
import navbar from './views/Navbar'
import home from './views/Home'

export default {
  name: 'app',
  components: {
    navbar,
    home
  },
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    getSearchText(value) {
      this.searchText = value;
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
