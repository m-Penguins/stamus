<template>
  <footer class="footer">
    <div class="footer-wrap">
      <div class="footer__box">
        <img src="@/assets/images/icons/logo.svg" alt="logo" class="logo" />
      </div>
      <div class="footer__box">
        <div class="footer-menu">
          <h3 class="footer-subtitle">Меню</h3>
          <div class="footer-menu-container">
            <div class="footer-menu-container__link">
              <NuxtLink
                exact
                active-class="active-link"
                class="header-nav-item footer-text"
                to="/specialists"
                >Специалисты</NuxtLink
              >
              <NuxtLink
                exact
                active-class="active-link"
                class="header-nav-item footer-text"
                to="/info"
                >Пациентам</NuxtLink
              >
              <NuxtLink
                exact
                active-class="active-link"
                class="header-nav-item footer-text"
                to="/discounts"
                >Акции и скидки</NuxtLink
              >
            </div>
            <div class="footer-menu-container__link">
              <NuxtLink
                exact
                active-class="active-link"
                class="header-nav-item footer-text"
                to="/portfolio"
                >Портфолио</NuxtLink
              >
              <NuxtLink
                exact
                active-class="active-link"
                class="header-nav-item footer-text"
                to="/prices"
                >Цены</NuxtLink
              >
              <NuxtLink
                exact
                active-class="active-link"
                class="header-nav-item footer-text"
                to="/contacts"
                >Контакты</NuxtLink
              >
            </div>
          </div>
        </div>
        <div class="footer-contacts">
          <h3 class="footer-subtitle">Контакты</h3>
          <a class="footer-text header-nav-item" href="tel:+79998887766"
            >+7 (999) 888 - 77 - 66</a
          >
          <a
            class="footer-text header-nav-item"
            href="mailto:stamus-med@info.ru"
            >stamus-med@info.ru</a
          >
          <div class="footer-social">
            <a href="/" class="footer-social-link">
              <img
                class="footer-img"
                src="@/assets/images/icons/YouTube-fill.svg"
                alt="Social icon"
              />
            </a>
            <a href="/" class="footer-social-link">
              <img
                class="footer-img"
                src="@/assets/images/icons/vk-fill.svg"
                alt="Social icon"
              />
            </a>
            <a href="/" class="footer-social-link">
              <img
                class="footer-img"
                src="@/assets/images/icons/Telegram-fill.svg"
                alt="Social icon"
              />
            </a>
          </div>
        </div>
        <div class="footer-address">
          <h3 class="footer-subtitle">Наши адреса</h3>
          <div class="footer-address__container">
            <div class="footer-address__container-link">
              <NuxtLink
                @click="
                  $router.push(
                    `/clinics/${linkTransform('ул. Московская 140')}`,
                  )
                "
                to="#"
              >
                <p class="footer-text">ул. Московская 140</p>
              </NuxtLink>
              <NuxtLink
                @click="
                  $router.push(`/clinics/${linkTransform('ул. Хакурате 34')}`)
                "
                class="footer-text"
                to="#"
              >
                <p class="footer-text">ул. Хакурате 34</p>
              </NuxtLink>
              <NuxtLink
                @click="
                  $router.push(`/clinics/${linkTransform('ул. Мачуги 1-1')}`)
                "
                class="footer-text"
                to="#"
              >
                <p class="footer-text">ул. Мачуги 1/1</p>
              </NuxtLink>
              <!-- <NuxtLink @click="$router.push(`clinics/${linkTransform('ул. Черкасская 17')}`)" class="footer-text" to="#">
                <p class="footer-text">ул. Черкасская 17</p>
              </NuxtLink> -->
            </div>
          </div>
        </div>
        <div class="p-r-18 address">
          <NuxtLink
            @click="
              $router.push(`/clinics/${linkTransform('ул. Гимназическая 85')}`)
            "
            class="footer-text"
            to="#"
          >
            <p class="footer-text">ул. Гимназическая 85</p>
          </NuxtLink>
          <NuxtLink
            @click="
              $router.push(
                `/clinics/${linkTransform('Платановый бульвар 19/3')}`,
              )
            "
            class="footer-text"
            to="#"
          >
            <p class="footer-text">Платановый бульвар 19/3</p>
          </NuxtLink>
          <!-- <NuxtLink @click="navigateToRoute('ул. Средняя 1-3')" class="footer-text" to="#">
            <p class="footer-text">ул. Средняя 1/3</p>
          </NuxtLink> -->
        </div>
        <div class="footer-text display-block">Политика конфидециальности</div>
        <div class="footer-text display-block">Лицензия</div>
        <div class="footer-text display-block">Версия для слабовидящих</div>
        <div class="footer-text display-block">
          Бизнесу и корпоративным клиентам
        </div>
        <!-- <a href="#" class="bvi-open">Включить режим доступности</a> -->
        <div class="display">
          <p class="footer-text">Политика конфидециальности</p>
          <p class="footer-text">Лицензия</p>
          <p class="footer-text">Версия для слабовидящих</p>
          <p class="footer-text">Бизнесу и корпоративным клиентам</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
