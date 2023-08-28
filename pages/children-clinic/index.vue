<template>
  <elements-main-info 
    :title="title" 
    :text="text" 
    :imgBg="imgBg" 
    :imgAdaptiv="imgAdaptiv" 
    :breadcrumbs="[
        {
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Детская клиника',
          url: '/children-dentistry'
        }
        ]"
  />
  <blocks-seo-with-slider 
    :title="titleSeo"
    :text="textSeo"
    :imagesScroll="imagesScroll"
  />
  <blocks-video-block 
    :title="titleVideo" 
    :text="textVideo"
  />
  <blocks-about-important 
    :arrayText="textAboutImportant"
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
  <blocks-our-specialists :data="mockArray"/>
  <blocks-main-feedback />
  <blocks-map :dataInfo="infoData" text="Контакты"/>
  <blocks-gallery />
  <blocks-main-form />
</template>

<script>
import { useAssets } from '../../stores/useAsset'
import { textAboutImportantArray } from '../../stores/mockData';
  export default {
    props: {
      title: {
        type: String,
        default: 'Детская клиника'
      },
      text: {
        type: String,
        default: 'Небольшое описание в несколько строчек'
      },
      titleVideo: {
        type: String,
        default: 'Продающий заголовок'
      },
      textVideo: {
        type: String,
        default: 'Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены. С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта не даёт нам иного выбора, кроме определения приоретизации разума над эмоциями. Разнообразный и богатый опыт говорит нам, что укрепление и развитие внутренней структуры в значительной степени обусловливает важность системы массового участия.'
      },
      titleSeo: {
        type: String,
        default: 'Описание клиники'
      },
      textSeo: {
        type: String,
        default: 'Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены. С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта не даёт нам иного выбора, кроме определения приоретизации разума над эмоциями. Разнообразный и богатый опыт говорит нам, что укрепление и развитие внутренней структуры в значительной степени обусловливает важность системы массового участия. '
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
      imgBg: {
        type: String,
        default: 'children-clinic.png'
      },
      imgAdaptiv: {
        type: String,
        default: 'children-clinic-adaptiv.png'
      },
    },
    setup() {
      const assetsStore = useAssets();
      const imagesScroll = ['clinic.png', 'clinic.png', 'clinic.png'];
      const textAboutImportant = textAboutImportantArray;
    const mockArrayDirection = [
      {name: 'Название кейса', category: 'Взрослая стоматология', img:"avatar1.png", description:"Небольшое описание кейса. Сложности и проблемы, с которыми столкнулись" },
      {name: 'Название кейса', category: 'Взрослая стоматология', img:"avatar2.png", description:"Небольшое описание кейса. Сложности и проблемы, с которыми столкнулись" },
      {name: 'Название кейса', category: 'Взрослая стоматология', img:"avatar3.png", description:"Небольшое описание кейса. Сложности и проблемы, с которыми столкнулись" },
      {name: 'Название кейса', category: 'Взрослая стоматология', img:"avatar4.png", description:"Небольшое описание кейса. Сложности и проблемы, с которыми столкнулись" },
      ];
    const mockArray = [
      {name: 'Овсоян Григорий', category: 'Челюстно-лицевой хирург', img:"avatar-4.png" },
      {name: 'Унаньян Карина', category: 'Стоматолог-терапевт', img:"avatar-5.png" },
      {name: 'Маашев Магомед', category: 'Стоматолог-хирург', img:"avatar-6.png"},
      {name: 'Шагалова Полина', category: 'Стоматолог', img:"avatar-7.png"},
      ];
      return {
        assetsStore,
        textAboutImportant,
        mockArrayDirection,
        imagesScroll,
        mockArray
      }
    }
  }
</script>