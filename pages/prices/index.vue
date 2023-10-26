<script setup>
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;

const searchInput = ref("");
const directionFilter = ref("");
const categoryFilter = ref("");

const [{ data: pricesData }] = await Promise.all([
  useFetch(`${apiBaseUrl}prices-list`, {
    query: { populate: "services.*,servicePrice.*" },
  }),
]);

const allPrices = ref([
  {
    direction: null,
    category: null,
    services: [],
  },
]);

pricesData?.value?.data?.forEach((el) => {
  const services = el?.attributes?.services?.data;
  const direction = services?.[0]?.attributes?.direction;
  const category = services?.[0]?.attributes?.category;
  if (services?.length > 0 && direction) {
    const directionPrices = allPrices.value?.find(
      (dir) => dir?.direction === direction,
    );
    if (directionPrices) {
      directionPrices.services = [
        ...directionPrices?.services,
        ...el?.attributes?.servicePrice,
      ];
    } else {
      allPrices.value?.push({
        direction,
        category,
        services: el?.attributes?.servicePrice,
      });
    }
  } else {
    const noDir = allPrices.value?.find((d) => d.direction === null);
    noDir.services = [...noDir?.services, ...el?.attributes?.servicePrice];
  }
});

const sortedPrices = computed(() => {
  return [...allPrices.value]?.sort((a, b) => {
    if (!a.direction || !b.direction) {
      return -1;
    }
    return a?.direction.localeCompare(b?.direction);
  });
});

const filteredPrices = computed(() => {
  return sortedPrices.value?.filter((group) => {
    return (
      (directionFilter.value
        ? group?.direction === directionFilter.value
        : true) &&
      (categoryFilter.value ? group?.category === categoryFilter.value : true)
    );
  });
});

const filteredPricesWithSearch = computed(() => {
  if (!searchInput.value?.trim()) {
    return filteredPrices.value;
  }
  return filteredPrices.value
    ?.map((group) => {
      const filteredServices = group?.services?.filter((s) => {
        return s?.heading
          ?.toLowerCase()
          ?.includes(searchInput.value?.trim()?.toLowerCase());
      });

      if (filteredServices?.length > 0) {
        const filteredGroup = {
          ...group,
          services: filteredServices,
        };
        return filteredGroup;
      } else {
        return null;
      }
    })
    .filter(Boolean);
});

const categories = allPrices.value
  ?.map((dir, ind) => ({
    id: dir?.id ?? ind + 1,
    name: dir?.direction,
    address: null,
  }))
  ?.filter((el) => el?.name);

const directions = [...new Set(allPrices.value.map((el) => el?.category))]
  ?.map((dir, ind) => ({
    id: ind + 1,
    name: dir,
    address: null,
  }))
  ?.filter((el) => el?.name);

const handleDirectionChange = (category) => {
  categoryFilter.value = category?.name ? category.name : null;
};

const handleCategoryChange = (direction) => {
  directionFilter.value = direction?.name ? direction.name : null;
};

const handleInputChange = (value) => {
  searchInput.value = value;
};

const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Цены на услуги",
    url: "/prices",
  },
];
</script>

