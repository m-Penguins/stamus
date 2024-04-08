<script setup>
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const placeholdersStore = usePlaceholdersStore();
const route = useRoute();

const pageSize = ref(12);
const currentPage = ref(route.query.page ?? 1);

// dir = service
const dirFilter = ref(route.query.dir);
const searchFilter = ref(route.query.search);

// specialist filter
const specFilter = ref(route.query.specialist);

const totalItems = ref(0);

const totalPages = computed(() =>
  Math.ceil(portfoliosData.value?.meta?.pagination?.total / pageSize.value),
);

const handlePageClick = async (page) => {
  currentPage.value = page;
  let searchQuery = "";
  if (page != 1) {
    searchQuery = {
      page,
      dir: dirFilter.value,
      search: searchFilter.value,
    };
  }

  clearObjectFields(searchQuery);

  await navigateTo({
    path: `${route.fullPath}`,
    query: searchQuery,
    replace: true,
  });

  if (window) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

const handleDirChange = async (dir) => {
  dirFilter.value = dir?.id;
  currentPage.value = 1;
  const searchQuery = {
    page: currentPage.value,
    dir: dir?.id,
    search: searchFilter.value,
  };

  clearObjectFields(searchQuery);

  await navigateTo({
    path: `${route.fullPath}`,
    query: searchQuery,
    replace: true,
  });
};

const handleSearchChange = async () => {
  currentPage.value = 1;
  const searchQuery = {
    page: currentPage.value,
    dir: dirFilter.value,
    search: searchFilter.value,
  };

  clearObjectFields(searchQuery);

  await navigateTo({
    path: `${route.fullPath}`,
    query: searchQuery,
    replace: true,
  });
};

const handleDebouncedSearch = useDebounce(handleSearchChange, 500);

const handleInputChange = (value) => {
  searchFilter.value = value;
  handleDebouncedSearch();
};

const getPortfoliosData = async () => {
  const strapiQuery = {
    populate: "napravleniya_uslug_1.*,photoBanner.*,infoBlock.*",
    "pagination[page]": currentPage.value,
    "pagination[pageSize]": pageSize.value,
    "filters[specialists][id][$eq][4]": specFilter.value,
    "filters[services][id][$eq][1]": dirFilter.value,
    "filters[heading][$contains][0]": searchFilter.value?.toLowerCase(),
    "filters[heading][$contains][1]": searchFilter.value?.toUpperCase(),
    "filters[heading][$contains][2]":
      searchFilter.value?.charAt(0)?.toUpperCase() +
      searchFilter.value?.slice(1)?.toLowerCase(),
  };

  clearObjectFields(strapiQuery);

  const { data: portfoliosData } = await useFetch(`${apiBaseUrl}portofolios`, {
    query: { ...strapiQuery },
  });

  totalItems.value = portfoliosData?.value?.meta?.pagination?.total ?? 0;

  return portfoliosData;
};

const portfoliosData = await getPortfoliosData();

const baseDataStore = useBaseDataStore();

const allServices = baseDataStore.allServices?.data
  ?.map((dir) => ({
    id: dir?.id,
    name: dir?.attributes?.heading,
  }))
  .filter((el) => el.name);

const portfolios = computed(() =>
  portfoliosData.value?.data?.map((p) => {
    return {
      id: p?.id,
      name: p?.attributes?.heading,
      category: p?.attributes?.direction?.directions,
      description: p?.attributes?.description,
      img:
        p?.attributes?.photoBanner?.data?.attributes?.url ??
        placeholdersStore?.imagePlaceholders?.portfoliosSmall,
      alt: p?.attributes?.photoBanner?.data?.attributes?.alternativeText,
    };
  }),
);

watch(
  () => route.query,
  async () => {
    const data = await getPortfoliosData();
    portfoliosData.value = data.value;
  },
);

const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Портфолио",
    url: "/portfolio",
  },
];

const mockGallery = portfolioGallery.map((img) => `images/gallery/${img}`);

useHead({
  title: "Портфолио клиник Стамус. Работы До - После врачей",
  meta: [
    {
      name: "twitter:title",
      content: "Портфолио клиник Стамус. Работы До - После врачей",
    },
    {
      property: "og:title",
      content: "Портфолио клиник Стамус. Работы До - После врачей",
    },
    {
      name: "description",
      content:
        "Портфолио врачей Стамус одно из самых больших в России. Работы До - После стоматологов клиник Стамус. Кейсы по имплантации, протезированию и другим услугам.",
    },
    {
      name: "twitter:description",
      content:
        "Портфолио врачей Стамус одно из самых больших в России. Работы До - После стоматологов клиник Стамус. Кейсы по имплантации, протезированию и другим услугам.",
    },
    {
      property: "og:description",
      content:
        "Портфолио врачей Стамус одно из самых больших в России. Работы До - После стоматологов клиник Стамус. Кейсы по имплантации, протезированию и другим услугам.",
    },
    {
      name: "keywords",
      content:
        "портфолио стоматолог, портфолио стамус, работы до после стоматолога, работы до после стамус",
    },
  ],
});
</script>

