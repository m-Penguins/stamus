<template>
  <div class="container-size popular-service">
    <div class="service-title">
      <h2 class="popular-service__title">{{ title }}</h2>
      <elements-link-with-arrow
        v-if="isLink"
        link="/prices"
        type
        title="Посмотреть все"
        :isLink="isLink"
      />
    </div>
    <div class="service-form">
      <div class="service-box">
        <elements-select
          v-if="addresData"
          :options="addresData"
          :default="'Направление'"
          class="select"
        />
      </div>
      <div class="input-search">
        <elements-input-search-components
          class="input-search"
          placeholder="Найти"
          v-model="searchValue"
          @submit="(payload) => (searchValue = payload)"
        />
      </div>
    </div>
    <div
      class="popular-service__list"
      v-for="item in actualList"
      :key="item?.id"
    >
      <elements-service-card :service="item" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["addresData", "singleServices", "title", "isLink"]);

const searchValue = ref("");

const actualList = computed(() => {
  if (!searchValue.value?.trim()) {
    return props.singleServices;
  }
  return props.singleServices?.filter((el) =>
    el?.heading?.toLowerCase().includes(searchValue.value?.toLowerCase()),
  );
});
</script>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

.popular-service {
  &__title {
    @include body-22-medium-Neue;
    color: $dark-blue-subtitle;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
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
}
</style>
