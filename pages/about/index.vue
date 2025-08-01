<template>
  <div class="about-page">
    <div class="about-page-wrap">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs" />
      <div class="about-page-content">
        <h1 class="about-page-title">О компании</h1>
        <!--      <div class="about-page-description">-->
        <!--        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.-->
        <!--      </div>-->
        <BlocksMapper :blocks="blocks" />
      </div>
    </div>
  </div>
</template>

<script setup>
// link="https://prodoctorov.ru/krasnodar/set/1642-stomatologiya-stamus/#otzivi"

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;
const route = useRoute();
const assetsStore = useAssets();

const { data: companyData } = await useFetch(`${apiBaseUrl}o-kompanii`, {
  query: {
    populate: blocksQuey,
  },
});

const mainInfo = companyData?.value?.data?.attributes;
const blocks = mainInfo?.blocks;
const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "О компании",
    url: "/about",
  },
];
</script>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";

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

.about-page-title {
  @include body-60-medium;
  color: $dark-blue-subtitle;
  padding: 40px 0 67px;
}

.about-page-description {
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: -0.015em;
  margin-bottom: 25px;
}

@media (max-width: 1110px) {
  .about-page-content {
    padding-top: 60px;
  }
}
</style>
