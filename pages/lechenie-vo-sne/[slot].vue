<script setup>
import { textAboutImportantArray } from "../../stores/mockData";
import { mockArrayDirection } from "../../stores/mockData";
import { mockArrayServicesCard } from "../../stores/mockData";
import { mockArrayOurSpecialists } from "../../stores/mockData";
const imagesScroll = [
  "video1.png",
  "video2.png",
  "video3.png",
  "video3.png",
  "video3.png",
  "video3.png",
];
const route = useRoute();
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const assetsStore = useAssets();
const storeServices = useService();
if (!storeServices?.getAllServicesArray?.length) {
  await storeServices.fetchdataService(apiBaseUrl);
}
const serviceId = storeServices.getAllServicesArray.find((el) =>
  el.path.includes(route.params.slot),
).id;

const [
  { data: serviceData },
  { data: serviceDataDeep },
  { data: articlesData },
] = await Promise.all([
  useFetch(
    `${apiBaseUrl}services/${serviceId}?populate=reviews.*,clinics.*,price_lists.*,photoBanner.*,direction.*,specialists.fotoSpecialist.*,articles.*,infoBlock.image.*,infoBlock.video.*`,
  ),
  useFetch(`${apiBaseUrl}services/${serviceId}?populate=deep`),
  useFetch(`${apiBaseUrl}articles?populate=deep&pagination[pageSize]=8`),
]);

const infoBlock = serviceData?.value?.data?.attributes?.infoBlock;
const infoBlockImage = infoBlock?.image?.data?.attributes?.formats?.small?.url
  ? baseUrl + infoBlock?.image?.data?.attributes?.formats?.small?.url
  : "";
const infoBlockVideo = infoBlock?.video?.data?.attributes?.url
  ? baseUrl + infoBlock?.video?.data?.attributes?.url
  : "";
const tagsImportant =
  serviceData?.value?.data?.attributes?.tagsImportant?.split(" | ");

const directionLabel = route.path.split("/").filter(Boolean)[0];
const similarServicesArray = storeServices.getServicesGroupExcluded(serviceId);
const similarServices = similarServicesArray?.map((service) => {
  return {
    name: service?.attributes?.heading,
    category: service?.attributes?.direction,
    description: service?.attributes?.description,
    img: service?.attributes?.photoBanner?.data?.attributes?.url
      ? baseUrl + service?.attributes?.photoBanner?.data?.attributes?.url
      : assetsStore.useAsset("images/no-photo.png"),
    link: `/${linkTransform(service?.attributes?.category)}${service?.path}`,
  };
});

const priceList = mapPriceList(
  serviceDataDeep?.value?.data?.attributes?.price_lists?.data,
);

const reviews = mapReviews(serviceData?.value?.data?.attributes?.reviews?.data);

const specialists = serviceData?.value?.data?.attributes?.specialists?.data;

const articles = articlesData?.value?.data?.map((art) => {
  return {
    id: art?.id,
    heading: art?.attributes?.heading,
    img: art?.attributes?.fotoArticles?.data?.attributes?.url
      ? baseUrl + art?.attributes?.fotoArticles?.data?.attributes?.url
      : assetsStore.useAsset("images/articles/articles-dital.png"),
    text: art?.attributes?.text,
    tags: art?.attributes?.tags,
  };
});
</script>

<template>
  <div>
    <elements-main-info
      :title="serviceData?.data?.attributes?.heading"
      :text="serviceData?.data?.attributes?.description"
      :imgBg="
        serviceData?.data?.attributes?.photoBanner?.data?.attributes?.url
          ? baseUrl +
            serviceData?.data?.attributes?.photoBanner?.data?.attributes?.url
          : assetsStore.useAsset('images/big-images/removal-tooth.png')
      "
      :imgAdaptiv="
        serviceData.data.attributes.photoBanner.data?.attributes?.url
          ? baseUrl +
            serviceData?.data?.attributes?.photoBanner?.data?.attributes?.url
          : assetsStore.useAsset('images/big-images/removal-tooth.png')
      "
      :isDital="true"
      :breadcrumbs="[
        {
          title: 'Главная',
          url: '/',
        },
        {
          title: `${serviceData?.data?.attributes?.category}`,
          url: `/${linkTransform(serviceData?.data?.attributes?.category)}`,
        },
        {
          title: `${serviceData.data.attributes.heading}`,
          url: `/${linkTransform(serviceData?.data?.attributes?.category)}/${
            route.params.id
          }`,
        },
      ]"
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
      v-if="tagsImportant && tagsImportant?.length > 0"
      :arrayText="tagsImportant"
    />

    <!-- TODO VOPROSI-->
    <!-- <blocks-cases-direction
      text="Похожие услуги"
      :dataDirection="similarServices"
    /> -->

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

    <blocks-main-feedback :reviews="reviews" />

    <!-- Todo & VOPROSI -->
    <!-- <blocks-video-slider-block :imagesScroll="imagesScroll" title="Видео" /> -->

    <!-- ??? -->
    <!-- <BlocksMainBanner
      :title="'Акция связанная с услугой'"
      :text="'Описание может быть в несколько строчек'"
      :titleLink="'Воспользоваться акцией'"
      link="#"
      @click="isOpenPopup = true"
      bgColor="dark-blue-gradient"
      img="tooth.png"
      bigImg="true"
    /> -->

    <!-- No data -->
    <blocks-our-specialists
      v-if="specialists?.length"
      title="Наши специалисты"
      :data="specialists"
    />

    <blocks-main-popularServices />

    <blocks-main-articles title="Статьи" :articles="articles" />

    <blocks-map :dataInfo="infoData" text="Контакты" />
    <blocks-main-form />
  </div>
</template>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

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
