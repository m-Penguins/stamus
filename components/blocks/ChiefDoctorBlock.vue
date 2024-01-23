<template>
  <div class="chief-doctor-block">
    <div class="chief-doctor-block-wrap">
      <div class="chief-doctor-block-container">
        <img
          :src="specialists?.img || fallBackImg"
          alt="main doctor"
          class="chief-doctor-block-img"
        />
      </div>
      <div class="chief-doctor-block-box">
        <h2 class="chief-doctor-block-box__title">{{ specialists?.name }}</h2>
        <p class="chief-doctor-block-box__category">
          {{ specialists?.category }}
        </p>
        <div
          class="chief-doctor-block-box__text"
          v-html="specialists?.text"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAssets } from "../../stores/useAsset";
export default {
  props: {
    specialists: {
      type: Object,
    },
  },
  setup() {
    const assetsStore = useAssets();

    const fallBackImg = assetsStore.useAsset(
      "images/specialists/main-doctor2.png",
    );
    return {
      assetsStore,
      fallBackImg,
    };
  },
};
</script>

<style scoped lang="scss">
@import "/assets/styles/style.scss";
.chief-doctor-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 100px;
}

.chief-doctor-block-wrap {
  display: flex;
  justify-content: space-between;
  width: 1280px;
  max-width: 100%;
  background: var(--light-bg, #f9f9fa);
  border-radius: 25px;
  margin: 0 auto;
  padding: 20px;
  gap: 24px;
}

.chief-doctor-block-box {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 76%;
  &__title {
    @include body-22-medium-Neue;
    color: black;
  }
  &__category {
    @include body-12-regular;
    color: $gray-text;
    opacity: 0.7;
  }
  &__text {
    @include body-14-regular;
    color: $gray-text;
  }
}

.chief-doctor-block-img {
  max-width: 100%;
  height: auto;
  border-radius: 15px;

  object-fit: contain;
}

.chief-doctor-block-container {
  min-width: 268px;
  width: 268px;
  height: 268px;
  border-radius: 15px;
}

@media screen and (max-width: 670px) {
  .chief-doctor-block-wrap {
    flex-wrap: wrap;
    gap: 20px;
  }

  .chief-doctor-block-container {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 303px;
  }

  /* .chief-doctor-block-img {
    width: 303px;
    height: 303px;
  } */

  .chief-doctor-block-box {
    width: 100%;
  }

  .chief-doctor-block {
    margin-bottom: 80px;
  }
}
</style>
