<script setup>
const item = ref(true);

const checkScreenSize = () => {
  item.value = window.innerWidth <= 1110 ? false : true;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
});

const assetsStore = useAssets();

const route = useRoute();
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const [{ data: clinicsData }, { data: clinicData }] = await Promise.all([
  useFetch(`${apiBaseUrl}clinics`, {
    query: {
      populate: "photoBanner.*",
    },
  }),
  useFetch(`${apiBaseUrl}clinics/${route.params?.id}`, {
    query: {
      populate:
        "reviews.*,clinics.*,price_lists.servicePrice.Sale_popular.*,photoBanner.*,direction.*,specialists.fotoSpecialist.*,specialists.achievements.icon.*,articles.*,infoBlock.image.*,infoBlock.video.*,chiefDoctor.image.*,galery.*,meta.metaImage.*",
    },
  }),
]);

if (!clinicsData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}
const pricesData = clinicData.value?.data?.attributes?.price_lists;

const galleryList = clinicData?.value?.data?.attributes?.galery?.data
  ?.map((img) =>
    img?.attributes?.formats?.medium?.url
      ? baseUrl + img?.attributes?.formats?.medium?.url
      : "",
  )
  ?.filter(Boolean);

const chiefDoctor = computed(() => {
  return {
    name: clinicData.value?.data?.attributes?.chiefDoctor?.heading,
    category: clinicData.value?.data?.attributes?.chiefDoctor?.position,
    img:
      baseUrl +
      clinicData.value?.data?.attributes?.chiefDoctor?.image?.data?.attributes
        ?.url,
    text: clinicData.value?.data?.attributes?.chiefDoctor?.text,
  };
});

const otherClinics = computed(() =>
  clinicsData.value?.data
    ?.filter((cl) => String(cl.id) !== String(route.params.id))
    .map((cl) => {
      return {
        name: cl?.attributes?.heading,
        img: baseUrl + cl?.attributes?.photoBanner?.data?.attributes?.url,
        link: String(cl?.id),
      };
    }),
);

const reviews = mapReviews(clinicData?.value?.data?.attributes?.reviews?.data);

const infoBlock = clinicData.value?.data?.attributes?.infoBlock;

const title = clinicData?.value?.data?.attributes?.heading;
const address = clinicData?.value?.data?.attributes?.address;

const bgImg = clinicData?.value?.data?.attributes?.photoBanner?.data?.attributes
  ?.url
  ? baseUrl +
    clinicData?.value?.data?.attributes?.photoBanner?.data?.attributes?.url
  : assetsStore.useAsset("images/big-images/info.png");

const imgAdaptive = clinicData?.value?.data?.attributes?.photoBanner?.data
  ?.attributes?.formats?.small?.url
  ? baseUrl +
    clinicData?.value?.data?.attributes?.photoBanner?.data?.attributes?.formats
      ?.small?.url
  : assetsStore.useAsset("images/big-images/info.png");

const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Клиники",
    url: "/clinics",
  },
  {
    title: `${clinicData.value?.data?.attributes?.heading}`,
    url: `/clinics/${route.params.id}`,
  },
];
const metaData = clinicData.value?.data?.attributes?.meta;
useHead(getMetaObject(metaData, baseUrl));
</script>

<template>
  <elements-main-info
    :title="title"
    :text="address"
    :imgBg="bgImg"
    :imgAdaptiv="imgAdaptive"
    :isDital="true"
    :isButtonBase="false"
    :typeColorWhite="item"
    :typeColorWhiteText="item"
    :breadcrumbs="breadcrumbs"
    :isBgDark="true"
    :style="{ backgroundSize: 'cover' }"
  />
  <dynamic-block-opisanie
    v-if="infoBlock"
    :block="infoBlock"
    class="infoBlock"
  />

  <blocks-chief-doctor-block
    v-if="chiefDoctor.name"
    :specialists="chiefDoctor"
  />

  <BlocksOkazivaemieUslugi
    v-if="pricesData?.data?.length"
    :pricesData="pricesData"
  />

  <blocks-gallery v-if="galleryList?.length > 0" :arrayImg="galleryList" />

  <blocks-our-specialists
    v-if="clinicData?.data?.attributes?.specialists?.data"
    title="Наши специалисты"
    :data="clinicData?.data?.attributes?.specialists?.data"
  />
  <BlocksMainBanner
    :title="'Добровольное медицинское страхование'"
    :text="'которое в отличие от обязательного обеспечивает получение гражданином дополнительных медицинских услуг'"
    :titleLink="'Узнать подробнее'"
    link="#"
    bgColor="light-blue"
    type="true"
    img="cards2.png"
    bigImg="true"
    :handleLinkClick="openBidModal"
  />
  <blocks-main-feedback :reviews="reviews" />
  <blocks-clinics-adress
    v-if="otherClinics"
    text="Другие клиники"
    :dataDirection="otherClinics"
  />
  <blocks-main-form />
</template>

<!-- <style>
.bg-dark {
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.3);
}
</style> -->

<style scoped lang="scss">
@import "/assets/styles/style.scss";

.infoBlock {
  margin-bottom: 100px;
}
</style>
