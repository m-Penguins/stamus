<script setup>
const route = useRoute();

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const pageSize = ref(12);
const currentPage = ref(route.query.page ?? 1);

const clinicFilter = ref(route.query.clinic);
const dirFilter = ref(route.query.dir);
const searchFilter = ref(route.query.search);

const totalItems = ref(0);

const getSpecialistsData = async () => {
  const strapiQuery = {
    populate: "fotoSpecialist.*,direction.*,clinic.*,achievements.icon.*",
    sort: "order:desc",
    "pagination[page]": currentPage.value,
    "pagination[pageSize]": pageSize.value,
    "filters[clinics][id]": clinicFilter.value,
    "filters[direction][id][$eq]": dirFilter.value,
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
  .filter((el) => el.name);

watch(
  () => route.query,
  async () => {
    const data = await getSpecialistsData();
    specialists.value = data.value;
  },
);

const totalPages = computed(() =>
  Math.ceil(specialists.value?.meta?.pagination?.total / pageSize.value),
);

const handlePageClick = async (page) => {
  currentPage.value = page;
  const searchQuery = {
    page,
    dir: clinicFilter.value,
    clinic: clinicFilter.value,
    search: searchFilter.value,
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

const handleSearchChange = async () => {
  currentPage.value = 1;
  const searchQuery = {
    page: currentPage.value,
    dir: clinicFilter.value,
    clinic: clinicFilter.value,
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
    search: searchFilter.value,
  };

  clearObjectFields(searchQuery);

  await navigateTo({
    path: `${route.fullPath}`,
    query: searchQuery,
    replace: true,
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

useHead({
  title: "Врачи стоматологи Стамус и детской клиники СтамусМед",
  meta: [
    {
      name: "twitter:title",
      content: "Врачи стоматологи Стамус и детской клиники СтамусМед",
    },
    {
      property: "og:title",
      content: "Врачи стоматологи Стамус и детской клиники СтамусМед",
    },
    {
      name: "description",
      content:
        "Врачи стоматологи Стамус многократно побеждали в номинациях лучших стоматологов Краснодара. Запись онлайн или по телефону. Смотреть портфолио",
    },
    {
      name: "twitter:description",
      content:
        "Врачи стоматологи Стамус многократно побеждали в номинациях лучших стоматологов Краснодара. Запись онлайн или по телефону. Смотреть портфолио",
    },
    {
      property: "og:description",
      content:
        "Врачи стоматологи Стамус многократно побеждали в номинациях лучших стоматологов Краснодара. Запись онлайн или по телефону. Смотреть портфолио",
    },
    {
      name: "keywords",
      content:
        "Врачи стоматологии, врачи стоматологии краснодар, детская стоматология врачи, врачи стамус, стоматологи краснодар, детские стоматологи краснодар, стоматологи стамус",
    },
  ],
});
</script>

<template>
  <div class="spicialists-page">
    <div class="spicialists-page-wrap">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs" />
      <div class="spicialists-page-title">Специалисты</div>
      <div class="specialist-form">
        <div class="specialist-box">
          <elements-custom-select
            :options="allDirections"
            label="Направление"
            class="select"
            @select="handleDirChange"
            :selectedId="dirFilter"
          />

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
                img: specialist?.attributes?.fotoSpecialist?.data?.attributes
                  ?.formats?.small?.url
                  ? baseUrl +
                    specialist?.attributes?.fotoSpecialist?.data?.attributes
                      ?.formats?.small?.url
                  : baseUrl + imagePlaceholders?.specialists,
                position: specialist?.attributes?.position,
                achievements: specialist?.attributes?.achievements,
              }"
              :isTooltip="true"
            />
          </div>
        </template>
        <div v-else :style="{ textAlign: 'center' }">Никого не найдено</div>
      </div>
      <elements-pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:current-page="handlePageClick"
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
