<template>
  <div class="symptoms-block">
    <div class="symptoms-block-container">
      <div>
        <h3 v-html="title" class="symptoms-block-title"></h3>
      </div>
      <div class="symptoms-block-box">
        <elements-symptoms-card v-for="card in cards" :key="card.id" :card="card" :isGray="isGray(card.id)"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    cards: Array
  },
  methods: {
    isGray(id) {
      return id % 2 === 0;
    }
  }
};
</script>

<style scoped lang="scss">
@import '/assets/styles/style.scss';

.symptoms-block {
  display: flex;
  width: 1280px;
  max-width: 100%;
  justify-content: space-between;
  margin: 0 auto 100px;
}

.symptoms-block-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.symptoms-block-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
  max-width: 308px;
  line-height: 23px;
}

.symptoms-block-box {
  display: flex;
  max-width: 630px;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 1000px) {
  .symptoms-block-container {
    flex-wrap: wrap;
    gap: 30px;
  }
  .symptoms-block-box {
    max-width: 100%;
  }
}

</style>