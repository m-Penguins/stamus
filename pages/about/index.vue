<template>
  <div class="about-page">
    <div class="about-page-wrap">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs" />
      <h1 class="about-page-title">О компании</h1>
<!--      <div class="about-page-description">-->
<!--        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.-->
<!--      </div>-->
      <BlocksMapper
        :blocks="blocks"
      />
    </div>
  </div>

</template>

<script setup>
// link="https://prodoctorov.ru/krasnodar/set/1642-stomatologiya-stamus/#otzivi"
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;
const route = useRoute();
const assetsStore = useAssets();

const { data: contactsData } = await useFetch(`${apiBaseUrl}o-kompanii`, {
  query: {
    populate: blocksQuey,
  },
});

console.log(contactsData);
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
