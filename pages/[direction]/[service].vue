<script setup>
const route = useRoute();

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const assetsStore = useAssets();

const { data: serviceData } = await useFetch(`${apiBaseUrl}services`, {
  query: {
    "filters[slug][$eq]": route.params?.service,
    populate: blocksQuey,
  },
});

if (!serviceData?.value?.data?.length) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}
const mainInfo = serviceData?.value?.data?.[0]?.attributes;

const mainBigImg = mainInfo?.photoBanner?.data?.attributes?.url
  ? baseUrl + mainInfo?.photoBanner?.data?.attributes?.url
  : assetsStore.useAsset("images/big-images/removal-tooth.png");

const mainAdaptiveImg = mainInfo?.photoBanner?.data?.attributes?.formats?.small
  ?.url
  ? baseUrl + mainInfo?.photoBanner?.data?.attributes?.formats?.small?.url
  : assetsStore.useAsset("images/big-images/removal-tooth.png");

const serviceBlocks = mainInfo?.blocks;

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
    :imgBg="mainBigImg"
    :imgAdaptive="mainAdaptiveImg"
    :breadcrumbs="breadcrumbs"
    :link="mainInfo?.link"
    :link_text="mainInfo?.link_text"
  />
  <BlocksMapper :blocks="serviceBlocks" />
</template>

<style lang="scss" scoped></style>
