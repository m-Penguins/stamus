<template>
  <div class="dentistry-wrapper">
    <div class="dentistry-container" :style="`background-image:url(${assetsStore.useAsset(`images/big-images/${imgBg}`)})`">
      <div class="dentistry-box">
        <elements-bread-crumbs :breadcrumbs="breadcrumbs"/>
        <div class="mob">
          <img :src="assetsStore.useAsset(`images/big-images/${imgAdaptiv}`)"/>
          <elements-title-text-button :isButtonBase="isButtonBase" :title="title" font-size="true" :text="text" class=""/>
        </div>
        <elements-title-text-button :isButtonBase="isButtonBase" :title="title" :text="text" class="height-50 desktop"/>
      </div>
    </div>
  </div>
</template>

<script>
import { useAssets } from '../../stores/useAsset'
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      imgBg: {
        type: String,
        default: ''
      },
      imgAdaptiv: {
        type: String,
        default: ''
      },
      breadcrumbs: {
        tpye: Array,
      },
      isButtonBase: {
        type: Boolean,
        default: true
      }
    },
    setup() {
      const assetsStore = useAssets();
      return {
        assetsStore,
      }
    }
  }
</script>

<style scoped lang="scss">
@import '/assets/styles/style.scss';

.mob {
  display: none;
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

  @media (max-width: 1577px) {
    .dentistry-box {
      margin-left: 80px;
    }
  }

  @media (max-width: 1920px) and (min-width: 1110px) {
    .dentistry-container {
      height: calc(500px + ((100vw - 1110px) * (420 / 810)));
    }
  }

  @media (max-width: 1110px) {
    .mob {
      display: flex;
      width: 100%;
      gap: 34px;
      align-items: center;

        img {
          width: 51%;
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
      gap: 14px;
    }

    .breadcrumbs {
      margin-top: 88px;
    }
  }

    @media (max-width: 600px) {
    .dentistry-container {
      margin-bottom: 80px;
    }
    .mob {
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: flex-start;

      img {
        width: 100%;
      }
    }

    .mob {
      width: 100%;
    }
  }

  @media (min-width: 1920px) {
    .dentistry-container {
      background-size: contain;
      width: 1880px;
    }
  }
</style>