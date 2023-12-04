<script setup>
defineProps(["blocks"]);
</script>

<template>
  <section class="service-section-block" v-for="block in blocks">
    <component :is="getServicesBlock(block?.['__component'])" :block="block" />
  </section>
</template>

<style lang="scss" scoped>
.service-section-block {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  margin-bottom: 100px;
}
</style>
