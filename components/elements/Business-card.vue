<template>
  <div class="business-card">
    <h3 class="business-card-title">{{ data.title }}</h3>
    <p class="business-card-text">{{ data.text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
  },
}

</script>

<style scoped lang="scss">
@import '../../assets/styles/style.scss';
.business-card {
  display: flex;
  width: 100%;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  border-radius: 10px;
  border: 1px solid var(--stroke, #E9E9E9);
  background: var(--white, #FFF);
}

.business-card-title {
  @include body-22-medium;
  color: $hover;
}

.business-card-text {
  @include body-14-regular;
  color: $placeholder;
  text-align: center;
}
</style>