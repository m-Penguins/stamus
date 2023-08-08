<template>
  <div class="form-wrapper">
    <h2 class="title-dark-blue p-t-112 p-bt-30">Записаться на консультацию</h2>
    <p class="subtitle-gray p-bt-60">Перезвоним в течении 15 минут и уточним удобную для вас поликлинику и дату</p>
    <div class="form-wrapper__box">
      <elements-input-base placeholder="Имя" class="m-r-20"/>
      <elements-input-base placeholder="Номер телефона" class="m-r-20"/>
      <elements-button-base title="Записаться"/>
    </div>
    <p class="text-gray-opacity p-bt-112 p-t-14">Нажимая кнопку отправить, вы соглашаетесь с Политикой обработки персональных данных</p>
  </div>
</template>

<style lang="scss" scoped>
@import '/assets/styles/style.scss';

  .form-wrapper {
    width: 1280px;
    max-width: 95%;
    margin: 0 auto;
    border-radius: 45px;
    background: $light-gray;
    text-align: center;
    margin: 0 auto 100px;

    &__box {
      margin: 0 auto;
      display: flex;
      width: 792px;
    }
  }
</style>