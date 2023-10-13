<script setup>
const storeServices = useService();
</script>

<template>
  <div class="container-size areas-wrapper">
    <h2>Направления работы</h2>
    <div class="areas-box">
      <div class="areas-box-temp">
        <div class="areas-box__img img-first">
          <h3>Стоматологические услуги</h3>
          <elements-link-with-arrow
            type=""
            title="Перейти"
            href="/stomatologicheskie-uslugi"
          />
        </div>
        <div class="areas-box__img img-second">
          <h3>Детская стоматология</h3>
          <elements-link-with-arrow
            type=""
            title="Перейти"
            href="/detskaya-stomatologiya"
          />
        </div>
      </div>
      <div class="areas-box-col">
        <div class="areas-box__img img-third">
          <h3>Челестно-лицевая хирургия</h3>
          <elements-link-with-arrow
            type=""
            title="Перейти"
            href="/chelyustno-licevaya-hirurgiya"
          />
        </div>
        <div class="areas-box__img img-fourth">
          <h3>Детская клиника</h3>
          <elements-link-with-arrow
            type=""
            title="Перейти"
            href="/detskaya-klinika"
          />
        </div>
        <div class="areas-box__img img-fifth display">
          <h3>Лечение во сне</h3>
          <elements-link-with-arrow
            type=""
            title="Перейти"
            href="/lechenie-vo-sne"
          />
        </div>
      </div>
      <div class="mob">
        <h3>Лечение во сне</h3>
        <elements-link-with-arrow
          type=""
          title="Перейти"
          href="/lechenie-vo-sne"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";
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

    h3 {
      @include body-22-semi-bold;
      color: $white;
      padding-bottom: 10px;
    }
  }
}

.img-first {
  background-image: url("@/assets/images/areas/card-dental-services.png");
  width: 632px;
  height: 380px;
  grid-area: "1";
}

.img-second {
  background-image: url("@/assets/images/areas/children-dentistry.png");
  width: 632px;
  height: 380px;
  grid-area: "2";
}

.img-third {
  background-image: url("@/assets/images/areas/card-maxillofacial-surgery.png");
  width: 416px;
  height: 380px;
  grid-area: "3";
}

.img-fourth {
  background-image: url("@/assets/images/areas/Frame-big.png");
  width: 416px;
  height: 380px;
  background-size: cover;
  grid-area: "4";
}

.img-fifth {
  background-image: url("@/assets/images/areas/sleep-treatment.png");
  width: 416px;
  height: 380px;
  grid-area: "5";
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
    background-image: url("@/assets/images/areas/sleep-treatment.png");
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
    gap: 14px;
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
    gap: 10px;
  }
  .areas-box-temp {
    flex-wrap: wrap;
    gap: 10px;
  }

  .areas-box {
    gap: 10px;
    .img-third,
    .img-fourth {
      width: 100%;
    }
  }
}
</style>
