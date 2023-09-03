<template>
  <div class="container-size">
    <elements-slider-clinics-adress :text="text" :programs="dataDirection"/>
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
    }
  },
};
</script>