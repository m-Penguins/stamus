<script setup>
const route = useRoute();

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;
const placeholdersStore = usePlaceholdersStore();

const pageSize = ref(12);
const currentPage = ref(route.query.page ?? 1);

const clinicFilter = ref(route.query.clinic);
const dirFilter = ref(route.query.dir);
const positionFilter = ref(route.query.position);
const searchFilter = ref(route.query.search);
const positionMeta = ref(null);

const totalItems = ref(0);

const { data: newPositions } = await useFetch(`${apiBaseUrl}speczialnostis`, {
  query: {
    populate: blocksQuey,
  },
});

const allPositions = newPositions.value?.data?.map((el) => ({
  slug: el?.attributes?.slug,
  name: el?.attributes?.title,
  id: el?.id,
  meta: el?.attributes?.meta,
}));

if (positionFilter.value) {
  const currentPosition = allPositions?.find(
      (position) => position.slug === positionFilter.value
  );
  if (currentPosition) {
    positionMeta.value = currentPosition.meta;
  }
}
const getSpecialistsData = async () => {
  const positionQ = allPositions?.find(
      (el) => el?.id === Number(positionFilter.value)
  )?.name;

  const strapiQuery = {
    populate:
      "fotoSpecialist.*,direction.*,clinic.*,achievements.icon.*,blocks.item.*,blocks.item.icon.*",
    sort: "order:asc",
    "pagination[page]": currentPage.value,
    "pagination[pageSize]": pageSize.value,
    "filters[clinics][id]": clinicFilter.value,
    "filters[speczialnosti][slug][$eq]": route.query.position,
    "filters[directions][id][$eq]": dirFilter.value,
    "filters[fullName][$contains][0]": searchFilter.value?.toUpperCase(),
    "filters[fullName][$contains][1]": searchFilter.value?.toLowerCase(),
    "filters[fullName][$contains][2]":
        searchFilter.value?.charAt(0)?.toUpperCase() +
        searchFilter.value?.slice(1)?.toLowerCase(),
  };

  clearObjectFields(strapiQuery);

  const { data: specialistsData } = await useFetch(`${apiBaseUrl}specialists`, {
    query: { ...strapiQuery },
  });
  placeholdersStore.teamTotalPages = specialistsData?.value?.meta?.pagination?.pageCount;
  totalItems.value = specialistsData?.value?.meta?.pagination?.total ?? 0;

  return specialistsData;
};

const specialists = await getSpecialistsData();

const baseDataStore = useBaseDataStore();

const allClinics = baseDataStore.clinics?.data?.map((cl) => ({
  id: cl?.id,
  name: cl?.attributes?.heading,
}));

const allDirections = baseDataStore.directions?.data
    ?.map((dir) => ({
      id: dir?.id,
      name: dir?.attributes?.heading,
    }))
    .filter((el) => el.name && el?.id !== 4);

watch(
    () => route.query,
    async () => {
      const data = await getSpecialistsData();
      specialists.value = data.value;
    }
);

const totalPages = computed(() =>
    Math.ceil(specialists.value?.meta?.pagination?.total / pageSize.value)
);

