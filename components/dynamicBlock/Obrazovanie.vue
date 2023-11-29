<script setup>
const props = defineProps(["block"]);

const eduBlocks = props?.block?.education;
console.log(eduBlocks);
</script>

<template>
  <blocks-education-block
    v-if="eduBlocks?.length > 0"
    :events="eduBlocks"
    :title="block?.title ?? 'Образование'"
  />
</template>

<style lang="scss" scoped></style>
