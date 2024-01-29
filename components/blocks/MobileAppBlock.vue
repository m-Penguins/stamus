<template>
  <div class="mob-app-block-wrap">
    <div class="mob-app-block-box">
      <h2 class="mob-app-block-box__title">Удобный интерфейс</h2>
      <p class="mob-app-block-box__text">Для быстрой онлайн-записи в клинику</p>
    </div>
    <div class="mob-app-block-container">
      <div class="mob-app-block-inner first-block">
        <NuxtImg
          src="images/mob/mob1.png"
          alt="Мобильное приложение"
          sizes="xs:400px md:800px"
          format="webp"
          class="first-block-img my-image"
        />
      </div>
      <div class="mob-app-block-inner second-block">
        <NuxtImg
          src="images/mob/mob2.png"
          alt="Мобильное приложение"
          sizes="xs:400px md:800px"
          format="webp"
          class="second-block-img my-image"
        />
      </div>
      <div class="mob-app-block-inner third-block">
        <NuxtImg
          src="images/mob/mob3.png"
          alt="Мобильное приложение"
          sizes="xs:400px md:800px"
          format="webp"
          class="third-block-img my-image"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/style.scss";

.my-image {
  height: 100%;
  max-width: 100%;
  object-fit: contain;
  object-position: bottom;
}
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
  background: #f9f9fa;
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

  .first-block,
  .second-block {
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
}

@media screen and (max-width: 761px) {
  .first-block,
  .second-block {
    width: 334px;
  }
}

@media screen and (max-width: 743px) {
  .first-block,
  .second-block {
    width: 100%;
    max-width: 100%;
  }
}

@media screen and (max-width: 400px) {
  .mob-app-block-wrap {
    margin-bottom: 80px;
  }
}
</style>
