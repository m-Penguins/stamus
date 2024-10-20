<template>
  <div class="wrapper">
    <div class="form-wrapper">
      <h2 class="form-wrapper__title title-dark-blue p-bt-30">
        Записаться на курс
      </h2>
      <p class="form-wrapper__subtitle subtitle-gray">
        Если не нашли желаемый курс, дайте <br /> нам об этом знать
      </p>
      <div class="form-wrapper__text text-gray-opacity p-bt-14 p-t-14">
        Нажимая кнопку отправить, вы соглашаетесь с
        <a>Политикой обработки персональных данных</a>
        <div v-if="isSuccess" class="success-text">
          Спасибо, Ваша заявка отправлена.
        </div>
      </div>
      <div class="form-wrapper__box">
        <elements-input-base
            tag-type="input"
            class="form-input"
            label="Имя"
            v-model="formData.name"
        />
        <elements-input-base
            label="Номер телефона"
            tag-type="phoneMask"
            type="tel"
            v-model="formData.phone"
            class="form-input"
        />
        <elements-button-base
            :onClick="sendData"
            :disabled="!isSubmitActive"
            title="Отправить"
            class="form-btn"
        />
      </div>
    </div>
    <BlocksShare />
  </div>
</template>

<script setup>
const formData = ref({
  name: '',
  phone: ''
});

const isSuccess = ref(false);
const isSubmitActive = computed(() => {
  return formData.value.name.trim() !== '' && formData.value.phone.trim() !== '';
});

const sendData = async () => {
  if (isSubmitActive.value) {
    try {
      const mail = useMail();
      const message = `Имя: ${formData.value.name}
      Телефон: ${formData.value.phone}`;

      await mail.send({
        config: "form",
        from: "dev@sloy.design",
        to: "stamus.ed@yandex.ru",
        subject: "Заявка на курс",
        text: message
      });

      isSuccess.value = true;
      formData.value.name = '';
      formData.value.phone = '';
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
};
</script>


<style lang="scss" scoped>
@import "/assets/styles/style.scss";
.form-wrapper {
  width: 1280px;
  max-width: 100%;
  border-radius: 45px;
  background: $light-gray;
  text-align: center;
  margin: 0 auto 24px;
  padding: 0 20px;

  &__title {
    padding-top: 112px;
  }

  &__subtitle {
    padding-bottom: 50px;
  }

  &__text {
    position: relative;
    & a {
      color: inherit;
      font-size: inherit;
      text-decoration: underline;
    }
  }

  &__box {
    padding-bottom: 112px;
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
}

.wrapper {
  margin: 0 auto 100px;
  width: 1280px;
  max-width: 100%;
  @media screen and (max-width: 560px) {
    margin: 0 auto 80px;
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
      padding-bottom: 50px !important;
    }
  }
}

@media (max-width: 560px) {
  .form-wrapper {
    margin: 0 auto 24px;
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
      padding-bottom: 60px !important;
    }

    &__box {
      gap: 10px;
    }
  }
}
</style>
