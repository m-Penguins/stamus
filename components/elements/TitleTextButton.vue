<template>
  <div class="container">
    <h1 v-html="title" :class="fontSize ? 'fontSize' : 'title'" class="main-title-dark-blue p-bt-30 title"></h1>
    <p v-html="text" :class="!isButtonBase ? 'isButtonBase' : 'container-text'" class="container-text p-bt-30 text"></p>
    <elements-button-base v-if="isButtonBase" class="fontSize4 container-btn" title="Записаться онлайн" />
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      fontSize: {
        type: String,
        default: ''
      },
      isButtonBase: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped lang="scss">
@import '/assets/styles/style.scss';


  .container {
    width: 431px;

    .container-text {
      @include body-20-regular;
      color: $gray-text;
      padding-bottom: 40px;
    }
  }
  @media screen and (max-width: 1290px) {
    .title {
      font-size: 50px;
    }
  }

  @media screen and (max-width: 1096px) {
    .container-btn {
      width: 100%;
    }
  }

  @media screen and (max-width: 900px) {
    .title {
      font-size: 40px;
      line-height: 42px;
    }
    .container {
      width: 50%;
      .container-text {
        font-size: 16px;
      }
    }

    .fontSize {
      font-size: 22px;
      line-height: initial;
      padding-bottom: 14px;
    }
} 

  @media (max-width: 600px) {
    .container {
      width: 100%;
    }
    .isButtonBase {
      padding-bottom: 0 !important;
    }
}
</style>