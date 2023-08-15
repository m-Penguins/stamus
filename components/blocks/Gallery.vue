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
  </div>
</template>

<style scoped lang="scss">
@import '/assets/styles/style.scss';

.gallery {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 1280px;
  max-width: 100%;
  margin: 50px auto;
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


@media (max-width: 800px) {
  .gallery {
    gap: 14px;
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
}

</style>