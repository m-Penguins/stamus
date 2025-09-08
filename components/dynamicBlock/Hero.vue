<template>
  <div class="dentistry-wrapper">
    <div class="dentistry-container" :class="{ 'bg-dark': false }">
      <NuxtImg
        v-if="imgBg"
        :src="imgBg"
        provider="strapi"
        :alt="imgAlt ?? 'image'"
        sizes="xl:1920px xxl:2560px"
        format="webp"
        class="banner-img"
      />
      <div class="dentistry-box">
        <elements-bread-crumbs
          :breadcrumbs="breadcrumbs"
          :typeColorWhite="false"
        />
        <div v-if="isMobileView" class="mob">
          <NuxtImg
            v-if="imgBg"
            :src="imgBg"
            provider="strapi"
            :alt="imgAlt ?? 'image'"
            sizes="xs:600px"
            format="webp"
            class="img"
          />
          <div>
            <elements-title-text-button
              textButtonBase="Записаться онлайн"
              :customClick="redirectToExternalApp"
              :isButtonBase="false"
              :title="title"
              :font-size="true"
              :text="text"
            />
          </div>
        </div>
        <elements-title-text-button
          v-if="!isMobileView"
          :customClick="heroClick"
          :textButtonBase="buttonText"
          isButtonBase
          :title="title"
          :text="text"
          class="height-50 desktop"
          :none_btn="noneBtn"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps([
  "title",
  "text",
  "imgBg",
  "imgAlt",
  "breadcrumbs",
  "link",
  "link_text",
  "noneBtn",
]);

const modalStore = useModalStore();
const isMobileView = ref(false);

const heroClick = () => {
  if (props?.link) {
    window?.open(props?.link, "_blank");
  } else {
    redirectToExternalApp();
  }
};

const buttonText = props?.link_text ? props?.link_text : "Записаться онлайн";

const checkScreenWidth = () => {
  isMobileView.value = window.innerWidth <= 1110;
};

onMounted(() => {
  checkScreenWidth();
  window.addEventListener("resize", checkScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenWidth);
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/style.scss";

.banner-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 0;

  object-fit: cover;
  border-radius: 45px;
}

@media (max-width: 1110px) {
  .banner-img {
    display: none;
  }
}

.bg-dark {
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.3);
}

.img {
  object-fit: cover;
  width: 50%;
  max-width: 100%;
  height: 334px;
  border-radius: 25px;
  object-position: center;
}

.main-info-width {
  width: 100% !important;
}

.mob {
  display: none;
}

.elements-analitic-card-mob {
  position: static;
}

.dentistry-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%;
  margin: 20px auto 0 auto;
  border-radius: 45px;
}
.dentistry-container {
  width: 100%;
  height: 920px;
  border-radius: 45px;
  background-color: #cccccc;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
}

.dentistry-box {
  z-index: 3;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
}

@media (max-width: 1475px) {
  .dentistry-box {
    margin-left: 80px;
  }
}

@media (max-width: 1920px) and (min-width: 1110px) {
  .dentistry-container {
    height: calc(500px + ((100vw - 1110px) * (420 / 810)));
  }
}

@media (max-width: 1357px) {
  .dentistry-wrapper {
    margin-top: 110px;
  }
}

@media (max-width: 1110px) {
  .bg-dark {
    box-shadow: 0 0 0;
  }
  .dentistry-wrapper {
    margin-top: 0;
  }
  .mob {
    display: flex;
    width: 100%;
    gap: 34px;
    align-items: center;
  }
  .dentistry-container {
    height: 100%;
    background: none !important;
  }

  .desktop {
    display: none;
  }

  .dentistry-box {
    margin-left: 0;
  }

  .breadcrumbs {
    margin-top: 165px;
  }
}

@media (max-width: 1080px) {
  .img {
    width: 400px;
  }
}

@media (max-width: 970px) {
  .img {
    width: 334px;
  }
}

@media (max-width: 668px) {
  .img {
    width: 334px;
  }
}

@media (max-width: 633px) {
  .img {
    width: 100%;
  }
}

@media (max-width: 633px) {
  .img-dital {
    width: 100%;
  }
  .dentistry-container {
    margin-bottom: 32px;
  }
  .mob {
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 32px;
  }

  .mob {
    width: 100%;
  }
}

@media (min-width: 2560px) {
  .dentistry-container {
    width: 2520px;
  }
}
</style>
