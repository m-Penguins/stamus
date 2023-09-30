<script setup>
const router = useRouter();
const route = useRoute();

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const pageSize = ref(12);
const currentPage = ref(route.query.page ?? 1);

const specialists = ref([]);

const { data } = await useFetch(`${apiBaseUrl}specialists`, {
  query: {
    "pagination[page]": String(currentPage.value),
    "pagination[pageSize]": String(pageSize.value),
    populate: "deep",
  },
});

if (!data.value?.data) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

specialists.value = data.value;

watch(
  () => route.query.page,
  async () => {
    const { data } = await useFetch(`${apiBaseUrl}specialists`, {
      query: {
        "pagination[page]": String(currentPage.value),
        "pagination[pageSize]": String(pageSize.value),
        populate: "deep",
      },
    });
    specialists.value = data.value;
  },
  // async () => {
  //   console.log(currentPage.value);
  //   const { data } = await useFetch(`${apiBaseUrl}specialists`, {
  //     query: {
  //       "pagination[page]": String(currentPage.value),
  //       "pagination[pageSize]": String(pageSize.value),
  //       populate: "deep",
  //     },
  //   });
  //   specialistsData.value = data.value;
  // },
);

const totalPages = computed(() =>
  Math.ceil(specialists.value?.meta?.pagination?.total / pageSize.value),
);

const setCurrentPage = (pageNumber) => {
  currentPage.value = pageNumber;
  console.log(currentPage.value);
  router.push({
    path: route.path,
    query: {
      page: pageNumber,
    },
  });
};

const handleLinkClick = (id) => {
  router.push(`/specialists/` + String(id));
};
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
const mockArray = [
  {
    name: "Профессиональная гигиена полости рта и зубов временный прикус",
    price: "от 3 400 ₽",
    type: "Рекомендуем",
  },
  {
    name: "Профессиональная гигиена полости рта и зубов временный прикус",
    price: "от 3 400 ₽",
    type: "Рекомендуем",
  },
  {
    name: "Профессиональная гигиена полости рта и зубов временный прикус",
    price: "от 3 400 ₽",
    type: "Рекомендуем",
  },
  {
    name: "Профессиональная гигиена полости рта и зубов временный прикус",
    price: "от 3 400 ₽",
    type: "Рекомендуем",
  },
  {
    name: "Профессиональная гигиена полости рта и зубов временный прикус",
    price: "от 3 400 ₽",
    type: "Рекомендуем",
  },
];
const mockArrayTooltips = [
  {
    text: "Победитель Гран-при Продокторов «Лучший ортопед России» 2021",
    img: "tool1.svg",
  },
  {
    text: "2 место Премия Продокторов «Детский стоматолог» 2022 Краснодар",
    img: "tool2.svg",
  },
  { text: "Врач высшей категории", img: "tool3.svg" },
  { text: "Работает с эстетическими коронками", img: "tool4.svg" },
  { text: "Работает под микроскопом", img: "tool5.svg" },
];
</script>

<template>
  <div class="spicialists-page">
    <div class="spicialists-page-wrap">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs" />
      <div class="spicialists-page-title">Специалисты</div>
      <div class="specialist-form">
        <div class="specialist-box">
          <elements-select :options="[]" :default="'Взрослым'" class="select" />
          <elements-select
            :options="[]"
            :default="'Направление'"
            class="select"
          />
        </div>
        <div class="specialist-box">
          <elements-select :options="[]" :default="'Клиника'" class="select" />
          <div class="input-search">
            <elements-input-search-components
              class="input-search"
              placeholder="Найти"
            />
          </div>
        </div>
      </div>
      <div class="spicialists-page-cards">
        <div
          class="spicialists-page-card"
          v-for="specialist in specialists.data"
          :key="specialist.id"
        >
          <elements-name-specialty-photo-card
            link="#"
            :handleLinkClick="() => handleLinkClick(specialist.id)"
            :arrayTooltip="mockArrayTooltips"
            :specialists="{
              name:
                specialist?.attributes?.firstName +
                ' ' +
                specialist?.attributes?.lastName,
              img:
                baseUrl +
                specialist?.attributes?.fotoSpecialist?.data?.attributes?.url,
              position: specialist?.attributes?.position,
            }"
          />
        </div>
      </div>
      <elements-pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:current-page="setCurrentPage"
      />
      <blocks-main-popular-services />
      <blocks-main-form />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/style.scss";
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
  width: 100%;
  gap: 20px;
  padding-bottom: 40px;
}

.spicialists-page-cards {
  display: flex;
  gap: 40px 16px;
  flex-wrap: wrap;
  justify-content: space-between;
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
  .specialist-box {
    flex-wrap: wrap;
  }
  .spicialists-page-card {
    max-width: 334px;
  }
}

@media (max-width: 1201px) {
  .spicialists-page-title {
    padding: 50px 0 100px;
  }
}

@media (max-width: 1098px) {
  .spicialists-page-card {
    max-width: 270px;
  }
}

@media (max-width: 904px) {
  .spicialists-page-title {
    font-size: 22px;
    line-height: normal;
    padding: 10px 0 100px;
  }
  .spicialists-page-card {
    max-width: 334px;
  }
  .spicialists-page-cards {
    gap: 40px 14px;
  }
}

@media (max-width: 743px) {
  .spicialists-page-card {
    max-width: 300px;
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
  }
}

@media (max-width: 676px) {
  .spicialists-page-cards {
    justify-content: center;
  }
}

@media (max-width: 506px) {
  .spicialists-page-card {
    max-width: 100%;
  }
}
</style>
