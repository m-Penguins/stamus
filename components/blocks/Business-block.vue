<template>
  <div class="business-block">
    <div class="business-block-wrap">
      <div v-for="item in data" :key="item" class="business-block-container">
        <elements-business-card :data="item" class="business-block-box"/>
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

.business-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 100px;
}

.business-block-wrap {
  display: flex;
  flex-wrap: wrap;
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
  gap: 16px;
}

.business-block-box {
  max-width: 308px;
  width: 308px;
  height: 105px;
}

@media screen and (max-width: 1017px) {
  .business-block-container {
    width: 49%;
  }

  .business-block-box {
    max-width: 100%;
    width: 100%;
  }
}

@media screen and (max-width: 860px) {
  .business-block-container {
    width: 48.5%;
  }
  .business-block-wrap {
    gap: 14px;
  }
}

@media screen and (max-width: 680px) {
  .business-block-container {
    width: 100%;
  }

  .business-block {
    margin-bottom: 80px;
  }
}

</style>