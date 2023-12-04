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
          <NuxtLink
            target="_blank"
            class="footer-text header-nav-item"
            :to="`tel:${phone?.replaceAll(' ', '')}`"
          >
            {{ phone }}
          </NuxtLink>
          <NuxtLink
            target="_blank"
            class="footer-text header-nav-item"
            :to="`mailto:${email}`"
            >{{ email }}</NuxtLink
          >
          <div class="footer-social">
            <NuxtLink
              v-for="social in socials"
              :key="social?.id"
              :to="social?.link"
              class="footer-social-link"
            >
              <img
                :src="`${baseUrl}${social?.icon?.data?.attributes?.url}`"
                alt="social"
                class="footer-img"
              />
            </NuxtLink>
          </div>
        </div>
        <div class="footer-address">
          <h3 class="footer-subtitle">Наши адреса</h3>
          <div class="footer-address__container">
            <div class="footer-address__container-link">
              <NuxtLink
                v-for="clinic in clinicsData?.data?.slice(
                  0,
                  clinicColumnNumber,
                )"
                :key="clinic?.id"
                :to="`/clinics/${clinic?.id}`"
              >
                <p class="footer-text">{{ clinic?.attributes?.address }}</p>
              </NuxtLink>

              <!-- <NuxtLink @click="$router.push(`clinics/${linkTransform('ул. Черкасская 17')}`)" class="footer-text" to="#">
                <p class="footer-text">ул. Черкасская 17</p>
              </NuxtLink> -->
            </div>
          </div>
        </div>
        <div class="p-r-18 address">
          <NuxtLink
            v-for="clinic in clinicsData?.data?.slice(clinicColumnNumber)"
            :key="clinic?.id"
            :to="`/clinics/${clinic?.id}`"
          >
            <p class="footer-text">{{ clinic?.attributes?.address }}</p>
          </NuxtLink>

          <!-- <NuxtLink @click="navigateToRoute('ул. Средняя 1-3')" class="footer-text" to="#">
            <p class="footer-text">ул. Средняя 1/3</p>
          </NuxtLink> -->
        </div>
        <NuxtLink
          :to="policy"
          target="_blank"
          class="footer-text display-block"
        >
          Политика конфидециальности
        </NuxtLink>
        <NuxtLink
          :to="license"
          target="_blank"
          class="footer-text display-block"
        >
          Лицензия
        </NuxtLink>
        <a href="#" class="bvi-open footer-text display-block" data-bvi="close"
          >Версия для слабовидящих</a
        >
        <NuxtLink to="/business" class="footer-text display-block">
          Бизнесу и корпоративным клиентам
        </NuxtLink>
        <!-- <a href="#" class="bvi-open">Включить режим доступности</a> -->
        <div class="display">
          <NuxtLink :to="policy" target="_blank" class="footer-text">
            Политика конфидециальности
          </NuxtLink>
          <NuxtLink :to="license" target="_blank" class="footer-text">
            Лицензия
          </NuxtLink>

          <a href="#" class="bvi-open footer-text" data-bvi="close"
            >Версия для слабовидящих</a
          >
          <NuxtLink to="/business" class="footer-text"
            >Бизнесу и корпоративным клиентам</NuxtLink
          >
        </div>
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
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const [{ data: clinicsData }, { data: footerData }] = await Promise.all([
  useFetch(`${apiBaseUrl}clinics`, {}),
  useFetch(`${apiBaseUrl}footer`, {
    query: {
      populate: "links.icon.*,privacy.*,license.*",
    },
  }),
]);

console.log(footerData.value);

const phone = footerData?.value?.data?.attributes?.phone;
const email = footerData?.value?.data?.attributes?.email;

const socials = footerData.value?.data?.attributes?.links;

const license = footerData.value?.data?.attributes?.license?.data?.attributes
  ?.url
  ? baseUrl + footerData.value?.data?.attributes?.license?.data?.attributes?.url
  : "";

const policy = footerData.value?.data?.attributes?.privacy?.data?.attributes
  ?.url
  ? baseUrl + footerData.value?.data?.attributes?.privacy?.data?.attributes?.url
  : "";

const clinicColumnNumber = computed(() => {
  return clinicsData.value?.data?.length > 5 ? 4 : 3;
});

const route = useRoute();
const router = useRouter();

const navigateToRoute = (str) => {
  const newRoute = `/clinics/${linkTransform(str)}`;
  router.replace(newRoute);
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
