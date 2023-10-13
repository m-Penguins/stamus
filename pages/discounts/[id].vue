<template>
  <blocks-discounts-banner-dital :breadcrumbs="breadcrumbs" />
  <div class="spicialists-page-cards">
    <div class="spicialists-page-card" v-for="item in specialists" :key="item">
      <elements-name-specialty-photo-card
        link="#"
        :specialists="item"
        :isLink="false"
        :isTooltip="false"
      />
    </div>
  </div>
  <blocks-main-form />
</template>

<script setup>
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;
const assetsStore = useAssets();

const { data: happyHours } = await useFetch(`${apiBaseUrl}lucky-times`, {
  query: {
    populate: "deep",
  },
});

const specialists = happyHours?.value?.data?.map((hh) => {
  const spec = {
    name:
      hh?.attributes?.specialist?.data?.attributes?.firstName?.trim() +
      " " +
      hh?.attributes?.specialist?.data?.attributes?.lastName?.trim(),
    position: hh?.attributes?.specialist?.data?.attributes?.position,
    img: hh?.attributes?.specialist?.data?.attributes?.fotoSpecialist?.data
      ?.attributes?.url
      ? baseUrl +
        hh?.attributes?.specialist?.data?.attributes?.fotoSpecialist?.data
          ?.attributes?.url
      : assetsStore.useAsset("images/no-photo.png"),
    time: hh?.attributes?.time?.join(", ") ?? [],
    address: `Прием на ${hh?.attributes?.specialist?.data?.attributes?.clinics?.data
      ?.map((el) => el?.attributes?.address)
      ?.join(", ")}`,
    description: hh?.attributes?.description ?? "",
    link: hh?.attributes?.link,
  };

  return spec;
});

console.log(happyHours?.value?.data);
const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Акции и скидки",
    url: "/discounts",
  },
  {
    title: "Счастливые часы",
    url: `/discounts/schastlivye-chasy`,
  },
];
</script>

<style lang="scss" scoped>
@import "../../assets/styles/style.scss";

.spicialists-page-cards {
  display: flex;
  gap: 40px 16px;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 1280px;
  max-width: 100%;
  margin: 0 auto 100px;
}

.spicialists-page-card {
  max-width: 308px;
}

@media (max-width: 900px) {
  .spicialists-page-card {
    max-width: 334px;
  }

  .spicialists-page-cards {
    margin: 0 auto 80px;
    gap: 40px 14px;
  }
}

@media (max-width: 676px) {
  .spicialists-page-card {
    max-width: 343px;
  }
  .spicialists-page-cards {
    margin: 0 auto 80px;
  }
}
</style>
