<template>
  <ServiceDetail />
</template>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

.service-title {
  display: flex;
  align-items: baseline;
  gap: 24px;
  padding-bottom: 40px;
}

.popular-service {
  padding: 40px 0;

  &__title {
    @include body-22-medium-Neue;
    color: $dark-blue-subtitle;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    &:not(:last-of-type) {
      margin-bottom: 20px;
    }
  }
}
</style>
