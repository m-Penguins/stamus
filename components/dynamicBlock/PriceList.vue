<script setup lang="ts">
const props = defineProps(["block"]);

const store = useModalStore();

const mappedPriceList = mapPriceList(props?.block?.price_lists?.data);
</script>

<template>
  <div v-if="mappedPriceList?.length > 0">
    <div class="service-title">
      <h2 class="popular-service__title">Услуги</h2>
    </div>
    <div v-for="service in mappedPriceList" class="popular-service__list">
      <dynamic-block-accordeon :is-opened="!props?.block?.is_accordeon" :block="{
        title: service.title,
        content: [],
      }">
        <template #content>
          <div v-for="(item, index) in service.services" :key="index">
            <elements-service-card :service="item" />
          </div>
        </template>
      </dynamic-block-accordeon>
    </div>
    <elements-button-base type link="/prices" title="Все цены" />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";
.button-base {
  margin: 0 auto;
}
.service-title {
  display: flex;
  align-items: baseline;
  gap: 24px;
  padding-bottom: 40px;
}

.popular-service {
  padding: 40px 0;

  &__title {
    @include body-22-medium-Neue;
    color: $dark-blue-subtitle;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0 0 40px;
    &:not(:last-of-type) {
      margin-bottom: 40px;
    }
  }
}
</style>
