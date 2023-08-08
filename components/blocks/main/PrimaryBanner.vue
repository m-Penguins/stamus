<template>
  <div class="primary-banner">
    <div class="primary-banner-container">
      <elements-title-text-button title="Оффер <br> в несколько строчек" text="Небольшое описание в несколько строчек"/>
      <div class="primary-banner-box">
        <div class="primary-banner-wrap">
          <img class="primary-banner-img" src="@/assets/images/img-banner/card_main_kids.png" alt="Фотография матери и ребёнка">
        </div>
        <div class="primary-banner-wrap">
          <img class="primary-banner-img" src="@/assets/images/img-banner/card_main.png" alt="Фотография зубного врача">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '/assets/styles/style.scss';
.primary-banner-wrap {
  width: auto;
  img {
    height: 100%;
    object-fit: cover;
    object-position: 0 0;
    width: 100%;
  }
}
  .primary-banner {
    @include flex-column-center;
    width: 1880px;
    max-width: 95%;
    margin: 20px auto 100px auto;
    border-radius: 45px;
    background-color: $light-gray;

    .primary-banner-container {
      @include flex-between-center;
      width: 1280px;
      max-width: 100%;

      .primary-banner-box {
        display: flex;
        gap: 14px;
        padding: 195px 0;
      }

      .primary-banner-img {
        // width: 390px;
        // height: 650px;
        transition: width 0.5s cubic-bezier(0, 0, 1, 1) 0ms;
      }
      .primary-banner-img:hover {
        width: 420px;
      }
    }
  }

  @media screen and (max-width: 1400px) {
    .primary-banner {
      background: none;
    }
  }
  @media screen and (max-width: 1290px) {
                  .s {
        height: 450px;
        width: 100%;
      }
    .primary-banner {
      .primary-banner-container {
        flex-wrap: wrap;

        .primary-banner-box {
          padding: 70px 0;
        }
        // .primary-banner-img {
        //   width: 390px;
        //   height: 280px;
        //   transition: width 0.5s cubic-bezier(0, 0, 1, 1) 0ms;
        // }
      }
    }
  }
  @media screen and (max-width: 1040px) {
    .primary-banner-wrap {
      height: 300px;
      width: 100%;
    }
  } 
</style>