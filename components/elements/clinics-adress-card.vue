<template>
  <div class="card-photo-name">
    <div class="card-photo-name-img">
      <NuxtImg
        v-if="direction.img"
        :src="direction.img"
        provider="strapi"
        :alt="direction?.alt"
        sizes="xs:400px md:600px"
        format="webp"
        class="img"
      />
    </div>
    <div class="card-photo-name-container">
      <div>
        <div class="card-photo-name-title">{{ direction.name }}</div>
        <elements-link-with-arrow
          type="type"
          title="Подробнее"
          :link="direction.link"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useAssets } from "../../stores/useAsset";
export default {
  props: {
    direction: {
      type: Object,
    },
  },
  setup() {
    const assetsStore = useAssets();
    return {
      assetsStore,
    };
  },
};
</script>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

.img {
  max-width: 100%;
  width: 100%;
  max-height: 456px;
  object-fit: cover;
  border-radius: 15px;
}

.card-photo-name-img {
  padding-bottom: 20px;

  height: 346px;

  & img {
    height: 100%;

    object-fit: cover;
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
  padding-bottom: 20px;
}

.card-photo-name-description {
  @include body-14-regular;
  color: $gray-text;
  opacity: 0.7;
  padding-bottom: 30px;
}
</style>
