<template>
  <div class="container-size">
    <elements-slider-cases-direction :text="text" :programs="dataDirection"/>
  </div>
</template>

<script>
export default {
  props: {
    dataDirection: {
      tpye: Array,
    },
      text: {
      type: String,
      default: ''
    },
  },
};
</script>