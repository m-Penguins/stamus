<template>
  <div class="vacancy-page">
    <DynamicBlockHero
        title="Учебный центр"
        text="Небольшое описание в несколько строчек"
        :imgBg="mainImg"
        :imgAlt="mainImgAlt"
        :breadcrumbs="breadcrumbs"
        link_text="Узнать вакансии"
        :none-btn="true"
    />
    <div class="vacancy-page-wrapper">
      <DynamicBlockOpisanie
          :block="descriptionBlock"
      />
      <div class="vacancy-page-search">
        <h1 class="vacancy-page-search-title">Наши курсы</h1>
        <div class="vacancy-page-form">
          <elements-custom-radio
              :modelValue="selectedOption"
              :options="radioOptions"
              @update:modelValue="handleOptionChange"
          />
          <elements-input-search-components
              class="input-search"
              placeholder="Найти"
              :modelValue="searchFilter"
              @update:modelValue="handleInputChange"
              @submit="handleInputChange"
          />
        </div>
        <div class="vacancy-page-cards course-view-normal">
          <elements-course-card v-for="item in courses" :direction="item"/>
        </div>
        <div class="vacancy-page-cards course-view-slider">
          <BlocksCoursesSlider :courses="courseData"/>
        </div>

      </div>
      <div class="vacancy-page-search">
        <h1 class="vacancy-page-search-title">Архив курсов</h1>
        <div class="vacancy-page-form">
          <elements-custom-radio
              :modelValue="archiveSelectedOption"
              :options="radioOptions"
              @update:modelValue="handleArchiveOptionChange"
          />
          <elements-input-search-components
              class="input-search"
              placeholder="Найти"
              :modelValue="searchArchiveFilter"
              @update:modelValue="handleArchiveInputChange"
              @submit="handleArchiveInputChange"
          />
        </div>
        <div class="vacancy-page-cards">
          <BlocksCoursesSlider :courses="archiveCourseData"/>
        </div>
      </div>
      <BlocksEducationForm/>
      <LazyBlocksClinicMap :clinic-index="4" />
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
    title: "Учебный центр",
    url: `/education`,
  },
];
const searchFilter = ref(route.query.search);
const selectedOption = ref(route.query.category);
const archiveSelectedOption = ref(route.query.archiveCategory)
const searchArchiveFilter = ref(route.query.searchArchive)
const radioOptions = ref([
  { label: 'Врачам', value: 'doctor' },
  { label: 'Пациентам', value: 'pacient' },
  { label: 'Менеджменту', value: 'manager' },
]);


const { data: educationData } = await useFetch(`${apiBaseUrl}uchebnyj-czentr`, {
  query: {
    populate: blocksQuey + 'title.*, about.*, about.image.*, image.*',
  },
});

const mainInfo = educationData?.value?.data?.attributes;
const mainImg =
    mainInfo?.image?.data?.attributes?.url ??
    placeholdersStore?.imagePlaceholders?.services;
const mainImgAlt = mainInfo?.image?.data?.attributes?.alternativeText;
const descriptionBlock = mainInfo.about

const getCourses = async () => {
  const strapiQuery = {
      populate: blocksQuey,
      "filters[title][$contains][0]": searchFilter.value?.toLowerCase(),
      "filters[title][$contains][1]": searchFilter.value?.toUpperCase(),
      "filters[title][$contains][2]":
          searchFilter.value?.charAt(0)?.toUpperCase() +
          searchFilter.value?.slice(1)?.toLowerCase(),
    "filters[category][$eq]": selectedOption.value,
    "filters[archive][$eq]": "false"
  };
  clearObjectFields(strapiQuery);
  const {data: courseData} = await useFetch(`${apiBaseUrl}study-centers`, {
    query: strapiQuery
  });
  return courseData
}

