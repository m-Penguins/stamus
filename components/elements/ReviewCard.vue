<script setup>
// const props = defineProps(["review"]);
const propsType = defineProps({
  review: {
    type: Object,
    required: true,
  },
});
// console.log(propsType.review);
</script>

<template>
  <div class="feedback-card">
    <h3 class="feedback-card__title">{{ review?.name }}</h3>
    <div class="feedback-card__box">
      <p v-if="review?.grade" class="feedback-card__box-grade">
        <span class="stars">
          <!-- <svg
            v-for="item in new Array(review?.grade)"
            :key="item"
            width="16"
            height="16"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.8505 0.691392C13.3636 -0.230464 14.6364 -0.230464 15.1495 0.691392L18.8657 7.36744C19.0537 7.70513 19.3687 7.94459 19.7337 8.0273L26.9502 9.66242C27.9466 9.8882 28.3399 11.1548 27.6606 11.9503L22.7409 17.7115C22.4921 18.0029 22.3718 18.3903 22.4094 18.7791L23.1532 26.4657C23.2559 27.5271 22.2262 28.3099 21.2932 27.8797L14.5364 24.7643C14.1947 24.6067 13.8053 24.6067 13.4636 24.7643L6.70682 27.8797C5.77382 28.3099 4.74412 27.5271 4.84683 26.4657L5.59062 18.7791C5.62824 18.3903 5.50793 18.0029 5.25907 17.7115L0.339392 11.9503C-0.339938 11.1548 0.0533724 9.8882 1.04985 9.66242L8.26627 8.0273C8.6313 7.94459 8.94628 7.70513 9.13426 7.36744L12.8505 0.691392Z"
              fill="#232D5B"
            />
          </svg> -->
        </span>
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
