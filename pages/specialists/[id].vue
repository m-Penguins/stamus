<script setup>
const route = useRoute();
const assetsStore = useAssets();
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const [
  { data: specialistDeep },
  { data: specialist },
  { data: otherSpecialists },
] = await Promise.all([
  useFetch(`${apiBaseUrl}specialists/${route.params.id}?populate=deep`),
  useFetch(`${apiBaseUrl}specialists/${route.params.id}?populate=*`),
  useFetch(`${apiBaseUrl}specialists?populate=deep`),
]);

if (!specialist.value?.data) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Специалисты",
    url: "/specialists",
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
];

const portfolios = ref(
  specialist?.value?.data?.attributes?.portofolios?.data?.map((el) => {
    return {
      id: el?.id,
      img: el?.attributes?.photoBanner
        ? baseUrl + el?.attributes?.photoBanner
        : assetsStore.useAsset("images/icons/logo.svg"),
      name: el?.attributes?.heading,
      category: "detskaya",
      description: el?.attributes?.description,
    };
  }),
);

const singleServices = ref(
  specialistDeep?.value?.data?.attributes?.price_lists?.data?.map((el) => {
    const item = el?.attributes?.servicePrice?.map((single) => {
      return {
        id: single?.id,
        heading: single?.heading,
        price: single?.price,
        isRecommended: single?.isRecommended,
        isPopular: single?.isPopular,
        isDemand: single?.isDemand,
        tags: single?.tags,
        link: "/prices",
      };
    });
    return {
      title: el?.attributes?.Title,
      services: item,
    };
  }),
);

const meetingPerson = ref(
  specialistDeep.value?.data?.attributes?.meetingPerson,
);

const documents = ref(
  specialistDeep.value?.data?.attributes?.docsPhoto?.data?.map((el) =>
    el?.attributes?.url ? baseUrl + el?.attributes?.url : "",
  ),
);

const reviews = ref(
  specialist.value?.data?.attributes?.reviews?.data?.map((el) => ({
    name: el?.attributes?.name,
    grade: el?.attributes?.review,
    date: el?.attributes?.date,
    text: el?.attributes?.text,
  })),
);

console.log(singleServices.value);

const redirectToExternalApp = () => {};
</script>

<template>
  <div class="base-wrapper-grey">
    <div class="base-container-grey">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs" />
      <div class="stamus-app-container">
        <div class="stamus-app-container-text">
          <elements-title-text-button
            font-size="true"
            isCategory="true"
            :category="specialist?.data?.attributes?.position"
            textButtonBase="Записаться онлайн"
            :customClick="redirectToExternalApp"
            :title="
              specialist?.data?.attributes?.lastName +
              ' ' +
              specialist?.data?.attributes?.firstName
            "
            :text="specialist?.data?.attributes?.description ?? ''"
            :isLinkWithArrow="true"
            :textLinkWithArrow="
              specialist?.data?.attributes?.portofolios?.data?.length > 0
                ? 'Смотреть портфолио'
                : ''
            "
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
                : assetsStore.useAsset('images/icons/logo.svg')
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
  <blocks-video-block
    v-if="meetingPerson"
    :title="meetingPerson?.heading"
    :text="meetingPerson?.text"
    :isAcquaintanceBlock="true"
    :info="{
      experience: meetingPerson?.dataMeeting?.[0],
      review: meetingPerson?.dataMeeting?.[1],
      consultation: meetingPerson?.dataMeeting?.[2],
    }"
    :link="meetingPerson?.link"
    :video="
      meetingPerson?.video?.data?.attributes?.url
        ? baseUrl + meetingPerson?.video?.data?.attributes?.url
        : ''
    "
    :videoThumbnail="
      meetingPerson?.image?.data?.attributes?.url
        ? baseUrl + meetingPerson?.image?.data?.attributes?.url
        : ''
    "
  />
  <!-- <blocks-activities-block :activitiesCard="mockActivitiesCard" /> -->
  <!-- <blocks-education-block :events="timelineEvents" title="Образование" /> -->
  <!-- <blocks-education-block
    :events="timelineEventsAdditionally"
    title="Дополнительное образование"
  /> -->
  <blocks-video-slider-block
    :imagesScroll="documents"
    title="Сертификаты и документы"
  />
  <div class="container-size popular-service" v-if="singleServices?.length > 0">
    <div class="service-title">
      <h2 class="popular-service__title">Услуги</h2>
      <elements-link-with-arrow
        type="true"
        link="/prices"
        title="Посмотреть все"
      />
    </div>
    <div v-for="service in singleServices" class="popular-service__list">
      <h2 class="popular-service__title">{{ service.title }}</h2>
      <div v-for="(item, index) in service.services" :key="index">
        <elements-service-card :service="item" />
      </div>
    </div>
  </div>
  <blocks-cases-direction
    v-if="specialist?.data?.attributes?.portofolios?.data?.length > 0"
    text="Портфолио доктора"
    :dataDirection="portfolios"
    id="portfolio"
    class="portfolio-id"
  />
  <blocks-main-feedback v-if="reviews?.length > 0" :reviews="reviews" />
  <!-- <blocks-video-slider-block :imagesScroll="imagesScrollVideo" title="Видео" /> -->
  <blocks-our-specialists
    v-if="otherSpecialists?.data"
    title="Еще специалисты"
    :data="otherSpecialists.data"
  />
  <blocks-main-form />
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
