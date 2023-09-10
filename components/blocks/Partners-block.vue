<template>
  <div class="partners-block">
    <div class="partners-block-wrap">
      <div v-for="item in data" :key="item" class="partners-block-container">
        <elements-partners-card :images="item" class="partners-block-box"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
  },

}
</script>

<style scoped lang="scss">
@import '../../assets/styles/style.scss';
.partners-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 100px;
}

.partners-block-wrap {
  display: flex;
  flex-wrap: wrap;
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
  gap: 16px;
}

.partners-block-box {
  max-width: 416px;
  width: 416px;
  height: 120px;
}

@media screen and (max-width: 1341px) {
  .partners-block-container {
    width: 49%;
  }

  .partners-block-box {
    max-width: 100%;
    width: 100%;
  }
}

@media screen and (max-width: 860px) {
  .partners-block-container {
    width: 48.5%;
  }
  .partners-block-wrap {
    gap: 14px;
  }
}

@media screen and (max-width: 680px) {
  .partners-block-container {
    width: 100%;
  }
}

</style>