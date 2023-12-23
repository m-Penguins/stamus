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

const firstBanner = mainData.value?.data?.attributes?.first_banner;
const secondBanner = mainData.value?.data?.attributes?.second_banner;
const thirdBanner = mainData.value?.data?.attributes?.third_banner;
const fourthBanner = mainData.value?.data?.attributes?.fourth_banner;

const reviews = mainData.value?.data?.attributes;

const mainSpecialists =
  mainData.value?.data?.attributes?.specialists?.data?.map((sp) => {
    return {
      id: sp?.id,
      name: `${sp?.attributes?.firstName} ${sp?.attributes?.lastName}`,
      category: sp?.attributes?.position,
      img: sp?.attributes?.fotoSpecialist?.data?.attributes?.formats?.thumbnail
        ?.url
        ? baseUrl +
          sp?.attributes?.fotoSpecialist?.data?.attributes?.formats?.thumbnail
            ?.url
        : assetsStore.useAsset("images/icons/logo.svg"),
      imgBig: sp?.attributes?.fotoSpecialist?.data?.attributes?.url
        ? baseUrl + sp?.attributes?.fotoSpecialist?.data?.attributes?.url
        : assetsStore.useAsset("images/icons/logo.svg"),
      experience: {
        year: sp?.attributes?.meetingPerson?.dataMeeting?.[0]?.total,
        text: sp?.attributes?.meetingPerson?.dataMeeting?.[0]?.item,
      },
      review: {
        year: sp?.attributes?.meetingPerson?.dataMeeting?.[1]?.total,
        text: sp?.attributes?.meetingPerson?.dataMeeting?.[1]?.item,
      },
      consultation: {
        year: sp?.attributes?.meetingPerson?.dataMeeting?.[2]?.total,
        text: sp?.attributes?.meetingPerson?.dataMeeting?.[2]?.item,
      },
    };
  });

console.log(mainData.value);

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

  <section class="section-wrapper">
    <BlocksMyBanner :block="firstBanner" />
  </section>

  <blocks-main-areas />

  <blocks-main-specialists :mainSpecialists="mainSpecialists" />

  <section class="section-wrapper">
    <BlocksMyBanner :block="secondBanner" />
  </section>
  <blocks-main-popularServices />

  <section class="section-wrapper">
    <BlocksMyBanner :block="thirdBanner" />
  </section>

  <section class="section-wrapper">
    <DynamicBlockReviews :block="reviews" />
  </section>

  <section class="section-wrapper">
    <BlocksMyBanner :block="fourthBanner" />
  </section>
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

.section-wrapper {
  width: 100%;
  max-width: 1280px;

  margin: 0 auto 100px;

  @include media(680px) {
    margin: 0 auto 80px;
  }
}
</style>
