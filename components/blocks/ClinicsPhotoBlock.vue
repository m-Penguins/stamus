<script setup>
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const { data: clinicsData, error } = await useFetch(
  `${apiBaseUrl}clinics?populate=deep`,
);
</script>

<template>
  <div v-if="clinicsData.data && !error" class="container-size areas-wrapper">
    <h2 class="clinics-block-title">Наши клиники</h2>
    <div class="areas-box">
      <div class="areas-box-temp">
        <div
          class="areas-box__img img-first"
          :style="{
            backgroundImage: `url(${
              baseUrl +
              clinicsData?.data[0]?.attributes?.photoBanner?.data?.attributes
                ?.url
            })`,
          }"
        >
          <h3>{{ clinicsData?.data[0]?.attributes?.heading }}</h3>
          <p class="areas-box-text">
            {{ clinicsData?.data[0]?.attributes?.address }}
          </p>
          <elements-link-with-arrow
            :type="false"
            title="Перейти"
            href="#"
            @click="$router.push(`/clinics/` + clinicsData?.data[0]?.id)"
          />
        </div>
        <div
          class="areas-box__img img-second"
          :style="{
            backgroundImage: `url(${
              baseUrl +
              clinicsData?.data[1]?.attributes?.photoBanner?.data?.attributes
                ?.url
            })`,
          }"
        >
          <h3>{{ clinicsData?.data[1]?.attributes?.heading }}</h3>
          <p class="areas-box-text">
            {{ clinicsData?.data[1]?.attributes?.address }}
          </p>
          <elements-link-with-arrow
            :type="false"
            title="Перейти"
            href="#"
            @click="$router.push(`/clinics/` + clinicsData?.data[1]?.id)"
          />
        </div>
      </div>
      <div class="areas-box-col">
        <div
          class="areas-box__img img-third"
          :style="{
            backgroundImage: `url(${
              baseUrl +
              clinicsData?.data[2]?.attributes?.photoBanner?.data?.attributes
                ?.url
            })`,
          }"
        >
          <h3>{{ clinicsData?.data[2]?.attributes?.heading }}</h3>
          <p class="areas-box-text">
            {{ clinicsData?.data[2]?.attributes?.address }}
          </p>
          <elements-link-with-arrow
            :type="false"
            title="Перейти"
            href="#"
            @click="$router.push(`/clinics/` + clinicsData?.data[2]?.id)"
          />
        </div>
        <div
          class="areas-box__img img-fourth"
          :style="{
            backgroundImage: `url(${
              baseUrl +
              clinicsData?.data[3]?.attributes?.photoBanner?.data?.attributes
                ?.url
            })`,
          }"
        >
          <h3>{{ clinicsData?.data[3]?.attributes?.heading }}</h3>
          <p class="areas-box-text">
            {{ clinicsData?.data[3]?.attributes?.address }}
          </p>
          <elements-link-with-arrow
            :type="false"
            title="Перейти"
            href="#"
            @click="$router.push(`/clinics/` + clinicsData?.data[3]?.id)"
          />
        </div>
        <div
          class="areas-box__img img-fifth display"
          :style="{
            backgroundImage: `url(${
              baseUrl +
              clinicsData?.data[4]?.attributes?.photoBanner?.data?.attributes
                ?.url
            })`,
          }"
        >
          <h3>{{ clinicsData?.data[4]?.attributes?.heading }}</h3>
          <p class="areas-box-text">
            {{ clinicsData?.data[4]?.attributes?.address }}
          </p>
          <elements-link-with-arrow
            :type="false"
            title="Перейти"
            href="#"
            @click="$router.push(`/clinics/` + clinicsData?.data[4]?.id)"
          />
        </div>
      </div>
      <div
        class="mob"
        :style="{
          backgroundImage: `url(${
            baseUrl +
            clinicsData?.data[4]?.attributes?.photoBanner?.data?.attributes?.url
          })`,
        }"
      >
        <h3>{{ clinicsData?.data[4]?.attributes?.heading }}</h3>
        <p class="areas-box-text">
          {{ clinicsData?.data[4]?.attributes?.address }}
        </p>
        <elements-link-with-arrow
          :type="false"
          title="Перейти"
          href="#"
          @click="$router.push(`/clinics/` + clinicsData?.data[4]?.id)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

.clinics-block-title {
  padding-top: 40px;
}
.mob {
  display: none;
}
.areas-box-temp {
  display: flex;
  gap: 16px;
  max-width: 100%;
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

    h3 {
      @include body-22-semi-bold;
      color: $white;
    }
  }
}

.areas-box-text {
  color: white;
  @include body-14-regular;
}

.img-first {
  background-image: url("@/assets/images/clinics/clinic3.png");
  width: 632px;
  height: 380px;
  grid-area: "1";
}

.img-second {
  background-image: url("@/assets/images/clinics/clinic1.png");
  width: 632px;
  height: 380px;
  grid-area: "2";
}

.img-third {
  background-image: url("@/assets/images/clinics/clinic4.png");
  width: 416px;
  height: 380px;
  grid-area: "3";
}

.img-fourth {
  background-image: url("@/assets/images/clinics/clinic5.png");
  width: 416px;
  height: 380px;
  grid-area: "4";
}

.img-fifth {
  background-image: url("@/assets/images/clinics/clinic2.png");
  width: 416px;
  height: 380px;
  grid-area: "5";
}

@media (max-width: 1000px) {
  .clinics-block-title {
    padding-top: 0;
  }
  .areas-wrapper {
    h2 {
      padding-bottom: 40px;
    }
  }

  .display {
    display: none;
  }

  .mob {
    @include flex-column-end;
    padding: 20px;
    border-radius: 25px;
    font-size: 14px;
    background-image: url("@/assets/images/clinics/clinic2.png");
    width: 100%;
    height: 220px;
    @include backg-no-rep-center-cover;
    background-position: 11% 66%;

    h3 {
      @include body-18-medium;
      color: $white;
      padding-bottom: 10px;
    }
  }

  .areas-box-col {
    max-width: 100%;
    gap: 14px;
  }
  .areas-box-temp {
    gap: 14px;
  }

  .areas-box {
    &__img {
      background-size: cover;
      height: 220px;
      padding: 20px;
    }

    h3 {
      @include body-18-medium;
    }
  }

  .img-third,
  .img-fourth {
    width: 461px;
  }

  .img-fifth {
    max-width: 950px;
    width: 100%;
  }
}

@media (max-width: 680px) {
  .areas-wrapper {
    margin-bottom: 80px !important;
  }
  .areas-box-col {
    flex-wrap: wrap;
    width: 100%;
    gap: 14px;
  }
  .areas-box-temp {
    flex-wrap: wrap;
    gap: 14px;
  }

  .areas-box {
    .img-third,
    .img-fourth {
      width: 100%;
    }
  }
}
</style>
