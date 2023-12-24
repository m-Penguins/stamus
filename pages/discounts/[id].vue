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
import imagePlaceholders from "~/utils/imagePlaceholders";

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

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
      ?.attributes?.formats?.small?.url
      ? baseUrl +
        hh?.attributes?.specialist?.data?.attributes?.fotoSpecialist?.data
          ?.attributes?.formats?.small?.url
      : baseUrl + imagePlaceholders?.specialists,
    time: hh?.attributes?.time ?? [],
    address: `Прием на ${hh?.attributes?.specialist?.data?.attributes?.clinics?.data
      ?.map((el) => el?.attributes?.address)
      ?.join(", ")}`,
    description: hh?.attributes?.description ?? "",
    link: hh?.attributes?.link,
  };

  return spec;
});

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

useHead({
  title: "Счастливые часы в клиниках Стамус и СтамусМед. Успей записаться",
  meta: [
    {
      name: "twitter:title",
      content:
        "Счастливые часы в клиниках Стамус и СтамусМед. Успей записаться",
    },
    {
      property: "og:title",
      content:
        "Счастливые часы в клиниках Стамус и СтамусМед. Успей записаться",
    },
    {
      name: "description",
      content:
        "Счастливые часы – это скидки до 50% на приемы врачей, у которых отменились пациенты и появилось свободное окно. Они действуют только на один прием к врачу.",
    },
    {
      name: "twitter:description",
      content:
        "Счастливые часы – это скидки до 50% на приемы врачей, у которых отменились пациенты и появилось свободное окно. Они действуют только на один прием к врачу.",
    },
    {
      property: "og:description",
      content:
        "Счастливые часы – это скидки до 50% на приемы врачей, у которых отменились пациенты и появилось свободное окно. Они действуют только на один прием к врачу.",
    },
    {
      name: "keywords",
      content:
        "счастливые часы стамус, счастливые часы стоматология, счастливые часы детская клиника, счастливые часы стамусмед, скидки стамус",
    },
  ],
});
</script>

<style lang="scss" scoped>
@import "../../assets/styles/style.scss";

.spicialists-page-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
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

    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 676px) {
  .spicialists-page-card {
    max-width: 343px;
  }
  .spicialists-page-cards {
    margin: 0 auto 80px;
    grid-template-columns: 1fr;
  }
}
</style>
