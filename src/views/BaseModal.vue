<template>
<div class="modal">
Modal
</div>
</template>

<script>
export default {
  name: 'BaseModal',
  components: {
  },
  props: [
    'showModal'
  ],

  data() {
    return {

    }
  }

}
</script>

<style>
.modal {
    color: white;
    background-color: green;
}
</style>