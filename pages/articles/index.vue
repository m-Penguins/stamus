<script setup>
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;

const placeholdersStore = usePlaceholdersStore();

const route = useRoute();

const pageSize = ref(12);
const currentPage = ref(route.query.page ?? 1);

const tagFilter = ref(route.query.tag ?? []);

const totalItems = ref(0);

const totalPages = computed(() =>
  Math.ceil(articlesData.value?.meta?.pagination?.total / pageSize.value),
);

const handlePageClick = async (page) => {
  currentPage.value = page;
  const searchQuery = {
    page,
    tag: tagFilter.value,
  };

  clearObjectFields(searchQuery);

  if (window) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  await navigateTo({
    path: `${route.fullPath}`,
    query: searchQuery,
    replace: true,
  });
};

const handleTagClick = async (tag) => {
  if (!tagFilter.value?.includes(tag)) {
    tagFilter.value.push(tag);
    currentPage.value = 1;
    const searchQuery = {
      page: currentPage.value,
      tag: tagFilter.value,
    };

    clearObjectFields(searchQuery);

    await navigateTo({
      path: `${route.fullPath}`,
      query: searchQuery,
      replace: true,
    });
  } else {
    tagFilter.value = tagFilter.value?.filter((el) => el !== tag);
    currentPage.value = 1;
    const searchQuery = {
      page: currentPage.value,
      tag: tagFilter.value,
    };

    clearObjectFields(searchQuery);

    await navigateTo({
      path: `${route.fullPath}`,
      query: searchQuery,
      replace: true,
    });
  }
};

const getArticlesData = async () => {
  const strapiQuery = {
    populate: "napravleniya_uslug_1.*, fotoArticles.*, services.*",
    "pagination[page]": currentPage.value,
    "pagination[pageSize]": pageSize.value,
    "filters[tag_category][$in]": tagFilter.value,
  };

  clearObjectFields(strapiQuery);

  const { data: articlesData } = await useFetch(`${apiBaseUrl}articles`, {
    query: {
      ...strapiQuery,
    },
  });

  totalItems.value = articlesData?.value?.meta?.pagination?.total ?? 0;

  return articlesData;
};

const articlesData = await getArticlesData();

const filteredArticles = computed(() =>
  articlesData.value?.data?.map((art) => {
    return {
      id: art?.id,
      heading: art?.attributes?.heading,
      img:
        art?.attributes?.fotoArticles?.data?.attributes?.url ??
        placeholdersStore?.imagePlaceholders?.articles,
      alt: art?.attributes?.fotoArticles?.data?.attributes?.alternativeText,
      text: art?.attributes?.text,
      tags: art?.attributes?.tag_category,
      description: art?.attributes?.description,
    };
  }),
);

const allTags = articlesData.value?.data
  ?.map((art) => art?.attributes?.tag_category)
  ?.filter(Boolean);

const uniqueTags = [...new Set(allTags)];

watch(
  () => route.query,
  async () => {
    const data = await getArticlesData();
    articlesData.value = data.value;
  },
);

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

useHead({
  title: "Статьи для пациентов в детской и взрослой стоматологии",
  meta: [
    {
      name: "twitter:title",
      content: "Статьи для пациентов в детской и взрослой стоматологии",
    },
    {
      property: "og:title",
      content: "Статьи для пациентов в детской и взрослой стоматологии",
    },
    {
      name: "description",
      content:
        "Блог Стамус о стоматологии и детской стоматологии. Рекомендации врачей детской клиники СтамусМед, а также новости из жизни клиник Стамус",
    },
    {
      name: "twitter:description",
      content:
        "Блог Стамус о стоматологии и детской стоматологии. Рекомендации врачей детской клиники СтамусМед, а также новости из жизни клиник Стамус",
    },
    {
      property: "og:description",
      content:
        "Блог Стамус о стоматологии и детской стоматологии. Рекомендации врачей детской клиники СтамусМед, а также новости из жизни клиник Стамус",
    },
    {
      name: "keywords",
      content:
        "Блог стамус, блог стамусмед, статьи стамус, блог детской стоматологии, рекомендации стоматологии. рекомендации детской стоматологии",
    },
  ],
});
</script>

<template>
  <div class="articles-page">
    <div class="articles-page-wrap">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs" />
      <div class="articles-page-title">Статьи</div>
      <p class="contacts-page-text">
        Отвечаем на актуальные медицинские вопросы, <br />
        рассказываем о жизни клиник и делимся новостями.
      </p>
      <div class="articles-page-btns">
        <button
          v-for="(tag, index) in uniqueTags"
          :key="index"
          :class="{ active: tagFilter?.includes(tag) }"
          @click.stop="handleTagClick(tag)"
          class="articles-page-btn"
        >
          {{ tag }}
          <div
            v-if="tagFilter?.includes(tag)"
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
      </div>
      <div class="articles-page-cards" v-if="filteredArticles?.length">
        <div
          v-for="item in filteredArticles"
          :key="item.id"
          class="articles-page-cards-box"
        >
          <elements-article-card class="articles-page-card" :article="item" />
        </div>
      </div>
      <div v-else :style="{ textAlign: 'center' }">Ничего не найдено</div>
      <elements-pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:current-page="handlePageClick"
      />
      <blocks-main-form />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

.contacts-page-text {
  @include body-20-regular;
  color: $gray-text;
  padding-bottom: 100px;
}

@media (max-width: 904px) {
  .contacts-page-text {
    font-size: 16px;
  }
}

@media (max-width: 676px) {
  .contacts-page-text {
    padding: 0 0 60px;
  }
}

.filters-box {
  width: 100%;
  max-width: 308px;
  gap: 14px;
  align-self: flex-start;
  display: flex;

  margin-bottom: 40px;
}

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
