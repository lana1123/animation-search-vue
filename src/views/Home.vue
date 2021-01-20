<template>
  <div class="home">
  <div class="sort-filter">
  <div class="sort">
  <p class="button-label">Sort by:</p>
  <button @click="sortBy('Popularity')">Popularity</button>
  <button @click="sortBy('Latest')">Latest</button>
  <button @click="sortBy('Oldest')">Oldest</button>
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
  <bounce class="loading" v-if="animations==''"></bounce>
   <div v-if="animation === ''">
      <Animation :animations="filteredAnimations"></Animation>
    </div>
    <div v-else>
    <Animation :animations="filteredSearchedAnimations"></Animation>
    </div>
  </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Animation from './Animation'


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
    Animation
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
    sortBy(value) {
        let currentVar = this.animation? this.searchQuery: this.animations;

        if(value == 'Popularity') {

          currentVar.sort((a,b) => {
          if((a.downloads) < (b.downloads)) {
            return 1;
          }
          else if((a.downloads) > (b.downloads)) {
            return -1;
          }
          return 0;
        });
        }
        else if(value == 'Latest') {
            currentVar.sort((a,b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
          return currentVar;
        }
        else if(value == 'Oldest') {
          currentVar.sort((a,b) => {
                  return new Date(a.created_at) - new Date(b.created_at);
          });
           return currentVar;
        }
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

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

@media (max-width: 768px) {
.home {
margin-top: 40px;
}

.sort, .filter {
display: flex;
flex-direction: column;
}

.sort button, .filter button {
margin: 5px 0;
}
}
</style>

