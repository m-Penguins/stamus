<template>
  <div class="mob-app-block-wrap">
    <div class="mob-app-block-box">
      <h2 class="mob-app-block-box__title">Удобный интерфейс</h2>
      <p class="mob-app-block-box__text">Для быстрой онлайн-записи в клинку</p>
    </div>
    <div class="mob-app-block-container">
      <div class="mob-app-block-inner first-block">
        <img src="../../assets/images/mob/mob2.png" alt="mob" class="first-block-img"/>
      </div>
      <div class="mob-app-block-inner second-block">
        <img src="../../assets/images/mob/mob3.png" alt="mob" class="second-block-img"/>
      </div>
      <div class="mob-app-block-inner third-block">
        <img src="../../assets/images/mob/mob1.png" class="third-block-img" alt="mob"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/style.scss';

.mob-app-block-wrap {
  margin-bottom: 100px;
}

.mob-app-block-container {
  display: flex;
  gap: 16px;
}

.mob-app-block-inner {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  max-width: 416px;
  height: 380px;
  border-radius: 15px;
  background: #F9F9FA;
}

.mob-app-block-box {
  padding-bottom: 40px;

  &__title {
    @include body-22-medium-Neue;
    color: $dark-blue-subtitle;
    padding-bottom: 14px;
  }

  &__text {
    @include body-16-regular;
    color: $gray-text;
  }
}


@media screen and (max-width: 1300px) {
  .mob-app-block-container {
    flex-wrap: wrap;
    gap: 14px;
  }

  .first-block, .second-block {
    width: 49%;
    max-width: 50%;
  }

  .second-block {
    justify-content: flex-start;
  }

  .third-block {
    max-width: 100%;
    width: 100%;
  }
}

@media screen and (max-width: 900px) {
  .first-block {
    position: relative;
  }

  .first-block-img {
    position: absolute;
    top: 37px;
    left: 11%;
  }

  .second-block-img {
    object-fit: cover;
    height: 380px;
    object-position: 68%;
  }
}

@media screen and (max-width: 761px) {
  .first-block, .second-block { 
    width: 334px;
  }
  .first-block-img {
    left: 7%;
  }
}

@media screen and (max-width: 743px) {
  .first-block, .second-block { 
    width: 100%;
    max-width: 100%;
  }
  .first-block-img {
    position: static;
  }
}

@media screen and (max-width: 400px) {
  .mob-app-block-wrap {
    margin-bottom: 80px;
  }

  .first-block-img {
    position: absolute;
    left: 26px;
  }

  .third-block-img {
    height: 311px;
  }
}

</style>