<script setup lang="ts">
defineProps(["block"]);
</script>

<template>
  <elements-slider-our-specialists
    :programs="block?.specialists?.data"
    title="Наши специалисты"
  />
</template>

<style lang="scss" scoped></style>
