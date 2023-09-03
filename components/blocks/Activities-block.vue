<template>
<div class="activities-block">
  <div class="activities-block-wrap">
    <h2 class="activities-block-title">Основные направления деятельности</h2>
    <div class="activities-block-box">
      <div v-for="item in activitiesCard" :key="item">
        <elements-activities-card :activitiesCard="item"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    props: {
      activitiesCard: {
        type: Object
      },
    },
  }
</script>

<style scoped lang="scss">
@import '/assets/styles/style.scss';
.activities-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 100px;
}

.activities-block-wrap {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
}

.activities-block-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
  padding-bottom: 30px;
}

.activities-block-box {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

@media (max-width: 670px) {
  .activities-block {
      margin-bottom: 80px;
  }
}
</style>