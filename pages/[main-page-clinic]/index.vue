<script setup>
import { mockArrayOurSpecialists } from '../../stores/mockData';
import { mockArrayDirection } from '../../stores/mockData';
import { mockArrayClinic } from '../../stores/mockData';
import { textAboutImportantArray } from '../../stores/mockData';

const route = useRoute()
let mockDate = mockArrayClinic[+route.params.mainpageclinic.charAt(route.params.mainpageclinic.length - 1)]

</script>

<template>
  <elements-main-info 
    :title="mockDate.title" 
    :text="mockDate.titleDescription" 
    :imgBg="mockDate.imgBgTitle" 
    :imgAdaptiv="mockDate.imgAdaptivTitle" 
    :breadcrumbs="[
        {
          title: 'Главная',
          url: '/'
        },
        {
          title: `${mockDate.title}`,
          url: `${route.params.mainpageclinic}`
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
  <blocks-our-specialists :data="mockArray"/>
  <blocks-main-feedback />
  <blocks-map :dataInfo="infoData" title="Контакты"/>
  <blocks-gallery />
  <blocks-main-form />
</template>
