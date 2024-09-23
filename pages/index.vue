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
        "two_directions.photoBanner.*,first_banner.banner.image.*,second_banner.banner.image.*,third_banner.banner.image.*,fourth_banner.banner.image.*,meta.metaImage.*,articles.fotoArticles.*,reviews.*,specialists.fotoSpecialist.*,seo_block.image.*,portfolio.*,portfolio.photoBanner.* ",
    },
  }),
  useFetch(`${apiBaseUrl}main-derections`, {
    query: { populate: "photoBanner.*", sort: "order:asc" },
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
const portfolios = mainData.value?.data?.attributes?.portfolio?.data;


const mainSpecialists =
  mainData.value?.data?.attributes?.specialists?.data?.map((sp) => {
    return {
      id: sp?.id,
      name: `${sp?.attributes?.firstName} ${sp?.attributes?.lastName}`,
      category: sp?.attributes?.position,
      img: sp?.attributes?.fotoSpecialist?.data?.attributes?.url,
      alt: sp?.attributes?.fotoSpecialist?.data?.attributes?.alternativeText,
      description: sp?.attributes?.description,
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

const seoData = mainData.value?.data?.attributes?.seo_block;

const articles = mainData.value?.data?.attributes?.articles;

const metaData = mainData.value?.data?.attributes?.meta;
useHead(getMetaObject(metaData, baseUrl));
</script>

<template>
  <blocks-main-primary-banner
    :title="mainTitle"
    :description="description"
    :twoDirections="twoDirections"
  />

  <section class="section-wrapper" v-if="firstBanner">
    <DynamicBlockBanner :block="firstBanner" />
  </section>

  <blocks-main-areas :directions-data="directionsData" />

  <blocks-main-specialists
    v-if="mainSpecialists?.length"
    :mainSpecialists="mainSpecialists"
  />

  <section class="section-wrapper" v-if="secondBanner">
    <DynamicBlockBanner :block="secondBanner" />
  </section>

  <blocks-main-popularServices />

  <section class="section-wrapper">
    <DynamicBlockCompanyRating />
  </section>

  <section class="section-wrapper" v-if="thirdBanner">
    <DynamicBlockBanner :block="thirdBanner" />
  </section>

  <section class="section-wrapper" v-if="reviews">
    <DynamicBlockReviews :block="reviews" />
  </section>

  <section class="section-wrapper" v-if="reviews">
    <ElementsSliderCasesDirection :programs="portfolios" />
  </section>

  <section class="section-wrapper" v-if="fourthBanner">
    <DynamicBlockBanner :block="fourthBanner" />
  </section>

  <section class="section-wrapper" v-if="articles?.data?.length">
    <DynamicBlockBlog :block="{ articles: articles }" />
  </section>
  <section class="section-wrapper" v-if="seoData">
    <DynamicBlockSeo :block="seoData" />
  </section>
  <LazyBlocksMap />
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
