<script setup lang="ts">
const props = defineProps(["block"]);
</script>

<template>
  <elements-slider-our-specialists
    :programs="block?.specialists?.data"
    :title="block?.title ?? 'Наши специалисты'"
  />
</template>

<style lang="scss" scoped></style>
