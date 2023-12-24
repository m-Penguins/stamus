<script setup>
import imagePlaceholders from "~/utils/imagePlaceholders";

const route = useRoute();
const assetsStore = useAssets();
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const [{ data: portfolioData }, { data: allCasesData }] = await Promise.all([
  useFetch(`${apiBaseUrl}portofolios/${route.params.id}`, {
    query: {
      populate:
        "infoBlock.image.*,infoBlock.video.*,galery.*,specialists.fotoSpecialist.*,photoBanner.*,solutionImage.*,services.*, meta.metaImage.*,solution.*,napravleniya_uslug_1.*,same_portfolios.photoBanner.*",
    },
  }),
  useFetch(`${apiBaseUrl}portofolios`, {
    query: {
      populate: "photoBanner.*",
    },
  }),
]);

if (!portfolioData.value?.data) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

const samePortfolios = {
  portofolios: portfolioData.value?.data?.attributes?.same_portfolios,
  title: "Другие кейсы",
};

const symptomTitle = portfolioData.value?.data?.attributes?.symptom_title;

const symptoms = portfolioData.value?.data?.attributes?.symptom
  ?.split("|")
  ?.map((s, i) => ({
    id: i + 1,
    text: s,
  }))
  ?.filter(Boolean);

const solution = portfolioData.value?.data?.attributes?.solution ?? [];
const solutionImage = portfolioData.value?.data?.attributes?.solutionImage?.data
  ?.attributes?.formats?.medium?.url
  ? baseUrl +
    portfolioData.value?.data?.attributes?.solutionImage?.data?.attributes
      ?.formats?.medium?.url
  : baseUrl + imagePlaceholders?.portfoliosSmall;

const bigImage = portfolioData.value?.data?.attributes?.photoBanner?.data
  ?.attributes?.url
  ? baseUrl +
    portfolioData.value?.data?.attributes?.photoBanner?.data?.attributes?.url
  : baseUrl + imagePlaceholders?.portfoliosBig;

const smallImage = portfolioData.value?.data?.attributes?.photoBanner?.data
  ?.attributes?.formats?.small?.url
  ? baseUrl +
    portfolioData.value?.data?.attributes?.photoBanner?.data?.attributes
      ?.formats?.small?.url
  : baseUrl + imagePlaceholders?.portfoliosSmall;

const specialists =
  portfolioData.value?.data?.attributes?.specialists?.data?.map((sp) => {
    return {
      id: sp?.id,
      name: `${sp?.attributes?.firstName} ${sp?.attributes?.lastName}`,
      position: sp?.attributes?.position,
      achievements: sp?.attributes?.achievements,
      img: sp?.attributes?.fotoSpecialist?.data?.attributes?.formats?.small?.url
        ? baseUrl +
          sp?.attributes?.fotoSpecialist?.data?.attributes?.formats?.small?.url
        : baseUrl + imagePlaceholders?.specialists,
      achievements: sp?.attributes?.achievements,
    };
  });

const infoBlock = portfolioData.value?.data?.attributes?.infoBlock;

const gallery = portfolioData.value?.data?.attributes?.galery?.data
  ?.map((img) =>
    img?.attributes?.formats?.medium?.url
      ? baseUrl + img?.attributes?.formats?.medium?.url
      : "",
  )
  ?.filter(Boolean);

const metaData = portfolioData.value?.data?.attributes?.meta;
useHead(getMetaObject(metaData, baseUrl));
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
      v-if="symptoms && symptoms?.length"
      :title="symptomTitle ?? 'Симптомы, с которыми обратился клиент'"
      :cards="symptoms"
    />
    <dynamic-block-opisanie
      v-if="infoBlock"
      :block="infoBlock"
      class="infoBlock"
    />

    <div>
      <blocks-solution-block
        title="Решение"
        :cards="solution"
        :image="solutionImage"
      />
    </div>
    <div class="attending-physicians-block" v-if="specialists?.length">
      <h3 class="attending-physicians-block-title">Лечащие врачи</h3>
      <div class="attending-physicians-block-cards">
        <div
          class="attending-physicians-block-card"
          v-for="specialist in specialists"
          :key="specialist.id"
        >
          <elements-name-specialty-photo-card
            :isTooltip="true"
            :specialists="specialist"
            @click="$router.push(`/specialists/` + specialist.id)"
          />
        </div>
      </div>
    </div>
    <blocks-gallery :arrayImg="gallery" v-if="gallery?.length > 0" />
    <div class="container-size">
      <dynamic-block-cases :block="samePortfolios" />
    </div>

    <blocks-main-form />
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/style.scss";

.infoBlock {
  margin-bottom: 100px;
}
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

@media (max-width: 700px) {
  .attending-physicians-block-cards {
    flex-direction: column;
    align-items: center;
  }
  .attending-physicians-block-card {
    max-width: 100%;
  }
}

@media (max-width: 500px) {
  .attending-physicians-block-card {
    max-width: 100%;
    width: 100%;
  }
}
</style>
