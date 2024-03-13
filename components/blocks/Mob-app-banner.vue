<template>
  <div class="mob-app-banner">
    <div class="mob-app-banner-container">
      <h2 class="mob-app-banner-container__title">Хотите лечиться бесплатно?</h2>
      <p class="mob-app-banner-container__text">Скачайте наше приложение и получайте бонусы за каждую запись</p>
    </div>
    <div class="mob-app-banner-box">
      <img src="../../assets/images/mob/mob4.png" alt="mobile app" class="mob-app-banner-box__img"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/style.scss';

.mob-app-banner {
  display: flex;
  justify-content: space-around;
  border-radius: 15px;
  background: #F9F9FA;
  height: 420px;
  margin-bottom: 20px;
}

.mob-app-banner-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 370px;

  &__title {
    @include body-40-medium;
    color: $dark-blue-subtitle;
    padding-bottom: 20px;
  }
  &__text {
    @include body-18-regular;
    color: $gray-text;
  }
}

.mob-app-banner-box {
  position: relative;
    &__img {
      position: relative;
      bottom: 58px;
      right: 33px;
    }
}

@media screen and (max-width: 1000px) {
  .mob-app-banner-container {
    max-width: 100%;
    width: 100%;
    padding: 20px;

      &__title {
        font-size: 16px;
        padding-bottom: 5px;
      }
      
      &__text {
        font-size: 16px;
      }
  }
  .mob-app-banner {
    flex-wrap: wrap;
    height: 500px;
  }
  .mob-app-banner-box {
    display: flex;
      &__img {
        width: 292px;
        position: initial;
    }
  }
}

</style>