const handlePageClick = async (page) => {
  currentPage.value = page;
  const searchQuery = page !== 1
      ? {
        page,
        dir: dirFilter.value,
        clinic: clinicFilter.value,
        search: searchFilter.value,
        position: route.query.position,
      }
      : {
        position: route.query.position
      };
  console.log(searchQuery)
  clearObjectFields(searchQuery);

  await navigateTo({
    path: `${route.fullPath}`,
    query: searchQuery,
    replace: true,
  });

  if (window) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const handleSearchChange = async () => {
  currentPage.value = 1;
  const searchQuery = {
    page: currentPage.value,
    dir: dirFilter.value,
    clinic: clinicFilter.value,
    position: route.query.position,
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

const handleClinicChange = async (clinic) => {
  clinicFilter.value = clinic?.id;
  currentPage.value = 1;
  const searchQuery = {
    page: currentPage.value,
    dir: dirFilter.value,
    clinic: clinic?.id,
    position: route.query.position,
    search: searchFilter.value,
  };

  clearObjectFields(searchQuery);

  await navigateTo({
    path: `${route.fullPath}`,
    query: searchQuery,
    replace: true,
  });
};

const handleDirChange = async (dir) => {
  dirFilter.value = dir?.id;
  currentPage.value = 1;
  const searchQuery = {
    page: currentPage.value,
    dir: dir?.id,
    clinic: clinicFilter.value,
    position: positionFilter.value,
    search: searchFilter.value,
  };

  clearObjectFields(searchQuery);

  await navigateTo({
    path: `${route.fullPath}`,
    query: searchQuery,
    replace: true,
  });
};

// Генерация мета-данных
const generateMeta = (positionMeta) => ({
  title: positionMeta?.metaTitle || "Врачи стоматологи Стамус в Краснодаре",
  meta: [
    {
      name: "twitter:title",
      content: positionMeta?.metaTitle || "Врачи стоматологи Стамус в Краснодаре",
    },
    {
      property: "og:title",
      content: positionMeta?.metaTitle || "Врачи стоматологи Стамус в Краснодаре",
    },
    {
      name: "description",
      content:
          positionMeta?.metaDescription ||
          "Врачи стоматологи Стамус в Краснодаре: все сотрудники стоматологической клиники.",
    },
    {
      name: "twitter:description",
      content:
          positionMeta?.metaDescription ||
          "Врачи стоматологи Стамус в Краснодаре: все сотрудники стоматологической клиники.",
    },
    {
      property: "og:description",
      content:
          positionMeta?.metaDescription ||
          "Врачи стоматологи Стамус в Краснодаре: все сотрудники стоматологической клиники.",
    },
  ],
  link: [{ rel: "canonical", href: baseUrl + route.path }],
});

watch(
    positionMeta,
    (newMeta) => {
      if (newMeta) {
        useHead(generateMeta(newMeta));
      }
    },
    { immediate: true }
);

watch(
    () => route.query.position,
    async (newPosition, oldPosition) => {
      if (newPosition !== oldPosition) {
        currentPage.value = 1;
        const data = await getSpecialistsData();
        specialists.value = data.value;
      }
    }
);

useHead(generateMeta(positionMeta.value));
</script>


<template>
  <div class="spicialists-page">
    <div class="spicialists-page-wrap">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs" />
      <h1 class="spicialists-page-title">Наши Врачи</h1>
      <div class="specialist-form">
        <div class="specialist-box">
          <!-- <elements-custom-select
            :options="allDirections"
            label="Направление"
            class="select"
            @select="handleDirChange"
            :selectedId="dirFilter"
          /> -->

          <elements-custom-select
            :options="allClinics"
            label="Клиника"
            class="select"
            @select="handleClinicChange"
            :selectedId="clinicFilter"
          />
        </div>
        <div class="specialist-box width-style">
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
      <div class="spicialists-page-cards">
        <template v-if="specialists?.data?.length > 0">
          <div
            class="spicialists-page-card"
            v-for="specialist in specialists?.data"
            :key="specialist?.id"
          >
            <elements-name-specialty-photo-card
              :is-link="true"
              :specialists="{
                id: specialist?.id,
                name:
                  specialist?.attributes?.firstName +
                  ' ' +
                  specialist?.attributes?.lastName,
                img:
                  specialist?.attributes?.fotoSpecialist?.data?.attributes
                    ?.url ?? placeholdersStore?.imagePlaceholders?.specialists,
                alt: specialist?.attributes?.fotoSpecialist?.data?.attributes
                  ?.alternativeText,
                position: specialist?.attributes?.position,
                achievements: specialist?.attributes?.blocks?.find(
                  (component) =>
                    component.__component === 'blocks-story.achievements',
                ),
              }"
              :isTooltip="true"
            />
          </div>
        </template>
        <div v-else :style="{ textAlign: 'center' }">Никого не найдено</div>
      </div>
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
        link-url="/team?page=[page]"
        class="pagination"
      />
      <blocks-main-popular-services />
      <blocks-main-form />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";

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

.width-style {
  width: 24% !important;
}
.input-search {
  width: 100%;
}

.spicialists-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  max-width: 100%;
  margin: 20px auto 0 auto;
}

.spicialists-page-wrap {
  width: 100%;
}

.spicialists-page-title {
  @include body-60-medium;
  color: $dark-blue-subtitle;
  padding: 100px 0;
}

.specialist-form {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  padding-bottom: 40px;
}

.spicialists-page-cards {
  display: flex;
  gap: 40px 16px;
  flex-wrap: wrap;
}

.spicialists-page-card {
  max-width: 308px;
}

.specialist-box {
  display: flex;
  gap: 20px;
  width: 75%;
}

.select {
  flex-basis: 32%;
  max-width: 32%;
}

@media (max-width: 1351px) {
  .width-style {
    width: 33% !important;
  }
  .spicialists-page-card {
    max-width: 334px;
  }
  .specialist-box {
    width: 66%;
  }
}

@media (max-width: 1328px) {
  .spicialists-page-card {
    width: 32%;
    max-width: 100%;
  }
}

@media (max-width: 1201px) {
  .spicialists-page-title {
    padding: 50px 0 100px;
  }
}

@media (max-width: 1098px) {
  .spicialists-page-card {
    width: 48.5%;
  }
}

@media (max-width: 1000px) {
  .specialist-box {
    width: 100%;
  }
  .specialist-form {
    flex-wrap: wrap;
  }
  .width-style {
    width: 100% !important;
  }
}

@media (max-width: 904px) {
  .spicialists-page-title {
    font-size: 22px;
    line-height: normal;
    padding: 10px 0 100px;
  }
  // .spicialists-page-card {
  //   max-width: 334px;
  // }
  .spicialists-page-cards {
    gap: 40px 14px;
  }
}

@media (max-width: 676px) {
  .spicialists-page-title {
    padding: 10px 0 50px;
  }
  .specialist-form {
    flex-wrap: wrap;
  }

  .specialist-box {
    width: 100%;
    flex-direction: column;
  }
  .select {
    flex-basis: unset;
    max-width: 100%;
  }
  .spicialists-page-cards {
    justify-content: center;
  }
}

@media (max-width: 590px) {
  .spicialists-page-card {
    width: 100%;
  }
}

@media (max-width: 506px) {
  .spicialists-page-card {
    max-width: 100%;
  }
}
</style>
