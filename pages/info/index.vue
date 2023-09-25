<template>
  <elements-main-info 
    title="Информация <br/> для пациентов" 
    imgBg="info.png" 
    imgAdaptiv="info-adaptiv.png" 
    :isButtonBase="false"
    :breadcrumbs="[
        {
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Информация для пациентов',
          url: '/info'
        }
        ]"
  />
  <div class="info">
    <h2 class="info-title">Об организации STAMUS</h2>
    <blocks-info-block/>
  </div>
  <div class="info">
    <h2 class="info-title">Дополнительная информация</h2>
    <blocks-info-dop-block :optionsData="options" :optionsDoc="optionsDoc"/>
  </div>
  <BlocksMainBanner 
    :title="'Наше приложение'"
    :text="'Мы разработали собственное приложение для вашего удобства! Оно есть и на iOS и на Android. Теперь вам не нужно ждать ответа администратора и вы можете записаться на прием самостоятельно! А еще в приложении есть программа лояльности и все актуальные скидки)'"
    :titleLink="'Узнать подробнее'"
    link="#"
    bgColor="grey"
    type="true"
    img="mob5.png"
    bigImg=true
  />
  <blocks-map :dataInfo="infoData" text="Информация о клиниках"/>
  <BlocksMainBanner 
    :title="'Уже были у нас?'"
    :text="'Оставьте отзыв, будем очень вам благодарны'"
    :titleLink="'Оставить отзыв'"
    link="#"
    bgColor="grey"
    type="true"
    img="mobile.svg"
    bigImg=true
  />
  <blocks-main-form />
</template>

<script>
import { mockInfoMain } from '../../stores/mockData';
  export default {
    setup() {
      const options = [
        { name: 'Получаю справку за себя'},
        { name: 'Получаю справку за ребенка'},
        { name: 'Получаю справку за супруга(-и)'},
        { name: 'Получаю справку за родителя'},
      ]
      const optionsDoc = [
        { name: 'Заберу справку на Хакурате 34'},
        { name: 'Заберу справку на Гимназическая 85'},
        { name: 'Заберу справку на Московская 140'},
        { name: 'Заберу справку на Мачуги 1/1'},
        { name: 'Заберу справку на Платановом бульваре 19/3'},
        { name: 'Прислать на почту'},
      ]
      return {
        mockInfoMain,
        options,
        optionsDoc
      }
    }
  }
</script>

<style scoped lang="scss">
@import '../../assets/styles/style.scss';

.info {
  width: 1280px;
  max-width: 100%;
  margin: 0 auto 100px;
}

.info-title {
  @include body-22-medium-Neue ;
  color: black;
  padding-bottom: 40px;
}

</style>