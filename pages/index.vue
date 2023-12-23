<script setup>
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const baseDataStore = useBaseDataStore();

const clinicsNumber = baseDataStore.clinics?.data?.length;

const mainTitle = `${clinicsNumber} клиник СТАМУС в Краснодаре`;

const [{ data: mainData }, { data: directionsData }] = await Promise.all([
  useFetch(`${apiBaseUrl}glavnaya`, {
    query: {
      populate:
        "two_directions.photoBanner.*,first_banner.banner.image.*,second_banner.banner.image.*,third_banner.banner.image.*,fourth_banner.banner.image.*,meta.metaImage.*,articles.fotoArticles.*,reviews.*,specialists.fotoSpecialist.*",
    },
  }),
  useFetch(`${apiBaseUrl}main-derections`, {
    query: { populate: "photoBanner.*" },
  }),
]);

const description = mainData.value?.data?.attributes?.description;

const twoDirections =
  mainData.value?.data?.attributes?.two_directions?.data?.slice(0, 2);

console.log(twoDirections);

const metaData = mainData.value?.data?.attributes?.meta;
useHead(getMetaObject(metaData, baseUrl));

// useHead({
//   title:
//     "Стоматология Стамус в Краснодаре. Семейная стоматология в вашем районе для взрослых и детей",
//   meta: [
//     {
//       name: "twitter:title",
//       content:
//         "Стоматология Стамус в Краснодаре. Семейная стоматология в вашем районе для взрослых и детей",
//     },
//     {
//       property: "og:title",
//       content:
//         "Стоматология Стамус в Краснодаре. Семейная стоматология в вашем районе для взрослых и детей",
//     },
//     {
//       name: "description",
//       content:
//         "Стамус - это сеть стоматологий в Краснодаре зарекомендовавшая себя с 2006 года. Семейная стоматология для взрослых и детей с отличными отзывами. Записаться",
//     },
//     {
//       name: "twitter:description",
//       content:
//         "Стамус - это сеть стоматологий в Краснодаре зарекомендовавшая себя с 2006 года. Семейная стоматология для взрослых и детей с отличными отзывами. Записаться",
//     },
//     {
//       property: "og:description",
//       content:
//         "Стамус - это сеть стоматологий в Краснодаре зарекомендовавшая себя с 2006 года. Семейная стоматология для взрослых и детей с отличными отзывами. Записаться",
//     },
//     {
//       name: "keywords",
//       content:
//         "стоматология, стоматология в Краснодаре, семейная стоматология,стоматология стамус, стамус, взрослая стоматология",
//     },
//   ],
// });
</script>

<template>
  <blocks-main-primary-banner
    :title="mainTitle"
    :description="description"
    :twoDirections="twoDirections"
  />

  <BlocksMainBanner
    :title="'Лечим не только зубы'"
    :text="'Многопрофильная детская клиника Стамусу на Юбилейном'"
    :titleLink="'Узнать подробнее'"
    link="/detskaya-klinika"
    bgColor="light-blue-gradient"
    type="true"
    img="girl.png"
  />

  <blocks-main-areas />
  <blocks-main-specialists :mainSpecialists="mainSpecialists" />
  <BlocksMainBanner
    :title="'Добровольное медицинское страхование'"
    :text="'Работаем с большинством страховых компаний России.'"
    :titleLink="'Узнать подробнее'"
    link="#"
    bgColor="light-blue"
    type="true"
    img="cards2.png"
    bigImg="true"
    :handleLinkClick="openBidModal"
  />
  <blocks-main-popularServices />
  <BlocksMainBanner
    :selectedText="true"
    :text="'Независимый всеройсийский портал Продокторов'"
    :titleLink="'Записаться онлайн'"
    link="https://app.1denta.ru/booking/booking?orgid=11074&roistat_visit=282247#/network"
    bgColor="blue-gradient"
    img="mobile.svg"
    bigImg="true"
  />
  <blocks-main-feedback :reviews="reviews" />
  <BlocksMainBanner
    :title="'Лучшая детская стоматология'"
    :text="'среди частных детских стоматологий Краснодара по версии экспертного журнала Startsmile при поддержке ИД “КоммерстантЪ”'"
    :additionalText="' *1 место в рейтинге детских стоматологических клиник Краснодара за 2022 (клиники, которым более 3-х лет)'"
    :titleLink="'Узнать подробнее'"
    link="/detskaya-stomatologiya"
    bgColor="dark-red"
    img="image.png"
  />
  <DynamicBlockBlog :block="articles" />

  <blocks-main-seo
    title="Стоматология Стамус в Краснодаре это"
    text="<ul>
    <li>- Более 100 врачей</li>
    <li>- 17 лет работы и непрерывного роста</li>
    <li>- Самое большое детское стоматологическое отделение в городе</li>
    <li>- Первая частная челюстно-лицевая хирургия в Краснодаре.</li>
  </ul>
  <br/>
  <p>Наши операторы открыто расскажут о ценах и услугах, и это не будет отличаться от информации в клиниках. Стоимость услуг включает в себя анестезию, прицельные снимки, снятие швов и др.</p>
  <br/>
  <p>В «Стамус» обслуживается ежегодно 50 тысяч пациентов. Тщательный контроль, стандарты и протоколы позволяют проводить эффективное лечение пациентов.</p>
  "
    img="rectangle.png"
  />
  <blocks-main-form />
</template>

<style lang="scss" scoped>
@import "../assets/styles/style.scss";
</style>
