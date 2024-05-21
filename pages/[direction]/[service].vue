<script setup>
const route = useRoute();

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;
const directionSlug = route?.params?.direction;

const { data: directionData } = await useFetch(`${apiBaseUrl}main-derections`, {
  query: {
    "filters[slug][$eq]": directionSlug,
    populate: blocksQuey,
    sort: "order:asc",
  },
});

if (!directionData?.value?.data?.length) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

const placeholdersStore = usePlaceholdersStore();

const { data: serviceData } = await useFetch(`${apiBaseUrl}services`, {
  query: {
    "filters[slug][$eq]": route.params?.service,
    sort: "specialists.order:asc",
    populate:
      blocksQuey +
      ",specialists.fotoSpecialist.*,category.napravleniya_uslug_1_col.*",
  },
});

if (!serviceData?.value?.data?.length) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

const serviceDirectionSlug =
  serviceData.value?.data?.[0]?.attributes?.category?.data?.attributes
    ?.napravleniya_uslug_1_col?.data?.attributes?.slug;

if (serviceDirectionSlug !== directionSlug) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

const mainInfo = serviceData?.value?.data?.[0]?.attributes;

const serviceId = serviceData?.value?.data?.[0]?.id;

const mainImg =
  mainInfo?.photoBanner?.data?.attributes?.url ??
  placeholdersStore?.imagePlaceholders?.services;

const mainImgAlt = mainInfo?.photoBanner?.data?.attributes?.alternativeText;

const serviceBlocks = mainInfo?.blocks;

const blockSpecialists = mainInfo?.specialists;

// console.log(blockSpecialists);

const directionName =
  mainInfo?.category?.data?.attributes?.napravleniya_uslug_1_col?.data
    ?.attributes?.heading;

const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: directionName,
    url: `/${route.params?.direction}`,
  },
  {
    title: mainInfo?.heading,
    url: `${route.fullPath}`,
  },
];

const metaData = mainInfo?.meta;
useHead(getMetaObject(metaData, baseUrl));
</script>

<template>
  <DynamicBlockHero
    :title="mainInfo?.heading"
    :text="mainInfo?.description"
    :imgBg="mainImg"
    :imgAlt="mainImgAlt"
    :breadcrumbs="breadcrumbs"
    :link="mainInfo?.link"
    :link_text="mainInfo?.link_text"
  />
  <BlocksMapper
    :blocks="serviceBlocks"
    :serviceId="serviceId"
    :block-specialists="blockSpecialists"
  />
</template>

<style lang="scss" scoped></style>
