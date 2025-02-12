<template>
  <div class="wrapper">
    <div class="form-wrapper">
      <h2 class="form-wrapper__title title-dark-blue p-bt-30">
        Откликнуться на вакансию
      </h2>
      <p class="form-wrapper__subtitle subtitle-gray">
        Заполните форму и наш HR-менеджер свяжется с вами в случае <br /> заинтересованности
      </p>
      <div class="form-wrapper__box">
        <elements-input-base
            tag-type="input"
            class="form-input"
            label="Имя"
            v-model="formData.name"
            :error-message="isNameValid ? '' : '*Минимум два символа'"
        />
        <elements-input-base
            label="Номер телефона"
            tag-type="phoneMask"
            type="tel"
            v-model="formData.phone"
            class="form-input"
            :error-message="isPhoneValid ? '' : '*Неверный формат'"
        />
        <elements-input-base
            label="Какая у вас должность?*"
            tag-type="input"
            v-model="formData.position"
            class="form-input"
        />
        <elements-file-uploader
            label="Прикрепить резюме"
            v-model="formData.cv"
            class="form-input"
        />
        <elements-input-base
            label="Сопроводительное сообщение (пришлите здесь ссылку на резюме если не получится прикрепить файл)"
            tag-type="textarea"
            class="form-textarea"
            v-model="formData.letter"
        />
        <elements-button-base
            :onClick="submit"
            :disabled="!isSubmitActive"
            title="Отправить"
            class="form-btn"
        />
        <a href="https://hh.ru/employer/5034648?from=share_ios" class="hh-link">Посмотреть вакансию на HeadHunter</a>
        <p v-if="isSuccess" class="success-text" >Ваша заявка успешно отправлена!</p>
      </div>
    </div>
    <BlocksFormContacts phone="+7-928-421-73-86" />
  </div>
</template>

<script setup>

const formData = ref({
  name: '',
  phone: '',
  position: '',
  cv: null,
  letter: ''
});
const startValidation = ref(false);
const isError = ref(false)
const isSubmitActive = computed(() => {
  return formData.value.name.length && formData.value.phone.length > 0;
});
const store = useModalStore();
const isSuccess = ref(false);
const isNameValid = computed(() => {
  if (startValidation.value) {
    return formData.value.name.length > 1;
  }
  return true;
});

const isPhoneValid = computed(() => {
  if (startValidation.value) {
    return formData.value.phone.length === 18;
  }
  return true;
});

const resetForm = () => {
  formData.value = { name: '', phone: '', position: '', cv: null, letter: '' };
  startValidation.value = false;
};

const submit = async () => {
  startValidation.value = true;
  console.log(formData.value.cv)
  if (isSubmitActive.value) {
    const mailData = {
      name: formData.value.name ? `Имя: ${formData.value.name}` : null,
      phone: formData.value.phone ? `Телефон: ${formData.value.phone}` : null,
      position: formData.value.position ? `Должность: ${formData.value.position}` : null,
      letter: formData.value.letter ? `Сообщение: ${formData.value.letter}` : null,
    };

    const subject = "Отклик на вакансию";
    const msg = Object.values(mailData).filter(Boolean).join("\n");

    const mail = useMail();

    try {
      let attachment = null;
      if (formData.value.cv) {
        attachment = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(formData.value.cv);
          reader.onload = () => resolve({
            filename: formData.value.cv.name,
            content: reader.result.split(',')[1], // Получаем base64
            encoding: "base64"
          });
          reader.onerror = reject;
        });
      }
      const data = await mail.send({
        config: "form",
        from: "dev@sloy.design",
        to: "kadristamus@yandex.ru",
        subject,
        text: msg,
        attachments: attachment ? [attachment] : [],
      });
      resetForm();
      isSuccess.value = true;
    } catch (error) {
      console.error(error);
      isError.value = true;
    } finally {
      setTimeout(() => {
        isError.value = false;
        isSuccess.value = false;
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";
.wrapper {
  margin-bottom: 100px;
}

.form-wrapper {
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
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
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Две колонки */
    gap: 20px; /* Промежутки между элементами */
    justify-content: center;
    align-items: center;
    max-width: 620px;
    .form-btn {
      grid-column: span 2;
      width: 100%;
    }
    .form-textarea {
      grid-column: span 2;
    }
  }
}

.success-text {
  @include body-16-regular;
  color: rgb(32, 196, 32);
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 100%;
  grid-column: span 2;
}

.hh-link {
  grid-column: span 2;
  font-size: 12px;
  text-align: center;
  text-decoration: underline;
  color: #525660;
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
    margin: 0 auto 80px;
    &__title {
      line-height: 25px;
    }

    &__box {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 14px;
      justify-content: space-between;

      .form-input {
        flex-basis: 100%;
        width: 100%;
      }
      .form-textarea {
        width: 100%;
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
