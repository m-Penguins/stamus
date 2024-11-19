<template>
  <div class="card-photo-name">
    <div class="card-photo-name-img">
      <NuxtLink :to="`/portfolio/${direction.id}`">
        <NuxtImg
            v-if="direction.img"
            :src="direction.img"
            :alt="direction?.alt ?? 'image'"
            provider="strapi"
            sizes="xs:400px md:600px"
            format="webp"
            class="banner-img"
            loading="lazy"
        />
      </NuxtLink>
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
      type
      title="Смотреть кейс"
      :link="`/portfolio/${direction.id}`"
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
  /* height: 308px; */

  aspect-ratio: 1;

  @supports not (aspect-ratio: 1/1) {
    padding-top: 100%;
    height: 0;
    position: relative;
    overflow: hidden;
  }

  & img {
    width: 100%;
    height: 100%;

    object-fit: cover;
    border-radius: 20px;
  }
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

  min-height: 60px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -moz-box;
  -moz-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  box-orient: vertical;
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
