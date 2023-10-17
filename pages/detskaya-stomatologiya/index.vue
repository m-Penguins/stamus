<script setup>
const route = useRoute();
let mockDate = mockArrayClinic[1];

const assetsStore = useAssets();
const bigImageMock = assetsStore.useAsset("images/big-images/girl.png");

const imgAdaptiveMock = assetsStore.useAsset(
  "images/big-images/girl-adaptiv.png",
);

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const { data: clinicData } = await useFetch(
  `${apiBaseUrl}${route.path?.slice(1)}`,
  {
    query: {
      populate:
        "specialists.fotoSpecialist.*,infoBlock.image.*,infoBlock.video.*,photoBanner.*,reviews.*,portofolios.photoBanner.*,tagsImportant.*,descriptionBlock.image.*,gallery.*,price_lists.servicePrice.*",
    },
  },
);

if (!clinicData?.value?.data) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const mainInfo = clinicData?.value?.data?.attributes;

const mainBigImg = mainInfo?.photoBanner?.data?.attributes?.url
  ? baseUrl + mainInfo?.photoBanner?.data?.attributes?.url
  : bigImageMock;

const mainAdaptiveImg = mainInfo?.photoBanner?.data?.attributes?.formats?.small
  ?.url
  ? baseUrl + mainInfo?.photoBanner?.data?.attributes?.formats?.small?.url
  : imgAdaptiveMock;

const descriptionBlock = clinicData?.value?.data?.attributes?.descriptionBlock;
const descriptionImages = descriptionBlock?.image?.data
  ?.map((img) =>
    img?.attributes?.formats?.medium?.url
      ? baseUrl + img?.attributes?.formats?.medium?.url
      : "",
  )
  .filter(Boolean);

const infoBlock = mainInfo?.infoBlock;
const infoBlockImage = infoBlock?.image?.data?.attributes?.formats?.small?.url
  ? baseUrl + infoBlock?.image?.data?.attributes?.formats?.small?.url
  : "";
const infoBlockVideo = infoBlock?.video?.data?.attributes?.url
  ? baseUrl + infoBlock?.video?.data?.attributes?.url
  : "";

const priceList = mapPriceList(
  clinicData?.value?.data?.attributes?.price_lists?.data,
);

const tagsImportant = clinicData?.value?.data?.attributes?.tagsImportant
  ?.split("|")
  ?.filter(Boolean);

const specialists = clinicData?.value?.data?.attributes?.specialists?.data;

const reviews = mapReviews(clinicData?.value?.data?.attributes?.reviews?.data);

const portfolios = clinicData?.value?.data?.attributes?.portofolios?.data?.map(
  (p) => {
    return {
      id: p?.id,
      name: p?.attributes?.heading,
      category: p?.attributes?.direction?.directions,
      description: p?.attributes?.description,
      img: p?.attributes?.photoBanner?.data?.attributes?.url
        ? baseUrl + p?.attributes?.photoBanner?.data?.attributes?.url
        : assetsStore.useAsset("images/no-photo.png"),
    };
  },
);

const galleryList = clinicData?.value?.data?.attributes?.gallery?.data
  ?.map((img) =>
    img?.attributes?.formats?.medium?.url
      ? baseUrl + img?.attributes?.formats?.medium?.url
      : "",
  )
  ?.filter(Boolean);
</script>

<template>
  <elements-main-info
    :title="mainInfo?.heading"
    :text="mainInfo?.description"
    :imgBg="mainBigImg"
    :imgAdaptiv="mainAdaptiveImg"
    :breadcrumbs="[
      {
        title: 'Главная',
        url: '/',
      },
      {
        title: `${mainInfo?.heading}`,
        url: `${route.href}`,
      },
    ]"
  />
  <blocks-seo-with-slider
    v-if="descriptionBlock?.titlle"
    :title="descriptionBlock?.titlle"
    :text="descriptionBlock?.text"
    :imagesScroll="descriptionImages"
  />

  <blocks-video-block
    v-if="infoBlock?.heading"
    :title="infoBlock?.heading"
    :text="infoBlock?.text"
    :link="infoBlock?.link"
    :problemImg="infoBlockImage"
    :video="infoBlockVideo"
    :videoThumbnail="infoBlockImage"
  />
  <blocks-about-important
    v-if="tagsImportant?.length > 0"
    :arrayText="tagsImportant"
  />

  <!-- <blocks-services-block :addresData="priceList" /> -->

  <div class="container-size popular-service" v-if="priceList?.length > 0">
    <div class="service-title">
      <h2 class="popular-service__title">Услуги</h2>
      <elements-link-with-arrow
        type="true"
        link="/prices"
        title="Посмотреть все"
      />
    </div>
    <div v-for="service in priceList" class="popular-service__list">
      <h2 class="popular-service__title">{{ service.title }}</h2>
      <div v-for="(item, index) in service.services" :key="index">
        <elements-service-card :service="item" />
      </div>
    </div>
  </div>

  <blocks-cases-direction
    v-if="portfolios?.length > 0"
    text="Кейсы по направлению"
    :dataDirection="portfolios"
  />

  <BlocksMainBanner
    :title="'Счастливые часы'"
    :text="'Скидки до 50%'"
    :titleLink="'Воспользоваться акцией'"
    link="/discounts/schastlivye-chasy"
    bgColor="dark-blue-gradient"
    img="tooth.png"
    bigImg="true"
  />

  <blocks-our-specialists
    v-if="specialists?.length"
    title="Наши специалисты"
    :data="specialists"
  />

  <blocks-main-feedback :reviews="reviews" />

  <blocks-map :dataInfo="infoData" text="Контакты" />

  <blocks-gallery v-if="galleryList?.length > 0" :arrayImg="galleryList" />

  <blocks-main-form />
</template>

<style lang="scss">
@import "@/assets/styles/style.scss";

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
