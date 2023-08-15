<template>
  <div class="container" :class="fontSize ? 'fontSize3' : 'container'">
    <h1 v-html="title" :class="fontSize ? 'fontSize' : 'title'" class="main-title-dark-blue p-bt-30 title"></h1>
    <p v-html="text" :class="fontSize ? 'fontSize1' : 'text'" class="container-text p-bt-30 text"></p>
    <elements-button-base class="fontSize4" title="Записаться онлайн"/>
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
    .fontSize {
      font-size: 40px;
      line-height: 43px;
      padding-bottom: 14px;
    }
    .fontSize1 {
      font-size: 18px;
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

    .fontSize3 {
      width: 40%;
    }

    .fontSize {
      font-size: 22px;
      line-height: initial;
    }
    .fontSize1 {
      font-size: 16px;
    }
} 

    @media (max-width: 600px) {
      .fontSize3 {
        width: 100%;
     }
     .fontSize4 {
      width: 100%;
     }
  }
</style>