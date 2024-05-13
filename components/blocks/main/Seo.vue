<template>
  <div class="seo-block">
    <img
      class="image"
      :src="assetsStore.useAsset(`images/blocks/${img}`)"
      alt="rectangle"
    />
    <div class="seo-block-text">
      <h2 class="seo-block-text__title p-bt-14" v-html="title"></h2>
      <div class="seo-block-text__text" v-html="text"></div>
    </div>
  </div>
</template>

<script>
import { useAssets } from "../../../stores/useAsset";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "",
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

<style lang="scss" scoped>
@import "/assets/styles/style.scss";
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 20px 40px;
    border-radius: 45px;
    background: #f9f9fa;
    backdrop-filter: blur(22.5px);

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
}

@media (max-width: 700px) {
  .seo-block {
    display: block;
    margin-bottom: 80px;

    .image {
      margin-bottom: 10px;
    }

    .image,
    .seo-block-text {
      width: 100%;
    }
  }
}
</style>
