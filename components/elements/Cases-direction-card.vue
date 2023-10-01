<template>
  <div class="card-photo-name">
    <div class="card-photo-name-img">
      <img :src="direction.img" alt="photo-name" class="card-photo-name-img" />
    </div>
    <div v-if="isCategoryAndDescription" class="card-photo-name-container">
      <div>
        <div class="card-photo-name-title">{{ direction.name }}</div>
        <div class="card-photo-name-text">{{ direction.category }}</div>
      </div>
    </div>
    <div v-if="isCategoryAndDescription" class="card-photo-name-description">
      {{ direction.description }}
    </div>
    <div v-else class="card-photo-name-title">
      {{ direction.name }}
    </div>
    <elements-link-with-arrow
      type="true"
      title="Смотреть кейс"
      @click="router.push(`/portfolio/${direction.id}`)"
    />
  </div>
</template>

<script>
import { useAssets } from "../../stores/useAsset";
export default {
  props: {
    direction: {
      type: Object,
    },
    isCategoryAndDescription: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const router = useRouter();

    const assetsStore = useAssets();
    return {
      assetsStore,
      router,
    };
  },
};
</script>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

.card-photo-name-box-image {
  padding-bottom: 30px;
}

.card-photo-name-img {
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
  height: 346px;
}

.card-photo-name-container {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
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

.card-photo-name-description {
  @include body-14-regular;
  color: $gray-text;
  opacity: 0.7;
  padding-bottom: 30px;
}

@media (max-width: 1328px) {
  .card-photo-name {
    width: 100%;

    .card-photo-name-box-image {
      width: 100%;
    }
  }
}
</style>
