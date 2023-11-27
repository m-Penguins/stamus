<script setup>
defineProps(["block"]);
const assetsStore = useAssets();
const baseUrl = useRuntimeConfig().public?.baseUrl;
</script>

<template>
  <div class="seo-block" :class="{ reversed: block?.reverse }">
    <img
      v-if="block?.image?.data?.attributes?.url"
      class="image"
      :src="`${baseUrl}${block?.image?.data?.attributes?.url}`"
      :alt="block?.image?.data?.attributes?.alternativeText ?? 'Изображение'"
    />
    <img
      v-else
      class="image"
      :src="assetsStore.useAsset(`images/blocks/${img}`)"
      alt="rectangle"
    />
    <div class="seo-block-text">
      <h2 class="seo-block-text__title p-bt-14" v-html="block?.title"></h2>
      <div class="seo-block-text__text" v-html="block?.description"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

.seo-block.reversed {
  flex-direction: row-reverse;
}
.seo-block {
  display: flex;
  margin: 0 auto;
  max-width: 1280px;
  gap: 14px;
  margin-bottom: 100px;

  .seo-block-img {
    margin-right: 16px;
  }

  .seo-block-text {
    background-color: #f9f9fa;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 20px 40px;
    border-radius: 45px;

    &__title {
      @include body-22-medium-Neue;
      color: $dark-blue-subtitle;
    }

    &__text {
      @include body-14-regular;
      color: $gray-text;
    }
  }
}

.image,
.seo-block-text {
  flex: 1;
}

.image {
  border-radius: 45px;
  width: 60%;
}

.seo-block-text {
  width: 40%;
}

@media (max-width: 1100px) {
  .image {
    width: 50%;
  }
  .seo-block-text {
    padding: 20px 20px;
  }
}

@media (max-width: 900px) {
  .image {
    width: 50%;
    object-fit: cover;
    object-position: 21% 10%;
    border-radius: 20px;
  }
  .seo-block {
    .seo-block-text {
      border-radius: 20px;
    }
  }
}

@media (max-width: 700px) {
  .seo-block.reversed {
    flex-direction: column-reverse;
  }
  .seo-block {
    display: flex;
    flex-direction: column;
    margin-bottom: 80px;

    .image {
      margin-bottom: 10px;
    }

    .image,
    .seo-block-text {
      width: 100%;
      border-radius: 20px;
    }
  }
}
</style>
