<script setup lang="ts">
const props = defineProps(["block", "blockSpecialists"]);

if (props.blockSpecialists) {
  props.block.specialists = props.blockSpecialists;
}
</script>

<template>
  <elements-slider-our-specialists
    :programs="block?.specialists?.data"
    :title="block?.title ?? 'Наши врачи'"
  />
</template>

<style lang="scss" scoped></style>
