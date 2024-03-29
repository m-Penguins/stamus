<template>
  <div class="contacts-page">
    <div class="contacts-page-wrap">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs" />
      <div class="contacts-page-title">Контакты</div>
      <div class="contacts-page-text">Сети клиник “Стамус”</div>

      <div class="video-block-wrap">
        <div class="video-block-container">
          <div class="video-block-info">
            <h3 v-if="title" class="video-block-title">
              {{ title }}
            </h3>
            <div class="video-block-contacts" v-if="items?.length">
              <div class="video-block-contacts-box grey">
                <div v-for="item in items" :key="item?.id">
                  {{ item?.title }}
                </div>
              </div>
              <div class="video-block-contacts-box dark-grey">
                <a
                  class="map-nav-info header-nav-item video-block-link"
                  v-for="item in items"
                  :key="item?.id"
                  :href="item?.link"
                  target="_blank"
                  >{{ item?.value }}</a
                >
              </div>
            </div>
          </div>
          <div class="video-block-logo">
            <img src="@/assets/images/icons/video-logo-block.svg" alt="icon" />
          </div>
        </div>
        <div class="video-block-inner">
          <div
            v-if="videoLink"
            class="video-block-rectangle-video"
            @click="handleVideoClick(videoLink)"
          >
            <img
              v-if="videoImage"
              :src="`${baseUrl}${videoImage}`"
              alt="Video"
              class="problems__image"
            />
            <img
              class="utube"
              :src="assetsStore.useAsset('icons/play.svg')"
              alt="Play"
            />
          </div>

          <NuxtLink v-if="link" class="video-block-rectangle" :to="link">
            <div class="desktop">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.5761 38.7168C24.3809 38.912 24.3809 39.2286 24.5761 39.4239C24.7714 39.6191 25.088 39.6191 25.2832 39.4239L24.5761 38.7168ZM39.5718 24.9282C39.5718 24.652 39.348 24.4282 39.0718 24.4282L34.5718 24.4282C34.2957 24.4282 34.0718 24.652 34.0718 24.9282C34.0718 25.2043 34.2957 25.4282 34.5718 25.4282L38.5718 25.4282L38.5718 29.4282C38.5718 29.7043 38.7957 29.9282 39.0718 29.9282C39.348 29.9282 39.5718 29.7043 39.5718 29.4282L39.5718 24.9282ZM25.2832 39.4239L39.4254 25.2817L38.7183 24.5746L24.5761 38.7168L25.2832 39.4239Z"
                  fill="white"
                />
                <rect
                  x="1.5948"
                  y="32"
                  width="43"
                  height="43"
                  rx="21.5"
                  transform="rotate(-45 1.5948 32)"
                  stroke="#7F838C"
                />
              </svg>
            </div>
            <div class="mob">
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0005 21.5C11.7243 21.5 11.5005 21.7239 11.5005 22C11.5005 22.2761 11.7243 22.5 12.0005 22.5L12.0005 21.5ZM32.354 22.3536C32.5493 22.1583 32.5493 21.8417 32.354 21.6464L29.1721 18.4645C28.9768 18.2692 28.6602 18.2692 28.465 18.4645C28.2697 18.6597 28.2697 18.9763 28.465 19.1716L31.2934 22L28.465 24.8284C28.2697 25.0237 28.2697 25.3403 28.465 25.5355C28.6602 25.7308 28.9768 25.7308 29.1721 25.5355L32.354 22.3536ZM12.0005 22.5H32.0005L32.0005 21.5H12.0005L12.0005 22.5Z"
                  fill="white"
                />
                <rect
                  x="0.500488"
                  y="0.5"
                  width="43"
                  height="43"
                  rx="21.5"
                  stroke="#7F838C"
                />
              </svg>
            </div>
            <div class="video-block-feedback">{{ link_text }}</div>
          </NuxtLink>
        </div>
      </div>

      <LazyBlocksMap />
      <div class="doc-block">
        <div class="doc-block-title">Документы</div>
        <div class="doc-block-container">
          <div
            v-for="(item, index) in docs"
            :key="index"
            class="doc-block-item"
          >
            <elements-documentation-card :info="item" />
          </div>
        </div>
      </div>
      <blocks-main-form />
    </div>
  </div>
