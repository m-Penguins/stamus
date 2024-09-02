<template>
  <div class="form-wrapper">
    <h2 class="form-wrapper__title title-dark-blue p-bt-30">
      Записаться на консультацию
    </h2>
    <p class="form-wrapper__subtitle subtitle-gray">
      Перезвоним в течении 15 минут и уточним <br />
      удобную для вас клинику и дату
    </p>
    <div class="form-wrapper__box">
      <elements-input-base
        tag-type="input"
        class="form-input"
        label="Имя"
        v-model="store.nameField"
        :error-message="store.isNameValid ? '' : '*Минимум 2 символа'"
      />
      <elements-input-base
        label="Номер телефона"
        tag-type="phoneMask"
        type="tel"
        v-model="store.phoneField"
        class="form-input"
        :error-message="store.isPhoneValid ? '' : '*Неверный формат'"
      />
      <elements-button-base
        :onClick="sendData"
        :disabled="!store.isSubmitActive"
        title="Отправить"
        class="form-btn"
      />
    </div>
    <div class="form-wrapper__text text-gray-opacity p-bt-112 p-t-14">
      Нажимая кнопку отправить, вы соглашаетесь с
      <a :href="privacyLink" target="_blank"
        >Политикой обработки персональных данных</a
        >
      <div v-if="store.isSuccess" class="success-text">
        Спасибо, Ваша заявка отправлена.
      </div>
    </div>
  </div>
</template>

<script setup>
const baseDataStore = useBaseDataStore();
const baseUrl = useRuntimeConfig().public.baseUrl;

const privacyLink = baseDataStore?.footerData?.data?.attributes?.privacy?.data
  ?.attributes?.url
  ? baseUrl +
    baseDataStore?.footerData?.data?.attributes?.privacy?.data?.attributes?.url
  : "";

const store = useModalStore();
const sendData = () => {
  store.submitModal();
};
</script>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";
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
    position: relative;
    & a {
      color: inherit;
      font-size: inherit;
      text-decoration: underline;
    }
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

.success-text {
  @include body-16-regular;
  color: rgb(32, 196, 32);
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;
  position: absolute;
  width: 100%;
  text-align: center;
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
      padding-bottom: 100px;
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
      padding-bottom: 50px;
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
      padding-bottom: 60px;
    }

    &__box {
      gap: 10px;
    }
  }
}
</style>
