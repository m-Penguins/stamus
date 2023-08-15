<template>
  <div class="container-size">
    <elements-slider-our-specialists :programs="data"/>
  </div>
</template>



<script>
export default {
  props: {
    data: {
      tpye: Array,
    },
  },
};
</script>
