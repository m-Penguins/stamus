<template>
  <div class="primary-banner">
    <div class="primary-banner-container">
      <elements-title-text-button
        :fontSize="false"
        textButtonBase="Записаться онлайн"
        :customClick="redirectToExternalApp"
        title="5 клиник СТАМУС в Краснодаре"
        text="Результат с гарантией. Цены «под ключ»"
      />
      <div class="primary-banner-box">
        <div class="primary-banner-wrap">
          <router-link
            :to="linkTransform('Детская стоматология')"
            class="desktop-link"
          >
            <div class="primary-banner-img desktop card_main_kids">
              <div class="primary-banner-btn">Детская стоматология</div>
            </div>
          </router-link>
          <router-link
            :to="linkTransform('Детская стоматология')"
            class="tablet-link m-r-14 m-r-14-mob"
          >
            <div class="primary-banner-img tablet card_main_kids-tab">
              <div class="primary-banner-btn">Детская стоматология</div>
            </div>
          </router-link>
          <router-link
            :to="linkTransform('Детская стоматология')"
            class="mob-link m-r-14-mob"
          >
            <img
              class="primary-banner-img mob"
              src="@/assets/images/img-banner/card_main_kids-2.png"
              alt="Фотография матери и ребёнка"
            />
          </router-link>
          <router-link
            :to="linkTransform('Стоматологические услуги')"
            class="desktop-link"
          >
            <div class="primary-banner-img desktop card_main">
              <div class="primary-banner-btn">Взрослая стоматология</div>
            </div>
          </router-link>
          <router-link
            :to="linkTransform('Стоматологические услуги')"
            class="tablet-link"
          >
            <div class="primary-banner-img tablet card_main-tab">
              <div class="primary-banner-btn">Взрослая стоматология</div>
            </div>
          </router-link>
          <router-link
            :to="linkTransform('Стоматологические услуги')"
            class="mob-link"
          >
            <img
              class="primary-banner-img mob"
              src="@/assets/images/img-banner/card_main-2.png"
              alt="Фотография зубного врача"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

.card_main_kids {
  margin-right: 14px;
  background-image: url("../../../assets/images/img-banner/card_main_kids3.png");
}

.card_main {
  background-image: url("../../../assets/images/img-banner/card_main3.png");
}

.card_main_kids-tab {
  margin-right: 14px;
  background-image: url("../../../assets/images/img-banner/card_main_kids4.png");
}

.card_main-tab {
  background-image: url("../../../assets/images/img-banner/card_main4.png");
}

.primary-banner-btn {
  width: 284px;
  height: 49px;
  border-radius: 45px;
  background: $white;
  color: $dark-blue-subtitle;
  @include flex-center-center;
  @include body-22-medium-Neue;
}

.desktop {
  @include flex-column-end;
  align-items: center;
  width: 390px;
  height: 650px;
  padding-bottom: 20px;
  border-radius: 45px;
  background-size: cover;
}

.tablet {
  display: none;
}

.mob {
  display: none;
}

.primary-banner-wrap {
  display: flex;
}
.primary-banner {
  @include flex-column-center;
  width: 100%;
  max-width: 100%;
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

    .desktop {
      width: 390px;
      height: 650px;
      transition: width 500ms cubic-bezier(1, 1, 0, 0) 0ms;
    }

    .desktop:hover {
      width: 440px;
    }
  }
}

@media screen and (max-width: 1400px) {
  .primary-banner {
    background: none;
  }
}

@media screen and (max-width: 1357px) {
  .primary-banner {
    margin: 20px auto 0px auto;
    .primary-banner-container .primary-banner-box {
      padding: 100px 0;
    }
  }
}

@media screen and (max-width: 1290px) {
  .tablet {
    @include flex-column-end;
    align-items: center;
    width: 343px;
    height: 280px;
    padding-bottom: 20px;
    border-radius: 20px;
    background-size: cover;

    .primary-banner-btn {
      width: 229px;
      height: 43px;
      font-size: 16px;
    }
  }

  .desktop {
    display: none;
  }

  .primary-banner {
    margin: 118px auto 100px auto;

    .primary-banner-container {
      .primary-banner-box {
        padding: 60px 0 0;
      }
    }
  }
}

@media screen and (max-width: 1096px) {
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
    background-position: 50%;
  }
}

@media screen and (max-width: 735px) {
  .primary-banner-box {
    padding: 60px 0 100px;
  }
}

@media screen and (max-width: 570px) {
  .tablet {
    width: 100%;
    height: 280px;
    padding-bottom: 16px;

    .primary-banner-btn {
      width: 186px;
      height: 34px;
      font-size: 14px;
    }
  }
}

@media screen and (max-width: 480px) {
  .primary-banner .primary-banner-container .primary-banner-box {
    padding-bottom: 80px;
  }
  .primary-banner {
    margin: 138px auto 0px auto;
  }
  .primary-banner-wrap {
    flex-wrap: wrap;
  }

  .tablet-link {
    display: flex;
    width: 100%;
  }
  .mob-link {
    display: none;
  }
  .m-r-14 {
    margin: 0 0 14px;
  }
  .card_main_kids-tab {
    margin-right: 0;
  }

  .tablet {
    .primary-banner-btn {
      width: 229px;
      height: 43px;
      font-size: 16px;
    }
  }
}
</style>
