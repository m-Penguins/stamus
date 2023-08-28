<template>
 <div class="container-size wrapper-feedback">
  <elements-slider-video-elements :images="imagesScroll"/>
 </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      imagesScroll: {
        tpye: Array,
      },
    }
  }
</script>

<style lang="scss" scoped>
@import '/assets/styles/style.scss';

@media (max-width: 650px) {
  .wrapper-feedback {
    margin: 0 auto 80px !important;
  }
}
</style>