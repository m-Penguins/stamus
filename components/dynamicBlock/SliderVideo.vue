<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const props = defineProps(["block"]);

console.log(props.block);

const assetsStore = useAssets();
const baseUrl = useRuntimeConfig().public.baseUrl;

const videos = props?.block?.video;

const prev = ref(null);
const next = ref(null);

const videoStore = useModalVideoStore();

const handleVideoClick = (link) => {
  videoStore.isModalOpen = true;
  videoStore.link = link;
};
</script>

<template>
  <div class="main-events-block">
    <div class="slider-title">
      <div class="slider-title__box">
        <h2 class="slider-title__box-title">{{ block?.title }}</h2>
      </div>
    </div>
    <div class="wrapper-swiper">
      <Swiper
        class="swiper"
        :slides-per-view="'auto'"
        :space-between="16"
        :modules="[Navigation]"
        :navigation="{
          prevEl: prev,
          nextEl: next,
        }"
      >
        <template v-for="(video, index) in videos" :key="video?.id">
          <swiper-slide class="swiper-slide" v-if="video?.videoLink">
            <div class="ss-card" @click="handleVideoClick(video?.videoLink)">
              <div class="ss-image">
                <img
                  v-if="video?.videoPreview?.data?.attributes?.url"
                  :src="`${baseUrl}${video?.videoPreview?.data?.attributes?.url}`"
                  alt="Video"
                  class="problems__image"
                />
                <img
                  class="utube"
                  :src="assetsStore.useAsset('images/icons/play.svg')"
                  alt="Play"
                />
              </div>
              <p class="ss-title">{{ video?.title }}</p>
            </div>
          </swiper-slide>
        </template>
      </Swiper>
      <div class="wrapper-btn">
        <div ref="prev" class="swiper-button-prev">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.5C11.7239 21.5 11.5 21.7239 11.5 22C11.5 22.2761 11.7239 22.5 12 22.5V21.5ZM32.3536 22.3536C32.5488 22.1583 32.5488 21.8417 32.3536 21.6464L29.1716 18.4645C28.9763 18.2692 28.6597 18.2692 28.4645 18.4645C28.2692 18.6597 28.2692 18.9763 28.4645 19.1716L31.2929 22L28.4645 24.8284C28.2692 25.0237 28.2692 25.3403 28.4645 25.5355C28.6597 25.7308 28.9763 25.7308 29.1716 25.5355L32.3536 22.3536ZM12 22.5H32V21.5H12V22.5Z"
              fill="#525660"
            />
            <rect
              x="0.5"
              y="0.5"
              width="43"
              height="43"
              rx="21.5"
              stroke="#E9E9E9"
            />
          </svg>
        </div>
        <div ref="next" class="swiper-button-next">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.5C11.7239 21.5 11.5 21.7239 11.5 22C11.5 22.2761 11.7239 22.5 12 22.5V21.5ZM32.3536 22.3536C32.5488 22.1583 32.5488 21.8417 32.3536 21.6464L29.1716 18.4645C28.9763 18.2692 28.6597 18.2692 28.4645 18.4645C28.2692 18.6597 28.2692 18.9763 28.4645 19.1716L31.2929 22L28.4645 24.8284C28.2692 25.0237 28.2692 25.3403 28.4645 25.5355C28.6597 25.7308 28.9763 25.7308 29.1716 25.5355L32.3536 22.3536ZM12 22.5H32V21.5H12V22.5Z"
              fill="#525660"
            />
            <rect
              x="0.5"
              y="0.5"
              width="43"
              height="43"
              rx="21.5"
              stroke="#E9E9E9"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

.ss-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
}

.ss-image {
  width: 100%;
  max-width: 416px;
  height: 290px;
}

.problems__image {
  height: 100%;
  object-fit: cover;
  width: 100%;
  max-width: 100%;
  border-radius: 15px;
}

.utube {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  cursor: pointer;
}

.slider-title {
  padding: 0px 0 30px 0;

  &__box {
    display: flex;
    padding-bottom: 8px;

    &-title {
      padding-right: 10px;
      @include body-22-medium-Neue;
      color: $dark-blue-subtitle;
    }
  }

  &__grade {
    display: flex;
    align-items: center;
  }
}

.slider-base-btn {
  margin: 0 auto;
  padding-bottom: 20px;
}

.wrapper-btn {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  position: absolute;
  top: 3px;
  right: 0;

  div {
    width: 44px;
    height: 44px;
    background: $white;
    position: static;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 45px;

    &::after {
      display: none;
    }
  }

  .swiper-button-prev {
    transform: rotate(180deg);
  }
}

.wrapper-swiper {
  // overflow-x: hidden;
  width: 100%;
}

.swiper-slide {
  width: 100%;
  max-width: 416px !important;
  min-height: 290px;

  cursor: pointer;
  overflow: hidden;
}

.main-events-block {
  display: flex;
  flex-direction: column;
  position: relative;
}

@media screen and (max-width: 1200px) {
  .wrapper-swiper {
    width: calc(100% + 15px);
  }
  .swiper {
    overflow: visible;
    width: auto !important;
  }
}

@media (max-width: 800px) {
  .wrapper-btn {
    position: unset;
    div {
      width: 24px;
      height: 24px;
    }
    .swiper-button-next {
      position: absolute;
      right: -1%;
    }

    .swiper-button-prev {
      position: absolute;
      left: -10px;
    }
  }
  .slider-base-btn {
    padding-bottom: 0;
  }

  .swiper-slide {
    max-width: 334px !important;
  }
}

@media (max-width: 650px) {
  .wrapper-swiper {
    width: calc(98% + 16px);
  }
}

@media (max-width: 600px) {
  .swiper-slide {
    max-width: 330px !important;
  }
}
</style>
