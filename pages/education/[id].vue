<template>
  <elements-main-info
      :title="mainInfo?.title"
      :text="mainInfo?.description"
      :imgBg="mainImg"
      :imgAlt="mainImgAlt"
      :isDital="true"
      :isButtonBase="true"
      text-button-base="Записаться на курс"
      :time="mainInfo.data_start"
      :money="mainInfo.price"
      :lector="mainInfo?.lector"
      :showCourseCard="true"
      :breadcrumbs="breadcrumbs"
      :custom-click="educationStore.openModal"
  />
  <div class="about-page">
    <div class="about-page-wrap">
      <BlocksMapper
          :blocks="blocks"
      />
    </div>
  </div>
  <Teleport to="body"><ElementsEducationModal/></Teleport>
</template>

<script setup>
const educationStore = useModalEducationStore();
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
