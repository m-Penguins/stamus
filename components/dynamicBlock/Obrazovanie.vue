<script setup>
const props = defineProps(["block"]);

const eduBlocks = props?.block?.education;
eduBlocks.sort((a, b) => new Date(b.years) - new Date(a.years));
</script>

<template>
  <blocks-education-block
    v-if="eduBlocks?.length > 0"
    :events="eduBlocks"
    :title="block?.title ?? 'Образование'"
  />
</template>

<style lang="scss" scoped></style>
