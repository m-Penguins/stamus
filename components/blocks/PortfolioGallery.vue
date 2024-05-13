<<<<<<< HEAD
<template>
  <div class="gallery" v-if="arrayImg?.length">
    <div class="gallery-title">Галерея</div>

    <div class="gallery-img-container">
      <div class="single-img" v-for="item in arrayImg" :key="item">
        <NuxtImg
          :src="item"
          provider="strapi"
          alt="Галерея"
          sizes="xs:400px md:600px"
          format="webp"
          class="gall-img"
        />
      </div>
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

.single-img {
  width: 100%;
  aspect-ratio: 1;

  @supports not (aspect-ratio: 1/1) {
    padding-top: 100%;
    height: 0;
    position: relative;
    overflow: hidden;
  }
}

.gall-img {
  object-fit: cover;
  height: 100%;
  width: 100%;

  border-radius: 14px;
}

.gallery-img-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

@media (max-width: 900px) {
  .gallery-img-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 589px) {
  .gallery {
    margin: 0 auto 80px;
  }

  .gallery-img-container {
    grid-template-columns: 1fr;
  }
}
</style>
=======
<template>
  <div class="gallery" v-if="arrayImg?.length">
    <div class="gallery-title">Галерея</div>

    <div class="gallery-img-container">
      <div class="single-img" v-for="item in arrayImg">
        <img :key="item" :src="item" class="gall-img" alt="Галерея" />
      </div>
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

.single-img {
  width: 100%;
  aspect-ratio: 1;

  @supports not (aspect-ratio: 1/1) {
    padding-top: 100%;
    height: 0;
    position: relative;
    overflow: hidden;
  }
}

.gall-img {
  object-fit: cover;
  height: 100%;
  width: 100%;

  border-radius: 14px;
}

.gallery-img-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

@media (max-width: 900px) {
  .gallery-img-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 589px) {
  .gallery {
    margin: 0 auto 80px;
  }

  .gallery-img-container {
    grid-template-columns: 1fr;
  }
}
</style>
>>>>>>> a32cc7504d371827e54429370578101f655096b2
