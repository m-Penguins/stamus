<template>
  <div class="container-size popular-service">
    <h2 class="popular-service__title">Популярные услуги</h2>
    <div class="popular-service__list">
      <div v-for="(item, index) in mockArray" :key="index">
        <elements-service-card :service="item"/>
      </div>
    </div>
  </div>
</template>

<script setup>
  const mockArray = [
    {heading: 'Лечение во сне', price: '3 400', isRecommended: true, isPopular: null, isDemand: null, type: 'Рекомендуем', tags: ["Стоматология", "Дети", 'Седация']},
    {heading: 'Профессиональная гигиена полости рта и зубов временный прикус', isRecommended: true, isPopular: null, isDemand: null, price: '5 400', type: 'Рекомендуем', tags: ["Стоматология", "Дети"]},
    {heading: 'Удаление зубов мудрости', price: '3 400', isRecommended: null, isPopular: null, isDemand: true, type: 'Рекомендуем', tags: ["Стоматология", "Взрослые"]},
    {heading: 'Скуловая имплантация', price: '3 800', isRecommended: null, isPopular: true, isDemand: null, type: 'Рекомендуем', tags: ["Стоматология", "Дети"]},
    {heading: 'Профессиональная гигиена полости рта и зубов временный прикус', isRecommended: null, isPopular: null, isDemand: null, price: '1 400', type: 'Рекомендуем', tags: ["Стоматология"]},
    ];
</script>

<style lang="scss" scoped>
@import '/assets/styles/style.scss';

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