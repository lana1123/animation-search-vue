<template>
  <div class="home">
  <!--<input type="text" v-model="animation" placeholder="search"/>
  <button @click="$emit('searchSubmit',animation)">Submit</button>-->
  <div class="sort-filter">
  <div class="sort">
  <p class="button-label">Sort by:</p>
  <button @click="sortByPopularity()">Popularity</button>
  <button @click="sortByLatest()">Latest</button>
  <button @click="sortByOldest()">Oldest</button>
  </div>
  <div class="filter">
  <p class="button-label">Filter by:</p>
  <button @click="filterBy('Emoji')">Emoji</button>
  <button @click="filterBy('Illustrations')">Illustrations</button>
  <button @click="filterBy('Icons')">Icons</button>
  <button @click="filterBy('')">Clear filters</button>
  </div>
  </div>

  <script type="application/javascript" src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

  <div class="animation-container">

<div class="animation-wrapper" v-if="animation === ''">
   <cube v-if="animations==''"></cube>
   <div class="animation" v-for="animation in filteredAnimations" :key="animation.id">
    <lottie-player :src="`${animation.jsonURL}`"  background="transparent"  speed="1"  style="width: 256px; height: 256px;"  loop autoplay></lottie-player>
 
  <div class="anim_name">{{animation.name}}</div>
  <div>By: {{animation.user.name}}</div>
  <br/>
  <div class="anim_footer">
  <div>{{ (animation.created_at).split(' ')[0]}}</div>
   <div><img class="download-logo" src="../assets/download_icon_grey.svg" alt="logo">
  {{animation.downloads}}</div>
  </div>

  </div>
</div>
<div class="animation-wrapper" v-else>
<cube v-if="searchQuery==''"></cube>
   <div class="animation" v-for="animation in filteredSearchedAnimations" :key="animation.id">
    <lottie-player :src="`${animation.jsonURL}`"  background="transparent"  speed="1"  style="width: 256px; height: 256px;"  loop autoplay></lottie-player>
 
  <div class="anim_name">{{animation.name}}</div>
  <div>By: {{animation.user.name}}</div>
  <div>{{(animation.created_at).split(' ')[0]}}</div>
  <div>{{animation.downloads}}</div>
  </div>
  </div>
  </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const GET_ALL_ANIMATIONS = gql`
  query {
  animations {
    id
    name
    style
    jsonURL
    downloads
    created_at
    user {
      name 
    }
  }
}
`;


const GET_SEARCHED_ANIMATIONS = gql`
query ($search: String!){
 searchQuery(search: $search) {
  id
  name
  style
  jsonURL
  downloads
  created_at
  tags {
    description
  }
  user {
    name
  }
}
  }
`;

export default {
  name: 'Home',
  components: {
  },
  props: [
    'animation'
  ],
  apollo: {
    animations: {
      query: GET_ALL_ANIMATIONS
    },
    searchQuery: {
      query: GET_SEARCHED_ANIMATIONS,
        variables() {
          return { search: this.animation }
        },
    },

  },
  data() {
    return {
      searchQuery : [],
      animations: [],
      selectedFilter: '',
    }
  }, 
  methods: {
    sortByPopularity() {
        let currentVar = this.animation? this.searchQuery: this.animations;

        currentVar.sort((a,b) => {
        if((a.downloads) < (b.downloads)) {
          return 1;
        }
        else if((a.downloads) > (b.downloads)) {
          return -1;
        }
        return 0;
      });
    },
    sortByLatest() {
        let currentVar = this.animation? this.searchQuery: this.animations;

      currentVar.sort((a,b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      return currentVar;
    },
    sortByOldest() {
        let currentVar = this.animation? this.searchQuery: this.animations;

      currentVar.sort((a,b) => {
        return new Date(a.created_at) - new Date(b.created_at);
      });
      return currentVar;
    },
    filterBy(category){

      this.selectedFilter = category;

    }
  },
  computed: {
    filteredAnimations() {
        Object.filter = (obj, predicate) => 
        Object.keys(obj)
            .filter( key => predicate(obj[key]) )
            .reduce( (res, key) => (res[key] = obj[key], res), {} );
    
        if(this.selectedFilter !== ''){
          return Object.filter(this.animations, score => score.style == this.selectedFilter); 
        }
        else {
          return Object.filter(this.animations, score => score.style !== this.selectedFilter); 
        }
    },
    filteredSearchedAnimations() {
        Object.filter = (obj, predicate) => 
        Object.keys(obj)
            .filter( key => predicate(obj[key]) )
            .reduce( (res, key) => (res[key] = obj[key], res), {} );
    
        if(this.selectedFilter !== ''){
          return Object.filter(this.searchQuery, score => score.style == this.selectedFilter); 
        }
        else {
          return Object.filter(this.searchQuery, score => score.style !== this.selectedFilter); 
        }
    }
  }

}

</script>

<style>
.home {
  width: 100%;

  height: 100vh;
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
  background-color: white;
  max-width: 256px;
  max-height: 400px;
}

button {
height: 30px;
border-radius: 5px;
border: none;
padding: 0 10px;
outline: none;
margin: 0 10px;
}

.button-label {
  color: white;
}

.sort-filter {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.anim_name {
  font-weight: bold;
}

.anim_footer {
  display: flex;
  justify-content: space-around;
}

/*.sort  {
  text-align: left;
}

.filter {
  text-align: right;
}

.sort button {
  margin-right: 10px;
}

.filter button {
  margin-left: 10px;
}*/

</style>

