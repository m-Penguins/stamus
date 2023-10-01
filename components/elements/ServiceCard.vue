<template>
  <div>
    <nuxt-link :to="service.link" class="link">
      <div class="service-card">
        <div class="service-card-container">
          <div class="grey-point-container">
            <div
              class="service-card-category grey-point-container"
              v-for="(item, index) in service.tags"
              :key="item"
            >
              <p class="grey-point-text">{{ item }}</p>
              <div
                class="grey-point"
                v-if="index < service.tags.length - 1"
              ></div>
            </div>
          </div>
          <div class="service-card-title">{{ service.heading }}</div>
        </div>
        <div class="service-card-box">
          <div
            v-if="service.isRecommended"
            class="service-card-box__type-isRecommended"
          >
            Рекомендуем
          </div>
          <div
            v-if="service.isPopular"
            class="service-card-box__type-isPopular"
          >
            Популярное
          </div>
          <div v-if="service.isDemand" class="service-card-box__type-isDemand">
            Высокий спрос
          </div>
          <div class="service-card-box__price">от {{ service.price }} ₽</div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

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

    &__type-isRecommended {
      display: flex;
      align-items: center;
      padding: 6px 10px 8px 10px;
      border-radius: 5px;
      background: rgba(23, 201, 137, 0.05);
      @include body-12-regular;
      color: $green;
      width: max-content;
    }

    &__type-isPopular {
      display: flex;
      align-items: center;
      padding: 6px 10px 8px 10px;
      border-radius: 5px;
      background: rgba(220, 101, 15, 0.05);
      @include body-12-regular;
      color: #dc650f;
      width: max-content;
    }

    &__type-isDemand {
      display: flex;
      align-items: center;
      padding: 6px 10px 8px 10px;
      border-radius: 5px;
      background: rgba(244, 81, 81, 0.05);
      @include body-12-regular;
      color: #f45151;
      width: max-content;
    }
  }

  .service-card-title {
    @include body-16-regular;
    color: $dark-blue-subtitle;
  }
}

@media (max-width: 800px) {
  .service-card {
    display: block;

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
