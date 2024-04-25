<script setup>
const props = defineProps(["infoBlock"]);

const image = props?.infoBlock?.image?.data?.attributes?.url;

const alt = props?.infoBlock?.image?.data?.attributes?.alternativeText;
</script>

<template>
  <div class="video-block-wrap">
    <div class="video-block-container">
      <div class="video-block-info">
        <h3 v-if="infoBlock?.title" class="video-block-title">
          {{ infoBlock?.title }}
        </h3>
        <div
          v-if="infoBlock.description"
          v-html="infoBlock?.description"
          class="video-block-text"
        ></div>
      </div>
      <div class="video-block-logo">
        <img src="@/assets/images/icons/video-logo-block.svg" alt="icon" />
      </div>
    </div>
    <div class="image-container">
      <NuxtImg
        :src="image"
        provider="strapi"
        :alt="alt"
        sizes="xs:400px md:600px"
        format="webp"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

.image-container {
  width: 100%;
  max-width: 450px;
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

.video-block-info-card {
  padding-top: 40px;
}

.mob {
  display: none;
}

.video-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 100px;
}

.video-block-link {
  width: fit-content;
  cursor: pointer;
}

.video-block-wrap {
  display: flex;
  justify-content: space-between;
  width: 1280px;
  max-width: 100%;
  background: var(--light-bg, #f9f9fa);
  border-radius: 25px;
  margin: 0 auto;
  padding: 20px;
}

.video-block-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 524px;
  margin: 40px 40px 0;
}

.video-block-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
  padding-bottom: 14px;
}

.video-block-text {
  @include body-14-regular;
  color: $gray-text;
}

.video-block-contacts {
  display: flex;
  gap: 14px;
  align-items: baseline;
  padding-top: 10px;
}

.video-block-contacts-box {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.grey {
  @include body-12-regular;
  color: $placeholder;
}

.dark-grey {
  @include body-14-regular;
  color: $gray-text;
  gap: 12px;
}

.video-block-inner {
  display: flex;
  gap: 20px;
}

.video-block-box {
  object-fit: cover;
  width: 373px;
  display: inline-block;
  overflow: hidden;
  border-radius: 15px;
  img {
    width: 373px;
    height: 348px;
    transition: 1s;
    display: block;
    cursor: pointer;
    border-radius: 15px;
  }

  img:hover {
    transform: scale(1.1);
    border-radius: 15px;
  }
}

.video-block-rectangle-video {
  width: 220px;
  min-height: 348px;
  height: 100%;
  border-radius: 15px;
  background: var(--text, #525660);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  cursor: pointer;

  & a {
    height: 100%;
    width: 100%;
    display: block;
  }

  & .utube {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    cursor: pointer;
  }
}

.video-block-rectangle {
  width: 220px;
  min-height: 348px;
  //height: 100%;
  border-radius: 15px;
  background: var(--text, #525660);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 1s;
  cursor: pointer;

  svg {
    position: sticky;
    top: 52%;
    left: 93%;
  }
}

.video-block-rectangle:hover {
  background: var(--accent, #232d5b);
}

.video-block-feedback {
  @include body-22-medium-Neue;
  color: $white;
  padding: 20px;
  width: 100px;
}

@media (max-width: 1140px) {
  .image-container {
    margin: 0 auto;
    max-width: 530px;
  }
  .video-block-info-card {
    padding: 0 0 30px;
  }

  .video-block-wrap {
    flex-wrap: wrap;
  }
  .video-block-container {
    align-items: start;
    flex-direction: inherit;
    max-width: 100%;
    margin: 0;
    justify-content: space-between;
    width: 100%;
  }
  .video-block-contacts {
    padding-bottom: 30px;
  }
  .video-block-inner {
    width: 100%;
    justify-content: flex-start;
  }
  .video-block-box {
    width: 488px;
    height: 348px;
    border-radius: 15px;
    img {
      object-fit: cover;
      object-position: 0% 22%;
      width: 488px;
      height: 348px;
      border-radius: 15px;
    }
  }
  .video-block-rectangle {
    height: 100%;
    width: 50%;
  }
  .video-block-rectangle-video {
    width: 50%;
  }

  .video-block-logo {
    width: 30px;
  }

  .video-block-text {
    padding-bottom: 30px;
  }

  .video-block-info {
    width: 90%;
  }
}

@media (max-width: 800px) {
  .video-block-title {
    font-size: 16px;
    padding-bottom: 24px;
  }

  .video-block-text {
    font-size: 16px;
    padding-bottom: 30px;
  }
}

@media (max-width: 670px) {
  .desktop {
    display: none;
  }

  .mob {
    display: block;
    margin-right: 10px;
  }

  .video-block {
    margin-bottom: 80px;
  }

  .video-block-inner {
    flex-direction: column;
  }

  .video-block-box {
    height: 348px;
    width: 100%;
    img {
      width: 100%;
      object-position: 50% 24%;
    }
  }

  .video-block-rectangle-video {
    width: 100%;
  }

  .video-block-rectangle {
    width: 100%;
    height: 100%;
    min-height: fit-content;
    flex-direction: row-reverse;
    align-items: center;

    svg {
      transform: rotate(45 1.5948 32);
    }
  }

  .video-block-feedback {
    font-size: 16px;
    line-height: 17px;
  }

  .video-block-text {
    font-size: 14px;
  }
}

.problems__image {
  border-radius: 15px;
  height: 100%;
  object-fit: cover;
  width: 100%;
  max-width: 100%;

  pointer-events: none;
}
</style>
