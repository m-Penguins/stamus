<template>
  <div class="container-size popular-service">
    <h2 class="popular-service__title">Популярные услуги</h2>
    <div class="popular-service__list">
      <div v-for="(item, index) in popularServicesData" :key="index">
        <elements-service-card :service="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
const baseDataStore = useBaseDataStore();

const popularServicesData = ref(
  baseDataStore?.popularServices?.data?.attributes?.popularService,
);
</script>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";

.popular-service {
  padding: 40px 0;

  &__title {
    @include body-22-medium-Neue;
    color: $dark-blue-subtitle;
    padding-bottom: 40px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 900px) {
  .popular-service {
    padding: 0;
  }
}

@media (max-width: 600px) {
  .popular-service {
    margin: 0 auto 80px !important;
  }
}
</style>
