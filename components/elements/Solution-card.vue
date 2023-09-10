<template>
  <div class="solution-card">
    <h4 class="solution-card-title">{{ card.title }}</h4>
    <p class="solution-card-text">{{ card.text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    card: Object,
    isGray: Boolean
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/styles/style.scss';

.solution-card {
  position: relative;
  border-left: 1px solid #E9E9E9;
  padding-left: 10px;
}

.solution-card-title {
  @include body-16-regular;
  color: $gray-text;
  padding-bottom: 10px;
}

.solution-card-title::before {
    content: "";
    position: absolute;
    width: 7px;
    height: 7px;
    background: white;
    border-radius: 999px;
    left: -6px;
    top: 4px;
    border: 2px solid #CFD5E1;
}

.solution-card-text {
  @include body-12-regular;
  color: $placeholder;
  padding-bottom: 20px;
}

</style>