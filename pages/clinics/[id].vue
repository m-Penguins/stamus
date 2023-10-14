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

const { data: clinicsData } = await useFetch(
  `${apiBaseUrl}clinics?populate=deep`,
);

if (!clinicsData.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const clinicDataID = clinicsData.value?.data?.find(
  (cl) => String(cl.id) === String(route.params.id),
)?.id;

const { data: clinicData } = await useFetch(
  `${apiBaseUrl}clinics/${clinicDataID}?populate=reviews.*,clinics.*,price_lists.*,photoBanner.*,direction.*,specialists.fotoSpecialist.*,articles.*,infoBlock.image.*,infoBlock.video.*,chiefDoctor.image.*,galery.*`,
);

const galleryList = clinicData?.value?.data?.attributes?.galery?.data
  ?.map((img) =>
    img?.attributes?.formats?.medium?.url
      ? baseUrl + img?.attributes?.formats?.medium?.url
      : "",
  )
  ?.filter(Boolean);

const singleServices = ref(
  clinicsData?.value?.data
    ?.find((cl) => String(cl.id) === String(route.params.id))
    ?.attributes?.price_lists?.data?.flatMap((el) => {
      const item = el?.attributes?.servicePrice?.map((single) => {
        return {
          id: single?.id,
          heading: single?.heading,
          price: single?.price,
          isRecommended: single?.isRecommended,
          isPopular: single?.isPopular,
          isDemand: single?.isDemand,
          tags: single?.tags,
          link: "/prices",
        };
      });
      return item;
    }),
);

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
</script>

<template>
  <elements-main-info
    :title="clinicData?.attributes?.heading"
    :text="clinicData?.attributes?.address"
    :imgBg="bgImg"
    :imgAdaptiv="imgAdaptive"
    :isDital="true"
    :isButtonBase="false"
    :typeColorWhite="item"
    :typeColorWhiteText="item"
    :breadcrumbs="breadcrumbs"
    :isBgDark="true"
  />
  <blocks-video-block
    v-if="clinicData?.data?.attributes?.infoBlock"
    :title="clinicData?.data?.attributes?.infoBlock?.heading"
    :text="clinicData?.data?.attributes?.infoBlock?.text"
    :link="clinicData?.data?.attributes?.infoBlock?.link"
    :problemImg="
      clinicData?.data?.attributes?.infoBlock?.image?.data?.attributes?.url
        ? baseUrl +
          clinicData?.data?.attributes?.infoBlock?.image?.data?.attributes?.url
        : ''
    "
    :video="
      clinicData?.data?.attributes?.infoBlock?.video?.data?.attributes?.url
        ? baseUrl +
          clinicData?.data?.attributes?.infoBlock?.video?.data?.attributes?.url
        : ''
    "
    :videoThumbnail="
      clinicData?.data?.attributes?.infoBlock?.image?.data?.attributes?.url
        ? baseUrl +
          clinicData?.data?.attributes?.infoBlock?.image?.data?.attributes?.url
        : ''
    "
  />
  <blocks-chief-doctor-block
    v-if="chiefDoctor.name"
    :specialists="chiefDoctor"
  />

  <blocks-services-block
    v-if="singleServices?.length > 0"
    :singleServices="singleServices"
    title="Оказываемые услуги"
    :isLink="false"
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
