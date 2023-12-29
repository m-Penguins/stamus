<script setup>
const cardMobAppMock = [
  {
    title: "Скачать в App Store",
    link: "https://apps.apple.com/ru/app/stamus/id1472150990?roistat_visit=295807",
  },
  {
    title: "Скачать в Google Play",
    link: "https://play.google.com/store/apps/details?id=com.denta.network27",
  },
];
const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Мобильное приложение",
    url: "/stamusapp",
  },
];

const redirectToAppStore = () => {
  const externalAppLink =
    "https://apps.apple.com/ru/app/stamus/id1472150990?roistat_visit=295807";
  window.open(externalAppLink, "_blank");
};

useHead({
  title: "Приложение Stamus: Выбрать врача и записаться онлайн",
  meta: [
    {
      name: "twitter:title",
      content: "Приложение Stamus: Выбрать врача и записаться онлайн",
    },
    {
      property: "og:title",
      content: "Приложение Stamus: Выбрать врача и записаться онлайн",
    },
    {
      name: "description",
      content:
        "Приложение стоматологии Стамус позволяет выбрать врача и записаться онлайн. Посмотреть историю приемов, узнать о новых акциях и ознакомиться с документами",
    },
    {
      name: "twitter:description",
      content:
        "Приложение стоматологии Стамус позволяет выбрать врача и записаться онлайн. Посмотреть историю приемов, узнать о новых акциях и ознакомиться с документами",
    },
    {
      property: "og:description",
      content:
        "Приложение стоматологии Стамус позволяет выбрать врача и записаться онлайн. Посмотреть историю приемов, узнать о новых акциях и ознакомиться с документами",
    },
    {
      name: "keywords",
      content:
        "приложение стамус, приложение stamus, записаться онлайн стамус, записаться онлайн детский стоматолог",
    },
  ],
});
</script>

<template>
  <div class="base-wrapper-grey">
    <div class="base-container-grey">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs" />
      <div class="stamus-app-container">
        <elements-title-text-button
          :font-size="true"
          textButtonBase="Скачать в App Store"
          title="Мобильное приложение"
          text="Сети клиник “Стамус”"
          :isLinkWithArrow="true"
          textLinkWithArrow="Скачать в Google Play"
          class="stamus-app-title"
          :customClick="redirectToAppStore"
          link="https://play.google.com/store/apps/details?id=com.denta.network27"
          :isExternal="true"
        />
        <div class="stamus-app-img-box">
          <img
            src="../../assets/images/big-images/mob-app.png"
            alt="mob"
            class="stamus-app-img-box-picture"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="base-container-grey stamus-app">
    <div class="stamus-app-info">
      <div class="stamus-app-info-inner">Зачем скачивать приложение?</div>
      <div class="stamus-app-info-box">
        <div class="stamus-app-info-box__item">
          <span
            ><img src="../../assets/images/icons/frame1.svg" alt="icon"
          /></span>
          Онлайн запись без звонка в клинику
        </div>
        <div class="stamus-app-info-box__item">
          <span
            ><img src="../../assets/images/icons/frame2.svg" alt="icon"
          /></span>
          Актуальные акции клиник
        </div>
        <div class="stamus-app-info-box__item">
          <span
            ><img src="../../assets/images/icons/present.svg" alt="icon"
          /></span>
          Программа лояльности и бонусы
        </div>
        <div class="stamus-app-info-box__item">
          <span
            ><img src="../../assets/images/icons/clock2.svg" alt="icon"
          /></span>
          История визитов и оплат
        </div>
      </div>
    </div>
    <blocks-mobile-app-block />
    <!-- <blocks-mob-app-banner /> -->
    <div class="stamus-app-links">
      <div
        v-for="item in cardMobAppMock"
        :key="item.title"
        class="stamus-app-link"
      >
        <elements-mob-link-card :mobCardLink="item" />
      </div>
    </div>
    <blocks-main-form />
  </div>
</template>

<script>
export default {
  setup() {
    const breadcrumbs = [
      {
        title: "Главная",
        url: "/",
      },
      {
        title: "Пациентам",
        url: "#",
      },
      {
        title: "Мобильное приложение",
        url: `/stamusapp`,
      },
    ];
    return {
      breadcrumbs,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/style.scss";
.stamus-app {
  margin: 0 auto;
}

.stamus-app-title {
  padding-top: 179px;
}

.stamus-app-container {
  display: flex;
  gap: 200px;
}
.stamus-app-img-box-picture {
  height: 100%;
  object-fit: contain;
}

.stamus-app-info {
  margin: 0 auto 100px;
  display: flex;
  gap: 11%;
  width: 100%;
}

.stamus-app-info-box {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  &__item {
    display: flex;
    align-items: center;
    gap: 14px;
    @include body-16-regular;
    color: $gray-text;
    border-radius: 10px;
    border: 1px solid var(--stroke, #e9e9e9);
    padding: 14px 20px;
    width: fit-content;

    span {
      display: flex;
    }
  }
}

.stamus-app-info-inner {
  width: 50%;
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
}

.stamus-app-links {
  display: flex;
  gap: 16px;
  width: 100%;
  margin-bottom: 100px;
}

.stamus-app-link {
  width: 50%;
}

@media screen and (max-width: 1400px) {
  .stamus-app-img-box-picture {
    height: 500px;
  }

  .stamus-app-title {
    padding-top: 80px;
  }
}

@media screen and (max-width: 1110px) {
  .stamus-app-info {
    flex-wrap: wrap;
  }
  .stamus-app-info-box {
    width: 70%;
  }
  .stamus-app-info-inner {
    padding-bottom: 30px;
  }
}

@media screen and (max-width: 1096px) {
  .stamus-app-img-box-picture {
    height: 400px;
  }
}

@media screen and (max-width: 1000px) {
  .stamus-app-info-box {
    width: 100%;
  }
}

@media screen and (max-width: 900px) {
  .stamus-app-container {
    flex-direction: row-reverse;
    gap: 34px;
  }

  .stamus-app-info-box {
    &__item {
      width: 48%;
      font-size: 14px;
    }
  }

  .stamus-app-img-box {
    width: 334px;
    height: 334px;
    border-radius: 25px;
    background: #f9f9fa;
    display: flex;
    align-items: flex-end;
  }

  .stamus-app-img-box-picture {
    height: 300px;
    margin: 0 auto;
  }
}

@media screen and (max-width: 730px) {
  .stamus-app-info-box {
    flex-direction: column;
    gap: 10px;

    &__item {
      width: 100%;
      max-width: 343px;
    }
  }
  .stamus-app-info-inner {
    width: 100%;
  }
}

@media screen and (max-width: 650px) {
  .stamus-app-info {
    margin: 20px auto 80px auto;
  }
  .stamus-app-container {
    flex-wrap: wrap;
    flex-direction: column-reverse;
  }

  .stamus-app-img-box {
    width: 100%;
    margin-top: 14px;
    height: 343px;
  }

  .stamus-app-title {
    padding-top: 0;
  }

  .stamus-app-links {
    margin-bottom: 80px;
    flex-wrap: wrap;
  }

  .stamus-app-link {
    width: 100%;
  }
}
</style>
