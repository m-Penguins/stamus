<script setup>
import imagePlaceholders from "~/utils/imagePlaceholders";

const baseUrl = useRuntimeConfig().public.baseUrl;

const props = defineProps(["clinicsData"]);

console.log(props.clinicsData?.data);
</script>

<template>
  <div v-if="clinicsData?.data" class="container-size areas-wrapper">
    <h2 class="clinics-block-title">Наши клиники</h2>

    <div class="areas-box">
      <div class="areas-box-temp">
        <div
          class="areas-box__img"
          v-for="clinic in clinicsData?.data"
          :style="{
            backgroundImage: `url(${
              clinic?.attributes?.photoBanner?.data?.attributes?.formats?.medium
                ?.url
                ? baseUrl +
                  clinic?.attributes?.photoBanner?.data?.attributes?.formats
                    ?.medium?.url
                : baseUrl + imagePlaceholders?.services
            })`,
          }"
          :class="{
            'no-photo':
              !clinic?.attributes?.photoBanner?.data?.attributes?.formats
                ?.medium?.url,
          }"
        >
          <h3>{{ clinic?.attributes?.heading }}</h3>
          <p class="areas-box-text">
            {{ clinic?.attributes?.address }}
          </p>
          <elements-link-with-arrow
            :type="false"
            title="Перейти"
            :href="'/clinics/' + clinic?.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";

.areas-box__img {
  background-size: cover;
  background-repeat: no-repeat;

  background-color: #cccccc;

  &.no-photo {
    background-size: contain;
  }
}

.clinics-block-title {
  padding-top: 40px;
}
.mob {
  display: none;
}
.areas-box-temp {
  display: flex;
  gap: 14px;
  max-width: 100%;

  flex-wrap: wrap;
}

.areas-box-col {
  display: flex;
  max-width: 100%;
  gap: 16px;
}

.areas-wrapper {
  h2 {
    padding-bottom: 30px;
    @include body-22-medium-Neue;
    color: $dark-blue-subtitle;
  }
}
.areas-box {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  &__img {
    @include flex-column-end;
    padding: 40px;
    border-radius: 25px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    font-size: 14px;
    gap: 14px;
    height: 380px;
    box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.3);

    h3 {
      @include body-22-semi-bold;
      color: $white;
    }
  }
  &__img:nth-child(-n + 2) {
    display: flex;
    width: 49%;
  }
  &__img:nth-child(n + 6) {
    display: flex;
    width: 49%;
  }
  &__img:nth-child(n + 3):nth-child(-n + 5) {
    display: flex;
    width: 32.2%;
  }
}

.areas-box-text {
  color: white;
  @include body-14-regular;
}

@media (max-width: 1170px) {
  .clinics-block-title {
    padding-top: 0;
  }
  .areas-wrapper {
    h2 {
      padding-bottom: 40px;
    }
  }

  .areas-box {
    &__img {
      padding: 20px;
    }

    h3 {
      @include body-18-medium;
    }
  }
}

@media (max-width: 885px) {
  .areas-box {
    &__img {
      height: 220px;
      gap: 6px;
      width: 48.7% !important;
    }
  }
}

@media (max-width: 670px) {
  .areas-wrapper {
    margin-bottom: 80px;
  }
  .areas-box {
    &__img {
      width: 100% !important;
    }
  }
}
</style>
