<template>
  <div class="specialists-inner__info-numbers">
    <div>
      <p class="specialists-numbers">{{ info.experience.total }}</p>
      <p class="specialists-box__spec">{{ info.experience.item }}</p>
    </div>
    <div>
      <p class="specialists-numbers">{{ info.review.total }}</p>
      <p class="specialists-box__spec">{{ info.review.item }}</p>
    </div>
    <div>
      <p class="specialists-numbers">{{ info.consultation.total }}</p>
      <p class="specialists-box__spec">{{ info.consultation.item }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";
.specialists-inner {
  &__info {
    &-name {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-top: 10px;
    }

    &-numbers {
      display: flex;
      align-items: center;
      text-align: center;
      gap: 20px;

      .specialists-numbers {
        @include body-22-semi-bold;
        color: $hover;
      }
    }
  }
}

.specialists-box {
  &__spec {
    @include body-14-regular;
    opacity: 0.7;
    color: $gray-text;
  }
}
</style>
