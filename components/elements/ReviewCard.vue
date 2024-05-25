<script setup>
defineProps(["review"]);
</script>

<template>
  <div class="feedback-card">
    <h3 class="feedback-card__title">{{ review?.name }}</h3>
    <div class="feedback-card__box">
      <p v-if="review?.grade" class="feedback-card__box-grade">
        Оценка {{ review?.grade }}
      </p>
      <div v-if="review?.grade" class="feedback-card__box-point"></div>
      <p class="feedback-card__box-date">{{ review?.date }}</p>
    </div>
    <p class="feedback-card__text">{{ review?.text }}</p>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";

.feedback-card {
  padding: 20px;
  border-radius: 10px;
  border: 1px solid $border-card;
  height: 300px;
  overflow: auto;

  &__title {
    @include body-18-regular;
    color: $dark-blue-subtitle;
    padding-bottom: 11.5px;
  }

  &__box {
    display: flex;
    align-items: center;
    padding-bottom: 15px;

    &-grade {
      @include body-12-regular;
      color: $hover;
    }

    &-point {
      width: 4px;
      height: 4px;
      margin: 0 6px;
      background-color: $gray-text;
      border-radius: 50px;
      opacity: 0.2;
    }

    &-date {
      @include body-12-regular;
      color: $gray-text;
      opacity: 0.7;
    }
  }

  &__text {
    @include body-14-regular;
    color: $gray-text;
    opacity: 0.7;
  }
}

@media (max-width: 800px) {
  .feedback-card {
    padding: 14px;
  }
}
</style>
