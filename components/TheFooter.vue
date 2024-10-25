<template>
  <footer class="footer">
    <div class="footer-wrap">
      <div class="footer__box">
        <img src="@/assets/images/icons/logo.svg" alt="logo" class="logo" />
      </div>
      <div class="footer__box">
        <div class="footer-menu">
          <div class="footer-menu-container">
            <div class="footer-menu-container__link">
              <NuxtLink
                target="_blank"
                class="footer-text header-nav-item"
                :to="`tel:+${phone?.replace(/\D/g, '')}`"
              >
                {{ phone }}
              </NuxtLink>
              <NuxtLink
                target="_blank"
                class="footer-text header-nav-item"
                :to="`mailto:${email}`"
              >
                {{ email }}
              </NuxtLink>
              <p class="footer-text">Ежедневно 09:00-21:00</p>
              <NuxtLink
                class="footer-text header-nav-item"
                to="/leave-review?toManager=true"
              >
                Написать руководителю
              </NuxtLink>
              <div class="footer-social">
                <NuxtLink
                  v-for="social in socials"
                  :key="social?.id"
                  :to="social?.link"
                  class="footer-social-link"
                >
                  <img
                    :src="`${baseUrl}${social?.icon?.data?.attributes?.url}`"
                    :alt="social?.icon?.data?.attributes?.alternativeText ?? 'image'"
                    class="footer-img"
                  />
                </NuxtLink>
                <!-- <NuxtLink
          :to="policy"
          target="_blank"
          class="footer-text display-block"
        >
          Разработка сайта
        </NuxtLink> -->
              </div>
            </div>
          </div>
        </div>
        <div class="footer-contacts">
          <h3 class="footer-subtitle">Услуги</h3>
          <NuxtLink
            v-for="navigationService in storeServices.getStateService"
            target="_blank"
            class="footer-text header-nav-item"
            :to="`${navigationService.path}`"
          >
            {{ navigationService.title }}
          </NuxtLink>
        </div>
        <div class="footer-address">
          <h3 class="footer-subtitle">Пациентам</h3>
          <div class="footer-address__container">
            <div class="footer-address__container-link">
              <NuxtLink
                v-for="link in navigationPatients"
                :key="link.id"
                :to="link.path"
                class="footer-text header-nav-item"
              >
                {{ link.title }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="footer-contacts">
          <h3 class="footer-subtitle">&nbsp;</h3>
          <NuxtLink
            v-for="link in lastColumnNavigation"
            :key="link.id"
            :to="link.path"
            class="footer-text header-nav-item"
          >
            {{ link.title }}
          </NuxtLink>
        </div>
        <NuxtLink
          :to="licenseStamus"
          target="_blank"
          class="footer-text display-block"
        >
          Лицензия Стамус
        </NuxtLink>
        <div>
          <NuxtLink
            :to="licenseStamusMed"
            target="_blank"
            class="footer-text display-block"
          >
            Лицензия СтамусМед
          </NuxtLink>
        </div>
        <a href="#" class="bvi-open footer-text display-block" data-bvi="close"
          >Версия для слабовидящих</a
        >

        <NuxtLink
          :to="policy"
          target="_blank"
          class="footer-text display-block"
        >
          Политика конфидециальности
        </NuxtLink>

        <!-- <a href="#" class="bvi-open">Включить режим доступности</a> -->
        <div class="display">
          <NuxtLink :to="licenseStamus" target="_blank" class="footer-text">
            Лицензия Стамус
          </NuxtLink>
          <div class="footer-text">
            <NuxtLink
              :to="licenseStamusMed"
              target="_blank"
              class="footer-text"
            >
              Лицензия СтамусМед
            </NuxtLink>
          </div>

          <a href="#" class="bvi-open footer-text" data-bvi="close"
            >Версия для слабовидящих</a
          >
          <NuxtLink :to="policy" target="_blank" class="footer-text">
            Политика конфидециальности
          </NuxtLink>
          <!-- <NuxtLink :to="policy" target="_blank" class="footer-text">
            Разработка сайта
          </NuxtLink> -->
        </div>
      </div>
    </div>
    <div class="under-footer">
      <div class="under-footer-wrap">
        <div>2006-{{ currentYear }} Стамус</div>
        <a href="https://minimasneva.com/?ysclid=m0pum5wd3t294359078" target="_blank">Разработка и поддержка</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
// import bvi from "bvi"

// mounted() {
//   console.log("mounted", bvi);
// },
// const activateBvi = () => {
// Здесь можно добавить дополнительный код, если необходимо
// Затем активируйте "bvi" при клике
// bvi.activate();
// };

const props = defineProps(["footerData"]);
const storeServices = useService();

const baseUrl = useRuntimeConfig().public.baseUrl;

const baseDataStore = useBaseDataStore();

const phone = props?.footerData?.data?.attributes?.phone;
const email = props?.footerData?.data?.attributes?.email;

const socials = props?.footerData?.data?.attributes?.links;

const licenseStamus = props?.footerData?.data?.attributes?.license_stamus?.data
  ?.attributes?.url
  ? baseUrl +
    props?.footerData?.data?.attributes?.license_stamus?.data?.attributes?.url
  : "";

const licenseStamusMed = props?.footerData?.data?.attributes?.license_stamusmed
  ?.data?.attributes?.url
  ? baseUrl +
    props?.footerData?.data?.attributes?.license_stamusmed?.data?.attributes
      ?.url
  : "";

const policy = props?.footerData?.data?.attributes?.privacy?.data?.attributes
  ?.url
  ? baseUrl +
    props?.footerData?.data?.attributes?.privacy?.data?.attributes?.url
  : "";

const clinicColumnNumber = computed(() => {
  return baseDataStore.clinics?.data?.length > 5 ? 4 : 3;
});

const route = useRoute();
const router = useRouter();

const navigationPatients = [
  { id: 1, title: "Адреса", path: "/clinics" },
  { id: 2, title: "Врачи", path: "/team" },
  { id: 3, title: "Цены", path: "/prices" },
  { id: 4, title: "Лечение по ДМС", path: "/business" },
  { id: 5, title: "Акции и скидки", path: "/discounts" },
];

const lastColumnNavigation = [
  { id: 1, title: "Правовая информация", path: "/info" },
  { id: 2, title: "Статьи", path: "/articles" },
  { id: 3, title: "Отзывы", path: "/reviews" },
  { id: 4, title: "Портфолио", path: "/portfolio" },
  { id: 5, title: "Контакты", path: "/contacts" },
];

const currentYear = ref('')
onMounted(() => {
  currentYear.value = new Date().getFullYear()
})
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

// .last-column {
//   margin-top: auto;
// }

.footer {
  @include flex-column-center;
  width: 100%;
  padding: 60px 0 0;
  box-sizing: border-box;
  background: $light-gray;

  .footer-wrap {
    display: flex;
    flex-direction: column;
    width: 1160px;
    max-width: 95%;
  }

  .under-footer {
    width: 100%;
    background: #1F2957;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    color: #fff;
    font-size: 14px;

    &-wrap {
      display: flex;
      width: 1160px;
      max-width: 95%;
      padding-right: 3%;
      justify-content: space-between;
      align-items: center;
    }
  }

  .footer__box {
    display: grid;
    // grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-columns: 260px 220px 220px 260px;
    width: 100%;
    // height: 100%;
    grid-column-gap: 89px;
    grid-row-gap: 36px;
    gap: 40px;
    grid-gap: 40px;
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
      display: flex;
      flex-direction: column;
    }
  }

  .footer-text {
    margin-bottom: 14px;
    @include body-14-regular;
    color: $gray-text;
    width: fit-content;
    padding: 0;
    background-color: transparent;
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
    padding: 40px 0 0;
    .footer__box {
      .footer-contacts {
        margin-right: 300px;
        padding-bottom: 14px;
      }
    }

    .under-footer {
      padding: 0 19px;
      &-wrap {
        padding-right: 0;
        max-width: 1160px;
        width: 100%;
      }
    }
  }
  .display {
    padding-top: 45px;
  }
}

@media (max-width: 758px) {
  .footer {
    padding: 40px 0 0;
    .footer-wrap {
      padding: 0 16px 40px;
    }
    .under-footer {
      &-wrap {
        max-width: 95%;
      }
    }
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
    .under-footer {
      height: 50px;
      &-wrap {
        flex-direction: column;
        align-items: start;
        gap: 5px;
      }
    }
  }
}

@media (max-width: 420px) {
  .footer {
    .footer__box {
      gap: 20px 40px;
      //flex-direction: column;
    }
  }
  .address {
    padding-top: 0px;
  }
}
</style>
