<template>
  <div class="banner">
    <div class="banner__content">
      <h6>{{ block?.title }}</h6>
      <div class="banner__content-inputs">
        <elements-input-base
            tag-type="input"
            label="Ваше имя"
            class="banner__content-inputs-input"
            v-model="name"
        />
        <elements-input-base
            label="Номер телефона"
            tag-type="phoneMask"
            type="tel"
            class="banner__content-inputs-input"
            v-model="number"
        />
      </div>
      <div class="banner__content-button">
        <ElementsButtonBase @click="submit" title="Записаться" class="button"/>
        <p>Нажимая записаться вы соглашаетесь с обработкой персональных данных</p>
      </div>
    </div>
    <NuxtImg class="banner__specialist" :src="block?.spec?.data?.attributes?.fotoSpecialist?.data?.attributes?.url" provider="strapi"/>
    <span class="message" :class="{ error: isError, success: isSuccess }">{{message}}</span>
  </div>
</template>

<script setup>
const props = defineProps(["block"]);
const name = ref("")
const number = ref("")
const isError = ref(false)
const isSuccess = ref(false)
const message = ref("")
const resetForm = () => {
  name.value = ""
  number.value = ""
}
const submit = async () => {
  if (name.value && number.value) {
    isError.value = false
    isSuccess.value = false
    const mail = useMail();

    const msg = [
      `Имя: ${name.value}`,
      `Номер телефона: ${number.value}`,
      `Врач: ${props.block?.spec?.data?.attributes?.fullName}`,
    ]
        .filter(Boolean)
        .join("\n");

    try {
      await mail.send({
        config: "form",
        from: "dev@sloy.design",
        subject: `${name.value} Запись к врачу`,
        text: msg,
      });
      resetForm();
      isSuccess.value = true
      message.value = "Ваша заявка успешно отправлена, мы перезвоним вам позже"
      setTimeout(() => {
        isError.value = false;
        isSuccess.value = false;
        message.value = "";
      }, 5000);
    } catch (error) {
      isError.value = true
      message.value = "Произошла ошибка, попробуйте позже"
    }
  } else {
    message.value = "Заполните все поля"
    isError.value = true
  }
}

</script>

<style lang="scss" scoped>
  .banner {
    width: 100%;
    display: flex;
    background: #F9F9FA;
    border-radius: 45px;
    position: relative;
    &__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      max-width: 700px;
      padding: 150px 30px;
      h6 {
        font-size: 32px;
        line-height: 130%;
        text-transform: uppercase;
        color: #2f3964;
        font-weight: 500;
      }
      &-inputs {
        display: flex;
        width: 100%;
        gap: 15px;
        margin-top: 20px;
        &-input {
          max-width: 300px;
          width: 100%;
        }
      }

      &-button {
        display: flex;
        margin-top: 15px;
        align-items: center;
        gap: 15px;
        p {
          width: 100%;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 16.2px;
          color: #525660;
          opacity: 0.7;
        }
        .button {
          max-width: 300px;
          width: 100%;
        }
      }
    }

    &__specialist {
      margin: auto 10% 0 auto;
      max-width: 465px;
      width: 100%;
      height: 90%;
    }

    @media (max-width: 900px) {
      flex-direction: column-reverse;
      align-items: center;
      &__content {
        padding-bottom: 40px;
      }

      &__specialist {
        margin: 20px 0 0;
      }
    }

    @media (max-width: 500px) {
      &__content {
        padding: 20px 20px 40px;
        h6 {
          font-size: 26px;
          line-height: 130%;
          text-transform: uppercase;
          color: #2f3964;
          font-weight: 500;
        }
        &-inputs {
          flex-direction: column;
          &-input {
            max-width: none;
          }
        }

        &-button {
          flex-direction: column;
          p {
            text-align: center;
          }
          .button {
            max-width: none;
          }
        }
      }
    }

    .message {
      font-size: 14px;
      height: 20px;
      display: block;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 10px;
      opacity: 0;
      text-align: center;
      &.error {
        color: red;
        opacity: 1;
      }
      &.success {
        color: #06b206;
        opacity: 1;
      }
    }
  }
</style>