<template>
  <div class="portfolio-page">
    <div class="portfolio-page-wrap">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs" />
      <div class="portfolio-page-title">Портфолио</div>
      <div class="portfolio-page-text">
        На странице представлены работы наших клиник. <br />
        Вы можете отфильтровать их по услуге или ввести свой запрос в поиск
      </div>
      <div class="portfolio-form">
        <div class="portfolio-box">
          <elements-custom-select
            :options="allServices"
            label="Выберите услугу"
            class="select"
            @select="handleDirChange"
            :selectedId="dirFilter"
          />
        </div>
        <div class="portfolio-box-search">
          <div class="input-search">
            <elements-input-search-components
              class="input-search"
              placeholder="Найти"
              :modelValue="searchFilter"
              @update:modelValue="handleInputChange"
              @submit="handleInputChange"
            />
          </div>
        </div>
      </div>
      <div v-if="portfolios?.length" class="portfolio-page-cards">
        <div
          class="portfolio-page-card"
          v-for="item in portfolios"
          :key="item.id"
        >
          <elements-cases-direction-card :direction="item" />
        </div>
      </div>
      <div v-else :style="{ textAlign: 'center' }">Ничего не найдено</div>
      <vue-awesome-paginate
        v-model="currentPage"
        :total-items="totalItems"
        :items-per-page="pageSize"
        :max-pages-shown="3"
        :on-click="handlePageClick"
        paginate-buttons-class="btn"
        active-page-class="btn-active"
        back-button-class="back-btn"
        next-button-class="next-btn"
        :show-breakpoint-buttons="true"
        :hide-prev-next="true"
        type="link"
        link-url="/portfolio?page=[page]"
        class="pagination"
      />
      <blocks-gallery :arrayImg="mockGallery" local />
      <blocks-main-form />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/style.scss";

/* Pagination */
.pagination-container {
  width: 100%;
  display: flex !important;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 40px 0 90px;
}
.pagination:deep(.btn) {
  @include body-14-regular;
  height: 30px;
  width: 38px;
  cursor: pointer;
  color: $gray-text;
  display: flex;
  justify-content: center;
  align-items: center !important;
  transition: all 0.2s ease-in-out;
  &:not(.active):hover {
    border-radius: 5px;
    background: #f0f0f0;
    color: #232d5b;
  }
}
.pagination:deep(.btn-active) {
  border-radius: 5px;
  border: 1px solid var(--dissabled, #cfd5e1);
  padding: 4px 10px;
  cursor: default;
}
/* End of Pagination */
.input-search {
  width: 308px;
}

.select {
  width: 308px;
}

.portfolio-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  max-width: 100%;
  margin: 20px auto 0 auto;
}

.portfolio-page-wrap {
  width: 100%;
}

.portfolio-page-title {
  @include body-60-medium;
  color: $dark-blue-subtitle;
  padding: 100px 0 30px;
}

.portfolio-page-text {
  @include body-20-regular;
  color: $gray-text;
  padding-bottom: 100px;
}

.portfolio-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 40px;
}

.portfolio-page-cards {
  display: flex;
  gap: 40px 16px;
  flex-wrap: wrap;
  /* justify-content: space-between; */
}

.portfolio-page-card {
  max-width: 308px;
}

.portfolio-box {
  display: flex;
  gap: 16px;
  margin-right: 16px;
}

@media (max-width: 1328px) {
  .portfolio-page-card {
    width: 32%;
    max-width: 100%;
  }
}

@media (max-width: 1201px) {
  .portfolio-page-title {
    padding: 50px 0 100px;
  }
}

@media (max-width: 1098px) {
  .service-form {
    flex-wrap: wrap;
    gap: 10px;
  }
}

@media (max-width: 1017px) {
  .portfolio-form {
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 60px;
  }

  .portfolio-box {
    margin-right: 0;
    width: 100%;
  }

  .portfolio-box-search {
    width: 100%;
  }

  .input-search {
    width: 100%;
  }

  .select {
    width: 100%;
  }
}

@media (max-width: 904px) {
  .portfolio-page-title {
    font-size: 22px;
    line-height: normal;
    padding: 10px 0 30px;
  }

  .portfolio-page-text {
    font-size: 16px;
  }

  .portfolio-page-cards {
    gap: 40px 14px;
  }
}

@media (max-width: 860px) {
  .portfolio-page-card {
    width: 48.5%;
  }
}

@media (max-width: 676px) {
  .portfolio-page-title {
    padding: 10px 0 30px;
  }
  .portfolio-form {
    flex-wrap: wrap;
    padding-bottom: 40px;
  }

  .portfolio-box {
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
  }

  .portfolio-page-text {
    padding: 0 0 30px;
  }
}

@media (max-width: 550px) {
  .portfolio-page-card {
    width: 100%;
  }
}
</style>
