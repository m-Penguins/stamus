<template>
  <div class="doc-block">
    <div class="doc-block-title">Документы</div>
    <div class="doc-block-container">
      <div v-for="(item, index) in cards" :key="index" class="doc-block-item">
        <elements-documentation-card :info="item"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      cards: {
        type: Array,
      },
  }
}
</script>

<style scoped lang="scss">
@import '/assets/styles/style.scss';

.doc-block {
  padding-bottom: 100px;
}

.doc-block-title {
  @include body-22-medium-Neue;
  color: black;
  padding-bottom: 30px;
}

.doc-block-container {
  display: flex;
  gap: 16px;
  width: 100%;
}

.doc-block-item {
  width: 50%;
}

@media (max-width: 1100px) {
  .doc-block-container {
   flex-wrap: wrap;
  }
  .doc-block-item {
    width: 100%;
  }
}

@media (max-width: 650px) {
  .doc-block {
      padding-bottom: 80px;
  }
}

</style>