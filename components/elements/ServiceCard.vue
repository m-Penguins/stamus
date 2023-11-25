<template>
  <div>
    <button class="link" @click="store.openModal">
      <div class="service-card">
        <div class="service-card-container">
          <div class="grey-point-container">
            <div
              class="service-card-category grey-point-container"
              v-for="(item, index) in service?.tags"
              :key="item"
            >
              <p class="grey-point-text">{{ item }}</p>
              <div
                class="grey-point"
                v-if="index < service?.tags.length - 1"
              ></div>
            </div>
          </div>
          <div class="service-card-title">{{ service?.heading }}</div>
        </div>
        <div class="service-card-box">
          <template v-if="service?.Sale_popular?.length > 0">
            <div
              v-for="tag in service?.Sale_popular"
              :key="tag?.id"
              class="service-card-box__type"
              :style="{
                color: tag?.color,
                backgroundColor: `${tag?.color}15`,
              }"
            >
              {{ tag?.text }}
            </div>
          </template>

          <div class="service-card-box__price">{{ service.price }} ₽</div>
        </div>
      </div>
    </button>
  </div>
</template>

<script setup>
defineProps(["service"]);

const store = useModalStore();
</script>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

.link {
  border: none;
  outline: none;
  background-color: transparent;
  display: block;
  width: 100%;
  cursor: pointer;
}

.service-card {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px 20px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px;
  border: 1px solid $border-card;

  &:hover {
    border: 1px solid $dissabled;
  }

  .service-card-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .service-card-box {
    display: flex;
    gap: 10px;

    &__price {
      @include body-18-regular;
      color: $hover;
    }

    &__type {
      display: flex;
      align-items: center;
      padding: 6px 10px 8px 10px;
      border-radius: 5px;
      @include body-12-regular;
      width: max-content;
    }
  }

  .service-card-title {
    @include body-16-regular;
    color: $dark-blue-subtitle;
    text-align: left;
  }
}

@media (max-width: 800px) {
  .service-card {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .service-card-container {
      gap: 20px;
      margin-bottom: 10px;
    }

    .service-card-box {
      display: flex;
      flex-direction: column;
      gap: 8px;

      &__type {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
