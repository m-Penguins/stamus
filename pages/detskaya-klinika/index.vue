<script setup>
import { mockArrayOurSpecialists } from '../../stores/mockData';
import { mockArrayDirection } from '../../stores/mockData';
import { mockArrayClinic } from '../../stores/mockData';
import { textAboutImportantArray } from '../../stores/mockData';

const route = useRoute()
let mockDate = mockArrayClinic[2]

const assetsStore = useAssets();
const bigImage = assetsStore.useAsset("images/big-images/children-clinic.png");

const imgAdaptiv = assetsStore.useAsset(
  "images/big-images/children-clinic-adaptiv.png",
);

</script>

<template>
  <elements-main-info 
    :title="mockDate.title" 
    :text="mockDate.titleDescription" 
    :imgBg="bigImage" 
    :imgAdaptiv="imgAdaptiv" 
    :breadcrumbs="[
        {
          title: 'Главная',
          url: '/'
        },
        {
          title: `${mockDate.title}`,
          url: `${route.href}`
        }
        ]"
  />
  <blocks-seo-with-slider 
    :title="mockDate.descriptionClinicTitle"
    :text="mockDate.descriptionClinicText"
    :imagesScroll="mockDate.descriptionClinicSliderImgs"
  />
  <blocks-video-block 
    :title="mockDate.videoBlockTitle" 
    :text="mockDate.videoBlockText"
  />
  <blocks-about-important 
    :arrayText="textAboutImportantArray"
  />
  <blocks-services-block :addresData="addresData"/>
  <blocks-cases-direction text="Кейсы по направлению" :dataDirection="mockArrayDirection"/>
    <BlocksMainBanner 
      :title="'Счастливые часы'"
      :text="'Скидки до 50%'"
      :titleLink="'Воспользоваться акцией'"
      link="#"
      bgColor="dark-blue-gradient"
      img="tooth.png"
      bigImg=true
  />
  <blocks-our-specialists title="Наши специалисты" :data="mockArrayOurSpecialists"/>
  <blocks-main-feedback />
  <blocks-map :dataInfo="infoData" text="Контакты"/>
  <blocks-gallery :arrayImg="arrayImg2"/>
  <blocks-main-form />
</template>
