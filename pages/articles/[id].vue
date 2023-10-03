<script setup>
const route = useRoute();
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const assetsStore = useAssets();

const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Статьи",
    url: "/articles",
  },
  {
    title: `Наименование статьи`,
    url: `/articles/${route.params.id}`,
  },
];

const [{ data: articleData }, { data: allArticles }] = await Promise.all([
  useFetch(`${apiBaseUrl}articles/${route.params.id}`, {
    query: { populate: "deep" },
  }),
  useFetch(`${apiBaseUrl}articles`, { query: { populate: "deep" } }),
]);

const heading = articleData.value?.data?.attributes?.heading;
const tags = articleData.value?.data?.attributes?.tags;
const text = articleData.value?.data?.attributes?.text;
const img = articleData.value?.data?.attributes?.fotoArticles?.data?.attributes
  ?.url
  ? baseUrl +
    articleData.value?.data?.attributes?.fotoArticles?.data?.attributes?.url
  : assetsStore.useAsset("images/articles/articles-dital.png");

const otherArticles = allArticles.value?.data
  ?.filter((art) => String(art.id) !== String(route.params.id))
  .map((art) => {
    return {
      id: art?.id,
      heading: art?.attributes?.heading,
      img: art?.attributes?.fotoArticles?.data?.attributes?.url
        ? baseUrl + art?.attributes?.fotoArticles?.data?.attributes?.url
        : assetsStore.useAsset("images/articles/articles-dital.png"),
      text: art?.attributes?.text,
      tags: art?.attributes?.tags,
    };
  });
</script>

<template>
  <div class="articles-dital-wrapper-container">
    <div class="articles-dital-wrapper">
      <div class="articles-dital-wrapper-container">
        <elements-bread-crumbs :breadcrumbs="breadcrumbs" />
        <div class="articles-dital-inner">
          <h1 class="articles-dital-title">{{ heading }}</h1>
          <div
            class="articles-dital-img"
            :style="{
              backgroundImage: `url(${img})`,
            }"
          >
            <div class="articles-dital-box">
              <div v-for="(item, index) in tags" :key="index">
                <div class="articles-dital-box__item">
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="articles-dital-container" v-html="text"></div>
      </div>
    </div>
    <blocks-main-articles title="Другие статьи" :articles="otherArticles" />
    <blocks-main-form />
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/style.scss";

.articles-dital-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  max-width: 100%;
  margin: 20px auto 100px auto;
}

.articles-dital-wrapper-container {
  width: 100%;
}

.articles-dital-inner {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

.articles-dital-title {
  @include body-60-medium;
  color: $dark-blue-subtitle;
  padding-bottom: 40px;
  padding-top: 100px;
}

.articles-dital-img {
  width: 100%;
  border-radius: 25px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 600px;
  position: relative;
}

.articles-dital-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  @include body-14-regular;
  color: $gray-text;

  p {
  }

  a {
  }

  h1 {
  }

  h2 {
  }

  ul {
  }

  ol {
  }
}

.articles-dital-box {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  bottom: 7%;
  left: 20px;
  gap: 10px;

  &__item {
    @include body-12-regular;
    color: $hover;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.9);
    padding: 6px 10px 6px 10px;
  }
}

@media (max-width: 1200px) {
  .articles-dital-title {
    padding-top: 40px;
  }
}

@media (max-width: 900px) {
  .articles-dital-inner {
    flex-direction: row-reverse;
    align-items: center;
    gap: 34px;
    width: 100%;
  }

  .articles-dital-title {
    font-size: 22px;
    width: 50%;
  }
  .articles-dital-img {
    width: 50%;
    height: 334px;
  }

  .articles-dital-box {
    top: 88%;
    left: 9px;
  }
}

@media (max-width: 740px) {
  .articles-dital-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .articles-dital-title {
    padding: 0;
  }

  .articles-dital-img {
    width: 100%;
  }
}

@media (max-width: 650px) {
  .articles-dital-wrapper {
    margin: 20px auto 80px auto;
  }
  .articles-dital-inner {
    gap: 30px;
  }
  .articles-dital-title {
    padding-top: 30px;
    line-height: unset;
  }
}
</style>
