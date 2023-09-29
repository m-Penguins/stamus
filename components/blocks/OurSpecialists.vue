<template>
  <div class="container-size our-specialist">
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

<style scoped lang="scss">
@import '/assets/styles/style.scss';

@media screen and (max-width: 670px) {
  .our-specialist {
    margin-bottom: 80px;
  }
}

</style>
