<template>
  <div class="home">
  <input type="text" v-model="animation" placeholder="search"/>
    <script type="application/javascript" src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    
    <div class="animation-container">
    <div v-if="animation !== ''">
  <ApolloQuery :query="searchQuery" :variables="{ search: animation}">
      <template slot-scope="{ result: { data, loading }, isLoading }"> 
        <div v-if="isLoading">Loading...</div>
        <div class="animation-wrapper" v-else>
          <div class="animation" v-for="animation of data.searchQuery" :key="animation.id">
         <lottie-player :src="`${animation.jsonURL}`"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>
         {{animation.name}}
         {{animation.downloads}}
        </div>
      </div>
      </template>
    </ApolloQuery>
    </div>

<div v-else>
  <ApolloQuery :query="animationsQuery">
      <template slot-scope="{ result: { data, loading }, isLoading }">
        <div v-if="isLoading">Loading...</div>
        <div class="animation-wrapper" v-else>
          <div class="animation" v-for="animation of data.animations" :key="animation.id">
         <lottie-player :src="`${animation.jsonURL}`"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>
         {{animation.name}}
         {{animation.downloads}}
        </div>
      </div>
      </template>
    </ApolloQuery>
</div>
</div>
  </div>
</template>

<script>
import animationsQuery from '@/graphql/queries/Animations.gql'
import searchQuery from '@/graphql/queries/Search.gql'

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      animationsQuery,
      searchQuery,
      animation: '',
    }
  }

}

</script>

<style>
.home {
  width: 100%;
  background-color: rgba(238, 225, 225, 0.671);
}
.animation-container {
  width: 100%;
}

.animation-wrapper {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  
}

.animation {
  margin: 10px;
  flex: 1 1 0;
  background-color: pink;
}

</style>
