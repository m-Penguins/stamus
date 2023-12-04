<script setup>
const router = useRouter();
const route = useRoute();

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const pageSize = ref("12");
const currentPageParam = ref(route.query.page ?? "1");
const filterClinicParam = ref(route.query.clinic ?? "");
const filterDirectionParam = ref(route.query.direction ?? "");
const filterSearchParam = ref(route.query.search ?? "");

const firstQuery = {
  "pagination[page]": currentPageParam.value,
  "pagination[pageSize]": pageSize.value,
  "filters[clinics][id]": filterClinicParam.value,
  "filters[position]": filterDirectionParam.value,
  "filters[fullName][$contains][0]": filterSearchParam.value,
  "filters[fullName][$contains][1]": filterSearchParam.value?.toLowerCase(),
  "filters[fullName][$contains][2]":
    filterSearchParam.value?.charAt(0)?.toUpperCase() +
    filterSearchParam.value?.slice(1)?.toLowerCase(),
};

Object.keys(firstQuery).forEach(
  (key) =>
    (firstQuery[key] === undefined || !firstQuery[key]) &&
    delete firstQuery[key],
);

const [{ data: specialists }, { data: clinics }] = await Promise.all([
  useFetch(`${apiBaseUrl}specialists`, {
    query: {
      ...firstQuery,
      populate: "deep",
      "sort[0]": "order:asc",
    },
  }),
  useFetch(`${apiBaseUrl}clinics`),
]);

if (!specialists.value?.data) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

const clinicsList = clinics.value?.data?.map((cl) => ({
  id: cl?.id,
  name: cl?.attributes?.heading,
  address: cl?.attributes?.address,
}));

const directions = [
  ...new Set(
    specialists.value?.data
      ?.map((sp, ind) => ({
        id: ind + 1,
        name: sp?.attributes?.position,
      }))
      .filter((el) => el.name),
  ),
];

watch(
  () => route.query,
  async () => {
    const newQuery = {
      "pagination[page]": currentPageParam.value,
      "pagination[pageSize]": pageSize.value,
      "filters[clinics][id]": filterClinicParam.value,
      "filters[position]": filterDirectionParam.value,
      "filters[fullName][$contains][0]": filterSearchParam.value,
      "filters[fullName][$contains][1]": filterSearchParam.value?.toLowerCase(),
      "filters[fullName][$contains][2]":
        filterSearchParam.value?.charAt(0)?.toUpperCase() +
        filterSearchParam.value?.slice(1)?.toLowerCase(),
    };

    Object.keys(newQuery).forEach(
      (key) =>
        (newQuery[key] === undefined || !newQuery[key]) && delete newQuery[key],
    );

    const { data } = await useFetch(`${apiBaseUrl}specialists`, {
      query: {
        ...newQuery,
        populate: "deep",
        "sort[0]": "order:asc",
      },
    });
    specialists.value = data.value;
  },
);

const totalPages = computed(() =>
  Math.ceil(specialists.value?.meta?.pagination?.total / pageSize.value),
);

const setCurrentPage = (pageNumber) => {
  currentPageParam.value = pageNumber;

  router.push({
    path: route.path,
    query: {
      ...route.query,
      page: pageNumber,
    },
  });
};

const handleSearchChange = () => {
  setCurrentPage(1);

  const newQuery = {
    search: filterSearchParam.value,
    clinic: filterClinicParam.value,
    direction: filterDirectionParam.value,
    page: 1,
  };

  Object.keys(newQuery).forEach(
    (key) =>
      (newQuery[key] === undefined || !newQuery[key]) && delete newQuery[key],
  );
  router.push({
    path: route.path,
    query: newQuery,
  });
};

const handleDebouncedSearch = useDebounce(handleSearchChange, 500);

const handleInputChange = (value) => {
  filterSearchParam.value = value;
  handleDebouncedSearch();
};

const handleClinicChange = (clinic) => {
  filterClinicParam.value = clinic?.id ? clinic.id : null;

  setCurrentPage(1);

  const newQuery = {
    search: filterSearchParam.value,
    clinic: filterClinicParam.value,
    direction: filterDirectionParam.value,
    page: 1,
  };

  Object.keys(newQuery).forEach(
    (key) =>
      (newQuery[key] === undefined || !newQuery[key]) && delete newQuery[key],
  );

  router.push({
    path: route.path,
    query: newQuery,
  });
};

const handleDirectionChange = (direction) => {
  setCurrentPage(1);
  filterDirectionParam.value = direction?.name ? direction.name : null;

  const newQuery = {
    search: filterSearchParam.value,
    clinic: filterClinicParam.value,
    direction: filterDirectionParam.value,
    page: 1,
  };

  Object.keys(newQuery).forEach(
    (key) =>
      (newQuery[key] === undefined || !newQuery[key]) && delete newQuery[key],
  );

  router.push({
    path: route.path,
    query: newQuery,
  });
};

const assetsStore = useAssets();

const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Специалисты",
    url: "/specialists",
  },
];
</script>

<template>
  <div class="spicialists-page">
    <div class="spicialists-page-wrap">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs" />
      <div class="spicialists-page-title">Специалисты</div>
      <div class="specialist-form">
        <div class="specialist-box">
          <elements-select
            :options="directions"
            :default="
              directions.find(
                (dir) => String(dir.name) === filterDirectionParam,
              )?.name ?? 'Направление'
            "
            label="Направление"
            class="select"
            @input="handleDirectionChange"
            :isSelectedId="filterDirectionParam ?? route.query.direction"
            :selectedItem="
              directions.find((dir) => dir.name === filterDirectionParam)
            "
          />
          <elements-select
            :options="clinicsList"
            :default="
              clinicsList.find(
                (cl) => String(cl.id) === String(filterClinicParam),
              )?.name ?? 'Клиника'
            "
            :isSelectedId="filterClinicParam ?? route.query.clinic"
            :selectedItem="
              clinicsList.find((cl) => cl.id === filterClinicParam)
            "
            label="Клиника"
            class="select"
            @input="handleClinicChange"
          />
        </div>
        <div class="specialist-box width-style">
          <div class="input-search">
            <elements-input-search-components
              class="input-search"
              placeholder="Найти"
              :modelValue="filterSearchParam"
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
            :key="specialist.id"
          >
            <elements-name-specialty-photo-card
              :is-link="true"
              :specialists="{
                id: specialist?.id,
                name:
                  specialist?.attributes?.firstName +
                  ' ' +
                  specialist?.attributes?.lastName,
                img: specialist?.attributes?.fotoSpecialist?.data?.attributes
                  ?.url
                  ? baseUrl +
                    specialist?.attributes?.fotoSpecialist?.data?.attributes
                      ?.url
                  : assetsStore.useAsset('images/no-photo.png'),
                position: specialist?.attributes?.position,
                achievements: specialist?.attributes?.achievements,
              }"
              :isTooltip="true"
            />
          </div>
        </template>
        <div v-else>Никого не найдено</div>
      </div>
      <elements-pagination
        :current-page="currentPageParam"
        :total-pages="totalPages"
        @update:current-page="setCurrentPage"
      />
      <blocks-main-popular-services />
      <blocks-main-form />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";

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
  width: 50%;
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
    flex-wrap: wrap;
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
