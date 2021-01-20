<template>
<div class="animation-wrapper">
   <div class="animation" v-for="animation in animations" :key="animation.id">
    <lottie-player :src="`${animation.jsonURL}`" background="transparent"  speed="1"  style="width: 256px; height: 256px;" class="anim_picture"  loop autoplay></lottie-player>
 
  <div class="anim_name">{{animation.name}}</div>
  <div>By: {{animation.user.name}}</div>
  <br/>
  <div class="anim_footer">
  <div>{{ (animation.created_at).split(' ')[0]}}</div>
  <div><img src="../assets/download_icon_grey.svg" alt="logo">
  {{animation.downloads}}</div>


  </div>
</div>
  </div>

</template>


<script>


export default {
  name: 'Animation',
  props: [
      'animations'
  ],
  components: {
    
  },
  data() {
    return {

    }
  },
  
}
</script>

<style>
.animation-wrapper {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}


.animation {
  margin: 10px;
  flex: 1 1 0;
  background-color: white;
  width: 265px;
  max-height: 400px;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.anim_name {
  font-weight: bold;
}

.anim_footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
}

@media (min-width: 1280px) {
.animation {
  flex: 1 1 0;
  background-color: white;
  max-width: 265px;
  max-height: 400px;
}
}


</style>