<template>
  <div v-if="reviews?.length > 0" class="container-size wrapper-feedback">
    <elements-slider :programs="reviews" />
  </div>
</template>

<script setup>
defineProps(["reviews"]);
</script>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";
.wrapper-feedback {
  padding-top: 20px;
}

@media (max-width: 900px) {
  .wrapper-feedback {
    padding-top: 0;
  }
}

@media (max-width: 650px) {
  .wrapper-feedback {
    margin: 0 auto 80px !important;
  }
}
</style>
