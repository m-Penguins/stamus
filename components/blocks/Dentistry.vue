<template>
  <elements-main-info
    :title="title"
    :text="text"
    :imgBg="imgBg"
    :imgAdaptiv="imgAdaptiv"
    :breadcrumbs="breadcrumbs"
  />
  <blocks-main-seo :title="titleSeo" :text="textSeo" :img="imgSeo" />
  <blocks-about-important :arrayText="textAboutImportant" />
  <blocks-services-block :addresData="addresData" />
  <blocks-cases-direction
    text="Кейсы по направлению"
    :dataDirection="dataDirection"
  />
  <BlocksMainBanner
    :title="'Счастливые часы'"
    :text="'Скидки до 50%'"
    :titleLink="'Воспользоваться акцией'"
    link="#"
    bgColor="dark-blue-gradient"
    img="tooth.png"
    bigImg="true"
  />
  <blocks-our-specialists title="Наши специалисты" :data="data" />
  <blocks-main-feedback />
  <blocks-map />
  <blocks-gallery />
  <blocks-main-form />
</template>

<script>
import { useAssets } from "../../stores/useAsset";
import { textAboutImportantArray } from "../../stores/mockData";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    titleSeo: {
      type: String,
      default: "",
    },
    textSeo: {
      type: String,
      default: "",
    },
    imgSeo: {
      type: String,
      default: "",
    },
    dataDirection: {
      type: Array,
    },
    data: {
      type: Array,
    },
    infoData: {
      type: Array,
    },
    addresData: {
      type: Array,
    },
    breadcrumbs: {
      type: Array,
    },
    imgBg: {
      type: String,
      default: "",
    },
    imgAdaptiv: {
      type: String,
      default: "",
    },
  },
  setup() {
    const assetsStore = useAssets();
    const textAboutImportant = textAboutImportantArray;
    const mockArrayDirection = [
      {
        name: "Название кейса",
        category: "Взрослая стоматология",
        img: "avatar1.png",
        description:
          "Небольшое описание кейса. Сложности и проблемы, с которыми столкнулись",
      },
      {
        name: "Название кейса",
        category: "Взрослая стоматология",
        img: "avatar2.png",
        description:
          "Небольшое описание кейса. Сложности и проблемы, с которыми столкнулись",
      },
      {
        name: "Название кейса",
        category: "Взрослая стоматология",
        img: "avatar3.png",
        description:
          "Небольшое описание кейса. Сложности и проблемы, с которыми столкнулись",
      },
      {
        name: "Название кейса",
        category: "Взрослая стоматология",
        img: "avatar4.png",
        description:
          "Небольшое описание кейса. Сложности и проблемы, с которыми столкнулись",
      },
    ];
    return {
      assetsStore,
      textAboutImportant,
      mockArrayDirection,
    };
  },
};
</script>
