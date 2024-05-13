<template>
  <div class="partners-card">
    <img
      :src="assetsStore.useAsset(`images/partners/${images.img}`)"
      alt="partner"
    />
  </div>
</template>

<script>
import { useAssets } from "../../stores/useAsset";
export default {
  props: {
    images: Object,
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
@import "@/assets/styles/style.scss";

.partners-card {
  display: flex;
  width: 100%;
  height: 120px;
  padding: 0px 5% 0px 5%;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: var(--light_bg, #f9f9fa);

  & img {
    height: 100%;

    object-fit: contain;
  }
}
</style>
