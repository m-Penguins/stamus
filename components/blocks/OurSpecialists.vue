<template>
  <div class="container-size">
    <elements-slider-our-specialists :programs="data" :title="title"/>
  </div>
</template>



<script>
export default {
  props: {
    data: {
      type: Array,
    },
    title: {
      type: String,
      default: ''
    },
  },
};
</script>
