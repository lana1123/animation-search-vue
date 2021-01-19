<template>
<div class="animation-wrapper">
   <div class="animation" v-for="animation in animations" :key="animation.id">
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

.anim_name {
  font-weight: bold;
}

.anim_footer {
  display: flex;
  justify-content: space-around;
}

</style>