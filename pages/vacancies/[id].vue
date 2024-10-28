<template>
  <elements-main-info
      :title="mainInfo?.title"
      :text="mainInfo?.description"
      :imgBg="mainImg"
      :imgAlt="mainImgAlt"
      :isDital="true"
      :isButtonBase="true"
      textButtonBase="Отклинуться"
      :time="mainInfo.experience"
      :money="mainInfo.salary"
      :lector="mainInfo?.lector"
      :showVacancyCard="true"
      :breadcrumbs="breadcrumbs"
      :address="mainInfo.clinics.data"
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
const { data: vacancyData } = await useFetch(
    `${apiBaseUrl}vacancies/${route.params.id}`,
    {
      query: {
        populate: blocksQuey + 'title.*, about.*, about.image.*, image.*, clinics.*'
      },
    },
);
const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Вакансии",
    url: "/vacancies",
  },
  {
    title: vacancyData.value?.data?.attributes?.title,
    url: `/vacancies/${route.params.id}`,
  },
];
const mainInfo = vacancyData?.value?.data?.attributes;
const blocks = mainInfo?.blocks;
const mainImg =
    mainInfo?.image?.data?.attributes?.url ??
    placeholdersStore?.imagePlaceholders?.services;
const mainImgAlt = mainInfo?.image?.data?.attributes?.alternativeText;
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
