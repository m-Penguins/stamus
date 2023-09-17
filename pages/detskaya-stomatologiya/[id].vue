<script setup>
import { textAboutImportantArray } from '../../stores/mockData';
import { mockArrayDirection } from '../../stores/mockData'
import { mockArrayServicesCard } from '../../stores/mockData'
import { mockArrayOurSpecialists } from '../../stores/mockData'
const route = useRoute()
const imagesScroll = ['video1.png', 'video2.png', 'video3.png','video3.png','video3.png','video3.png'];
</script>

<template>
  <div>
    <elements-main-info 
      title="Удалить зуб без боли" 
      text="Небольшое описание в несколько строчек" 
      imgBg="removal-tooth.png" 
      imgAdaptiv="removal-tooth.png"
      :isDital=true 
      :breadcrumbs="[
        {
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Детская стоматология',
          url: '/detskaya-stomatologiya'
        },
        {
          title: 'Удалить зуб без боли',
          url: `/detskaya-stomatologiya/${route.params.id}`
        }
    ]"
    />
    <blocks-video-block 
      title="Описание услуги" 
      text="Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены. С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта не даёт нам иного выбора, кроме определения приоретизации разума над эмоциями. Разнообразный и богатый опыт говорит нам, что укрепление и развитие внутренней структуры в значительной степени обусловливает важность системы массового участия."
    />
    <blocks-about-important 
      :arrayText="textAboutImportantArray"
    />
    <blocks-cases-direction text="Похожие работы" :dataDirection="mockArrayDirection"/>
    <div class="container-size popular-service">
      <div class="service-title">
        <h2 class="popular-service__title">Услуги</h2>
        <elements-link-with-arrow type="true" title="Посмотреть все"/>
      </div>
      <div class="popular-service__list">
        <div v-for="(item, index) in mockArrayServicesCard" :key="index">
          <elements-service-card :service="item"/>
        </div>
      </div>
    </div>
    <blocks-main-feedback />
    <blocks-video-slider-block :imagesScroll="imagesScroll" title="Видео"/>
    <BlocksMainBanner 
      :title="'Акция связанная с услугой'"
      :text="'Описание может быть в несколько строчек'"
      :titleLink="'Воспользоваться акцией'"
      link="#"
      @click="isOpenPopup = true"
      bgColor="dark-blue-gradient"
      img="tooth.png"
      bigImg=true
    />
    <blocks-our-specialists title="Наши специалисты" :data="mockArrayOurSpecialists"/>
    <blocks-main-popularServices />
    <blocks-main-articles title="Статьи"/>
    <blocks-map :dataInfo="infoData" text="Контакты"/>
    <blocks-main-form />
  </div>
</template>

<style lang="scss" scoped>
@import '/assets/styles/style.scss';

  .service-title {
    display: flex;
    align-items: baseline;
    gap: 24px;
    padding-bottom: 40px;
  }

  .popular-service {
    padding: 40px 0;

    &__title {
      @include body-22-medium-Neue;
      color: $dark-blue-subtitle;
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

</style>
