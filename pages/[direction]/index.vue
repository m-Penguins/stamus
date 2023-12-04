<script setup>
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const assetsStore = useAssets();
const bigImageMock = assetsStore.useAsset("images/big-images/girl.png");

const imgAdaptiveMock = assetsStore.useAsset(
  "images/big-images/girl-adaptiv.png",
);

const route = useRoute();

const directionSlug = route?.params?.direction;

const { data: directionData } = await useFetch(`${apiBaseUrl}main-derections`, {
  query: {
    "filters[slug][$eq]": directionSlug,
    populate: blocksQuey,
  },
});

if (!directionData?.value?.data?.length) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

const mainInfo = directionData?.value?.data?.[0]?.attributes;

const mainBigImg = mainInfo?.photoBanner?.data?.attributes?.url
  ? baseUrl + mainInfo?.photoBanner?.data?.attributes?.url
  : bigImageMock;

const mainAdaptiveImg = mainInfo?.photoBanner?.data?.attributes?.formats?.small
  ?.url
  ? baseUrl + mainInfo?.photoBanner?.data?.attributes?.formats?.small?.url
  : imgAdaptiveMock;

const directionBlocks = mainInfo?.blocks;

const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
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
  <BlocksMapper :blocks="directionBlocks" />
</template>

<style lang="scss" scoped></style>
