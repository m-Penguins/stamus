<script setup>
const route = useRoute();
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;
const assetsStore = useAssets();

const searchTerm = ref(route.query.term ?? "");

const nothingFound = ref(false);

const specialists = ref(null);
const services = ref(null);
const articles = ref(null);

const totalResults = ref(0);

const getSearchData = async () => {
  const [
    { data: specialistsData },
    { data: servicesData },
    { data: articlesData },
  ] = await Promise.all([
    useFetch(`${apiBaseUrl}specialists`, {
      query: {
        "filters[fullName][$contains][0]": searchTerm.value,
        "filters[fullName][$contains][1]": searchTerm.value?.toLowerCase(),
        "filters[fullName][$contains][2]":
          searchTerm.value?.charAt(0)?.toUpperCase() +
          searchTerm.value?.slice(1)?.toLowerCase(),

        // "filters[$or][firstName][$contains]":
        //   searchTerm.value?.charAt(0)?.toUpperCase() +
        //   searchTerm.value?.slice(1)?.toLowerCase(),

        // "filters[lastName][$contains]":
        //   searchTerm.value?.charAt(0)?.toUpperCase() +
        //   searchTerm.value?.slice(1)?.toLowerCase(),

        populate: "deep",
      },
    }),
    useFetch(`${apiBaseUrl}services`, {
      query: {
        "filters[heading][$contains][0]": searchTerm.value,
        "filters[heading][$contains][1]": searchTerm.value?.toLowerCase(),
        "filters[heading][$contains][2]":
          searchTerm.value?.charAt(0)?.toUpperCase() +
          searchTerm.value?.slice(1)?.toLowerCase(),
        populate: "deep",
      },
    }),
    useFetch(`${apiBaseUrl}articles`, {
      query: {
        "filters[heading][$contains][0]": searchTerm.value,
        "filters[heading][$contains][1]": searchTerm.value?.toLowerCase(),
        "filters[heading][$contains][2]":
          searchTerm.value?.charAt(0)?.toUpperCase() +
          searchTerm.value?.slice(1)?.toLowerCase(),
        populate: "deep",
      },
    }),
  ]);

  specialists.value = specialistsData?.value?.data?.map((sp) => ({
    id: sp?.id,
    name: sp?.attributes?.firstName + " " + sp?.attributes?.lastName,
    img: sp?.attributes?.fotoSpecialist?.data?.attributes?.url
      ? baseUrl + sp?.attributes?.fotoSpecialist?.data?.attributes?.url
      : assetsStore.useAsset("images/no-photo.png"),
    position: sp?.attributes?.position,
    achievements: sp?.attributes?.achievements,
    link: `/specialists/${sp?.id}`,
  }));

  services.value = servicesData?.value?.data?.map((serv) => ({
    id: serv?.id,
    title: serv?.attributes?.heading,
    link: `/${linkTransform(serv?.attributes?.category)}/${linkTransform(
      serv?.attributes?.heading,
    )}`,
  }));

  articles.value = articlesData?.value?.data?.map((art) => ({
    id: art?.id,
    title: art?.attributes?.heading,
    link: `/articles/${art?.id}`,
  }));

  totalResults.value =
    services?.value?.length +
    specialists?.value?.length +
    articles?.value?.length;

  if (totalResults.value === 0) {
    nothingFound.value = true;
  } else {
    nothingFound.value = false;
  }
};

if (!searchTerm.value) {
  nothingFound.value = true;
} else {
  await getSearchData();
}

watch(
  () => route.query.term,
  () => {
    searchTerm.value = route.query?.term;
    getSearchData();
  },
);
</script>

<template>
  <div class="search">
    <div class="search-wrap">
      <elements-bread-crumbs
        :breadcrumbs="[
          {
            title: 'Главная',
            url: '/',
          },
          {
            title: 'Поиск',
            url: '/search',
          },
          {
            title: `${searchTerm}`,
            url: `/search/`,
          },
        ]"
      />
      <template v-if="!nothingFound">
        <div>
          <h2 class="search-title">
            По вашему запросу найдено
            {{
              pluralize(totalResults, [
                "совпадение",
                "совпадения",
                "совпадений",
              ])
            }}
          </h2>
        </div>

        <div class="search-block" v-if="services?.length > 0">
          <h4 class="search-subtitle">Подходящие услуги</h4>
          <hr class="hr" />
          <div
            v-for="(item, index) in services"
            :key="item?.id"
            class="search-inner"
          >
            <elements-activities-card :activitiesCard="item" :index="index" />
          </div>
        </div>

        <div class="search-block" v-if="articles?.length > 0">
          <h4 class="search-subtitle">Подходящие статьи</h4>
          <hr class="hr" />
          <div
            v-for="(item, index) in articles"
            :key="item?.id"
            class="search-inner"
          >
            <elements-activities-card :activitiesCard="item" :index="index" />
          </div>
        </div>

        <div v-if="specialists?.length > 0" class="search-block">
          <h4 class="search-subtitle">Подходящие специалисты</h4>
          <hr class="hr" />
          <div v-for="item in specialists" :key="item" class="search-inner">
            <elements-search-specialist-card :spesialistCard="item" />
          </div>
        </div>
      </template>
      <h2 v-else class="search-title">По вашему запросу ничего не найдено</h2>

      <div class="search-form">
        <blocks-main-form />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  max-width: 100%;
  margin: 20px auto 0 auto;
}

.search-wrap {
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
}

.search-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
  padding-top: 100px;
}

.search-block {
  padding-top: 40px;
}

.search-subtitle {
  @include body-14-regular;
  color: $gray-text;
  padding-bottom: 10px;
}

.hr {
  width: auto;
  border: 0;
  height: 0;
  border-bottom: 1px solid #e9e9e9;
  margin-bottom: 14px;
}

.search-inner {
  padding-bottom: 14px;
}

.search-form {
  margin-top: 100px;
}

@media (max-width: 650px) {
  .search-form {
    margin-top: 80px;
  }
}
</style>
