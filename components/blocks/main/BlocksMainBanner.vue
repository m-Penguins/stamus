<template>
  <div class="banner">
    <div class="banner-wrap" :class="bgColor">
      <div class="banner-container">
        <div class="banner-box">
          <h2 class="banner-title" v-html="title"></h2>
          <p class="banner-text" v-html="text"></p>
          <elements-link-with-arrow :type="type" :title="titleLink" :href="link"/>
          <p class="banner-additional-text" v-html="additionalText"></p>
        </div>
        <div class="banner-images">
          <img class="banner-img" :src="assetsStore.useAsset(`images/img-banner/${img}`)" :alt="alt"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useAssets } from '@/stores/useAsset'
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
        type: String,
        default: ''
      },
      alt: { 
        type: String, 
        default: 'Image' 
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
  .banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 60px 0;
    box-sizing: border-box;

    .banner-wrap {
      width: 1280px;
      max-width: 95%;
      border-radius: 45px;

      .banner-container {
        display: flex;
        justify-content: space-between;
        width: 1220px;
        max-width: 100%;
        margin: 0 auto;

        @media screen and (max-width: 1060px) {
          flex-direction: column;
          align-items: center;;
        }

        .banner-box {
          padding: 123px 0 20px 60px;
        
          .banner-title {
            @include body-40-medium;
            padding-bottom: 20px;
          }

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
          .banner-img {
            height: 420px;

            @media screen and (max-width: 1060px) {
              height: 270px;
            }
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
</style>