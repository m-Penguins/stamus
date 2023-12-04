<script setup>
defineProps(["isDiscounts"]);

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const assetsStore = useAssets();
const bigImage = assetsStore.useAsset("images/big-images/discounts.png");

const imgAdaptiv = assetsStore.useAsset(
  "images/big-images/discounts-adaptiv.png",
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
</script>

<template>
  <elements-main-info
    title="Акции и скидки"
    text="Небольшое описание в несколько строчек"
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
  <BlocksMainBanner
    :title="'Счастливые часы'"
    :text="'Скидки до 50%'"
    :titleLink="'Воспользоваться акцией'"
    :link="`/discounts/${linkTransform('Счастливые часы')}`"
    bgColor="dark-blue-gradient"
    img="tooth.png"
    bigImg="true"
  />

  <template v-for="item in discountsData?.data">
    <BlocksMapper :blocks="item?.attributes?.blocks" />
  </template>
  <blocks-main-form />
</template>
