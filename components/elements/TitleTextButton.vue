<template>
  <div class="container">
    <div class="container-bg" :class="{ 'no-bg': $route.path === '/' || $route.path.startsWith('/team/') || $route.path.startsWith('/articles/') }">
      <h1
          v-if="title"
          v-html="title"
          :class="{
        fontSize: fontSize ? 'fontSize' : '',
        typeColorWhiteText: typeColorWhiteText ? 'typeColorWhiteText' : '',
      }"
          class="main-title-dark-blue p-bt-30 title"
      ></h1>
      <p v-if="isCategory" class="title-text-btn-category">
     <span v-for="(item, index) in category" :key="index">
       {{ item.attributes.title }}<span v-if="index < category.length - 1">, </span>
     </span>
      </p>
      <p
          v-if="!!text"
          v-text="text"
          :class="{
        isButtonBase: !isButtonBase ? 'isButtonBase' : '',
        typeColorWhiteText: typeColorWhiteText ? 'typeColorWhiteText' : '',
      }"
          class="container-text p-bt-30 text"
      ></p>
    </div>
    <div v-if="!none_btn" class="title-text-btn-container">
      <elements-button-base
        v-if="isButtonBase"
        class="fontSize4 container-btn"
        :title="textButtonBase"
        @custom-click="customClick"
      />
      <elements-link-with-arrow
        v-if="isLinkWithArrow && textLinkWithArrow"
        type
        :title="textLinkWithArrow"
        :link="link"
        :isExternal="isExternal"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  link: {
    type: String,
    default: "#"
  },
  textButtonBase: {
    type: String,
    default: ""
  },
  textLinkWithArrow: {
    type: String,
    default: ""
  },
  text: {
    type: String,
    default: ""
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
    type: Array,
    default: () => []  // Use function for array/object defaults
  },
  typeColorWhiteText: {
    type: Boolean,
    default: false
  },
  isExternal: {
    type: Boolean,
    default: false
  },
  customClick: Function,
  none_btn: {
    type: Boolean,
    default: false
  }
});

console.log(props.category);
</script>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

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
  width: fit-content;
  // width: 431px;
  max-width: 600px;
  height: 100% !important;
  .container-text {
    @include body-20-regular;
    color: $gray-text;
    padding-bottom: 40px;
    padding-right: 10px;
  }
}

.container-bg {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  width: fit-content;
  &.no-bg {
    background: none;
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
