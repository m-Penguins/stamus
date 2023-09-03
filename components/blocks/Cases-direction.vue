<template>
  <div class="container-size">
    <elements-slider-cases-direction :text="text" :isCategoryAndDescription="isCategoryAndDescription" :programs="dataDirection"/>
  </div>
</template>

<script>
export default {
  props: {
    dataDirection: {
      type: Array,
    },
      text: {
      type: String,
      default: ''
    },
    isCategoryAndDescription: {
      type: Boolean,
      default: true
    }
  },
};
</script>