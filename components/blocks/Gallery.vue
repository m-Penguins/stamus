<template>
  <div class="gallery">
    <div class="gallery-title">Галерея</div>
    <div class="gallery-container">
      <div class="gallery-box">
        <img src="../../assets/images/gallery/gallery1.png"/>
      </div>
      <div class="gallery-box">
        <img src="../../assets/images/gallery/gallery2.png"/>
      </div>
      <div class="gallery-inner">
        <div class="gallery-box">
          <img src="../../assets/images/gallery/gallery3.png"/>
        </div>
        <div class="gallery-box">
          <img src="../../assets/images/gallery/gallery4.png"/>
        </div>
      </div>
    </div>
    <div class="gallery-container">
      <div class="gallery-box">
        <img src="../../assets/images/gallery/gallery5.png"/>
      </div>
      <div class="gallery-box">
        <img src="../../assets/images/gallery/gallery6.png"/>
      </div>
    </div>
    <!-- <div v-if="arrayImg.length === 2">
      <div class="gallery-two-img-container">
        <img src="../../assets/images/gallery/gallery3.png" class="gall-img"/>
        <img src="../../assets/images/gallery/gallery2.png" class="gall-img"/>
      </div>
    </div> -->
    <!-- <div v-if="arrayImg.length === 3">
      <div class="gallery-three-img-container">
        <img src="../../assets/images/gallery/gallery1.png" class="gall-img-three"/>
        <img src="../../assets/images/gallery/gallery4.png" class="gall-img-three"/>
        <img src="../../assets/images/gallery/gallery5.png" class="gall-img-three gall-img-three-long"/>
      </div>
    </div> -->
  </div>
</template>

<script>

export default {
  props: {
    arrayImg: {
      type: Array,
      default: []
    }
  },
}
</script>

<style scoped lang="scss">
@import '/assets/styles/style.scss';

.gallery-three-img-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
}

.gall-img-three {
  object-fit: cover;
  border-radius: 15px;
  width: 32.5%;
  height: 380px;
}

.gallery-two-img-container {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
}

.gall-img {
  object-fit: cover;
  border-radius: 15px;
  width: 50%;
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

.gallery-container {
  display: flex;
  gap: 16px;
}

.gallery-inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (max-width: 1000px) {
  .gallery-three-img-container {
    flex-wrap: wrap;
    gap: 16px;
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
  .gall-img-three { 
    width: 48.5%;
    height: 200px;
  }
  .gall-img-three-long {
    width: 100%;
  }
}


@media (max-width: 800px) {
  .gall-img {
    height: 200px;
    width: 49%;
  }


  .gallery {
    // gap: 14px;
  }
  .gallery-container {
    flex-wrap: wrap;
    gap: 14px;

    img {
      width: 334px;
      height: 200px;
      object-fit: cover;
      object-position: 0% 39%;
      border-radius: 15px;
    }
  }

  .gallery-inner {
    flex-direction: inherit;
    gap: 14px;
  }
}

@media (max-width: 743px) {
  .gallery-container, .gallery-inner {
    width: 100%;
  }
  .gallery-box {
    width: 47%;
  }
}

@media (max-width: 589px) {
  .gallery-container {
      img {
        width: 343px;
        height: 200px;
      }
  }
  .gallery-box {
    width: 100%;
    text-align: center;
  }
  .gallery-inner {
    flex-wrap: wrap;
  }
  .gallery {
    margin: 0 auto 80px;
  }
}

@media (max-width: 565px) {
  .gall-img-three { 
    width: 100%;
  }
}

@media (max-width: 500px) {
  .gallery-two-img-container {
    flex-wrap: wrap;
  }
  .gall-img {
    width: 100%;
  }
}

</style>