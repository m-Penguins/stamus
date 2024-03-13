<script setup>
defineProps(["isDiscounts"]);

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const assetsStore = useAssets();
const bigImage = assetsStore.useAsset("big-images/discounts_new.png");

const imgAdaptiv = assetsStore.useAsset("big-images/discounts-adaptiv_new.jpg");
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
  title: "Акции и Скидки в стоматологиях Стамус и детской клинике СтамусМед",
  meta: [
    {
      name: "twitter:title",
      content:
        "Акции и Скидки в стоматологиях Стамус и детской клинике СтамусМед",
    },
    {
      property: "og:title",
      content:
        "Акции и Скидки в стоматологиях Стамус и детской клинике СтамусМед",
    },
    {
      name: "description",
      content:
        "В клиниках Стамус доступные цены. Посмотреть актуальные акции и скидки. Счастливые часы – ежедневно.",
    },
    {
      name: "twitter:description",
      content:
        "В клиниках Стамус доступные цены. Посмотреть актуальные акции и скидки. Счастливые часы – ежедневно.",
    },
    {
      property: "og:description",
      content:
        "В клиниках Стамус доступные цены. Посмотреть актуальные акции и скидки. Счастливые часы – ежедневно.",
    },
    {
      name: "keywords",
      content:
        "Акции стоматологии, скидки стоматологии, акции стамус, скидки стамус, счастливые часы в стамус, скидка на проф гигиену",
    },
  ],
});
</script>

<template>
  <elements-main-info
    title="Акции и скидки"
    text="А так же подарочные сертификаты и абонементы"
    :imgBg="bigImage"
    :imgAdaptiv="imgAdaptiv"
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
