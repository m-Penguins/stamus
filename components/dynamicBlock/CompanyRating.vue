<template>
  <div class="rating">
    <div>
      <Swiper
          :autoHeight="true"
          class="swiper"
          :slides-per-view="1"
          :spaceBetween="30"
          :pagination="pagination"
          loop
          centeredSlides
          :autoplay="{
        delay: 3500,
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
        <SwiperSlide>
          <div class="banner-container">
            <div
                class="banner-bg"
                :style="{
              backgroundColor: '#232D5B',
            }"
            ></div>
            <div class="banner-box">
              <div class="title-dark-blue banner-title">
                <span class="white-bg">Первое</span> место в Краснодаре
              </div>
              <div class="banner-text">
                Независимый всероссийский портал Продокторов
              </div>

              <NuxtLink
                  class="link-wrapper"
              >
                <p class="#CFD5E1 text-white">Записаться онлайн</p>
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
                  src="@/assets/images/img-text/ratingImg.png"
                  provider="strapi"
                  sizes="xs:400px md:600px"
                  format="webp"
                  class="banner-img"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="services">
      <ElementsServiceReviewCard v-for="review in reviews" :review="review" :key="review.id"/>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const pagination = {
  clickable: false,
};
const modalStore = useModalStore();
const assetsStore = useAssets();
const reviews = [
  {
    id: 1,
    name: '2ГИС',
    quantity: 1500,
    image: '2gis.svg',
    link: 'https://2gis.ru/krasnodar/branches/70000001062988515'
  },
  {
    id: 2,
    name: 'ПроДокторов',
    quantity: 2000,
    image: 'prodoctorov.svg',
    link: 'https://prodoctorov.ru/krasnodar/set/1642-stomatologiya-stamus/'
  },
  {
    id: 3,
    name: 'Яндекс Карты',
    quantity: 1500,
    image: 'yandexmaps.svg',
    link: 'https://yandex.ru/maps/35/krasnodar/chain/stamus/34932941871/?ll=39.019517%2C45.050172&sll=38.985680%2C45.066115&sspn=0.401241%2C0.175505&z=13.39'
  }
]
const togglerPopup = (state) => {
  isOpenPopup.value = state;
};
const isOpenPopup = ref(false);
const props = defineProps(["block"]);
</script>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";

.swiper {
  height: 480px;
}

.banner-container {
  display: grid;
  height: fit-content;
  max-height: 480px;

  grid-template-columns: [text-start bg-start] 1fr [text-end image-start] 1fr [image-end bg-end];

  grid-template-rows: [image-start] 40px [bg-start text-start] auto [text-end image-end bg-end];

  color: #ffffff;

  border-radius: 45px;
  overflow: hidden;
  overflow: clip;
  font-family: Manrope, serif;
  & .banner-text {
    margin-bottom: 50px;
  }

  & .banner-title {
    color: #ffffff;
    margin-bottom: 20px;
  }
}
.white-bg {
  background: #fff;
  color: #232D5B;
  padding: 12px 10px;
  border-radius: 10px;
  height: 61px;
  display: inline-block;
}

.banner-text {
  @include body-18-regular;
}

.banner-text:deep(ol li),
.banner-text:deep(ul li) {
  list-style: initial;

  margin-left: 24px;
}

.banner-text:deep(ol li) {
  list-style: unset;
}

.banner-box {
  grid-area: text;

  padding: 60px 10px 60px 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media screen and (max-width: 640px) {
  .banner-box {
    padding: 40px 20px;
  }
}

.banner-images {
  max-height: 480px;

  grid-area: image;
  font-size: 0;

  display: flex;
  justify-content: center;

  background-image: url("/images/img-banner/vectors.png");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
}
.banner-img {
  max-width: 100%;
  height: 100%;
  object-fit: contain;
}

.banner-bg {
  grid-area: bg;
  border-radius: 45px;
}

@media screen and (max-width: 900px) {
  .swiper {
    height: auto;
  }
  .banner-container {
    max-height: unset;
    grid-template-columns: [text-start bg-start image-start] auto[text-end bg-end image-end];

    grid-template-rows: [text-start bg-start] auto [image-start text-end] auto [image-end bg-end];
  }
}

.link-wrapper {
  width: fit-content;
  display: flex;
  gap: 10px;
  color: #ffffff;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #c5c9d3;
  }
}

.services {
  display: flex;
  gap: 16px;

  @media screen and (max-width: 965px) {
    flex-direction: column;
    margin-top: 16px;
  }
}
</style>
