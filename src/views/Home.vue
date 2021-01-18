<template>
  <div class="home">
  <input type="text" v-model="animation" placeholder="search"/>
  <button @click="sortByPopularity()">Sort by popularity</button>
  <button @click="sortByLatest()">Sort by latest</button>
  <button @click="sortByOldest()">Sort by oldest</button>
  <button @click="filterBy('Emoji')">Filter by Emoji</button>
  <button @click="filterBy('Illustrations')">Filter by Illustrations</button>
  <button @click="filterBy('Icons')">Filter by Icons</button>
  <button @click="filterBy('')">Clear filters</button>
    <script type="application/javascript" src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

  <div class="animation-container">
    <div>Loading...</div>


<div class="animation-wrapper" v-if="animation === ''">
   <div class="animation" v-for="animation in filteredAnimations" :key="animation.id">
    <lottie-player :src="`${animation.jsonURL}`"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>
 
  <div>{{animation.name}}</div>
  <div>{{animation.created_at}}</div>
  <div>{{animation.downloads}}</div>

  </div>
</div>
<div class="animation-wrapper" v-else>
   <div class="animation" v-for="animation in filteredSearchedAnimations" :key="animation.id">
    <lottie-player :src="`${animation.jsonURL}`"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>
 
  <div>{{animation.name}}</div>
  <div>{{animation.created_at}}</div>
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
      animation: '',
      animations: [],
      isLoading: true,
      selectedFilter: ''
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
    },
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
