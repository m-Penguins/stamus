<script setup>
const route = useRoute();
const assetsStore = useAssets();
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const [{ data: portfolioData }, { data: allCasesData }] = await Promise.all([
  useFetch(`${apiBaseUrl}portofolios/${route.params.id}`, {
    query: { populate: "deep" },
  }),
  useFetch(`${apiBaseUrl}portofolios`, {
    query: {
      populate: "deep",
    },
  }),
]);

if (!portfolioData.value?.data) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const symptoms = [
  { id: 1, text: "Длинное наименование симптома" },
  { id: 2, text: "Наименование симптома" },
  { id: 3, text: "наименование симптома" },
  {
    id: 4,
    text: "Длинное наименование симптома Длинное наименование симптома",
  },
  { id: 5, text: "Длинное наименование симптома" },
  { id: 6, text: "Наименование симптома" },
  { id: 7, text: "Наименование" },
];

const solution = portfolioData.value?.data?.attributes?.solution ?? [];
const solutionImage = portfolioData.value?.data?.attributes?.solutionImage?.data
  ?.attributes?.url
  ? baseUrl +
    portfolioData.value?.data?.attributes?.solutionImage?.data?.attributes?.url
  : assetsStore.useAsset("images/solution/solution1.png");

const bigImage = portfolioData.value?.data?.attributes?.photoBanner?.data
  ?.attributes?.url
  ? baseUrl +
    portfolioData.value?.data?.attributes?.photoBanner?.data?.attributes?.url
  : assetsStore.useAsset("images/big-images/portfolio-category.png");

const smallImage = portfolioData.value?.data?.attributes?.photoBanner?.data
  ?.attributes?.formats?.small?.url
  ? baseUrl +
    portfolioData.value?.data?.attributes?.photoBanner?.data?.attributes
      ?.formats?.small?.url
  : assetsStore.useAsset("images/big-images/portfolio-category-adaptiv.png");

const specialists =
  portfolioData.value?.data?.attributes?.specialists?.data?.map((sp) => {
    return {
      id: sp?.id,
      name: `${sp?.attributes?.firstName} ${sp?.attributes?.lastName}`,
      position: sp?.attributes?.position,
      achievements: sp?.attributes?.achievements,
      img: sp?.attributes?.fotoSpecialist?.data?.attributes?.url
        ? baseUrl + sp?.attributes?.fotoSpecialist?.data?.attributes?.url
        : assetsStore.useAsset("images/no-photo.png"),
    };
  });

const infoBlock = portfolioData.value?.data?.attributes?.infoBlock;

const otherCases = allCasesData.value?.data
  ?.filter((c) => String(c?.id) !== String(route.params.id))
  .map((p) => {
    return {
      id: p?.id,
      name: p?.attributes?.heading,
      category: p?.attributes?.direction?.directions,
      description: p?.attributes?.description,
      img: p?.attributes?.photoBanner?.data?.attributes?.url
        ? baseUrl + p?.attributes?.photoBanner?.data?.attributes?.url
        : assetsStore.useAsset("images/no-photo.png"),
    };
  });

const imagesScroll = [
  "video1.png",
  "video2.png",
  "video3.png",
  "video3.png",
  "video3.png",
  "video3.png",
];
</script>

<template>
  <div>
    <elements-main-info
      :title="portfolioData?.data?.attributes?.heading"
      :text="portfolioData?.data?.attributes?.description"
      :imgBg="bigImage"
      :imgAdaptiv="smallImage"
      :isDital="true"
      :isButtonBase="false"
      :isTimeAndPriceCard="true"
      :time="portfolioData?.data?.attributes?.totalVisit ?? ''"
      :money="portfolioData?.data?.attributes?.betweenPrice ?? ''"
      :breadcrumbs="[
        {
          title: 'Главная',
          url: '/',
        },
        {
          title: 'Портфолио',
          url: '/portfolio',
        },
        {
          title: portfolioData?.data?.attributes?.heading,
          url: `/portfolio/${route.params.id}`,
        },
      ]"
    />
    <blocks-symptoms-block
      title="Симптомы, с которыми обратился клиент (static)"
      :cards="symptoms"
    />
    <blocks-video-block
      :title="infoBlock?.heading"
      :text="infoBlock?.text"
      :isProblems="true"
      :link="infoBlock?.link"
      :problemImg="
        infoBlock?.image?.data?.attributes?.url
          ? baseUrl + infoBlock?.image?.data?.attributes?.url
          : assetsStore.useAsset('images/problems/problem1.png')
      "
    />
    <div>
      <blocks-solution-block
        title="Решение"
        :cards="solution"
        :image="solutionImage"
      />
    </div>
    <div class="attending-physicians-block">
      <h3 class="attending-physicians-block-title">Лечащие врачи</h3>
      <div class="attending-physicians-block-cards">
        <div
          class="attending-physicians-block-card"
          v-for="specialist in specialists"
          :key="specialist.id"
        >
          <elements-name-specialty-photo-card
            :specialists="specialist"
            @click="$router.push(`/specialists/` + specialist.id)"
          />
        </div>
      </div>
    </div>
    <blocks-gallery :arrayImg="arrayImg6" />
    <blocks-cases-direction text="Другие кейсы" :dataDirection="otherCases" />
    <blocks-main-form />
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/styles/style.scss";
.attending-physicians-block {
  width: 1280px;
  max-width: 100%;
  margin: 0 auto 100px;
}

.attending-physicians-block-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
  padding-bottom: 40px;
}

.attending-physicians-block-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.attending-physicians-block-card {
  max-width: 308px;
}

@media (max-width: 500px) {
  .attending-physicians-block-card {
    max-width: 100%;
  }
}
</style>
