<template>
  <div class="primary-banner">
    <div class="primary-banner-container">
      <elements-title-text-button title="Оффер <br> в несколько строчек" text="Небольшое описание в несколько строчек"/>
      <div class="primary-banner-box">
        <div class="primary-banner-wrap">
          <img class="primary-banner-img desktop" src="@/assets/images/img-banner/card_main_kids.png" alt="Фотография матери и ребёнка">
          <img class="primary-banner-img mobile" src="@/assets/images/img-banner/1.png" alt="Фотография матери и ребёнка">
          <img class="primary-banner-img desktop" src="@/assets/images/img-banner/card_main.png" alt="Фотография зубного врача">
          <img class="primary-banner-img mobile" src="@/assets/images/img-banner/2.png" alt="Фотография зубного врача">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '/assets/styles/style.scss';

.mobile {
  display: none;
}

.primary-banner-wrap {
  display: flex;
  gap: 14px;
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
        // transition: width 0.5s cubic-bezier(0, 0, 1, 1) 0ms;
      }
      .primary-banner-img:hover {
        // width: 420px;
        // transition: width 0.5s cubic-bezier(0, 0, 1, 1) 0ms;
      }
    }
  }

  @media screen and (max-width: 1400px) {
    .primary-banner {
      background: none;
    }
  }
  @media screen and (max-width: 1290px) {
    .mobile {
      display: flex;
      height: 280px;
    }

    .desktop {
      display: none;
    }

    .primary-banner {
      margin: 118px auto 100px auto;

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
  
  @media screen and (max-width: 735px) {
    primary-banner-box {
      padding: 60px 0 80px;
      .primary-banner-wrap {
        flex-wrap: wrap;
      }
    }
  } 

  @media screen and (max-width: 735px) {
  .primary-banner-box {
    padding: 60px 0 100px;

    .primary-banner-wrap {
      flex-wrap: wrap;
    }
  }
} 
</style>