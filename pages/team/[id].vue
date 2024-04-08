<script setup>
const route = useRoute();
const assetsStore = useAssets();
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const { data: specialist } = await useFetch(
  `${apiBaseUrl}specialists/${route.params.id}`,
  {
    query: {
      populate:
        "portofolios.photoBanner.*,fotoSpecialist.*,education.*,additionalEducation.*,docsPhoto.*,video.*,clinics.*,services.category.napravleniya_uslug_1_col.*,reviews.*,price_lists.*,achievements.*,areasOfActivity.*,meetingPerson.*" +
        blocksQuey,
      "_where[status]": "published",
    },
  },
);

if (!specialist.value?.data) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Врачи",
    url: "/team",
  },
  {
    title: specialist.value?.data?.attributes?.position,
    url: ``,
  },
  {
    title:
      specialist.value?.data?.attributes?.lastName +
      " " +
      specialist.value?.data?.attributes?.firstName,
    url: ``,
  },
].filter((el) => el?.title);

const metaData = specialist.value?.data?.attributes?.meta;
useHead(getMetaObject(metaData, baseUrl));

const blocks = specialist.value?.data?.attributes?.blocks;

const blockServices = specialist.value?.data?.attributes?.services;
</script>

<template>
  <div class="base-wrapper-grey">
    <div class="base-container-grey">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs" />
      <div class="stamus-app-container">
        <div class="stamus-app-container-text">
          <elements-title-text-button
            :font-size="true"
            isCategory
            :category="specialist?.data?.attributes?.position ?? ''"
            textButtonBase="Записаться онлайн"
            :isButtonBase="true"
            :customClick="redirectToExternalApp"
            :title="
              specialist?.data?.attributes?.lastName +
              ' ' +
              specialist?.data?.attributes?.firstName
            "
            :text="specialist?.data?.attributes?.description ?? ''"
            :isLinkWithArrow="true"
            :textLinkWithArrow="'Смотреть портфолио'"
            :link="`/portfolio?specialist=${route.params?.id}`"
            class="stamus-app-title"
          />
          <div
            class="specialists-addres desktop"
            v-if="specialist?.data?.attributes?.clinics?.data?.length > 0"
          >
            <div class="specialists-addres-box">
              <img
                src="../../assets/images/icons/addres.svg"
                alt="icon"
                class="stamus-app-img-box-picture"
              />
            </div>
            <ul class="specialists-addres-list">
              <li class="specialists-addres-list__text">Принимает по адресу</li>
              <li
                v-for="item in specialist?.data?.attributes?.clinics?.data"
                :key="item.id"
                class="specialists-addres-list__item"
              >
                {{ item?.attributes?.address }}
              </li>
            </ul>
          </div>
        </div>
        <div class="stamus-app-img-box">
          <img
            :src="
              specialist?.data?.attributes?.fotoSpecialist?.data?.attributes
                ?.url
                ? baseUrl +
                  specialist?.data?.attributes?.fotoSpecialist?.data?.attributes
                    ?.url
                : assetsStore.useAsset('icons/logo.svg')
            "
            alt="mob"
            class="stamus-app-img-box-picture"
          />
        </div>
      </div>
      <div
        class="specialists-addres mob"
        v-if="specialist?.data?.attributes?.clinics?.data?.length > 0"
      >
        <div class="specialists-addres-box">
          <img src="../../assets/images/icons/addres.svg" alt="icon" />
        </div>
        <div class="specialists-addres-list">
          <div class="specialists-addres-list__text">Принимает по адресу</div>
          <div class="specialists-addres-list__box">
            <div
              v-for="item in specialist?.data?.attributes?.clinics?.data"
              :key="item"
              class="specialists-addres-list__item"
            >
              {{ item?.attributes?.address }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BlocksMapper :blocks="blocks" :block-services="blockServices" />
</template>

<style lang="scss" scoped>
@import "../../assets/styles/style.scss";

.portfolio-id {
  scroll-margin-top: 100px;
}
.desktop {
  display: flex !important;
}

.mob {
  display: none !important;
}

.stamus-app-container-text {
  width: 50%;
}

.stamus-app-img-box {
  width: 70%;
}

.stamus-app-img-box-picture {
  width: 100%;
  object-fit: cover;
}

.service-title {
  display: flex;
  align-items: baseline;
  gap: 24px;
  padding-bottom: 40px;
}

.popular-service {
  padding: 40px 0;

  &__title {
    @include body-22-medium-Neue;
    color: $dark-blue-subtitle;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.specialists-addres {
  display: flex;
  align-items: flex-start;
  border-radius: 10px;
  border: 1px solid var(--stroke, #e9e9e9);
  gap: 5px;
  padding: 10px 20px;
  margin: 40px 0 150px;
  width: fit-content;
}

.specialists-addres-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  &__item {
    @include body-14-regular;
    color: $gray-text;
  }
  &__text {
    @include body-12-regular;
    color: $placeholder;
  }
}

.stamus-app-title {
  padding-top: 120px;
}

.stamus-app-container {
  display: flex;
  width: 100%;

  .stamus-app-title {
    width: 100%;
  }
}

@media screen and (max-width: 1400px) {
  .stamus-app-title {
    padding-top: 80px;
  }
}

@media screen and (max-width: 1388px) {
  .stamus-app-img-box-picture {
    height: auto;
  }
}

@media screen and (max-width: 1110px) {
  .portfolio-id {
    scroll-margin-top: 60px;
  }
  .desktop {
    display: none !important;
  }

  .mob {
    display: flex !important;
  }

  .specialists-addres {
    margin: 30px 0 0;
  }

  .specialists-addres-list {
    &__box {
      display: flex;
      gap: 40px;
    }
  }

  .popular-service {
    padding: 0 0 40px;
  }

  .stamus-app-container {
    flex-direction: row-reverse;
    gap: 34px;
    .stamus-app-title {
      padding-top: 0;
    }
  }

  .stamus-app-img {
    width: 334px;
    height: 334px;
    border-radius: 25px;
    background: #f9f9fa;
    display: flex;
    align-items: flex-end;
  }

  .stamus-app-img-box {
    background: #f9f9fa;
    height: 100%;
    border-radius: 25px;
  }

  .stamus-app-img-box-picture {
    display: flex;
  }
}

@media screen and (max-width: 700px) {
  .stamus-app-img-box {
    width: 100%;
  }
  .stamus-app-container-text {
    width: 100%;
  }
  .stamus-app-container {
    flex-wrap: wrap;
    flex-direction: column-reverse;
  }

  .stamus-app-img {
    width: 100%;
    margin-top: 14px;
    height: 343px;
  }

  .stamus-app-title {
    padding-top: 0;
  }

  .specialists-addres-list {
    &__box {
      flex-direction: column;
      gap: 6px;
    }
  }
}
</style>
