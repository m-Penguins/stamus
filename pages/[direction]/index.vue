<script setup>
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const route = useRoute();

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

const mainInfo = directionData?.value?.data?.[0]?.attributes;

const mainBigImg = mainInfo?.photoBanner?.data?.attributes?.url
  ? baseUrl + mainInfo?.photoBanner?.data?.attributes?.url
  : baseUrl + imagePlaceholders?.services;

const mainAdaptiveImg = mainInfo?.photoBanner?.data?.attributes?.formats?.large
  ?.url
  ? baseUrl + mainInfo?.photoBanner?.data?.attributes?.formats?.large?.url
  : baseUrl + imagePlaceholders?.services;

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
