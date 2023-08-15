<template>
  <div class="card-photo-name">
    <div class="card-photo-name-img">
      <img :src="assetsStore.useAsset(`images/specialists/${specialists.img}`)" :alt="alt"/>
    </div>
    <div class="card-photo-name-container">
      <div>
        <div class="card-photo-name-title">{{specialists.name}}</div>
        <div class="card-photo-name-text">{{specialists.category}}</div>
      </div>
      <div>
        <img src="../../assets/images/icons/icons-badge.svg">
      </div>
    </div>
    <elements-link-with-arrow type="true" title="Подробнее о враче"/>
  </div>
</template>

<script>
import { useAssets } from '../../stores/useAsset'
export default {
  props: {
    specialists: {
      type: Object
    },
  },
  setup() {
    const assetsStore = useAssets();
    return {
      assetsStore
    }
  }
}
</script>

<style scoped lang="scss">
@import '/assets/styles/style.scss';

.card-photo-name-img {
  padding-bottom: 30px;
}

.card-photo-name-container {
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
}

.card-photo-name-title {
  @include body-20-regular;
  color: $dark-blue-subtitle;
  padding-bottom: 4px;
}

.card-photo-name-text {
  @include body-12-regular;
  color: $gray-text;
  opacity: 0.7;
}
</style>