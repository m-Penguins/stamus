<template>
  <div class="vacancy-page">
    <DynamicBlockHero
        title="Наши вакансии"
        text="В нашей компании вы найдете единомышленников, кому нравится познавать мир и внедрять новое в уже привычные процессы"
        :imgBg="mainImg"
        :imgAlt="mainImgAlt"
        :breadcrumbs="breadcrumbs"
        :link="mainInfo?.link"
        link_text="Узнать вакансии"
    />
    <div class="vacancy-page-wrapper">
      <DynamicBlockOpisanie
          :block="descriptionBlock"
      />
      <div class="vacancy-page-search">
        <h1 class="vacancy-page-search-title">Мы в поисках</h1>
        <div class="vacancy-page-form">
          <div class="vacancy-page-form-left">
            <elements-custom-select
                :options="allPositions"
                label="Врачебная должность"
                class="select"
                @select="handlePositionChange"
                :selectedId="positionFilter"
            />
            <elements-custom-select
                :options="allClinics"
                label="Выберите клинику"
                class="select"
                @select="handleClinicChange"
                :selectedId="clinicFilter"
            />
          </div>
          <elements-input-search-components
              class="input-search"
              placeholder="Найти"
              :modelValue="searchFilter"
              @update:modelValue="handleInputChange"
              @submit="handleInputChange"
          />
        </div>
        <div class="vacancy-page-cards">
          <elements-vacancy-card v-for="vacancy in vacancies" :key="vacancy.id" :vacancy="vacancy"/>
        </div>
      </div>
      <BlocksVacancyForm/>
      <blocks-clinics-photo-block :clinics-data="clinicsData" />
      <DynamicBlockBlog :block="{ articles: articles }" />
      <DynamicBlockGalereya :block="{ gallery: gallery }" />

    </div>
  </div>
</template>

<script setup>
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;
const route = useRoute();
const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Вакансии",
    url: `/${route.params?.direction}`,
  },
];

const {data: positions} = await useFetch(`${apiBaseUrl}vacancies`, {
  query: {
    populate: "position"
  }
});

const { data: clinicsData } = await useFetch(`${apiBaseUrl}clinics`, {
    query: {
      populate: "photoBanner.*",
    },
  }
)


const allPositions = [
  ...new Set(
      positions.value?.data
          ?.map((el) => el?.attributes?.position)
          ?.filter(Boolean),
  ),
]
    ?.sort()
    .map((el, index) => ({
      id: index + 1,
      name: el,
    }));

const { data: vacancyData } = await useFetch(`${apiBaseUrl}vakansii`, {
  query: {
    populate: blocksQuey + 'title.*, about.*, about.image.*, image.*, articles.*, articles.articles.*, gallery.*, gallery.gallery.*',
  },
});


const mainInfo = vacancyData?.value?.data?.attributes;
const articles = mainInfo.articles?.articles
const gallery = mainInfo.gallery?.gallery

const mainImg =
    mainInfo?.image?.data?.attributes?.url ??
    placeholdersStore?.imagePlaceholders?.services;

const mainImgAlt = mainInfo?.image?.data?.attributes?.alternativeText;

const descriptionBlock = mainInfo.about

const positionFilter = ref(route.query.position);
const clinicFilter = ref(route.query.clinic);
const searchFilter = ref(route.query.search);
const baseDataStore = useBaseDataStore();
const currentPage = ref(route.query.page ?? 1);

const getVacanciesData = async () => {
  const positionQ = allPositions?.find(
      (el) => el?.id === Number(positionFilter.value),
  )?.name;
  const strapiQuery = {
    populate: blocksQuey + 'title.*, about.*, about.image.*, image.*, clinic.*, clinics.*',
    "filters[clinics][id]": clinicFilter.value,
    "filters[position][$eq][21]": positionQ,
    "filters[title][$contains][0]": searchFilter.value?.toUpperCase(),
    "filters[title][$contains][1]": searchFilter.value?.toLowerCase(),
    "filters[title][$contains][2]":
        searchFilter.value?.charAt(0)?.toUpperCase() +
        searchFilter.value?.slice(1)?.toLowerCase(),
  };
  clearObjectFields(strapiQuery);

  const {data: vacanciesData} = await useFetch(`${apiBaseUrl}vacancies`, {
    query: strapiQuery
  });
  return vacanciesData;
};

const vacanciesData = await getVacanciesData()
const vacancies = computed(() =>
    vacanciesData.value?.data?.map((v) => {
      return {
        id: v?.id,
        title: v?.attributes?.title,
        description: v?.attributes?.description,
        img:
            v?.attributes?.image?.data?.attributes?.url ??
            placeholdersStore?.imagePlaceholders?.portfoliosSmall,
        alt: v?.attributes?.image?.data?.attributes?.alternativeText,
        clinic: v?.attributes?.clinics?.data[0]?.attributes?.heading,
        salary: v?.attributes?.salary,
      };
    }),
);
const allClinics = baseDataStore.clinics?.data?.map((cl) => ({
  id: cl?.id,
  name: cl?.attributes?.heading,
}));

const handlePositionChange = async (position) => {
  positionFilter.value = position?.id;
  currentPage.value = 1;
  const searchQuery = {
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

const handleClinicChange = async (clinic) => {
  clinicFilter.value = clinic?.id;
  currentPage.value = 1;
  const searchQuery = {
    clinic: clinic?.id,
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

const handleSearchChange = async () => {
  currentPage.value = 1;
  const searchQuery = {
    dir: clinicFilter.value,
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

const handleDebouncedSearch = useDebounce(handleSearchChange, 500);

const handleInputChange = (value) => {
  searchFilter.value = value;
  handleDebouncedSearch();
};

watch(
    () => route.query,
    async () => {
      const data = await getVacanciesData();
      vacanciesData.value = data.value;
    },
);

</script>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";

.vacancy-page {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  font-family: Manrope, serif;

  &-search {
    display: flex;
    flex-direction: column;

    &-title {
      font-weight: 500;
      font-size: 22px;
      color: #1E2433;
    }
  }

  &-form {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    &-left {
      width: 100%;
      max-width: 632px;
      display: flex;
      gap: 16px;
      @media (max-width: 1000px) {
        max-width: none;
        gap: 14px;
      }
    }

    @media (max-width: 1000px) {
      flex-wrap: wrap;
      gap: 10px;
    }

    @media (max-width: 500px) {
      flex-direction: column;
      gap: 10px;
      &-left {
        flex-direction: column;
        max-width: none;
        gap: 10px;
      }
    }
  }

  &-wrapper {
    display: flex;
    width: 1280px;
    max-width: 100%;
    margin: 20px auto 0 auto;
    flex-direction: column;
    gap: 100px;
  }

  &-cards {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    @media (max-width: 1000px) {
      gap: 10px;
    }
  }
}

.input-search, .select {
  @media (max-width: 1000px) {
    max-width: none;
    width: 100%;
  }
}
</style>
