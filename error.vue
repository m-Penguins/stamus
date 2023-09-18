<template>
  <div class="wrap">
    <TheHeader />
      <div class="error">
        <div class="error-back">
          <div class="error-block">
            <h2 class="error-block__title">{{error.statusCode}}</h2>
            <p class="error-block__text">Мы не смогли ничего найти. Проверьте правильность адреса</p>
            <button class="button-base error-block__btn" @click="$router.push('/')">На главную</button>
          </div>
        </div>
      </div>
    <TheFooter />
  </div>
</template>

<script setup>
  defineProps(['error'])
</script>


<style lang="scss" scoped>
@import "./assets/styles/style.scss";
.wrap {
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  max-height: max-content;
}

.error {
    width: 1880px;
    max-width: 100%;
    margin: 20px auto 0 auto;
    padding: 0 20px;
}

.error-back {
  background: url('/assets/images/error/404.png');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 900px;
  border-radius: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
}

.error-block {
  display: flex;
  flex-direction: column;
  align-items: center;

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

    &__btn {
      color: #232D5B;
      background: #FFF;
      border: 1px solid #FFF;
    }
}

@media (max-width: 1357px) {
  .error-back {
    height: 682px;
    margin-top: 178px;
    margin-bottom: 80px;
  }
}

@media (max-width: 600px) {
  .error-back {
    height: 490px;
    margin-top: 88px;
  }
}

</style>