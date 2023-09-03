<template>
  <div class="container-size areas-wrapper">
    <h2>Наши клиники</h2>
    <div class="areas-box">
      <div class="areas-box-temp">
        <div class="areas-box__img img-first">
          <h3>Клиника на Хакурате</h3>
          <p class="areas-box-text">Краснодар,ул. Хакурате 34</p>
          <elements-link-with-arrow :type="type" title="Перейти" href="#"/>
        </div>
        <div class="areas-box__img img-second">
          <h3>Клиника на Гимназической</h3>
          <p class="areas-box-text">Краснодар, ул. Гимназическая 85</p>
          <elements-link-with-arrow :type="type" title="Перейти" href="#"/>
        </div>
      </div>
      <div class="areas-box-col">
        <div class="areas-box__img img-third">
          <h3>Клиника на Московской</h3>
          <p class="areas-box-text">Краснодар, ул. Московская, 140</p>
          <elements-link-with-arrow :type="type" title="Перейти" href="#"/>
        </div>
        <div class="areas-box__img img-fourth">
          <h3>Клиника на Платановом бульваре</h3>
          <p class="areas-box-text">Краснодар, Платановый бульвар 19/3</p>
          <elements-link-with-arrow :type="type" title="Перейти" href="#"/>
        </div>
        <div class="areas-box__img img-fifth display">
          <h3>Клиника на Мачуги</h3>
          <p class="areas-box-text">Краснодар, ул. Мачуги 1/1</p>
          <elements-link-with-arrow :type="type" title="Перейти" href="#"/>
        </div>
      </div>
      <div class="mob">
        <h3>Клиника на Мачуги</h3>
        <p class="areas-box-text">Краснодар, ул. Мачуги 1/1</p>
        <elements-link-with-arrow :type="type" title="Перейти" href="#"/>
      </div>
    </div>  
  </div>
</template>


<style lang="scss" scoped>
@import '/assets/styles/style.scss';
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
  grid-area: '1';
}

.img-second {
  background-image: url("@/assets/images/clinics/clinic1.png");
  width: 632px;
  height: 380px;
   grid-area: '2';
}

.img-third {
  background-image: url("@/assets/images/clinics/clinic4.png");
  width: 416px;
  height: 380px;
  grid-area: '3';
}

.img-fourth {
  background-image: url("@/assets/images/clinics/clinic5.png");
  width: 416px;
  height: 380px;
  grid-area: '4'
}

.img-fifth {
  background-image: url("@/assets/images/clinics/clinic2.png");
  width: 416px;
  height: 380px;
  grid-area: '5';
}

  @media (max-width: 1000px) {
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

    .img-third, .img-fourth {
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
      .img-third, .img-fourth {
      width: 100%;
    }
  }

  }
</style>