</template>

<script setup>
// link="https://prodoctorov.ru/krasnodar/set/1642-stomatologiya-stamus/#otzivi"
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const assetsStore = useAssets();

const { data: contactsData } = await useFetch(`${apiBaseUrl}contact`, {
  query: {
    populate: "items.*,docs.file.*",
  },
});

const contactsMainInfo = contactsData.value?.data?.attributes;

const title = contactsMainInfo?.Title;

const items = contactsMainInfo?.items;

const docs = contactsMainInfo?.docs?.map((d) => ({
  id: d?.id,
  title: d?.title,
  text: d?.description,
  link: d?.file?.data?.[0]?.attributes?.url
    ? `${baseUrl}${d?.file?.data?.[0]?.attributes?.url}`
    : null,
}));

const videoLink = null;
const videoImage = null;

const link = "/reviews";
const link_text = "Читать отзывы";

const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Контакты",
    url: "/contacts",
  },
];

useHead({
  title: "Номер телефона и адреса стоматологий Стамус и клиники СтамусМед",
  meta: [
    {
      name: "twitter:title",
      content:
        "Номер телефона и адреса стоматологий Стамус и клиники СтамусМед",
    },
    {
      property: "og:title",
      content:
        "Номер телефона и адреса стоматологий Стамус и клиники СтамусМед",
    },
    {
      name: "description",
      content:
        "Единый номер телефона стоматологий Стамус и детской клиники СтамусМед. Адреса всех клиник. Детская стоматология и Взрослая стоматология на вашем районе. Позвонить",
    },
    {
      name: "twitter:description",
      content:
        "Единый номер телефона стоматологий Стамус и детской клиники СтамусМед. Адреса всех клиник. Детская стоматология и Взрослая стоматология на вашем районе. Позвонить",
    },
    {
      property: "og:description",
      content:
        "Единый номер телефона стоматологий Стамус и детской клиники СтамусМед. Адреса всех клиник. Детская стоматология и Взрослая стоматология на вашем районе. Позвонить",
    },
    {
      name: "keywords",
      content:
        "номер стоматологии, номер детской стоматологии, адрес стоматологии, стоматология краснодар адреса, адрес детской стоматологии, телефон стоматологии, детская стоматология телефон",
    },
  ],
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";

.doc-block {
  padding-bottom: 100px;
}

.doc-block-title {
  @include body-22-medium-Neue;
  color: black;
  padding-bottom: 30px;
}

.doc-block-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
}

.doc-block-item {
  width: 100%;
}

@media (max-width: 1100px) {
  .doc-block-container {
    flex-wrap: wrap;
  }
  .doc-block-item {
    width: 100%;
  }
}

@media (max-width: 650px) {
  .doc-block {
    padding-bottom: 80px;
  }
}

.video-block-contacts-box {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contacts-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  max-width: 100%;
  margin: 20px auto 0 auto;
}

.contacts-page-wrap {
  width: 100%;
}

.contacts-page-title {
  @include body-60-medium;
  color: $dark-blue-subtitle;
  padding: 90px 0 30px;
}

.contacts-page-text {
  @include body-20-regular;
  color: $gray-text;
  padding-bottom: 100px;
}

@media (max-width: 1201px) {
  .contacts-page-title {
    padding: 50px 0 100px;
  }
}

@media (max-width: 904px) {
  .contacts-page-title {
    font-size: 22px;
    line-height: normal;
    padding: 10px 0 30px;
  }

  .contacts-page-text {
    font-size: 16px;
  }
}

@media (max-width: 676px) {
  .contacts-page-title {
    padding: 10px 0 30px;
  }
  .contacts-page-text {
    padding: 0 0 60px;
  }
}

.video-block-info-card {
  padding-top: 40px;
}

.mob {
  display: none;
}

.video-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 100px;
}

.video-block-link {
  width: fit-content;
  cursor: pointer;
}

.video-block-wrap {
  display: flex;
  justify-content: space-between;
  width: 1280px;
  max-width: 100%;
  background: var(--light-bg, #f9f9fa);
  border-radius: 25px;
  margin: 0 auto;
  margin-bottom: 150px;
  padding: 20px;

  @media (max-width: 800px) {
    margin-bottom: 120px;
  }

  @media (max-width: 670px) {
    margin-bottom: 80px;
  }
}

.video-block-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 524px;
  margin: 40px 40px 0;
}

