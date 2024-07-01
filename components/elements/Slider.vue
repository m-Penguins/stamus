<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const props = defineProps(["programs", "link", "title"]);

const prev = ref(null);
const next = ref(null);

const withGrades = props?.programs?.filter((el) => el?.grade);

const average =
  withGrades?.reduce((acc, it) => (acc += it?.grade), 0) / withGrades?.length;

const averageGrade = average ? average?.toFixed(1) : average;
</script>

<template>
  <div class="main-events-block">
    <div class="slider-title">
      <div class="slider-title__box">
        <h2 class="slider-title__box-title">{{ title ? title : 'Отзывы' }}</h2>
        <!-- <img src="@/assets/images/img-text/prodoctorov.svg" alt="Текст" /> -->
      </div>
      <div class="slider-title__grade">
        <div v-if="averageGrade" class="grey-point-text">
          {{ averageGrade }} средняя оценка
        </div>
        <!-- <div v-if="averageGrade" class="grey-point"></div> -->
        <!-- <div class="grey-point-text">
          {{ pluralize(programs?.length, ["отзыв", "отзыва", "отзывов"]) }}
        </div> -->
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
          v-for="(item, index) in programs"
          :key="index"
          class="swiper-slide"
        >
          <elements-element-feedback-card :data="item" />
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
      <NuxtLink to="/reviews" class="button-base">Все отзывы</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";
.slider-title {
  padding: 0px 0 40px 0;

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
    gap: 10px;
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
  width: 100%;
}

.swiper-slide {
  margin-bottom: 40px;
  width: 416px !important;
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

@media screen and (max-width: 800px) {
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
    width: 334px !important;
  }
}

@media (max-width: 650px) {
  .wrapper-swiper {
    width: calc(98% + 16px);
  }
}

@media screen and (max-width: 400px) {
  .swiper {
    margin: 0;
  }
}
</style>
