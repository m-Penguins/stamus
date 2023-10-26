<script setup>
// hides this page
// remove to give access
throw createError({ statusCode: 404, statusMessage: "Page Not Found" });

const assetsStore = useAssets();
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Статьи",
    url: "/articles",
  },
];

const tabs = ref([
  { id: 1, title: "Стоматология" },
  { id: 2, title: "Челюстно-лицевая хирургия" },
  { id: 3, title: "Детская стоматология" },
]);

const selectButton = (id) => {
  selectedTab.value = id;
};

const setCurrentPage = (num) => {
  currentPage.value = num;
};

const [{ data: articlesData }] = await Promise.all([
  useFetch(`${apiBaseUrl}articles`, { query: { populate: "deep" } }),
]);

const articles = articlesData.value?.data?.map((art) => {
  return {
    id: art?.id,
    heading: art?.attributes?.heading,
    img: art?.attributes?.fotoArticles?.data?.attributes?.url
      ? baseUrl + art?.attributes?.fotoArticles?.data?.attributes?.url
      : assetsStore.useAsset("images/articles/articles-dital.png"),
    text: art?.attributes?.text,
    tags: art?.attributes?.tags,
    description: art?.attributes?.description,
  };
});

const selectedTab = ref("");
const currentPage = ref("");

const pageSize = ref(16);
const totalPages = ref(Math.ceil(articles?.length / pageSize.value));
</script>

<template>
  <div class="articles-page">
    <div class="articles-page-wrap">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs" />
      <div class="articles-page-title">Статьи</div>
      <div class="articles-page-btns">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="{ active: selectedButton === tab.id }"
          @click="() => selectButton(tab.id)"
          class="articles-page-btn"
        >
          {{ tab.title }}
          <div
            v-if="selectedButton === tab.id"
            class="articles-page-icon-active"
          >
            <svg
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3.5L9 9.5M3 9.5L9 3.5"
                stroke="white"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </button>
        <!--dd -->
      </div>
      <div class="articles-page-cards">
        <div
          v-for="item in articles"
          :key="item.id"
          class="articles-page-cards-box"
        >
          <elements-article-card class="articles-page-card" :article="item" />
        </div>
      </div>
      <elements-pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:current-page="setCurrentPage"
      />
      <blocks-main-form />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

.articles-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  max-width: 100%;
  margin: 20px auto 0 auto;
}

.articles-page-wrap {
  width: 100%;
}

.articles-page-title {
  @include body-60-medium;
  color: $dark-blue-subtitle;
  padding: 100px 0 30px;
}

.articles-page-btns {
  display: flex;
  gap: 6px;
  padding-bottom: 21px;
  overflow-x: scroll;
  white-space: nowrap;
}

.articles-page-btns::-webkit-scrollbar {
  display: none;
}

.articles-page-btn {
  @include flex-center-center;
  gap: 8px;
  padding: 6px 10px 8px 10px;
  border-radius: 5px;
  background: rgba(35, 45, 91, 0.05);
  color: $hover;
  text-align: center;
  @include body-12-regular;
  border: 1px solid rgba(35, 45, 91, 0.05);
  cursor: pointer;

  &.active {
    background: var(--accent, #232d5b);
    color: white;
  }
}

.articles-page-icon-active {
  display: flex;
  align-items: center;
  width: 12px;
  height: 12px;
}

.articles-page-cards {
  display: flex;
  gap: 40px 16px;
  flex-wrap: wrap;
}

@media (max-width: 1328px) {
  .articles-page-cards-box {
    width: 32%;
  }
}

@media (max-width: 904px) {
  .articles-page-title {
    font-size: 22px;
    line-height: normal;
    padding: 12px 0 30px;
  }
}

@media (max-width: 860px) {
  .articles-page-cards {
    gap: 40px 14px;
  }
  .articles-page-cards-box {
    width: 48.5%;
  }
}

@media (max-width: 550px) {
  .articles-page-cards-box {
    width: 100%;
  }
}
</style>
