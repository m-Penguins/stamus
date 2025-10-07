<script setup>
const item = ref(true);
const placeholdersStore = usePlaceholdersStore();
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
        "reviews.*,clinics.*,price.services.category.napravleniya_uslug_1_col.*,photoBanner.*,direction.*,specialists.fotoSpecialist.*,specialists.achievements.icon.*,articles.*,infoBlock.image.*,infoBlock.video.*,chiefDoctor.image.*,galery.*,meta.metaImage.*, certificates.certificates.*",
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

const pricesData = clinicData.value?.data?.attributes?.price;
const certificates = clinicData.value?.data.attributes?.certificates[0];
const galleryList = clinicData?.value?.data?.attributes?.galery?.data
  ?.map((img) => img?.attributes?.url)
  ?.filter(Boolean);

const chiefDoctor = computed(() => {
  return {
    name: clinicData.value?.data?.attributes?.chiefDoctor?.heading,
    category: clinicData.value?.data?.attributes?.chiefDoctor?.position,
    img: clinicData.value?.data?.attributes?.chiefDoctor?.image?.data
      ?.attributes?.url
      ? baseUrl +
        clinicData.value?.data?.attributes?.chiefDoctor?.image?.data?.attributes
          ?.url
      : "",
    text: clinicData.value?.data?.attributes?.chiefDoctor?.text,
  };
});

const otherClinics = computed(() =>
  clinicsData.value?.data
    ?.filter((cl) => String(cl.id) !== String(route.params.id))
    .map((cl) => {
      return {
        name: cl?.attributes?.heading,
        img:
          cl?.attributes?.photoBanner?.data?.attributes?.url ??
          placeholdersStore?.imagePlaceholders?.services,
        alt: cl?.attributes?.photoBanner?.data?.attributes?.alternativeText,
        link: String(cl?.id),
      };
    }),
);

const sortSpecialistsByOrder = (data) => {
  if (
    data.attributes &&
    data.attributes.specialists &&
    data.attributes.specialists.data
  ) {
    // Разделение элементов на те, что с null и не null order
    const withOrder = [];
    const withoutOrder = [];

    data.attributes.specialists.data.forEach((item) => {
      if (item.attributes.publishedAt != null) {
        if (item.attributes.order === null) {
          withoutOrder.push(item);
        } else {
          withOrder.push(item);
        }
      }
    });

    // Сортировка элементов с order по убыванию
    withOrder.sort(
      (a, b) =>
        parseInt(a.attributes.order, 10) - parseInt(b.attributes.order, 10),
    );

    // Объединение массивов: сначала без order, затем с отсортированным order
    data.attributes.specialists.data = [...withoutOrder, ...withOrder];
  }
  return data;
};
const newSpec = clinicData.value;

const sortedData = sortSpecialistsByOrder(newSpec.data);

const reviews = mapReviews(clinicData?.value?.data?.attributes?.reviews?.data);

const infoBlock = clinicData.value?.data?.attributes?.infoBlock;

const title = clinicData?.value?.data?.attributes?.heading;
const address = clinicData?.value?.data?.attributes?.address;

const bgImg =
  clinicData?.value?.data?.attributes?.photoBanner?.data?.attributes?.url ??
  placeholdersStore?.imagePlaceholders?.services;

const imgAlt =
  clinicData?.value?.data?.attributes?.photoBanner?.data?.attributes
    ?.alternativeText;

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
// console.log(clinicData);
const medicalPlaceData = {
  "@context": "https://schema.org",
  "@type": "Place",
  name: title,
  url: `${baseUrl}${route.fullPath}`,
  description:
    "Современная стоматологическая клиника, предоставляющая широкий спектр услуг по лечению и профилактике заболеваний полости рта.",
  address: {
    "@type": "PostalAddress",
    streetAddress: address,
    addressLocality: "Краснодар",
    addressCountry: "RU",
    postalCode: clinicData.value?.data?.attributes?.post_code,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: clinicData.value?.data?.attributes?.coordy,
    longitude: clinicData.value?.data?.attributes?.coordx,
  },
  telephone: clinicData.value?.data?.attributes?.phone,
  openingHours: clinicData.value?.data?.attributes?.working_time,
  image:
    clinicData.value?.data?.attributes?.photoBanner?.data?.attributes?.url ??
    "",
};
useHead({
  script: [
    {
      type: "application/ld+json",
      children: medicalPlaceData,
    },
  ],
});
</script>

<template>
  <elements-main-info
    :title="title"
    :text="address"
    :imgBg="bgImg"
    :imgAlt="imgAlt"
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

  <div class="osnovnie-block" v-if="pricesData">
    <DynamicBlockOsnovnie :block="pricesData" />
  </div>

  <blocks-gallery v-if="galleryList?.length > 0" :arrayImg="galleryList" />

  <blocks-our-specialists
    v-if="clinicData?.data?.attributes?.specialists?.data"
    title="Наши врачи"
    :data="sortedData?.attributes?.specialists?.data"
  />
  <BlocksMainBanner
    :title="'Добровольное медицинское страхование'"
    :text="'которое в отличие от обязательного обеспечивает получение гражданином дополнительных медицинских услуг'"
    :titleLink="'Узнать подробнее'"
    link="#"
    bgColor="light-blue"
    type
    img="cards2.png"
    bigImg="true"
    :handleLinkClick="openBidModal"
  />
  <blocks-main-feedback :reviews="reviews" />
  <dynamic-block-certificaty v-if="certificates" :block="certificates" />
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
@import "@/assets/styles/style.scss";

.infoBlock {
  margin-bottom: 100px;
}

.osnovnie-block {
  margin-bottom: 100px;
}
</style>
