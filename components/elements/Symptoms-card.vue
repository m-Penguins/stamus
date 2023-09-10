<template>
  <div :class="isGray ? 'gray' : 'white'" class="symptoms-card">
    <div>
      <p class="symptoms-card-text">{{ card.text }}</p>
    </div>
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
.symptoms-card {
  padding: 14px 20px;
  border-radius: 10px;
}
.gray {
  background: var(--stroke, #E9E9E9);
}

.white {
  border: 1px solid var(--stroke, #E9E9E9);
}

.symptoms-card-text {
  @include body-16-regular;
  color: $gray-text;
}

@media (max-width: 1000px) {
  .symptoms-card {
    width: 49%;
  }
}

@media (max-width: 530px) {
  .symptoms-card {
    width: 100%;
  }
}
</style>