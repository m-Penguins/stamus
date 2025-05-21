<script setup>
const placeholdersStore = usePlaceholdersStore();
const route = useRoute();
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const searchTerm = ref(route.query.term ?? "");

const nothingFound = ref(false);

const specialists = ref(null);
const services = ref(null);
const articles = ref(null);
const specialistsMobile = ref(null);
const isMobile = useMediaQuery("(max-width: 590px)");
const totalResults = ref(0);

const getServiceLink = (item) => {
  const direction =
    item?.attributes?.category?.data?.attributes?.napravleniya_uslug_1_col?.data
      ?.attributes?.slug;

  const service = item?.attributes?.slug;

  if (direction && service) {
    return `/${direction}/${service}`;
  }
  return "/";
};

const getSearchData = async () => {
  const capitalSearch =
    searchTerm.value?.charAt(0)?.toUpperCase() +
    searchTerm.value?.slice(1)?.toLowerCase();
  const lowerSearch = searchTerm.value?.toLowerCase();
  const upperSearch = searchTerm.value?.toUpperCase();

  const [
    { data: specialistsData },
    { data: servicesData },
    { data: articlesData },
  ] = await Promise.all([
    useFetch(`${apiBaseUrl}specialists`, {
      query: {
        "filters[$or][0][fullName][$contains]": searchTerm.value,
        "filters[$or][1][fullName][$contains]": lowerSearch,
        "filters[$or][2][fullName][$contains]": capitalSearch,
        "filters[$or][3][fullName][$contains]": upperSearch,
        "filters[$or][40][position][$contains]": searchTerm.value,
        "filters[$or][41][position][$contains]": lowerSearch,
        "filters[$or][42][position][$contains]": capitalSearch,
        "filters[$or][43][position][$contains]": upperSearch,
        "sort[0]": "order:asc",
        populate:
          "fotoSpecialist.*,achievements.*,position.*, achievements.icon.*, blocks.item.*,blocks.item.icon.*, speczialnosti.*",
      },
    }),
    useFetch(`${apiBaseUrl}services`, {
      query: {
        "filters[heading][$contains][4]": searchTerm.value,
        "filters[heading][$contains][5]": lowerSearch,
        "filters[heading][$contains][6]": capitalSearch,
        "filters[heading][$contains][7]": upperSearch,
        populate: "category.napravleniya_uslug_1_col.*",
      },
    }),
    useFetch(`${apiBaseUrl}articles`, {
      query: {
        "filters[$or][8][heading][$contains]": searchTerm.value,
        "filters[$or][9][heading][$contains]": lowerSearch,
        "filters[$or][10][heading][$contains]": capitalSearch,
        "filters[$or][11][heading][$contains]": upperSearch,
        "filters[$or][58][description][$contains]": searchTerm.value,
        "filters[$or][59][description][$contains]": lowerSearch,
        "filters[$or][50][description][$contains]": capitalSearch,
        "filters[$or][51][description][$contains]": upperSearch,
        populate: "heading.*,description.*",
      },
    }),
  ]);

  specialists.value = specialistsData?.value?.data?.map(
    (sp) => (
      console.log(sp),
      {
        id: sp?.id,
        name: sp?.attributes?.firstName + " " + sp?.attributes?.lastName,
        img: sp?.attributes?.fotoSpecialist?.data?.attributes?.formats
          ?.thumbnail?.url
          ? baseUrl +
            sp?.attributes?.fotoSpecialist?.data?.attributes?.formats?.thumbnail
              ?.url
          : baseUrl + placeholdersStore?.imagePlaceholders?.specialists,
        position: sp?.attributes?.speczialnosti,
        achievements: sp?.attributes?.achievements,
        link: `/team/${sp?.id}`,
      }
    ),
  );

  specialistsMobile.value = specialistsData?.value?.data.map((sp) => ({
    id: sp?.id,
    name: sp?.attributes?.firstName + " " + sp?.attributes?.lastName,
    img:
      sp?.attributes?.fotoSpecialist?.data?.attributes?.url ??
      placeholdersStore?.imagePlaceholders?.specialists,
    alt: sp?.attributes?.fotoSpecialist?.data?.attributes?.alternativeText,
    position: sp?.attributes?.speczialnosti.data,
    achievements: sp?.attributes?.blocks?.find(
      (component) => component.__component === "blocks-story.achievements",
    ),
  }));
  // console.log(specialistsMobile);

  services.value = servicesData?.value?.data?.map((singleService) => ({
    id: singleService?.id,
    title: singleService?.attributes?.heading,
    link: getServiceLink(singleService),
  }));

  articles.value = articlesData?.value?.data?.map((art) => ({
    id: art?.id,
    title: art?.attributes?.heading,
    link: `/articles/${art?.id}`,
  }));

  totalResults.value =
    (services?.value?.length || 0) +
    (specialists?.value?.length || 0) +
    (articles?.value?.length || 0);

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

useHead({
  title: "Удобный поиск на сайте сети клиник Стамус",
  meta: [
    {
      name: "twitter:title",
      content: "Удобный поиск на сайте сети клиник Стамус",
    },
    {
      property: "og:title",
      content: "Удобный поиск на сайте сети клиник Стамус",
    },
    {
      name: "description",
      content:
        "Через поиск на сайте Стамус вы можете узнать всю необходимую информацию о врачах, ценах, услугах, а также полезные материалы из блога клиники",
    },
    {
      name: "twitter:description",
      content:
        "Через поиск на сайте Стамус вы можете узнать всю необходимую информацию о врачах, ценах, услугах, а также полезные материалы из блога клиники",
    },
    {
      property: "og:description",
      content:
        "Через поиск на сайте Стамус вы можете узнать всю необходимую информацию о врачах, ценах, услугах, а также полезные материалы из блога клиники",
    },
    // {
    //   name: "keywords",
    //   content: "Информация о стамус, информация о клинике стамус",
    // },
  ],
  link: [{ rel: "canonical", href: "https://stamus.ru" + route.path }],
});
console.log(specialists.value);
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
            title: `${searchTerm ?? ''}`,
            url: `/`,
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
          <h4 class="search-subtitle">Подходящие врачи</h4>
          <hr class="hr" />
          <template v-if="!isMobile">
            <div v-for="item in specialists" :key="item" class="search-inner">
              <elements-search-specialist-card :spesialistCard="item" />
            </div>
          </template>
          <template v-else>
            <div
              v-for="item in specialistsMobile"
              :key="item"
              class="search-inner"
            >
              <elements-name-specialty-photo-card
                :is-link="true"
                :specialists="item"
                :isTooltip="true"
              />
            </div>
          </template>
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
  @media (max-width: 590px) {
    margin-bottom: 20px;
  }
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
