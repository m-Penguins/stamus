<template>
  <div class="wrap">
    <TheHeader />
    <div class="error">
      <div class="error-back">
        <NuxtImg
          src="images/error/404.png"
          :alt="imgAlt"
          sizes="xs:400px sm:600px md:1000px lg:1280px xl:1560 xxl:1920px "
          format="webp"
          class="banner-img"
        />
        <div class="error-block">
          <h2 class="error-block__title">{{ error.statusCode }}</h2>
          <p v-if="error.statusCode === 404" class="error-block__text">
            Мы не смогли ничего найти. Проверьте правильность адреса
          </p>
          <p v-if="error.statusCode === 500" class="error-block__text-500">
            К сожалению, наш сервер столкнулся с проблемой и не может выполнить
            ваш запрос в данный момент. Эта ошибка вызвана внутренней проблемой
            нашего сервера, и мы уже работаем над ее устранением.
          </p>
          <button class="button-base error-block__btn" @click="goToMainPage">
            На главную
          </button>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
defineProps(["error"]);

const goToMainPage = () => clearError({ redirect: "/" });
</script>

<style lang="scss" scoped>
@import "./assets/styles/style.scss";

.banner-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 0;

  object-fit: cover;

  filter: brightness(0.7);
}
.wrap {
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  max-height: max-content;
}

.error {
  width: 100%;
  max-width: 100%;
  margin: 20px auto 0 auto;
  padding: 0 20px;
}

.error-back {
  width: 100%;
  height: 900px;
  border-radius: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;

  position: relative;

  overflow: hidden;
}

.error-block {
  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 3;

  &__title {
    @include body-160-medium;
    color: $white;
    padding-bottom: 17px;
  }

  &__text {
    @include body-20-regular;
    color: $white;
    padding-bottom: 40px;
    width: 342px;
    text-align: center;
  }

  &__text-500 {
    @include body-20-regular;
    color: $white;
    padding-bottom: 40px;
    width: 600px;
    max-width: 100%;
    text-align: center;
  }

  &__btn {
    color: #232d5b;
    background: #fff;
    border: 1px solid #fff;
  }
}

@media (min-width: 2560px) {
  .error-back {
    width: 2520px;
    margin: 0 auto;
  }
}

@media (max-width: 1357px) {
  .error-back {
    height: 682px;
    margin-top: 178px;
    background-position: bottom;
  }

  .error-block {
    &__title {
      font-size: 100px;
      line-height: 72px;
    }
    &__text-500 {
      font-size: 18px;
    }

    &__text {
      font-size: 18px;
    }
  }
}

@media (max-width: 900px) {
  .error-block {
    &__title {
      font-size: 40px;
      line-height: 23px;
    }
    &__text-500 {
      font-size: 16px;
      padding-bottom: 30px;
    }

    &__text {
      font-size: 16px;
      padding-bottom: 30px;
    }
  }
}

@media (max-width: 700px) {
  .error-block {
    &__text-500 {
      width: 80%;
    }
  }
}

@media (max-width: 600px) {
  .error-back {
    height: 490px;
    margin-top: 88px;
    margin-bottom: 80px;
  }
}
</style>