.video-block-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
  padding-bottom: 14px;
}

.video-block-text {
  @include body-14-regular;
  color: $gray-text;
}

.video-block-contacts {
  display: flex;
  gap: 14px;
  align-items: baseline;
  padding-top: 10px;

  margin-bottom: 10px;
}

.video-block-contacts-box {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.grey {
  @include body-12-regular;
  color: $placeholder;
}

.dark-grey {
  @include body-14-regular;
  color: $gray-text;
  gap: 12px;
}

.video-block-inner {
  display: flex;
  gap: 20px;
}

.video-block-box {
  object-fit: cover;
  width: 373px;
  display: inline-block;
  overflow: hidden;
  border-radius: 15px;
  img {
    width: 373px;
    height: 348px;
    transition: 1s;
    display: block;
    cursor: pointer;
    border-radius: 15px;
  }

  img:hover {
    transform: scale(1.1);
    border-radius: 15px;
  }
}

.video-block-rectangle-video {
  width: 220px;
  min-height: 348px;
  height: 100%;
  border-radius: 15px;
  background: var(--text, #525660);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  cursor: pointer;

  & a {
    height: 100%;
    width: 100%;
    display: block;
  }

  & .utube {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    cursor: pointer;
  }
}

.video-block-rectangle {
  width: 220px;
  min-height: 348px;
  height: 100%;
  border-radius: 15px;
  background: var(--text, #525660);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 1s;
  cursor: pointer;

  svg {
    position: sticky;
    top: 52%;
    left: 93%;
  }
}

.video-block-rectangle:hover {
  background: var(--accent, #232d5b);
}

.video-block-feedback {
  @include body-22-medium-Neue;
  color: $white;
  padding: 20px;
  width: 100px;
}

@media (max-width: 1140px) {
  .video-block-info-card {
    padding: 0 0 30px;
  }

  .video-block-wrap {
    flex-wrap: wrap;
  }
  .video-block-container {
    align-items: start;
    flex-direction: inherit;
    max-width: 100%;
    margin: 0;
    justify-content: space-between;
    width: 100%;
  }
  .video-block-contacts {
    padding-bottom: 30px;
  }
  .video-block-inner {
    width: 100%;
    justify-content: flex-start;
  }
  .video-block-box {
    width: 488px;
    height: 348px;
    border-radius: 15px;
    img {
      object-fit: cover;
      object-position: 0% 22%;
      width: 488px;
      height: 348px;
      border-radius: 15px;
    }
  }
  .video-block-rectangle {
    height: 100%;
    width: 50%;
  }
  .video-block-rectangle-video {
    width: 50%;
  }

  .video-block-logo {
    width: 30px;
  }

  .video-block-text {
    padding-bottom: 30px;
  }

  .video-block-info {
    width: 90%;
  }
}

@media (max-width: 800px) {
  .video-block-title {
    font-size: 16px;
    padding-bottom: 24px;
  }

  .video-block-text {
    font-size: 16px;
    padding-bottom: 30px;
  }
}

@media (max-width: 670px) {
  .desktop {
    display: none;
  }

  .mob {
    display: block;
    margin-right: 10px;
  }

  .video-block {
    margin-bottom: 80px;
  }

  .video-block-inner {
    flex-direction: column;
  }

  .video-block-box {
    height: 348px;
    width: 100%;
    img {
      width: 100%;
      object-position: 50% 24%;
    }
  }

  .video-block-rectangle-video {
    width: 100%;
  }

  .video-block-rectangle {
    width: 100%;
    height: 100%;
    min-height: fit-content;
    flex-direction: row-reverse;
    align-items: center;

    svg {
      transform: rotate(45 1.5948 32);
    }
  }

  .video-block-feedback {
    font-size: 16px;
    line-height: 17px;
  }

  .video-block-text {
    font-size: 14px;
  }
}

.problems__image {
  border-radius: 15px;
  height: 100%;
  object-fit: cover;
  width: 100%;
  max-width: 100%;

  pointer-events: none;
}
</style>
