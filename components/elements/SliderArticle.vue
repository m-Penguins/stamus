<template>
  <div class="main-events-block">
    <div class="slider-title">
      <div class="slider-title__box">
        <h2 class="slider-title__box-title">{{ title }}</h2>
        <elements-link-with-arrow
          type="type"
          title="Все статьи"
          link="/articles"
        />
      </div>
    </div>
    <div class="wrapper-swiper">
      <swiper
        class="swiper"
        :slides-per-view="'auto'"
        :space-between="16"
        :modules="modules"
        :navigation="{
          prevEl: prev,
          nextEl: next,
        }"
      >
        <swiper-slide
          v-for="(item, index) in programs"
          :key="index"
          class="swiper-slide custom-size"
        >
          <elements-article-card :article="item" />
        </swiper-slide>
      </swiper>
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

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    programs: {
      type: Array,
    },
    title: {
      type: String,
    },
  },
  setup() {
    const prev = ref(null);
    const next = ref(null);
    return {
      modules: [Navigation],
      prev,
      next,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";
.slider-title {
  padding: 0px 0 40px 0;

  &__box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-title {
      @include body-22-medium-Neue;
      color: $dark-blue-subtitle;
      padding-right: 10px;
    }
  }

  &__grade {
    display: flex;
    align-items: center;
  }
}

.slider-grade {
  @include body-12-regular;
  color: $gray-text;
  opacity: 0.7;
}

.slider-point {
  width: 4px;
  height: 4px;
  margin: 0 10px;
  background-color: $gray-text;
  border-radius: 50px;
  opacity: 0.2;
}

.slider-base-btn {
  margin: 0 auto;
  padding-bottom: 20px;
}

.wrapper-btn {
  div {
    width: 44px;
    height: 44px;
    background: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 45px;
    border: 1px solid $border-card;

    &::after {
      display: none;
    }
  }
  .swiper-button-prev {
    transform: rotate(180deg);
    top: 50%;
    left: -4%;
  }

  .swiper-button-next {
    top: 50%;
    right: -4%;
  }
}

.wrapper-swiper {
  width: 100%;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  margin-bottom: 40px;
  max-width: 308px;
}
.main-events-block {
  display: flex;
  flex-direction: column;
  position: relative;
}

.swiper-slide {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

@media screen and (max-width: 1277px) {
  .wrapper-btn {
    div {
      width: 24px;
      height: 24px;
      right: 4%;
    }
    .swiper-button-next {
      right: -1%;
    }

    .swiper-button-prev {
      left: -10px;
    }
  }
}

@media screen and (max-width: 1200px) {
  .wrapper-swiper {
    width: calc(97% + 31px);
  }
  .swiper-slide {
    width: 33%;
    max-width: 100%;
  }
  .swiper {
    overflow: visible;
  }
}

@media (max-width: 860px) {
  .swiper-slide {
    width: 48.5%;
  }
}

@media screen and (max-width: 744px) {
  .swiper {
    overflow: visible;
  }
}

@media screen and (max-width: 650px) {
  .swiper-slide {
    width: 330px;
  }
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
