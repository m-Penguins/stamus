<template>
  <div class="seo-block">
    <elements-slider-description-clinic :images="imagesScroll" />
    <div class="seo-block-text">
      <h2 class="seo-block-text__title p-bt-14" v-html="title"></h2>
      <p class="seo-block-text__text" v-html="text"></p>
    </div>
  </div>
</template>

<script>
import { useAssets } from "../../stores/useAsset";
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
    imagesScroll: {
      type: Array,
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
    width: 40%;
    height: 494px;
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
  .seo-block {
    height: 334px;
  }

  .seo-block .seo-block-text {
    height: 334px;
    padding: 20px;
  }
  .image {
    width: 50%;
    object-fit: cover;
    object-position: 21% 10%;
    border-radius: 20px;
  }
}

@media (max-width: 734px) {
  .seo-block {
    display: block;
    height: 100%;
    margin-bottom: 32px;

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