<template>
  <div class="prices">
    <div class="prices-wrap">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs" />
      <h1 class="prices-title">Цены на услуги</h1>
      <p class="prices-text">
        Все наши цены под ключ. <br />
        Анестезия, осмотры, наложение швов и прочие сопутствующие услуги уже
        включены в стоимость.
      </p>
    </div>
  </div>
  <div class="container-size popular-service">
    <div class="service-form">
      <div class="service-box">
        <elements-select
          :options="directions"
          :default="'Направление'"
          class="select"
          @input="handleDirectionChange"
        />
        <elements-select
          :options="categories"
          default="Категория"
          class="select"
          @input="handleCategoryChange"
        />
      </div>
      <div class="input-search">
        <elements-input-search-components
          class="input-search"
          placeholder="Найти"
          v-model="searchInput"
          @submit="handleInputChange"
        />
      </div>
    </div>
    <template v-if="filteredPricesWithSearch?.length > 0">
      <section
        class="prices__section"
        v-for="section in filteredPricesWithSearch"
        :key="section?.id"
      >
        <div class="prices-box">
          <h3 class="prices-box-title">{{ section?.direction }}</h3>
          <div class="grey-point-container">
            <p class="grey-point-text">
              {{
                pluralize(section?.services?.length, [
                  "услуга",
                  "услуги",
                  "услуг",
                ])
              }}
            </p>
            <div class="grey-point"></div>
            <p class="grey-point-text">
              От
              {{
                [...section?.services]?.sort((a, b) => a?.price - b?.price)?.[0]
                  ?.price
              }}
              ₽
            </p>
          </div>
        </div>
        <hr />
        <div class="popular-service__list">
          <div v-for="service in section?.services" :key="service?.id">
            <elements-service-card :service="service" />
          </div>
        </div>
      </section>
    </template>

    <h3 v-else class="prices-box-title">Ничего не найдено</h3>
    <!-- <div>
      <div class="prices-box m-t-30">
        <div class="prices-box-title">Взрослая стоматология</div>
        <div class="grey-point-container">
          <p class="grey-point-text">6 услуг</p>
          <div class="grey-point"></div>
          <p class="grey-point-text">От 400 ₽</p>
        </div>
      </div>
      <hr />
      <div class="popular-service__list">
        <div v-for="(item, index) in mockArrayServices" :key="index">
          <elements-service-card :service="item" />
        </div>
      </div>
    </div> -->
    <!-- <div>
      <div class="prices-box m-t-30">
        <div class="prices-box-title">Детская клиника</div>
        <div class="grey-point-container">
          <p class="grey-point-text">6 услуг</p>
          <div class="grey-point"></div>
          <p class="grey-point-text">От 400 ₽</p>
        </div>
      </div>
      <hr />
      <div class="popular-service__list">
        <div v-for="(item, index) in mockArrayServices" :key="index">
          <elements-service-card :service="item" />
        </div>
      </div>
    </div> -->
    <elements-button-base
      title="Скачать полный прайс"
      :isDownload="true"
      :link="'https://disk.yandex.ru/d/KVMGriYcVDOHgg'"
      class="prices-btn"
    />
  </div>
</template>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

.prices {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  max-width: 100%;
  margin: 20px auto 0 auto;
}

.prices-wrap {
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
}

.prices__section {
  margin-bottom: 30px;
}

.prices-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.prices-box-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
}

.prices-title {
  @include body-60-medium;
  color: $dark-blue-subtitle;
  padding: 100px 0 30px;
}

.prices-text {
  @include body-20-regular;
  color: $gray-text;
  padding-bottom: 40px;
}

.popular-service {
  &__title {
    @include body-22-medium-Neue;
    color: $dark-blue-subtitle;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.service-title {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  gap: 24px;
  padding-bottom: 40px;
}

.service-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 40px;
}

.service-box {
  display: flex;
  gap: 16px;
  margin-right: 16px;
}

.select {
  width: 308px;
}

hr {
  margin-bottom: 20px;
  width: auto;
  border: 0;
  height: 1px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
}

.prices-btn {
  margin: 60px auto 40px;
}

@media screen and (max-width: 1179px) {
  .prices-title {
    padding: 0px 0 30px;
  }
}

@media (max-width: 1017px) {
  .service-form {
    flex-wrap: wrap;
    gap: 10px;
  }
  .service-box {
    margin-right: 0;
    width: 100%;
    .select {
      width: 100%;
    }
  }
  .input-search {
    width: 100%;
  }
  .prices-title {
    font-size: 22px;
    padding: 0px 0 20px;
  }
  .prices-text {
    font-size: 16px;
    padding-bottom: 0;
  }
}

@media (max-width: 800px) {
  .service-form {
    padding-bottom: 0px;
  }
  .prices-box-title {
    font-size: 16px;
  }
  .prices-box {
    padding: 0 0 20px;
    margin-top: 60px;
  }

  hr {
    display: none;
  }
  .prices-btn {
    margin: 60px auto 0px;
  }
}

@media (max-width: 740px) {
  .popular-service {
    margin: 0 auto 80px !important;
  }
  .service-box {
    flex-wrap: wrap;
  }
}

@media (max-width: 400px) {
  .prices-wrap {
    margin-bottom: 80px;
  }
  .service-title {
    display: block;
    padding-bottom: 30px;
  }
  .popular-service {
    margin: 0 auto 80px;
    &__title {
      padding-bottom: 10px;
    }
  }
  hr {
    display: block;
  }
}
</style>
