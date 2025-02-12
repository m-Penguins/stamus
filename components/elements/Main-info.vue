<template>
  <div class="dentistry-wrapper">
    <div class="dentistry-container" v-bind="$attrs">
      <NuxtImg
          v-if="imgBg"
          :src="imgBg"
          :alt="imgAlt ?? 'image'"
          :provider="local ? '' : 'strapi'"
          sizes="lg:1280px xl:1560 xxl:1920px "
          format="webp"
          class="banner-img"
          :class="{ 'bg-dark': isBgDark }"
      />
      <div class="dentistry-box">
        <elements-bread-crumbs
            :breadcrumbs="breadcrumbs"
            :typeColorWhite="typeColorWhite"
        />
        <div v-if="isMobileView" class="mob">
          <NuxtImg
              v-if="imgBg"
              :src="imgBg"
              :alt="imgAlt ?? 'image'"
              :provider="local ? '' : 'strapi'"
              sizes="xs:600px"
              format="webp"
              class="my-image"
              :class="{ 'img-dital': isDital, img: !isDital }"
          />
          <div>
            <elements-title-text-button
                :textButtonBase="textButtonBase || 'Записаться онлайн'"
                :customClick="customClick || redirectToExternalApp"
                :isButtonBase="isButtonBase"
                :title="title"
                :font-size="true"
                :text="text"
                :class="isTimeAndPriceCard ? 'main-info-width' : ''"
            />
            <elements-analitic-card
                :time="time"
                :money="money"
                v-if="isTimeAndPriceCard"
                class="elements-analitic-card-mob"
            />
            <elements-course-info-card
                v-if="showCourseCard"
                :time="time"
                :money="money"
                :lector="'lector'"
                class="elements-analitic-card-mob"
            />
            <elements-vacancy-info-card
                v-if="showVacancyCard"
                :time="time"
                :money="money"
                :address="address ? address : 'не указано'"
                class="elements-analitic-card-mob"
            />
          </div>
        </div>
        <elements-title-text-button
            v-if="!isMobileView"
            :typeColorWhiteText="typeColorWhiteText"
            :customClick="customClick || redirectToExternalApp"
            :textButtonBase="textButtonBase || 'Записаться онлайн'"
            :isButtonBase="isButtonBase"
            :title="title"
            :text="text"
            class="height-50 desktop"
        />
      </div>
      <elements-analitic-card
          :time="time"
          :money="money"
          v-if="isTimeAndPriceCard && time && money"
          class="desktop"
      />
      <elements-course-info-card
        v-if="showCourseCard"
        :time="time"
        :money="money"
        :lector="lector"
        class="desktop"
      />
      <elements-vacancy-info-card
          v-if="showVacancyCard"
          :time="time"
          :money="money"
          :address="address ? address : 'не указано'"
          class="desktop"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    imgBg: {
      type: String,
      default: "",
    },
    imgAlt: {
      type: String,
    },
    local: {
      type: Boolean,
      default: false,
    },
    breadcrumbs: {
      type: Array,
    },
    isButtonBase: {
      type: Boolean,
      default: true,
    },
    typeColorWhite: {
      type: Boolean,
      default: false,
    },
    typeColorWhiteText: {
      type: Boolean,
      default: false,
    },
    isTimeAndPriceCard: {
      type: Boolean,
      default: false,
    },
    isDital: {
      type: Boolean,
      default: false,
    },
    isBgDark: {
      type: Boolean,
      default: false,
    },
    time: String,
    money: String,
    lector: String,
    showCourseCard: {
      type: Boolean,
      default: false
    },
    showVacancyCard: {
      type: Boolean,
      default: false
    },
    textButtonBase: String,
    address: Array,
    customClick: Function,
  },
  setup() {
    const isMobileView = ref(false);

    const checkScreenWidth = () => {
      isMobileView.value = window.innerWidth <= 1110;
    };

    onMounted(() => {
      checkScreenWidth();
      window.addEventListener('resize', checkScreenWidth);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', checkScreenWidth);
    });

    return { isMobileView };
  },
};
</script>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

.banner-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  object-fit: cover;
  border-radius: 45px;
}

@media (max-width: 1110px) {
  .banner-img {
    display: none;
  }
}

.my-image {
  border-radius: 25px;
}

.bg-dark {
  filter: brightness(0.7);
}

.img {
  width: 50%;
  max-width: 100%;
}

.img-dital {
  object-fit: cover;
  width: 50%;
  max-width: 100%;
  height: 334px;
  border-radius: 25px;
  object-position: center;
}

.main-info-width {
  width: 100% !important;
}

.mob {
  display: none;
}

.elements-analitic-card-mob {
  position: static;
}

.dentistry-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%;
  margin: 20px auto 0 auto;
  border-radius: 45px;
}

.dentistry-container {
  width: 100%;
  height: 920px;
  border-radius: 45px;
  margin-bottom: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
}

.dentistry-box {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
  z-index: 3;
}

@media (max-width: 1475px) {
  .dentistry-box {
    margin-left: 80px;
  }
}

@media (max-width: 1920px) and (min-width: 1110px) {
  .dentistry-container {
    height: calc(500px + ((100vw - 1110px) * (420 / 810)));
  }
}

@media (max-width: 1357px) {
  .dentistry-wrapper {
    margin-top: 110px;
  }
}

@media (max-width: 1110px) {
  .bg-dark {
    box-shadow: 0 0 0;
  }
  .dentistry-wrapper {
    margin-top: 0;
  }
  .mob {
    display: flex;
    width: 100%;
    gap: 34px;
    align-items: center;
    img {
      // width: 51%;
    }
  }
  .dentistry-container {
    height: 100%;
    background: none !important;
  }
  .desktop {
    display: none;
  }
  .dentistry-box {
    margin-left: 0;
  }
  .breadcrumbs {
    margin-top: 138px;
  }
}

@media (max-width: 1080px) {
  .img {
    width: 400px;
  }
}

@media (max-width: 970px) {
  .img {
    width: 334px;
  }
}

@media (max-width: 668px) {
  .img {
    width: 334px;
  }
}

@media (max-width: 633px) {
  .img {
    width: 100%;
  }
}

@media (max-width: 633px) {
  .img-dital {
    width: 100%;
  }
  .dentistry-container {
    margin-bottom: 80px;
  }
  .mob {
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .mob {
    width: 100%;
  }
}

@media (min-width: 2560px) {
  .dentistry-container {
    // background-size: contain;
    width: 2520px;
  }
}
</style>
