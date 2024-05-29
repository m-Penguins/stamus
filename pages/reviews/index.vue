<script setup>
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;

const route = useRoute();

const pageSize = ref(12);
const currentPage = ref(route.query.page ?? 1);

const specFilter = ref(route.query.spec);
const serviceFilter = ref(route.query.service);

const totalItems = ref(0);

const totalPages = computed(() =>
  Math.ceil(reviewsData.value?.meta?.pagination?.total / pageSize.value),
);

const handlePageClick = async (page) => {
  currentPage.value = parseInt(page);
  let searchQuery = "";
  if (page != 1) {
    searchQuery = {
      page,
      service: serviceFilter.value,
      spec: specFilter.value,
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

const handleSpecChange = async (spec) => {
  specFilter.value = spec?.id;
  currentPage.value = 1;
  const searchQuery = {
    page: currentPage.value,
    service: serviceFilter.value,
    spec: spec?.id,
  };

  clearObjectFields(searchQuery);

  await navigateTo({
    path: `${route.fullPath}`,
    query: searchQuery,
    replace: true,
  });
};
const handleServiceChange = async (service) => {
  serviceFilter.value = service?.id;
  currentPage.value = 1;
  const searchQuery = {
    page: currentPage.value,
    service: service?.id,
    spec: specFilter.value,
  };

  clearObjectFields(searchQuery);

  await navigateTo({
    path: `${route.fullPath}`,
    query: searchQuery,
    replace: true,
  });
};

const getReviewsData = async () => {
  const strapiQuery = {
    populate: "specialists.*, clinics.*, services.*",
    "pagination[page]": currentPage.value,
    "pagination[pageSize]": pageSize.value,
    "filters[specialists][id][$eq][0]": specFilter.value,
    "filters[services][id][$eq][1]": serviceFilter.value,
    "sort[0]": "date:desc",
  };

  clearObjectFields(strapiQuery);

  const { data: reviewsData } = await useFetch(`${apiBaseUrl}reviews`, {
    query: {
      ...strapiQuery,
    },
  });

  totalItems.value = reviewsData?.value?.meta?.pagination?.total ?? 0;

  return reviewsData;
};

const [{ data: specialistsData }, reviewsData] = await Promise.all([
  useFetch(`${apiBaseUrl}specialists`, {
    query: {
      "pagination[pageSize]": 300,
    },
  }),
  getReviewsData(),
]);

const baseDataStore = useBaseDataStore();

const servicesData = baseDataStore.allServices;

const filteredReviews = computed(() => mapReviews(reviewsData?.value?.data));

const allSpecialists = [...specialistsData.value?.data]
  ?.map((spec) => ({
    id: spec?.id,
    name: spec?.attributes?.firstName + " " + spec?.attributes?.lastName,
  }))
  ?.filter((el) => el.name)
  ?.sort((a, b) => a.name?.localeCompare(b.name));

const allServices = servicesData?.data
  ?.map((serv) => ({
    id: serv?.id,
    name: serv?.attributes?.heading,
  }))
  .filter((el) => el.name);

watch(
  () => route.query,
  async () => {
    const data = await getReviewsData();
    reviewsData.value = data.value;
  },
);

const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Отзывы",
    url: "/",
  },
];

useHead({
  title: "Более 2 000 отзывов о стоматологии Стамус в Краснодаре",
  meta: [
    {
      name: "twitter:title",
      content: "Более 2 000 отзывов о стоматологии Стамус в Краснодаре",
    },
    {
      property: "og:title",
      content: "Более 2 000 отзывов о стоматологии Стамус в Краснодаре",
    },
    {
      name: "description",
      content:
        "Стоматология Стамус – Победитель в номинации “Лучшая частная стоматология Южного Федерального округа 2023 по мнению пациентов независимого портала ПроДокторов",
    },
    {
      name: "twitter:description",
      content:
        "Стоматология Стамус – Победитель в номинации “Лучшая частная стоматология Южного Федерального округа 2023 по мнению пациентов независимого портала ПроДокторов",
    },
    {
      property: "og:description",
      content:
        "Стоматология Стамус – Победитель в номинации “Лучшая частная стоматология Южного Федерального округа 2023 по мнению пациентов независимого портала ПроДокторов",
    },
    // {
    //   name: "keywords",
    //   content:
    //     "Стамус отзывы, стоматология отзывы, стоматология краснодар отзывы, детская стоматология отзывы, отзывы о врачах стоматология",
    // },
  ],
  link: [{ rel: "canonical", href: "https://stamus.ru" + route.path }],
});

currentPage.value = parseInt(currentPage.value);
</script>

<template>
  <div class="reviews">
    <elements-bread-crumbs :breadcrumbs="breadcrumbs" />
    <div class="reviews-header">
      <h1 class="prices-title">Отзывы</h1>
      <p v-if="totalItems" class="prices-text">
        {{ pluralize(totalItems, ["история", "истории", "историй"]) }} наших
        пациентов
      </p>
      <NuxtLink to="/leave-review" class="button-base review-btn"
        >Оставить отзыв</NuxtLink
      >
    </div>
    <div class="filters-box">
      <elements-custom-select
        :options="allSpecialists"
        label="Выберите врача"
        class="select"
        @select="handleSpecChange"
        :selectedId="specFilter"
      />
      <elements-custom-select
        :options="allServices"
        label="Выберите услугу"
        class="select"
        @select="handleServiceChange"
        :selectedId="serviceFilter"
      />
    </div>
    <template v-if="filteredReviews?.length">
      <div class="reviews-grid">
        <ElementsReviewCard
          v-for="review in filteredReviews"
          :key="review?.id"
          :review="review"
        />
      </div>
    </template>
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
      link-url="/reviews?page=[page]"
      class="pagination"
    />

    <blocks-main-form />
  </div>
</template>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

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

.review-btn {
  @media screen and (max-width: 600px) {
    width: 100%;
  }
}

.reviews {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 20px auto 0 auto;
}

.reviews-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;

  margin-top: 80px;
  margin-bottom: 80px;
}

.prices-title {
  @include body-60-medium;
  color: $dark-blue-subtitle;
  text-align: left;
  line-height: 120%;
}

.prices-text {
  @include body-20-regular;
  color: $gray-text;
}

@media screen and (max-width: 900px) {
  .prices-title {
    font-size: 22px;
  }
  .prices-text {
    font-size: 16px;
  }
  .reviews-header {
    margin-top: 40px;
    margin-bottom: 60px;
  }
}

@media screen and (max-width: 500px) {
  .reviews-header {
    margin-top: 30px;
  }
}

.filters-box {
  width: 100%;
  max-width: 680px;
  gap: 14px;
  align-self: flex-start;
  display: flex;

  margin-bottom: 40px;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

@media screen and (max-width: 1100px) {
  .reviews-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 600px) {
  .reviews-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }

  .filters-box {
    flex-direction: column;
  }
}
</style>
