<template>
  <div class="prices">
    <div class="prices-wrap">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs"/>
      <h1 class="prices-title">Цены на услуги</h1>
      <p class="prices-text">Небольшое описание в несколько строчек</p>
    </div>
  </div>
  <div class="container-size popular-service">
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
        <elements-input-search class="input-search" placeholder="Найти"/>
      </div>
    </div>
    <div>
      <div class="prices-box">
        <div class="prices-box-title">Детская стоматология</div>
        <div class="grey-point-container">
          <p class="grey-point-text">6 услуг</p>
          <div class="grey-point"></div>
          <p class="grey-point-text">От 400 ₽</p>
        </div>
      </div>
      <hr/>
      <div class="popular-service__list">
        <div v-for="(item, index) in mockArray" :key="index">
          <elements-service-card :service="item"/>
        </div>
      </div>
    </div>
    <div>
      <div class="prices-box m-t-30">
        <div class="prices-box-title">Взрослая стоматология</div>
        <div class="grey-point-container">
          <p class="grey-point-text">6 услуг</p>
          <div class="grey-point"></div>
          <p class="grey-point-text">От 400 ₽</p>
        </div>
      </div>
      <hr/>
      <div class="popular-service__list">
        <div v-for="(item, index) in mockArray" :key="index">
          <elements-service-card :service="item"/>
        </div>
      </div>
    </div>
    <div>
      <div class="prices-box m-t-30">
        <div class="prices-box-title">Детская клиника</div>
        <div class="grey-point-container">
          <p class="grey-point-text">6 услуг</p>
          <div class="grey-point"></div>
          <p class="grey-point-text">От 400 ₽</p>
        </div>
      </div>
      <hr/>
      <div class="popular-service__list">
        <div v-for="(item, index) in mockArray" :key="index">
          <elements-service-card :service="item"/>
        </div>
      </div>
    </div>
    <elements-button-base title="Скачать полный прайс" :isDownload="true" class="prices-btn"/>
  </div>
</template>

<script>
  export default {
    setup() {
      const breadcrumbs = [{
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Цены на услуги',
          url: '/prices'
        }]
        const mockArray = [
          {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
          {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
          {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
          {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
          {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
          ];
      return {
        breadcrumbs,
        mockArray
      }
    }
  }
</script>

<style scoped lang="scss">
@import '/assets/styles/style.scss';

.prices {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1280px;
    max-width: 100%;
    margin: 20px auto 0 auto;
}

.prices-wrap {
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
}

.prices-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.prices-box-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
}

.prices-title {
  @include body-60-medium;
  color: $dark-blue-subtitle;
  padding: 100px 0 30px;
}

.prices-text {
  @include body-20-regular;
  color: $gray-text;
  padding-bottom: 40px;
}

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

  hr {
    margin-bottom: 20px;
    width: auto;
    border: 0;
    height: 1px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.8);
  }

  .prices-btn {
    margin: 60px auto 40px;
  }

  @media screen and (max-width: 1179px) {
    .prices-title {
      padding: 0px 0 30px;
    }
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
    .prices-title {
      font-size: 22px;
      padding: 0px 0 20px;
    }
    .prices-text { 
      font-size: 16px;
      padding-bottom: 0;
    }
  }

  @media (max-width: 800px) {
    .service-form {
      padding-bottom: 0px;
    }
    .prices-box-title {
      font-size: 16px;
    }
    .prices-box {
      padding: 0 0 20px;
      margin-top: 60px;
    }

    hr {
      display: none;
    }
    .prices-btn {
      margin: 60px auto 0px;
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
    .prices-wrap {
      margin-bottom: 80px;
    }
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
    hr {
      display: block;
    }
  }

</style>
