<script setup>
import { mockArrayOurSpecialists } from '../../stores/mockData';
import { mockArrayDirection } from '../../stores/mockData';
import { mockArrayClinic } from '../../stores/mockData';
import { textAboutImportantArray } from '../../stores/mockData';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const route = useRoute()
let mockDate = mockArrayClinic[3]

const item = ref(true);
const checkScreenSize = () => {
  item.value = window.innerWidth <= 1110 ? false : true;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});

const arrayImg = ['gallery6.png', 'gallery5.png', 'gallery4.png']

</script>

<template>
  <elements-main-info 
    :title="mockDate.title" 
    :text="mockDate.titleDescription" 
    imgBg="chelyustno-licevaya-hirurgiya.png" 
    imgAdaptiv="chelyustno-licevaya-hirurgiya-adaptiv.png"
    :typeColorWhite="item"
    :typeColorWhiteText="item"
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
  <blocks-gallery :arrayImg="arrayImg"/>
  <blocks-main-form />
</template>
