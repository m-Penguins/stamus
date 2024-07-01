<script setup>
const props = defineProps(["block"]);

const reviews = mapReviews(props?.block?.reviews?.data)?.filter(
  (el) => el?.publishedAt,
);
</script>

<template>
  <template v-if="reviews?.length > 0">
    <elements-slider :title="block.title" :programs="reviews"/>
  </template>
</template>

<style lang="scss" scoped></style>
