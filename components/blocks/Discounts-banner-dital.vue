<template>
  <div class="banner">
    <div class="banner-wrap">
      <div class="banner-inner">
        <elements-bread-crumbs
          :breadcrumbs="breadcrumbs"
          class="bread-crumbs-discounts"
        />
        <div class="banner-box">
          <div class="banner-container">
            <h2 v-if="title" class="banner-title">{{ title }}</h2>
            <div
              v-if="description"
              v-html="description"
              class="banner-text"
            ></div>
            <elements-link-with-arrow
              link="/discounts"
              type
              title="Посмотреть акции"
            />
          </div>
          <div class="banner-img">
            <div
              class="banner-img-box"
              :style="{
                backgroundImage: `url(/images/img-banner/vectors.png)`,
              }"
            >
              <NuxtImg
                src="images/img-banner/tooth.png"
                alt="image"
                sizes="xs:400px md:800px"
                format="webp"
                class="img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["breadcrumbs", "title", "description"]);
</script>

<style scoped lang="scss">
@import "/assets/styles/style.scss";
.banner-img {
  height: 100%;
  width: 53%;
}
.banner-img-box {
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  max-width: 697px;
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
}
.banner-title {
  @include body-60-medium;
  color: #1e2433;
  padding-top: 60px;
}

.banner-text {
  @include body-16-regular;
  color: $gray-text;
}
.banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%;
  margin: 20px auto 0 auto;
}
.banner-wrap {
  width: 100%;
  max-width: 100%;
  border-radius: 45px;
  height: 630px;
  background: $bright-blue-gradient;
  margin-bottom: 100px;
}

.banner-inner {
  width: 1280px;
  max-width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  margin: 0 auto;
}

.banner-box {
  display: flex;
  height: 100%;
}

.banner-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 39%;
  height: 100%;
}

@media (min-width: 2560px) {
  .banner {
    .banner-wrap {
      background-size: contain;
      width: 2560px;
    }
  }
}

@media (max-width: 1400px) {
  .banner-inner {
    padding-left: 50px;
  }
}

@media (max-width: 1357px) {
  .banner-wrap {
    margin-top: 110px;
  }
}

@media (max-width: 950px) {
  .bread-crumbs-discounts {
    margin: 88px 0 60px 0;
  }
  .banner-wrap {
    background: none;
    height: 100%;
    margin-top: 0px;
  }
  .banner-box {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    gap: 34px;
  }

  .banner-img {
    background: $bright-blue-gradient;
    border-radius: 25px;
    height: 342px;
    width: 320px;
  }

  .banner-inner {
    padding-left: 0;
  }

  .banner-title {
    font-size: 50px;
    padding-top: 0px;
  }

  .banner-container {
    width: 50%;
    padding-left: 0px;
    gap: 14px;
  }
}

@media (max-width: 900px) {
  .banner-title {
    font-size: 22px;
    line-height: normal;
  }
  .banner-text {
    padding-bottom: 16px;
  }
}

@media (max-width: 650px) {
  .bread-crumbs-discounts {
    margin: 84px 0 0px 0;
  }
  .banner-wrap {
    margin-bottom: 80px;
  }
  .banner-box {
    flex-wrap: wrap;
    flex-direction: column-reverse;
    gap: 31px;
  }
  .banner-container {
    width: 100%;
  }

  .banner-img {
    width: 100%;
  }
  .img {
    height: 342px;
  }

  .banner-text {
    padding-bottom: 4px;
  }
}
</style>
