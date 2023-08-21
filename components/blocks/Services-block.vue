<template>
  <div class="container-size popular-service">
    <div class="service-title">
      <h2 class="popular-service__title">Услуги</h2>
      <elements-link-with-arrow type="true" title="Посмотреть все"/>
    </div>
    <div class="service-form">
      <div class="service-box">
        <elements-select
          :options="addresData"
          :default="'Укажите клинику'"
          class="select"
        />
        <elements-select
          :options="addresData"
          :default="'Укажите клинику'"
          class="select"
        />
      </div>
      <div class="input-search">
        <elements-input-search class="input-search"/>
      </div>
    </div>
    <div class="popular-service__list">
      <div v-for="(item, index) in mockArray" :key="index">
        <elements-service-card :service="item"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import ElementsLinkWithArrow from '../elements/ElementsLinkWithArrow.vue';
  const mockArray = [
    {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
    {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
    {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
    {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
    {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
    ];
</script>


<script>
  export default {
  components: { ElementsLinkWithArrow },
    props: {
      addresData: {
        tpye: Array,
      },
    },
    setup() {
       const mockArray = [
        {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
        {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
        {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
        {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
        {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
        ];
      return {
        mockArray,
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '/assets/styles/style.scss';

  .popular-service {

    &__title {
      @include body-22-medium-Neue;
      color: $dark-blue-subtitle;
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  .service-title {
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
    gap: 24px;
    padding-bottom: 40px;
  }

  .service-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 40px;
  }

  .service-box {
    display: flex;
    gap: 16px;
    margin-right: 16px;
  }

  .select {
    width: 308px;
  }

  @media (max-width: 1017px) {
    .service-form {
      flex-wrap: wrap;
      gap: 10px;
    }
    .service-box {
      margin-right: 0;
      width: 100%;
      .select {
        width: 100%;
      }
    }
    .input-search {
      width: 100%;
    }
  }

  @media (max-width: 740px) {
    .popular-service {
      margin: 0 auto 80px !important;
    }
    .service-box {
      flex-wrap: wrap;
    }
  }

  @media (max-width: 400px) {
    .service-title {
      display: block;
      padding-bottom: 30px;
    }
    .popular-service {
      margin: 0 auto 80px;
      &__title {
        padding-bottom: 10px;
      }
    }
  }
</style>