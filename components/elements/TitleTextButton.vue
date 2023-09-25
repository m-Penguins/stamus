<template>
  <div class="container">
    <h1 v-html="title" :class="{'fontSize':  fontSize ? 'fontSize' : '', 'typeColorWhiteText': typeColorWhiteText ? 'typeColorWhiteText' : ''}" class="main-title-dark-blue p-bt-30 title"></h1>
    <p v-if="isCategory" v-html="category" class="title-text-btn-category"></p>
    <p v-if="text" v-html="text" :class="{'isButtonBase': !isButtonBase ? 'isButtonBase' : 'container-text', 'typeColorWhiteText': typeColorWhiteText ? 'typeColorWhiteText' : ''}" class="container-text p-bt-30 text"></p>
    <div class="title-text-btn-container">
      <elements-button-base v-if="isButtonBase" class="fontSize4 container-btn" :title="textButtonBase" @custom-click="customClick"/>
      <elements-link-with-arrow v-if="isLinkWithArrow" type="true" :title="textLinkWithArrow"/>
    </div>
  </div>
</template>

<script>
import ElementsLinkWithArrow from './ElementsLinkWithArrow.vue'
  export default {
  components: { ElementsLinkWithArrow },
    props: {
      title: {
        type: String,
        default: ''
      },
      textButtonBase: {
        type: String,
        default: ''
      },
      textLinkWithArrow: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      fontSize: {
        type: Boolean,
        default: true
      },
      isButtonBase: {
        type: Boolean,
        default: true
      },
      isLinkWithArrow: {
        type: Boolean,
        default: false
      },
      isCategory: {
        type: Boolean,
        default: false
      },
      category: {
        type: String,
        default: ''
      },
      typeColorWhiteText: {
        type: Boolean,
        default: false
      },
      customClick: Function
    }
  }
</script>

<style scoped lang="scss">
@import '/assets/styles/style.scss';

.typeColorWhiteText {
  color: white !important;
}

.title-text-btn-category {
  padding-bottom: 30px;
  // margin-top: -20px;
  @include body-16-regular;
  opacity: 0.7;
  color: $gray-text;
}

.title-text-btn-container {
  display: flex;
  gap: 20px;
}

.container {
  // width: 431px;
  width: 481px;

  .container-text {
    @include body-20-regular;
    color: $gray-text;
    padding-bottom: 40px;
    padding-right: 10px;
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
  .title-text-btn-container {
    flex-wrap: wrap;
  }
}

@media screen and (max-width: 900px) {
  .title {
    font-size: 40px;
    line-height: 42px;
  }
  .container {
    // width: 50%;
    width: auto;
    .container-text {
      font-size: 16px;
    }
  }

  .fontSize {
    font-size: 22px;
    line-height: 27px;
    padding-bottom: 14px;
  }
} 

@media (max-width: 600px) {
  .container {
    width: 100%;
  }
  .isButtonBase {
    // padding-bottom: 0 !important;
  }
  .fontSize {
    padding-bottom: 14px;
  }
  .title-text-btn-category {
    padding-bottom: 14px;
  }
}
</style>