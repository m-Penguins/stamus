<template>
  <div class="seo-block-text">
    <h2
      class="seo-block-text__title p-bt-14"
      v-if="block?.title"
      v-html="block?.title"
    ></h2>
    <div
      class="seo-block-text__text"
      v-if="block?.description"
      v-html="block?.description"
    ></div>
  </div>
</template>

<script setup>
defineProps(["block"]);

const baseUrl = useRuntimeConfig().public?.baseUrl;
</script>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

.seo-block-text__title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
}
* :deep(*) {
  list-style-type: unset;
  list-style-position: inside;
}
</style>
