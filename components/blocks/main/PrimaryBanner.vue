<script setup>
const baseUrl = useRuntimeConfig().public.baseUrl;

const props = defineProps(["title", "description", "twoDirections"]);
const modalStore = useModalStore();

const onRedirectToExternalApp = () => {
  modalStore.openModal();
};
</script>

<template>
  <div class="primary-banner">
    <div class="primary-banner-container">
      <elements-title-text-button
        :fontSize="false"
        textButtonBase="Записаться онлайн"
        :customClick="onRedirectToExternalApp"
        :title="title"
        :text="description"
      />
      <div class="primary-banner-box">
        <div class="primary-banner-wrap">
          <template v-for="item in twoDirections">
            <NuxtLink :to="item?.attributes?.slug" class="desktop-link">
              <div class="primary-banner-img">
                <NuxtImg
                  v-if="item?.attributes?.photoBanner?.data?.attributes?.url"
                  :src="item?.attributes?.photoBanner?.data?.attributes?.url"
                  provider="strapi"
                  :alt="
                    item?.attributes?.photoBanner?.data?.attributes?.alternativeText ?? 'image'
                  "
                  sizes="xs:260px md:400px xl:1000px"
                  loading="lazy"
                  format="webp"
                  class="banner-image"
                  :class="{
                    'no-photo':
                      !item?.attributes?.photoBanner?.data?.attributes?.formats
                        ?.large?.url,
                  }"
                />

                <div class="primary-banner-btn">
                  {{ item?.attributes?.heading }}
                </div>
              </div>
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

$tablet: 1358px;
$mobile: 680px;

.primary-banner {
  padding: 195px 0;

  background-color: #f9f9fa;

  border-radius: 45px;

  margin-top: 20px;
  margin-bottom: 100px;

  @include media($tablet) {
    background-color: transparent;
    margin-top: 0;
    padding: 140px 0 0;
  }
}

.primary-banner-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @include media($tablet) {
    flex-direction: column;
    gap: 60px;
    align-items: flex-start;
  }
}

.primary-banner-img {
  position: relative;

  background-color: #cccccc;
  height: 100%;

  border-radius: 45px;
  overflow: hidden;
  overflow: clip;

  @include media(900px) {
    border-radius: 25px;
  }
}

.primary-banner-img:hover .banner-image {
  transform: scale(1.05);
}

.banner-image {
  object-fit: cover;
  object-position: center;
  height: 100%;
  width: 100%;

  transition: all 0.3s ease-in-out;

  &.no-photo {
    object-fit: contain;
  }
}

.primary-banner-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;

  transform: translateX(-50%);

  width: 100%;
  max-width: max-content;
  padding: 14px 20px;
  border-radius: 45px;
  background: $white;
  color: $dark-blue-subtitle;
  @include flex-center-center;
  @include body-22-medium-Neue;

  @include media(900px) {
    @include body-16-regular;
    font-weight: 500;
  }
}

.primary-banner-box {
  width: 100%;
}

.primary-banner-wrap {
  width: 100%;

  display: flex;
  gap: 14px;

  @include media($mobile) {
    flex-direction: column;
  }
}

.desktop-link {
  width: 390px;
  height: 650px;

  @include media($tablet) {
    width: 100%;
  }

  @include media(900px) {
    height: 280px;
  }
}
</style>
