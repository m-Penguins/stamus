<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { useElementVisibility } from "@vueuse/core";

const pagination = {
  clickable: false,
};

const props = defineProps(["block"]);

const assetsStore = useAssets();
const baseUrl = useRuntimeConfig().public.baseUrl;

const target = ref(null);
const targetIsVisible = useElementVisibility(target);
</script>

<template>
  <Swiper
    ref="target"
    class="swiper"
    :autoHeight="true"
    :slides-per-view="1"
    :spaceBetween="30"
    :pagination="pagination"
    loop
    centeredSlides
    :autoplay="{
      delay: targetIsVisible ? 3500 : 0,
      disableOnInteraction: false,
    }"
    :modules="[Autoplay, Pagination]"
    :style="{
      '--swiper-pagination-color': '#232D5B',
      '--swiper-pagination-bullet-inactive-color': '#E6E6E6',
      '--swiper-pagination-bullet-inactive-opacity': '1',
      '--swiper-pagination-bullet-size': '8px',
      '--swiper-pagination-bullet-horizontal-gap': '4px',
    }"
  >
    <SwiperSlide v-for="banner in block?.banner" :key="banner?.id">
      <div
        class="banner-container"
        :style="{
          backgroundColor: banner?.color,
        }"
      >
        <div class="banner-box">
          <div class="title-dark-blue banner-title">
            {{ banner?.title }}
          </div>
          <div class="banner-text" v-html="banner?.description"></div>
          <NuxtLink
            v-if="banner?.link"
            :to="banner?.link"
            target="_blank"
            class="link-wrapper"
          >
            <p class="text text-white">{{ banner?.link_text }}</p>
            <div>
              <svg
                width="18"
                height="9"
                viewBox="0 0 18 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="svg"
                  d="M1 4C0.723858 4 0.5 4.22386 0.5 4.5C0.5 4.77614 0.723858 5 1 5V4ZM17.3536 4.85355C17.5488 4.65829 17.5488 4.34171 17.3536 4.14645L14.1716 0.964466C13.9763 0.769204 13.6597 0.769204 13.4645 0.964466C13.2692 1.15973 13.2692 1.47631 13.4645 1.67157L16.2929 4.5L13.4645 7.32843C13.2692 7.52369 13.2692 7.84027 13.4645 8.03553C13.6597 8.2308 13.9763 8.2308 14.1716 8.03553L17.3536 4.85355ZM1 5H17V4H1V5Z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          </NuxtLink>
        </div>
        <div class="banner-images">
          <img
            class="banner-img"
            :src="
              banner?.image?.data?.attributes?.url
                ? `${baseUrl}${banner?.image?.data?.attributes?.url}`
                : assetsStore.useAsset(`images/img-banner/tooth.png`)
            "
            alt="img"
          />
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";

.banner-container {
  position: relative;
  width: 100%;
  border-radius: 45px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #ffffff;

  & .banner-text {
    margin-bottom: 50px;
  }

  & .banner-title {
    color: #ffffff;
    margin-bottom: 20px;
  }

  & :deep(ul li) {
    margin-left: 20px;
    list-style: circle;
    margin-bottom: 6px;
  }

  .banner-box {
    flex-basis: 50%;
    padding: 60px;
  }
  .banner-images {
    width: 50%;
    display: flex;
    justify-content: center;
    .banner-img {
      position: relative;
      bottom: 0;
      height: 439px;
      width: 100%;
      max-width: 100%;

      object-fit: contain;
    }
  }
}

@media screen and (max-width: 1100px) {
  .banner-container {
    flex-direction: column;

    .banner-images {
      width: 427px;
      margin: 0 auto;
      width: 100%;
      height: 417px;
    }
    .banner-box {
      width: 100%;
      padding: 40px;
      .banner-additional-text {
        padding: 5px 0 0px;
      }

      .banner-title {
        max-width: 100%;
      }
      .banner-text {
        width: 514px;
        max-width: 100%;
        font-size: 18px;
      }

      .banner-additional-text {
        width: 328px;
        max-width: 100%;
        font-size: 10px;
      }
    }
  }
}

@media (max-width: 690px) {
  .banner-container {
    .banner-images {
      width: 343px;
      height: 240px;
    }
    .banner-box {
      padding: 40px 20px;
      .banner-title {
        font-size: 22px;
        line-height: 29px;
      }
    }
  }
}

.banner-images {
  width: 100%;
  // max-width: 697px;
  max-width: 628px;

  height: 439px;
  background-image: url("@/assets/images/img-banner/vectors.png");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;

  .banner-img {
    height: 439px;
    width: auto;
    max-width: 100%;
    max-height: 100%;
  }
}

.link-wrapper {
  display: flex;
  align-items: center;
  width: fit-content;

  cursor: pointer;
  border-bottom: 1px solid transparent;

  transition: all 0.2s ease-in-out;

  .text {
    @include body-14-regular;
    padding-right: 6px;
  }

  .text-white {
    color: $white;
  }
}

.link-wrapper:hover {
  border-bottom: 1px solid #ffffff;
}
</style>
