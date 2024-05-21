<script setup>
defineProps(["isDiscounts"]);

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;
const route = useRoute();
const assetsStore = useAssets();
const bigImage = "images/big-images/discounts_new.png";

const imgAdaptiv = assetsStore.useAsset(
  "images/big-images/discounts-adaptiv_new.jpg",
);
const togglerPopup = (state) => {
  isOpenPopup.value = state;
};
const isOpenPopup = ref(false);

const { data: discountsData } = await useFetch(`${apiBaseUrl}promotions`, {
  query: {
    populate: blocksQuey,
  },
});

if (!discountsData?.value?.data?.length) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

useHead({
  title: "Акции и скидки стоматологии Стамус в Краснодаре",
  meta: [
    {
      name: "twitter:title",
      content: "Акции и скидки стоматологии Стамус в Краснодаре",
    },
    {
      property: "og:title",
      content: "Акции и скидки стоматологии Стамус в Краснодаре",
    },
    {
      name: "description",
      content:
        "Действующие акции и скидки стоматологии Стамус, а так же подарочные сертификаты и абонементы.",
    },
    {
      name: "twitter:description",
      content:
        "Действующие акции и скидки стоматологии Стамус, а так же подарочные сертификаты и абонементы.",
    },
    {
      property: "og:description",
      content:
        "Действующие акции и скидки стоматологии Стамус, а так же подарочные сертификаты и абонементы.",
    },
    // {
    //   name: "keywords",
    //   content:
    //     "Акции стоматологии, скидки стоматологии, акции стамус, скидки стамус, счастливые часы в стамус, скидка на проф гигиену",
    // },
  ],
  link: [{ rel: "canonical", href: "https://stamus.ru" + route.path }],
});
</script>

<template>
  <elements-main-info
    title="Акции и скидки"
    text="А так же подарочные сертификаты и абонементы"
    :imgBg="bigImage"
    imgAlt="Акции и Скидки"
    local
    :isButtonBase="false"
    :breadcrumbs="[
      {
        title: 'Главная',
        url: '/',
      },
      {
        title: 'Акции и скидки',
        url: '/discounts',
      },
    ]"
  />

  <template v-for="item in discountsData?.data">
    <BlocksMapper :blocks="item?.attributes?.blocks" />
  </template>
  <blocks-main-form />
</template>
