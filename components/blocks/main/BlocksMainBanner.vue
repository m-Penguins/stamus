<template>
  <div class="banner">
    <div class="banner-wrap" :class="[bgColor, { bigImg: bigImg }]">
      <div class="banner-container">
        <div class="banner-box">
          <div
            v-if="!selectedText"
            class="title-dark-blue p-bt-20 banner-title"
            v-html="title"
          ></div>
          <div v-else class="title-dark-blue p-bt-20 banner-title selected">
            <div class="selected-word">Первое</div>
            <div>место в Краснодаре</div>
          </div>
          <div class="banner-text" v-html="text"></div>
          <elements-link-with-arrow
            :type="type"
            :title="titleLink"
            :link="link"
            :clickHandler="handleLinkClick"
          />
          <div class="banner-additional-text" v-html="additionalText"></div>
        </div>
        <div class="banner-images">
          <NuxtImg
            :src="`images/img-banner/${img}`"
            alt="image"
            sizes="xs:400px md:800px"
            format="webp"
            class="banner-img"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAssets } from "../../../stores/useAsset";
export default {
  props: {
    selectedText: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "",
    },
    titleLink: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "#",
    },
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    additionalText: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
    bgColor: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "Image",
    },
    bigImg: {
      type: String,
      default: "",
    },
    handleLinkClick: Function,
  },
  setup() {
    const assetsStore = useAssets();
    return {
      assetsStore,
    };
  },
};
</script>

<style scoped lang="scss">
@import "/assets/styles/style.scss";
.selected {
  width: 597px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.selected-word {
  color: #232d5b;
  display: flex;
  padding: 12px 10px 10px 10px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
  background: var(--white, #fff);
}

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
          color: rgba(249, 249, 250, 0.5);
        }
      }

      .banner-images {
        width: 100%;
        // max-width: 697px;
        max-width: 628px;
        background-image: url("@/public/images/img-banner/vectors.png");
        background-position: bottom;
        background-repeat: no-repeat;
        background-size: contain;

        .banner-img {
          height: 439px;
          width: auto;
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
}

.banner .dark-red .banner-container .banner-images {
  height: 480px;
  width: 68%;
  .banner-img {
    height: 100%;
    height: 480px;
  }
}

.banner .dark-red .banner-container .banner-box {
  width: 50%;
  .banner-additional-text {
    padding: 72px 0 20px;
  }
}

.banner .light-blue-gradient .banner-container .banner-images {
  height: 420px;
}

.light-blue-gradient {
  background: $light-blue-gradient;

  .banner-title {
    color: $dark-blue-subtitle;
  }
  .banner-text {
    color: rgba(82, 86, 96, 0.7);
  }
}

.light-blue {
  background: $light-blue;
  .banner-title {
    color: $dark-blue-subtitle;
  }
  .banner-text {
    color: rgba(82, 86, 96, 0.7);
  }
}

.blue-gradient {
  background: $blue-gradient;
  .banner-title {
    color: $white;
  }
  .banner-text {
    color: rgba(207, 213, 225, 0.7);
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

.grey {
  background: #f9f9fa;
  height: 420px;
  .banner-title {
    color: $dark-blue-subtitle;
  }
  .banner-text {
    color: $gray-text;
  }
  .banner-container {
    .banner-box {
      width: 100%;
    }
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
  .grey {
    height: 420px;
  }
}

@media (max-width: 1158px) {
  .banner .light-blue-gradient .banner-container .banner-images {
    width: 69%;
    height: 420px;
  }
  .banner .light-blue-gradient .banner-container .banner-images {
    width: 69%;
    height: 420px;
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

@media (max-width: 1087px) {
  .banner {
    .banner-wrap {
      .banner-container {
        flex-direction: column;

        .banner-images {
          width: 427px;
          margin: 0 auto;
          width: 100%;
          height: 417px;
        }
        .banner-box {
          .banner-additional-text {
            padding: 5px 0 0px;
          }

          .banner-title {
            max-width: 100%;
          }
          .banner-text {
            width: 514px;
            max-width: 100%;
            font-size: 18px;
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
  .banner .light-blue-gradient .banner-container .banner-images {
    width: 51%;
    height: 356px;
    .banner-img {
      height: 100%;
      object-fit: cover;
    }
  }

  .bigImg {
    height: 100% !important;
    .banner-container {
      .banner-box {
        width: 100%;
      }
      .banner-images {
        margin: 0 auto;
        .banner-img {
          top: 0;
        }
      }
    }
  }

  .banner .light-blue .banner-container .banner-images {
    width: 100%;
    height: 315px;
  }
  .banner .blue-gradient .banner-container .banner-images {
    width: 100%;
    height: 315px;
  }

  .banner .dark-red .banner-container .banner-images {
    width: 100%;
    height: 315px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .banner .dark-red .banner-container .banner-box {
    width: 100%;
  }
}

@media (max-width: 690px) {
  .selected {
    justify-content: flex-start;
    gap: 14px;
  }
  .banner {
    margin: 0 auto 80px;
    .banner-wrap {
      .banner-container {
        .banner-images {
          width: 343px;
          height: 240px;
        }
        .banner-box {
          margin-bottom: 57px;
          .banner-title {
            font-size: 22px;
            line-height: 29px;
          }
        }
      }
    }
  }

  .banner .dark-blue-gradient .banner-container .banner-images {
    height: 280px;
  }
}

.business {
  background-color: #2f3760;

  .banner-title {
    color: $light-gray;
  }
  .banner-text {
    color: $light-gray;
  }
}
</style>
