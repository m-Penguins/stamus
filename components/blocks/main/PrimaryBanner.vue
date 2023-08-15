<template>
  <div class="primary-banner">
    <div class="primary-banner-container">
      <elements-title-text-button title="Оффер <br> в несколько строчек" text="Небольшое описание в несколько строчек"/>
      <div class="primary-banner-box">
        <div class="primary-banner-wrap">
          <router-link to="/children-dentistry" class="desktop-link">
            <img class="primary-banner-img desktop" src="@/assets/images/img-banner/card_main_kids.png" alt="Фотография матери и ребёнка">
          </router-link>
          <router-link to="/children-dentistry" class="tablet-link m-r-14">
            <img class="primary-banner-img tablet" src="@/assets/images/img-banner/2.png" alt="Фотография матери и ребёнка">
          </router-link>
           <router-link to="/children-dentistry" class="mob-link  m-r-14-mob">
            <img class="primary-banner-img mob" src="@/assets/images/img-banner/card_main_kids-2.png" alt="Фотография матери и ребёнка">
          </router-link>
          <router-link to="/adult-dentistry"  class="desktop-link">
            <img class="primary-banner-img desktop" src="@/assets/images/img-banner/card_main.png" alt="Фотография зубного врача">
          </router-link>
          <router-link to="/adult-dentistry" class="tablet-link">
            <img class="primary-banner-img tablet" src="@/assets/images/img-banner/1.png" alt="Фотография зубного врача">
          </router-link>
          <router-link to="/adult-dentistry" class="mob-link">
            <img class="primary-banner-img mob" src="@/assets/images/img-banner/card_main-2.png" alt="Фотография зубного врача">
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '/assets/styles/style.scss';

.tablet {
  display: none;
}

.mob {
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

      // .desktop {
      //   width: 390px;
      //   height: 650px;
      //   transition: width 500ms cubic-bezier(1, 1, 1, 1) 0ms;
      // }
        
      // .desktop:hover {
      //   width: 420px;
      // }
    }
  }

  @media screen and (max-width: 1400px) {
    .primary-banner {
      background: none;
    }
  }
  @media screen and (max-width: 1290px) {
    .tablet {
      display: flex;
      height: 280px;
      object-fit: cover;
      object-position: 51% 10%;
      border-radius: 20px
    }

    .desktop {
      display: none;
    }

    .primary-banner {
      margin: 118px auto 100px auto;

      .primary-banner-container {

        .primary-banner-box {
          padding: 60px 0;
        }
      }
    }
  }

  @media screen and (max-width: 955px) {
    .primary-banner-wrap {
      width: 100%;
      gap: 0;
    }

    .primary-banner {
      .primary-banner-container {
        flex-wrap: wrap;
        .primary-banner-box {
          width: 850px;
        }
      }
    }
    .m-r-14 {
      margin-right: 14px;
    }
    .tablet-link {
      width: 50%;
    }
    .tablet {
      width: 100%;
      object-position: 46% 84%;
    }
  } 
  

  @media screen and (max-width: 735px) {
  .primary-banner-box {
    padding: 60px 0 100px;
  }
} 

@media screen and (max-width: 570px) {
  .m-r-14-mob {
    margin-right: 14px;
  }
  .tablet-link  {
    display: none;
  }
  .mob-link {
    width: 50%;
  }

  .mob {
    width: 100%;
    display: flex;
    height: 280px;
    object-fit: cover;
    object-position: 51% 100%;;
    border-radius: 20px
  }
}

@media screen and (max-width: 480px) {
  .primary-banner {
    margin: 118px auto 20px auto;
  }
  .primary-banner-wrap {
    flex-wrap: wrap;
  }

  .tablet-link  {
    display: flex;
    width: 100%;
  }
  .mob-link {
    display: none;
  }
  .m-r-14 {
    margin: 0 0 14px;
  }
} 
</style>