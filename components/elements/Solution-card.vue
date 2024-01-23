<template>
  <div class="solution-card">
    <h4 class="solution-card-title">{{ card.heading }}</h4>
    <p class="solution-card-text">{{ card.title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    card: Object,
    isGray: Boolean,
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/style.scss";

.solution-card {
  position: relative;
  padding-left: 18px;
  &:last-of-type::after {
    height: 0;
  }
}

.solution-card::before {
  content: "";
  position: absolute;
  width: 7px;
  height: 7px;
  background: white;
  border-radius: 100%;

  top: 13px;
  left: 0;

  transform: translate(-50%, -50%);

  border: 1px solid #cfd5e1;
}

.solution-card::after {
  content: "";
  position: absolute;
  width: 1px;
  height: 100%;

  background-color: #e9e9e9;

  top: 13px;
  left: 0;

  transform: translateX(-50%);
}

.solution-card-title {
  @include body-20-regular;
  color: $gray-text;
  padding-bottom: 20px;
}

.solution-card-text {
  @include body-16-regular;
  color: $placeholder;
  padding-bottom: 26px;
}
</style>