const getArchiveCourses = async () => {
  const strapiQuery = {
    populate: blocksQuey,
    "filters[title][$contains][0]": searchArchiveFilter.value?.toLowerCase(),
    "filters[title][$contains][1]": searchArchiveFilter.value?.toUpperCase(),
    "filters[title][$contains][2]":
        searchArchiveFilter.value?.charAt(0)?.toUpperCase() +
        searchArchiveFilter.value?.slice(1)?.toLowerCase(),
    "filters[category][$eq]": archiveSelectedOption.value,
    "filters[archive][$eq]": "true"
  };
  clearObjectFields(strapiQuery);
  const {data: courseData} = await useFetch(`${apiBaseUrl}study-centers`, {
    query: strapiQuery
  });
  return courseData
}

const courseData = await getCourses()
const archiveCourseData = await getArchiveCourses()
const courses = computed(() =>
    courseData.value?.data?.map((c) => {
      return {
        id: c?.id,
        title: c?.attributes?.title,
        category: c?.attributes?.category,
        description: c?.attributes?.description,
        data: c?.attributes?.data_start,
        img: c?.attributes?.cardImage?.data?.attributes?.url,
        alt: c?.attributes?.cardImage?.data?.attributes?.alternativeText,
        publishedAt: c?.attributes?.publishedAt,
        tags: c?.attributes?.tags,
        archive: c?.attributes?.archive,
      };
    }),
);

watch(
    () => ({
      searchArchive: route.query.searchArchive,
      archiveCategory: route.query.archiveCategory,
    }),
    async (newVal, oldVal) => {
      if (
          newVal.searchArchive !== oldVal.searchArchive ||
          newVal.archiveCategory !== oldVal.archiveCategory
      ) {
        const data = await getArchiveCourses();
        archiveCourseData.value = data.value;
      }
    },
    { deep: true }
);

watch(
    () => ({
      search: route.query.search,
      category: route.query.category,
    }),
    async (newVal, oldVal) => {
      if (newVal.search !== oldVal.search || newVal.category !== oldVal.category) {
        const data = await getCourses();
        courseData.value = data.value;
      }
    },
    { deep: true }
);

const handleSearchChange = async () => {
  const searchQuery = {
    category: selectedOption.value,
    search: searchFilter.value,
    searchArchive: searchArchiveFilter.value,
    archiveCategory: archiveSelectedOption.value,
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
  handleDebouncedSearch(false);
};

const handleArchiveInputChange = (value) => {
  searchArchiveFilter.value = value;
  handleDebouncedSearch(true);
}

const handleOptionChange = async (value) => {
  if (selectedOption.value === value) {
    selectedOption.value = null;
  } else {
    selectedOption.value = value;
  }

  const searchQuery = {
    category: selectedOption.value,
    search: searchFilter.value,
    searchArchive: searchArchiveFilter.value,
    archiveCategory: archiveSelectedOption.value,
  };

  clearObjectFields(searchQuery);

  await navigateTo({
    path: `${route.fullPath}`,
    query: searchQuery,
    replace: true,
  });
}

const handleArchiveOptionChange = async (value) => {
  if (archiveSelectedOption.value === value) {
    archiveSelectedOption.value = null; // Сбрасываем фильтр при повторном выборе
  } else {
    archiveSelectedOption.value = value;
  }

  const searchQuery = {
    category: selectedOption.value,
    search: searchFilter.value,
    searchArchive: searchArchiveFilter.value,
    archiveCategory: archiveSelectedOption.value,
  };

  clearObjectFields(searchQuery);

  await navigateTo({
    path: `${route.fullPath}`,
    query: searchQuery,
    replace: true,
  });
}
const metaData = mainInfo?.meta;
useHead(getMetaObject(metaData, baseUrl));
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

    @media screen and (max-width: 1200px) {
      flex-wrap: wrap;
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

    &.course-view-normal {
      @media screen and (max-width: 1200px) {
        display: none;
      }
    }

    &.course-view-slider {
      display: none;
      @media screen and (max-width: 1200px) {
        display: flex;
      }
    }
  }
}

.input-search {
  max-width: 308px;
  width: 100%;
  @media screen and (max-width: 1200px) {
    margin: 16px 0 0;
    max-width: 333px;
  }

  @media screen and (max-width: 900px) {
    margin: -56px 0 0 auto;
    max-width: 333px;
  }

  @media screen and (max-width: 740px) {
    margin: 16px 0 0;
    max-width: none;
  }
}
</style>
