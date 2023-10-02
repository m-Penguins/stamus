<script setup>
const router = useRouter();
const route = useRoute();

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const pageSize = ref("12");
const currentPageParam = ref(route.query.page ?? "1");
const filterClinicParam = ref(route.query.clinic ?? "");
const filterDirectionParam = ref(route.query.direction ?? "");

const specialists = ref([]);

const firstQuery = {
  "pagination[page]": currentPageParam.value,
  "pagination[pageSize]": pageSize.value,
  "filters[clinics][id]": filterClinicParam.value,
  "filters[category]": filterDirectionParam.value,
};

Object.keys(firstQuery).forEach(
  (key) =>
    (firstQuery[key] === undefined || !firstQuery[key]) &&
    delete firstQuery[key],
);

const [{ data }, { data: clinics }, { data: directionsData }] =
  await Promise.all([
    useFetch(`${apiBaseUrl}specialists`, {
      query: {
        ...firstQuery,
        populate: "deep",
      },
    }),
    useFetch(`${apiBaseUrl}clinics`),
    useFetch(`${apiBaseUrl}services?populate=deep`),
  ]);

if (!data.value?.data) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const clinicsList = clinics.value?.data?.map((cl) => ({
  id: cl?.id,
  name: cl?.attributes?.heading,
  address: cl?.attributes?.address,
}));

const directions = useReducedServices(directionsData.value.data).map((el) => ({
  id: el.id,
  name: el.title,
}));

if (!data.value?.data) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

specialists.value = data.value;

watch(
  () => route.query,
  async () => {
    const newQuery = {
      "pagination[page]": currentPageParam.value,
      "pagination[pageSize]": pageSize.value,
      "filters[clinics][id]": filterClinicParam.value,
      "filters[category]": filterDirectionParam.value,
    };

    Object.keys(newQuery).forEach(
      (key) =>
        (newQuery[key] === undefined || !newQuery[key]) && delete newQuery[key],
    );

    const { data } = await useFetch(`${apiBaseUrl}specialists`, {
      query: {
        ...newQuery,
        populate: "deep",
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

const handleLinkClick = (id) => {
  router.push(`/specialists/` + String(id));
};

const handleClinicChange = (clinic) => {
  filterClinicParam.value = clinic.id;

  setCurrentPage(1);

  const newQuery = {
    clinic: clinic.id,
    page: 1,
  };
  Object.keys(newQuery).forEach(
    (key) =>
      (newQuery[key] === undefined || !newQuery[key]) && delete newQuery[key],
  );

  router.push({
    path: route.path,
    query: {
      ...route.query,
      ...newQuery,
    },
  });
};

const handleDirectionChange = (direction) => {
  setCurrentPage(1);
  filterDirectionParam.value = direction.name;

  const newQuery = {
    clinic: route.query?.clinic ?? "",
    page: 1,
    direction: direction.name,
  };

  Object.keys(newQuery).forEach(
    (key) =>
      (newQuery[key] === undefined || !newQuery[key]) && delete newQuery[key],
  );

  router.push({
    path: route.path,
    query: {
      ...route.query,
      ...newQuery,
    },
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
            :options="directions"
            :default="
              directions.find((dir) => String(dir.name) === filterDirectionParam)
                ?.name ?? 'Направление'
            "
            label="Направление"
            class="select"
            @input="handleDirectionChange"
            :isSelectedId="filterDirectionParam ?? route.query.direction"
            :selectedItem="
              directions.find((dir) => dir.name === filterDirectionParam)
            "
          />
        </div>
        <div class="specialist-box">
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
          <div class="input-search">
            <elements-input-search-components
              class="input-search"
              placeholder="Найти"
            />
          </div>
        </div>
      </div>
      <div class="spicialists-page-cards">
        <template v-if="specialists?.data?.length > 0">
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
                img: specialist?.attributes?.fotoSpecialist?.data?.attributes
                  ?.url
                  ? baseUrl +
                    specialist?.attributes?.fotoSpecialist?.data?.attributes
                      ?.url
                  : assetsStore.useAsset('images/icons/logo.svg'),
                position: specialist?.attributes?.position,
              }"
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

@media (max-width: 590px) {
  .spicialists-page-card {
    width: 100%;
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
