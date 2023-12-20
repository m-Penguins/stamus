<template>
  <elements-main-info
    title="Информация <br/> для пациентов"
    :imgBg="bigImage"
    :imgAdaptiv="imgAdaptiv"
    :isButtonBase="false"
    :breadcrumbs="[
      {
        title: 'Главная',
        url: '/',
      },
      {
        title: 'Информация для пациентов',
        url: '/info',
      },
    ]"
  />
  <div class="info">
    <h2 class="info-title">Об организации STAMUS</h2>
    <elements-info-accordeon :items="about" />
  </div>
  <div class="info">
    <h2 class="info-title">Дополнительная информация</h2>
    <elements-info-accordeon :items="additionalCards" />
  </div>
  <BlocksMainBanner
    :title="'Наше приложение'"
    :text="'Мы разработали собственное приложение для вашего удобства! Оно есть и на iOS и на Android. Теперь вам не нужно ждать ответа администратора и вы можете записаться на прием самостоятельно! А еще в приложении есть программа лояльности и все актуальные скидки)'"
    :titleLink="'Узнать подробнее'"
    link="/stamusapp"
    bgColor="grey"
    type="true"
    img="mob5.png"
    bigImg="true"
  />
  <blocks-map :block="{ title: 'Информация о клиниках' }" />
  <BlocksMainBanner
    :title="'Уже были у нас?'"
    :text="'Оставьте отзыв, будем очень вам благодарны'"
    :titleLink="'Оставить отзыв'"
    link="/leave-review"
    bgColor="grey"
    type="true"
    img="mobile.svg"
    bigImg="true"
  />
  <blocks-main-form />
</template>

<script setup>
const assetsStore = useAssets();
const bigImage = assetsStore.useAsset("images/big-images/info.png");

const imgAdaptiv = assetsStore.useAsset("images/big-images/info-adaptiv.png");

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;

const { data: infoData } = await useFetch(`${apiBaseUrl}information`, {
  query: {
    populate: "about.*,additional.*",
  },
});

const about = infoData.value?.data?.attributes?.about;

const additional = infoData.value?.data?.attributes?.additional;

const additionalCards = [
  ...additional,
  {
    id: "ndfl",
    title: "Документы на возврат НДФЛ",
  },
];
</script>

<style scoped lang="scss">
@import "../../assets/styles/style.scss";

.info {
  width: 1280px;
  max-width: 100%;
  margin: 0 auto 100px;
}

.info-title {
  @include body-22-medium-Neue;
  color: black;
  padding-bottom: 40px;
}
</style>
