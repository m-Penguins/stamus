<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

defineProps(["title", "imagesScroll"]);

const prev = ref(null);
const next = ref(null);

const isCertOpen = ref(false);
const popupImg = ref("");

const openCert = (image) => {
  popupImg.value = image;
  document.body.classList.add("modal-open");

  isCertOpen.value = true;
};

const closeCert = () => {
  document.body.classList.remove("modal-open");
  isCertOpen.value = false;
};
</script>

<template>
  <Teleport to="body">
    <transition name="modal">
      <div class="popup-wrap" v-if="isCertOpen" @click="closeCert">
        <div class="popup" @click.stop>
          <img
            class="popup-img"
            :src="popupImg"
            alt="certificate"
            loading="lazy"
          />
          <div class="popup-close">
            <svg
              @click="closeCert"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="20" height="20" rx="2" fill="#FBFBFB" />
              <path
                d="M6 6L14 14M14 6L6 14"
                class="close-reg"
                stroke="#33383A"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
  <div class="container-size wrapper-feedback">
    <div class="main-events-block">
      <div class="slider-title">
        <div class="slider-title__box">
          <h2 class="slider-title__box-title" v-html="title"></h2>
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
            v-for="(item, index) in imagesScroll"
            :key="index"
            class="swiper-slide"
            @click="openCert(item)"
          >
            <img
              class="swiper-img"
              :src="item"
              alt="certificate"
              loading="lazy"
            />
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

/* POPUP */

.popup-img {
  object-fit: contain;
  margin: 0 auto;
  width: 100%;
  height: auto;
}

.popup-close {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 16px;
  right: 20px;
  cursor: pointer;

  & svg {
    width: 30px;
    height: 30px;
  }
}

.popup-close:hover {
  .close-reg {
    stroke: #232d5b;
  }
}

.popup-close:active {
  .close-reg {
    opacity: 0.7px;
  }
}

.popup {
  display: flex;
  position: relative;
  padding: 10px;
  background: #ffffff;
  border-radius: 20px;
  max-width: 1216px;
  width: fit-content;
  z-index: 902;

  max-height: 90vh;
  max-height: 90svh;
}

.popup-wrap {
  padding: 20px 10px;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  z-index: -11;
  opacity: 0;
  transition: 0.3s;
  background-color: rgb(0, 0, 0, 0.6);
  visibility: visible;
  opacity: 1;
  z-index: 901;

  overflow: auto;
}

.swiper-slide {
  margin-bottom: 40px;
  width: 416px;
  height: auto;
  max-height: 290px;
}

.swiper-img {
  object-fit: cover;
  object-position: top;
  height: 100%;
  width: 100%;
  max-width: 100%;
}

@media (max-width: 650px) {
  .wrapper-feedback {
    margin: 0 auto 40px !important;
  }
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
    width: 334px !important;
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
</style>
