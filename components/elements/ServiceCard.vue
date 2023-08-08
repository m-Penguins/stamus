<template>
  <div>
    <nuxt-link to="#" class="link">
      <div class="service-card">
        <div class="service-card-container">
          <div class="service-card-category grey-point-container">
            <p class="grey-point-text">Стоматология</p>
            <div class="grey-point"></div>
            <p class="grey-point-text">Дети</p>
          </div>
          <div class="service-card-title">{{ service.name }}</div>
        </div>
        <div class="service-card-box">
          <div class="service-card-box__type">{{ service.type }}</div>
          <div class="service-card-box__price">{{ service.price }}</div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    props: {
      service: {
        type: Object
      },
    },
  }
</script>


<style lang="scss" scoped>
@import '/assets/styles/style.scss';

.service-card {
  display: flex;
  justify-content: space-between;
  height: 68px;
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
        background: rgba(23, 201, 137, 0.05);
        @include body-12-regular;
        color: $green;
      }
    }

    .service-card-category {

    }

    .service-card-title {
      @include body-16-regular;
      color: $dark-blue-subtitle;
    }
}

</style>