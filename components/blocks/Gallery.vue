<template>
  <div class="gallery">
    <div class="gallery-title">Галерея</div>

    <div
      v-if="arrayImg.length === 2 || arrayImg.length === 4"
      class="gallery-two-img-container"
    >
      <img
        v-for="item in arrayImg"
        :key="item"
        :src="item"
        class="gall-img"
        alt="Галерея"
      />
    </div>

    <div
      v-else-if="arrayImg.length === 3 || arrayImg.length === 5"
      class="gallery-three-img-container"
    >
      <img
        v-for="item in arrayImg"
        :key="item"
        :src="item"
        alt="Галерея"
        class="gall-img-three"
      />
    </div>

    <div class="container" v-else-if="arrayImg.length === 6">
      <img
        v-for="(item, index) in arrayImg"
        :key="index"
        :src="item"
        alt="Галерея"
        :class="'img-' + index"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    arrayImg: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

.container {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-areas:
    "img-0 img-1 img-2"
    "img-0 img-1 img-3"
    "img-4 img-5 img-5";
  grid-template-columns: 416px 524px 1fr;
  grid-template-rows: 1fr 185px 2fr;
  grid-gap: 16px;
}
.container {
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 15px;
  }
  img:nth-child(3),
  img:nth-child(4) {
    height: 100%;
  }
}

.img-0 {
  grid-area: img-0;
}
.img-1 {
  grid-area: img-1;
}
.img-2 {
  grid-area: img-2;
}
.img-3 {
  grid-area: img-3;
}
.img-4 {
  grid-area: img-4;
}
.img-5 {
  grid-area: img-5;
}

.gall-img-six {
  object-fit: cover;
  border-radius: 15px;
  height: 380px;
}
.gall-img-six:nth-child(-n + 2) {
  width: 33%;
}

.gall-img-six:nth-child(n + 2) {
  width: 33%;
}

.gallery-three-img-container {
  display: flex;
  width: 100%;
  gap: 16px;
  flex-wrap: wrap;
}

.gall-img-three {
  object-fit: cover;
  border-radius: 15px;
  width: 32%;
  height: 380px;
}

.gall-img-three:nth-child(n + 4) {
  width: 49%;
}

.gallery-two-img-container {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  flex-wrap: wrap;
}

.gall-img {
  object-fit: cover;
  border-radius: 15px;
  width: 49%;
  height: 380px;
}

.gallery {
  display: flex;
  flex-direction: column;
  width: 1280px;
  max-width: 100%;
  margin: 0 auto 100px;
}

.gallery-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
  padding-bottom: 40px;
}

@media (max-width: 1266px) {
  .container {
    grid-template-areas:
      "img-0 img-1"
      "img-2 img-3"
      "img-4 img-5";
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;

    img {
      height: 300px !important;
    }
  }
}

@media (max-width: 1000px) {
  .gallery-three-img-container {
    flex-wrap: wrap;
    gap: 14px;
  }

  .gall-img-three {
    width: 49%;
    height: 300px;
  }
  .gall-img-three-long {
    width: 100%;
  }
}

@media (max-width: 861px) {
  .container {
    img {
      height: 200px !important;
    }
  }
  .gall-img-three {
    width: 48.5%;
    height: 200px;
  }
  .gall-img-three-long {
    width: 100%;
  }

  .gall-img {
    height: 200px;
    width: 48.3%;
  }

  .gall-img-three:nth-child(n + 4) {
    width: 48.7%;
  }
}

@media (max-width: 589px) {
  .gallery {
    margin: 0 auto 80px;
  }
}

@media (max-width: 570px) {
  .gall-img-three {
    width: 100%;
  }
  .gall-img-three:nth-child(n + 4) {
    width: 100%;
  }
}

@media (max-width: 500px) {
  .gallery-two-img-container {
    flex-wrap: wrap;
    gap: 14px;
  }
  .gall-img {
    width: 100%;
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 14px;

    img {
      width: 100% !important;
    }
  }
}
</style>
