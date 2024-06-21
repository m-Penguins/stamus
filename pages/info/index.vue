<template>
  <elements-main-info
    title="Информация <br/> для пациентов"
    :imgBg="bigImage"
    imgAlt="Информация для пациентов"
    local
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
    <h2 class="info-title">Об организациях Стамус и СтамусМед</h2>
    <elements-info-accordeon :items="about" />
  </div>
  <div class="info">
    <h2 class="info-title">Дополнительная информация</h2>
    <elements-info-accordeon :items="additionalCards" />
  </div>
  <BlocksMainBanner
    :title="'Наше приложение'"
    :text="'Мы разработали собственное приложение для вашего удобства! Оно есть и на iOS и на Android. Теперь вам не нужно ждать ответа оператора и вы можете записаться на прием самостоятельно! А еще в приложении есть история визитов, информация об акциях и можно ознакомиться с документацией клиники'"
    :titleLink="'Узнать подробнее'"
    link="/stamusapp"
    bgColor="grey"
    type
    img="phone12.png"
    bigImg="true"
  />
  <blocks-map :block="{ title: 'Информация о клиниках' }" />
  <BlocksMainBanner
    :title="'Уже были у нас?'"
    :text="'Оставьте отзыв, будем очень вам благодарны'"
    :titleLink="'Оставить отзыв'"
    link="/leave-review"
    bgColor="grey"
    type
    img="baloons.png"
    bigImg="true"
  />
  <blocks-main-form />
</template>

<script setup>
const assetsStore = useAssets();
const bigImage = "images/big-images/info.jpg";
const route = useRoute();
const imgAdaptiv = assetsStore.useAsset("images/big-images/info-adaptiv.jpg");

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;

const { data: infoData } = await useFetch(`${apiBaseUrl}information`, {
  query: {
    populate: "about.*,additional.*",
  },
});

const about = infoData.value?.data?.attributes?.about;

const additionalCards = infoData.value?.data?.attributes?.additional;

useHead({
  title: "Информация для пациентов стоматологии Стамус в Краснодаре",
  meta: [
    {
      name: "twitter:title",
      content: "Информация для пациентов стоматологии Стамус в Краснодаре",
    },
    {
      property: "og:title",
      content: "Информация для пациентов стоматологии Стамус в Краснодаре",
    },
    {
      name: "description",
      content:
        "Информация для пациентов стоматологии Стамус: режим работы, правила внутреннего распорядка, прайс, и другая информация об организации.",
    },
    {
      name: "twitter:description",
      content:
        "Информация для пациентов стоматологии Стамус: режим работы, правила внутреннего распорядка, прайс, и другая информация об организации.",
    },
    {
      property: "og:description",
      content:
        "Информация для пациентов стоматологии Стамус: режим работы, правила внутреннего распорядка, прайс, и другая информация об организации.",
    },
    // {
    //   name: "keywords",
    //   content:
    //     "ндфл стамус, ндфл стамусмед, налоговый вычет за лечение зубов, налоговый вычет стамус, налоговый вычет стамусмед, налоговый вычет имплантация",
    // },
  ],
  link: [{ rel: "canonical", href: "https://stamus.ru" + route.path }],
});
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
