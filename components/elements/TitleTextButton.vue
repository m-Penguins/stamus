<template>
  <div class="container">
    <h1 v-html="title" class="main-title-dark-blue p-bt-30"></h1>
    <p v-html="text" class="container-text p-bt-30"></p>
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
</style>