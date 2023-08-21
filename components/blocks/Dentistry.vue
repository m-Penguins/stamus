<template>
  <elements-main-info 
  :title="title" 
  :text="text" 
  :imgBg="imgBg" 
  :imgAdaptiv="imgAdaptiv" 
  :breadcrumbs="breadcrumbs"
  />
  <blocks-main-seo 
    :title="titleSeo"
    :text="textSeo"
    :img="imgSeo"      
  />
  <blocks-about-important 
    :arrayText="textAboutImportantArray"
  />
  <blocks-services-block :addresData="addresData"/>
  <blocks-cases-direction :dataDirection="mockArrayDirection"/>
    <BlocksMainBanner 
      :title="'Счастливые часы'"
      :text="'Скидки до 50%'"
      :titleLink="'Воспользоваться акцией'"
      link="#"
      bgColor="dark-blue-gradient"
      img="tooth.png"
      bigImg=true
  />
  <blocks-our-specialists :data="data"/>
  <blocks-main-feedback />
  <blocks-map :dataInfo="infoData"/>
  <blocks-gallery />
  <blocks-main-form />
</template>

<script>
import { useAssets } from '../../stores/useAsset'
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
      titleSeo: {
        type: String,
        default: ''
      },
      textSeo: {
        type: String,
        default: ''
      },
      imgSeo: {
        type: String,
        default: ''
      },
      dataDirection: {
        tpye: Array,
      },
      data: {
        tpye: Array,
      },
      infoData: {
        tpye: Array,
      },
      addresData: {
        tpye: Array,
      },
      breadcrumbs: {
        tpye: Array,
      },
      imgBg: {
        type: String,
        default: ''
      },
      imgAdaptiv: {
        type: String,
        default: ''
      },
    },
    setup() {
      const assetsStore = useAssets();
      const textAboutImportantArray = [
        'Кариес не бывает «детским». Это инфекция, которая может распространиться на постоянные зубы, если не начать лечение молочных зубов',
        'Разрушенные зубы влияют на отношение детей в коллективе',
        'Молочные зубы у детей болят точно так же, как и постоянные у взрослых',
        'Разрушенные и отсутствующие зубы ведут к логопедическим дефектам (нарушается произносительная сторона речи ребенка) и к проблемам с прикусом'
      ]
    const mockArrayDirection = [
    {name: 'Название кейса', category: 'Взрослая стоматология', img:"avatar1.png", description:"Небольшое описание кейса. Сложности и проблемы, с которыми столкнулись" },
    {name: 'Название кейса', category: 'Взрослая стоматология', img:"avatar2.png", description:"Небольшое описание кейса. Сложности и проблемы, с которыми столкнулись" },
    {name: 'Название кейса', category: 'Взрослая стоматология', img:"avatar3.png", description:"Небольшое описание кейса. Сложности и проблемы, с которыми столкнулись" },
    {name: 'Название кейса', category: 'Взрослая стоматология', img:"avatar4.png", description:"Небольшое описание кейса. Сложности и проблемы, с которыми столкнулись" },
    ];
      return {
        assetsStore,
        textAboutImportantArray,
        mockArrayDirection
      }
    }
  }
</script>