<template>
  <div class="form-wrapper">
    <h2 class="form-wrapper__title title-dark-blue p-bt-30">Записаться на консультацию</h2>
    <p class="form-wrapper__subtitle subtitle-gray">Перезвоним в течении 15 минут и уточним <br> удобную для вас поликлинику и дату</p>
    <div class="form-wrapper__box">
      <elements-input-base tag-type="input" class="form-input" label="Имя" v-model="value"/>
      <elements-input-base label="Номер телефона" tag-type="phoneMask" type="tel" v-model="valuePhone" class="form-input" mask="+{7}(000)000-00-00"/>
      <elements-button-base title="Записаться" class="form-btn"/>
    </div>
    <p class="form-wrapper__text text-gray-opacity p-bt-112 p-t-14">Нажимая кнопку отправить, вы соглашаетесь с Политикой обработки персональных данных</p>
  </div>
</template>

<script>
  export default {
    setup() {
      const value = ref();
      const valuePhone = ref();
      return {
        value,
        valuePhone
      }
    }
  }
</script>


<style lang="scss" scoped>
@import '/assets/styles/style.scss';
  .form-wrapper {
    width: 1280px;
    max-width: 100%;
    margin: 0 auto;
    border-radius: 45px;
    background: $light-gray;
    text-align: center;
    margin: 0 auto 100px;
    padding: 0 20px;

    &__title {
      padding-top: 112px;
    }

    &__subtitle {
      padding-bottom: 60px;
    }

    &__text {
      padding-bottom: 112px;
    }

    &__box {
      margin: 0 auto;
      display: flex;
      gap: 20px;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }
  }

  @media (max-width: 1280px) {
    .form-wrapper {
      &__title {
        padding-top: 80px;
        font-size: 35px;
      }
      &__text {
        padding-bottom: 75px;
      }
  }
}

@media (max-width: 1024px) {
  .form-wrapper {
    &__title {
      padding-top: 60px;
      font-size: 29px;
    }

    &__box {
      flex-wrap: wrap;
      width: 100%;

      .form-input {
        width: 46%;
      }

      .form-btn {
        flex-basis: 94%;
      }
    }

    &__subtitle {
      font-size: 15px;
    }

    &__text {
      padding-bottom: 50px;
    }
  }
}

@media (max-width: 744px) {
  .form-wrapper {
    &__title {
      padding-top: 40px;
      font-size: 22px;
      white-space: pre-wrap;
    }

    &__subtitle {
      font-size: 14px;
    }

    &__box {
      gap: 14px;
      justify-content: space-between;

      .form-input {
        flex-basis: 48%;
      }

      .form-btn {
        flex-basis: 100%;
      }
    }

    &__text {
      padding-bottom: 20px;
    }
  }
}

@media (max-width: 560px) {
  .form-wrapper {
    margin: 0 auto 80px;
    &__title {
      line-height: 25px;
    }

    &__box {
      gap: 14px;
      justify-content: space-between;

      .form-input {
        flex-basis: 100%;
      }
    }
  }
}

@media (max-width: 375px) {
  .form-wrapper {
    padding: 0 14px;

    &__title {
      padding-top: 60px;
    }

    &__text {
      padding-bottom: 14px;
    }

    &__box {
      gap: 10px;
    }
  }
}
</style>