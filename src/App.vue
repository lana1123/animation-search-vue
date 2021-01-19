<template>
<div class="app-container">
  <div id="app">
    <navbar @searchSubmit="getSearchText" @modal="getModalClick"></navbar>
    <home :animation="searchText"></home>
  <!--<router-view></router-view>-->
  </div>
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
      searchText: '',
      modalClicked: ''
    }
  },
  methods: {
    getSearchText(value) {
      this.searchText = value;
    },
    getModalClick(value) {
      this.modalClicked = value;
    }
  }
}

</script>

<style>
body {
  background-color: black;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  max-width: 1200px;
  margin: auto;
}

.app-container {

}

.test {
  background-color: white;
}

</style>
