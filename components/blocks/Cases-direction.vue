<template>
  <div class="container-size">
    <elements-slider-cases-direction :programs="dataDirection"/>
  </div>
</template>

<script>
export default {
  props: {
    dataDirection: {
      tpye: Array,
    },
  },
};
</script>