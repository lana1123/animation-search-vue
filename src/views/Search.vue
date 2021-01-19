<template>
  <div class="search">
   <input type="text" v-model="animation" placeholder="search"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  props: [
    'Search'
  ],
  data() {
    return {

    }
  },
  
}
</script>

<style>
input {
width: 500px;
height: 40px;
border: 1px solid black;
border-radius: 5px;
}
</style>