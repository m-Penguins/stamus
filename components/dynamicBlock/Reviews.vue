<script setup lang="ts">
const props = defineProps(["block"]);

console.log(props.block);

const reviews = mapReviews(props?.block?.reviews?.data);
</script>

<template>
  <template v-if="reviews?.length > 0">
    <elements-slider :programs="reviews"
  /></template>
</template>

<style lang="scss" scoped></style>
