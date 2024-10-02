<template>
  <DynamicBlockHero
      title="Учебный центр"
      text="Небольшое описание в несколько строчек"
      :imgBg="mainImg"
      :imgAlt="mainImgAlt"
      :breadcrumbs="breadcrumbs"
      link_text="Узнать вакансии"
      :none-btn="true"
  />
  <div class="about-page">
    <div class="about-page-wrap">
      <BlocksMapper
          :blocks="blocks"
      />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const placeholdersStore = usePlaceholdersStore();
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;
const { data: educationData } = await useFetch(
    `${apiBaseUrl}study-centers/${route.params.id}`,
    {
      query: {
        populate:
            blocksQuey
      },
    },
);
console.log(educationData)
const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Учебный центр",
    url: "/education",
  },
  {
    title: educationData.value?.data?.attributes?.title,
    url: `/education/${route.params.id}`,
  },
];
const mainInfo = educationData?.value?.data?.attributes;
const blocks = mainInfo?.blocks;
const mainImg =
    mainInfo?.photoBanner?.data[0]?.attributes?.url ??
    placeholdersStore?.imagePlaceholders?.services;
const mainImgAlt = mainInfo?.photoBanner?.data[0]?.attributes?.alternativeText;
</script>

<style lang="scss" scoped>
.about-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  max-width: 100%;
  margin: 20px auto 0 auto;
}

.about-page-wrap {
  width: 100%;
}
</style>
