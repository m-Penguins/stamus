<template>
  <div>
    <div>
      <div>
        <elements-info-dop-card :optionsData="optionsData" :optionsDoc="optionsDoc"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    optionsData: Array,
    optionsDoc: Array
  },
}
</script>