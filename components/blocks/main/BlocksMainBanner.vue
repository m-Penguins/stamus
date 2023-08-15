<template>
  <div class="banner">
    <div class="banner-wrap" :class="[bgColor, {'bigImg': bigImg}]">
      <div class="banner-container">
        <div class="banner-box">
          <div class="title-dark-blue p-bt-20 banner-title" v-html="title"></div>
          <div class="banner-text" v-html="text"></div>
          <elements-link-with-arrow :type="type" :title="titleLink" :href="link"/>
          <div class="banner-additional-text" v-html="additionalText"></div>
        </div>
        <div class="banner-images">
          <img class="banner-img" :src="assetsStore.useAsset(`images/img-banner/${img}`)" :alt="alt"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useAssets } from '../../../stores/useAsset'
  export default {
    props: {
      type: {
        type: String,
        default: ''
      },
      titleLink: {
        type: String,
        default: ''
      },
      link: {
        type: String,
        default: '#'
      },
      title: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      additionalText: {
        type: String,
        default: ''
      },
      img: {
        type: String,
        default: ''
      },
      bgColor: {
        type: Boolean,
        default: false
      },
      alt: { 
        type: String, 
        default: 'Image' 
      },
      bigImg: { 
        type: String, 
        default: '' 
      }
    },
    setup() {
      const assetsStore = useAssets();
      return {
        assetsStore
      }
    }
  }
</script>

<style scoped lang="scss">
@import '/assets/styles/style.scss';
.bigImg {
  height: 420px;
  .banner-container {
    .banner-box {
      width: 50%;
    }
    .banner-images {
      width: 50%;
      display: flex;
      justify-content: center;
      .banner-img {
        position: relative;
        bottom: 19px;
        height: 439px;
        max-height: 439px;
      }
    }
  }
}
  .banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0 auto 100px;
    box-sizing: border-box;
    position: relative;

    .banner-wrap {
      width: 1280px;
      max-width: 100%;
      border-radius: 45px;

      .banner-container {
        display: flex;
        justify-content: space-between;
        gap: 9px;

        @media screen and (max-width: 1060px) {
          flex-direction: column;
        }

        .banner-box {
            padding: 123px 0 0px 60px;
            max-width: 675px;

          .banner-text {
            @include body-18-regular;
            padding-bottom: 42px;
          }

          .banner-additional-text {
            @include body-12-regular;
            padding: 71px 0 20px;
            color: rgba(249 ,249 , 250, 0.5);
          }
        }

        .banner-images {
          max-width: 697px;
          background-image: url("@/assets/images/img-banner/vectors.png");
          background-position: bottom;
          background-repeat: no-repeat;
          background-size: contain;

          .banner-img {
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
          }
        }
      }
    }
  }

  .light-blue-gradient {
    background: $light-blue-gradient;

    .banner-title {
      color: $dark-blue-subtitle;
    }
    .banner-text {
      color: rgba(82,86,96, 0.7);
    }
  }

  .light-blue {
    background: $light-blue;
    .banner-title {
      color: $dark-blue-subtitle;
    }
    .banner-text {
      color: rgba(82,86,96, 0.7);
    }
  }

  .blue-gradient {
    background: $blue-gradient;
    .banner-title {
      color: $white;
    }
    .banner-text {
      color: rgba(207,213,225, 0.7);
    }
  }

  .dark-red {
    background: $dark-red;
    .banner-title {
      color: $white;
    }
    .banner-text {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  .dark-blue-gradient {
    background: $dark-blue-gradient;
    .banner-title {
      color: $white;
    }
    .banner-text {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  @media (max-width: 1280px) {
  .banner {
    .banner-wrap {
      .banner-container {
        .banner-box {
            padding: 70px 0 0px 40px;
        }
      }
    }
  }
}

@media (max-width: 1125px) {
  .banner {
    .banner-wrap {
      .banner-container {
        .banner-box {
            padding: 40px 20px 0px 20px;
        }
      }
    }
  }
}

@media (max-width: 1060px) {
  .banner {
    .banner-wrap {
      .banner-container {
        .banner-images {
          width: 427px;
          margin: 0 auto;
        }
        .banner-box {
          .banner-additional-text {
            padding: 5px 0 0px;
          }

          .banner-title {
            width: 321px;
            max-width: 100%;
          }
          .banner-text {
            width: 514px;
            max-width: 100%;
            font-size: 16px;
          }

          .banner-additional-text {
            width: 328px;
            max-width: 100%;
            font-size: 10px;
          }
        }
      }
    }
  }

    .bigImg {
      height: 100% !important;
      .banner-container {
        .banner-box  {
            width: 100%;
          }
          .banner-images {
            width: 350px !important;
            margin: 0 auto;
            .banner-img {
              top: 0;
            }
          }
      }
    }
}

@media (max-width: 600px) {
  .banner {
    .banner-wrap {
      .banner-container {
        .banner-images {
          width: 343px;

          .banner-img {
            height: 231px;
          }
        }
        .banner-box {
          .banner-title {
            width: 175px;
            font-size: 22px;
            line-height: 29px;
          }
        }
      }
    }
  }
}
</style>