<template>
<div class="main-events-block">
  <div class="slider-title">
    <div class="slider-title__box">
      <h2 class="slider-title__box-title">Отзывы с</h2>
      <img src="@/assets/images/img-text/prodoctorov.svg" alt="Текст"/>
    </div>
    <div class="slider-title__grade">
      <div class="grey-point-text">4.8 средняя оценка</div>
      <div class="grey-point"></div>
      <div class="grey-point-text">1958 отзывов</div>
    </div>
  </div>
  <div class="wrapper-swiper">
    <swiper
      class="swiper"
      :slides-per-view="3"
      :space-between="16"
      :modules="modules"
      :breakpoints="{
            '0': {
              slidesPerView: 1,
            },
            '650': {
              slidesPerView: 2,
            },
            '1327': {
                slidesPerView: 3,
              }
          }"
      :navigation="{
          prevEl: prev,
          nextEl: next,
      }"
    >
      <swiper-slide v-for="(item, index) in programs" :key="index" class="swiper-slide">
        <elements-element-feedback-card :data="item" />
      </swiper-slide>
    </swiper>
    <div class="wrapper-btn">
      <div ref="prev" class="swiper-button-prev">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.5C11.7239 21.5 11.5 21.7239 11.5 22C11.5 22.2761 11.7239 22.5 12 22.5V21.5ZM32.3536 22.3536C32.5488 22.1583 32.5488 21.8417 32.3536 21.6464L29.1716 18.4645C28.9763 18.2692 28.6597 18.2692 28.4645 18.4645C28.2692 18.6597 28.2692 18.9763 28.4645 19.1716L31.2929 22L28.4645 24.8284C28.2692 25.0237 28.2692 25.3403 28.4645 25.5355C28.6597 25.7308 28.9763 25.7308 29.1716 25.5355L32.3536 22.3536ZM12 22.5H32V21.5H12V22.5Z" fill="#525660"/>
          <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="#E9E9E9"/>
        </svg>
      </div>
      <div ref="next" class="swiper-button-next">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.5C11.7239 21.5 11.5 21.7239 11.5 22C11.5 22.2761 11.7239 22.5 12 22.5V21.5ZM32.3536 22.3536C32.5488 22.1583 32.5488 21.8417 32.3536 21.6464L29.1716 18.4645C28.9763 18.2692 28.6597 18.2692 28.4645 18.4645C28.2692 18.6597 28.2692 18.9763 28.4645 19.1716L31.2929 22L28.4645 24.8284C28.2692 25.0237 28.2692 25.3403 28.4645 25.5355C28.6597 25.7308 28.9763 25.7308 29.1716 25.5355L32.3536 22.3536ZM12 22.5H32V21.5H12V22.5Z" fill="#525660"/>
          <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="#E9E9E9"/>
        </svg>
      </div>
    </div>
  </div>
  <div class="slider-base-btn">
    <elements-button-base title="Все отзывы" :arrow="true"/>
  </div>
</div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';

 
import 'swiper/css';
import 'swiper/css/navigation';

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    programs: {
      tpye: Array,
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
@import '/assets/styles/style.scss';

  .slider-title {
    padding: 20px 0 40px 0;

    &__box {
      display: flex;
      padding-bottom: 17px;

      &-title {
        padding-right: 10px;
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
      gap: 40px;
      align-items: center;
      position: absolute;
      top: 38px;
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
        border: 1px solid $border-card;

        &::after {
          display: none;
        }
      }

      .swiper-button-prev {
        transform: rotate(180deg);
      }

      .swiper-button-disabled {
        background: rgba(217, 217, 217, .2);;
        svg {
          path {
            fill: black
          }
        }
      }
  }

  .wrapper-swiper {
    overflow-x: hidden;
  }

  .swiper-slide {
    margin-bottom: 40px;
  }

  .main-events-block {
    display: flex;
    flex-direction: column;
    position: relative;
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
}

</style>