<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const props = defineProps(["block", "serviceId"]);

const placeholdersStore = usePlaceholdersStore();

const prev = ref(null);
const next = ref(null);

const allCasesLink = props?.serviceId
  ? `/portfolio?dir=${props?.serviceId}`
  : "/portfolio";
</script>

<template>
  <div
    class="main-events-block"
    id="portfolio"
    v-if="block?.portofolios?.data?.length"
  >
    <div class="slider-title">
      <div class="slider-title__box">
        <h2 class="slider-title__box-title">
          {{ block?.title ?? "Портфолио" }}
        </h2>
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
        <swiper-slide
          v-for="(portfolio, index) in block?.portofolios?.data"
          :key="index"
          class="swiper-slide"
        >
          <div class="card-photo-name">
            <div class="card-photo-name-img">
              <NuxtImg
                v-if="
                  portfolio?.attributes?.photoBanner?.data?.attributes?.url ??
                  placeholdersStore?.imagePlaceholders?.portfoliosSmall
                "
                :src="
                  portfolio?.attributes?.photoBanner?.data?.attributes?.url ??
                  placeholdersStore?.imagePlaceholders?.portfoliosSmall
                "
                provider="strapi"
                :alt="
                  portfolio?.attributes?.photoBanner?.data?.attributes
                    ?.alternativeText
                "
                sizes="xs:400px md:600px"
                format="webp"
                class="banner-img"
                loading="lazy"
              />
            </div>
            <div class="card-photo-name-container">
              <div>
                <div class="card-photo-name-title">
                  {{ portfolio?.attributes?.heading }}
                </div>
                <div class="card-photo-name-text">
                  {{ portfolio?.attributes?.direction?.directions }}
                </div>
              </div>
            </div>
            <div class="card-photo-name-description">
              {{ portfolio?.attributes?.description }}
            </div>

            <elements-link-with-arrow
              type
              title="Смотреть кейс"
              :link="`/portfolio/${portfolio?.id}`"
            />
          </div>
        </swiper-slide>
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
    <div class="slider-base-btn">
      <NuxtLink :to="allCasesLink" class="button-base"
        >Смотреть все работы</NuxtLink
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

.slider-title {
  padding: 20px 0 40px 0;

  &__box {
    display: flex;
    padding-bottom: 17px;

    &-title {
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
  top: 13px;
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

.swiper-slide {
  margin-bottom: 40px;
  width: 308px !important;
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
      right: -2%;
    }

    .swiper-button-prev {
      position: absolute;
      left: -10px;
    }
  }
  .swiper-slide {
    margin-bottom: 30px;
    width: 334px !important;
  }
  .slider-base-btn {
    padding-bottom: 0;
  }
}

@media (max-width: 650px) {
  .wrapper-swiper {
    width: calc(98% + 16px);
  }
}

@media (max-width: 600px) {
  .swiper-slide {
    width: 330px !important;
  }
}

.card-photo-name-box-image {
  padding-bottom: 30px;
}

.card-photo-name-img {
  width: 100%;
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

.card-photo-name-container {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
}

.card-photo-name-title {
  @include body-20-regular;
  color: $dark-blue-subtitle;
  padding-bottom: 4px;
}

.card-photo-name-text {
  @include body-12-regular;
  color: $gray-text;
  opacity: 0.7;
}

.card-photo-name-description {
  @include body-14-regular;
  color: $gray-text;
  opacity: 0.7;

  min-height: 60px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -moz-box;
  -moz-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  box-orient: vertical;
}

@media (max-width: 1328px) {
  .card-photo-name {
    width: 100%;

    .card-photo-name-box-image {
      width: 100%;
    }
  }
}
</style>
