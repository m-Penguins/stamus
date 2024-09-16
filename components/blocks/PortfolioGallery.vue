<template>
  <div class="gallery" v-if="arrayImg?.length">
    <div class="gallery-title">Галерея</div>

    <div class="gallery-img-container">
      <div v-for="item in arrayImg" class="single-img" :class="{isVideo: item.caption}"  :key="item" @click="handleVideoClick(item.caption)">
        <NuxtImg
          v-if="item.url"
          :src="item.url"
          provider="strapi"
          alt="Галерея"
          sizes="xs:400px md:600px"
          format="webp"
          class="gall-img"
        />
        <img
            v-if="item.caption"
            class="utube"
            :src="assetsStore.useAsset('images/icons/play.svg')"
            alt="Play"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["arrayImg"]);

const assetsStore = useAssets();
const videoStore = useModalVideoStore();

const handleVideoClick = (link) => {
  if (!link) {
    return
  }
  videoStore.isModalOpen = true;
  videoStore.link = link;
}
</script>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

.gallery {
  display: flex;
  flex-direction: column;
  width: 1280px;
  max-width: 100%;
  margin: 0 auto 100px;
}

.gallery-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
  padding-bottom: 40px;
}

.single-img {
  width: 100%;
  aspect-ratio: 1;
  position: relative;

  @supports not (aspect-ratio: 1/1) {
    padding-top: 100%;
    height: 0;
    position: relative;
    overflow: hidden;
  }

  &.isVideo {
    cursor: pointer;
  }
}

.utube {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  cursor: pointer;
}

.gall-img {
  object-fit: cover;
  height: 100%;
  width: 100%;

  border-radius: 14px;
}

.gallery-img-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

@media (max-width: 900px) {
  .gallery-img-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 589px) {
  .gallery {
    margin: 0 auto 80px;
  }

  .gallery-img-container {
    grid-template-columns: 1fr;
  }
}
</style>
