<template>
  <div class="container">
    <h1 v-html="title" class="main-title-dark-blue p-bt-30 title"></h1>
    <p v-html="text" class="container-text p-bt-30 text"></p>
    <elements-button-base title="Записаться онлайн"/>
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
  @media screen and (max-width: 900px) {
  .title {
    font-size: 40px;
    line-height: 42px;
  }
  .text {
    font-size: 16px;
  }  
} 
</style>