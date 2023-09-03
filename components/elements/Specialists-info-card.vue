<template>
  <div class="specialists-inner__info-numbers">
    <div>
      <p class="specialists-numbers">{{info.experience}}</p>
      <p class="specialists-box__spec">лет опыта</p>
    </div>
    <div>
      <p class="specialists-numbers">{{info.review}}</p>
      <p class="specialists-box__spec">отзыва</p>
    </div>
    <div>
      <p class="specialists-numbers">{{info.consultation}}</p>
      <p class="specialists-box__spec">консультаций</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object
      },
    },
  }
</script>

<style lang="scss" scoped>
@import '/assets/styles/style.scss';
.specialists-inner {
  &__info {
    &-name {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-top: 10px;
    }

    &-numbers{
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