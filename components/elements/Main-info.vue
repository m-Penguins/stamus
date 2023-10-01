<template>
  <div class="dentistry-wrapper">
    <div class="dentistry-container" :style="`background-image:url(${imgBg})`" :class="{'bg-dark': isBgDark}">
      <div class="dentistry-box">
        <elements-bread-crumbs
          :breadcrumbs="breadcrumbs"
          :typeColorWhite="typeColorWhite"
        />
        <div class="mob">
          <img :src="imgAdaptiv" :class="[isDital ? 'img-dital' : 'img']" />
          <div>
            <elements-title-text-button
              textButtonBase="Записаться онлайн"
              :customClick="redirectToExternalApp"
              :isButtonBase="isButtonBase"
              :title="title"
              font-size="true"
              :text="text"
              :class="isTimeAndPriceCard ? 'main-info-width' : ''"
            />
            <elements-analitic-card
              :time="time"
              :money="money"
              v-if="isTimeAndPriceCard"
              class="elements-analitic-card-mob"
            />
          </div>
        </div>
        <elements-title-text-button
          :typeColorWhiteText="typeColorWhiteText"
          :customClick="redirectToExternalApp"
          textButtonBase="Записаться онлайн"
          :isButtonBase="isButtonBase"
          :title="title"
          :text="text"
          class="height-50 desktop"
        />
      </div>
      <elements-analitic-card
        :time="time"
        :money="money"
        v-if="isTimeAndPriceCard"
        class="desktop"
      />
    </div>
  </div>
</template>

<script>
import { useAssets } from "../../stores/useAsset";
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
    imgAdaptiv: {
      type: String,
      default: "",
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
  },
};
</script>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

.bg-dark {
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.3);
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
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
}

.dentistry-box {
  display: flex;
  height: 42%;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
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
    margin-top: 108px;
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