// import bvi from "bvi"
export default {
  data() {
    return {
      socialsList: {
        youTube: {
          href: "",
          iconName: "YouTube-fill",
        },
        telegramm: {
          href: "",
          iconName: "Telegram",
        },
        vk: {
          href: "",
          iconName: "vk-fill",
        },
      },
    };
  },
  // mounted() {
  //   console.log("mounted", bvi);
  // },
  methods: {
    activateBvi() {
      // Здесь можно добавить дополнительный код, если необходимо
      // Затем активируйте "bvi" при клике
      // bvi.activate();
    },
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const navigateToRoute = (str) => {
      const newRoute = `/clinics/${linkTransform(str)}`;
      router.replace(newRoute);
    };

    return {
      route,
      navigateToRoute,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

.bvi-open {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  display: inline-block;
  transition: background-color 0.3s;
}

.bvi-open:hover {
  background-color: #0056b3;
}

.footer-social-link {
  transition: all 0.2s ease;
}

.footer-social-link:hover {
  transform: scale(1.1);
}

.display {
  display: none;
  padding-top: 45px;
}

.display-block {
  display: block;
}

.footer-social {
  display: flex;
}

.logo {
  margin-bottom: 60px;
  height: 45px;
}

.footer-contacts {
  display: flex;
  flex-direction: column;
}

.footer {
  @include flex-column-center;
  width: 100%;
  padding: 60px 0 40px;
  box-sizing: border-box;
  background: $light-gray;

  .footer-wrap {
    display: flex;
    flex-direction: column;
    width: 1160px;
    max-width: 95%;
  }

  .footer__box {
    display: grid;
    // grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-columns: 248px 200px 183px 261px;
    width: 100%;
    height: 100%;
    grid-column-gap: 89px;
    grid-row-gap: 36px;
  }

  .footer-menu {
    .footer-menu-container {
      display: flex;

      &__link {
        @include flex-column-start;
        padding-right: 33px;
      }
    }
  }

  .footer-subtitle {
    padding-bottom: 20px;
    @include body-18-regular;
    color: $dark-blue-subtitle;
  }

  .footer-address {
    &__container {
      display: flex;
    }

    &__container-link {
      padding-right: 38px;
    }
  }

  .footer-text {
    margin-bottom: 14px;
    @include body-14-regular;
    color: $gray-text;
    width: fit-content;
  }

  .footer-img {
    padding-right: 16px;
  }

  .width {
    width: 86.5%;
  }
}

.address {
  padding-top: 45px;
}

@media (max-width: 1200px) {
  .display {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .display-block {
    display: none;
  }
  .footer {
    .footer__box {
      display: flex;
      flex-wrap: wrap;
      gap: 40px;
    }
  }
}

@media (max-width: 1190px) {
  .display {
    padding-top: 0px;
  }
}

@media (max-width: 900px) {
  .footer {
    padding: 40px 0 40px;
    .footer__box {
      .footer-contacts {
        margin-right: 300px;
        padding-bottom: 14px;
      }
    }
  }
  .display {
    padding-top: 45px;
  }
}

@media (max-width: 758px) {
  .footer {
    padding: 40px 0 40px;
    .footer__box {
      .footer-contacts {
        margin-right: 100px;
      }
    }
  }
}

@media (max-width: 707px) {
  .display {
    padding-top: 0px;
  }
  .footer {
    .footer__box {
      gap: 20px;
    }
  }
}

@media (max-width: 600px) {
  .footer {
    .footer__box {
      .footer-contacts {
        margin-right: 0px;
      }
    }
  }
}

@media (max-width: 420px) {
  .footer {
    .footer__box {
      gap: 20px 40px;
    }
  }
  .address {
    padding-top: 0px;
  }
}
</style>
