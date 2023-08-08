<template>
  <div class="container-size areas-wrapper">
    <h2>Направления работы</h2>
    <!-- <div>
      <div v-for="image in images" :key="image.id" :style="{ backgroundImage: `url(${image.url})` }">
        <h3>{{images.title}}</h3>
        <elements-link-with-arrow :type="type" title="Перейти" :href="link"/>
      </div>
    </div> -->
    <div class="areas-box">
      <div class="areas-box__img img-first">
        <h3>Стоматологические услуги</h3>
        <elements-link-with-arrow :type="type" title="Перейти" href="#"/>
      </div>
      <div class="areas-box__img img-second">
        <h3>Детская стоматология</h3>
        <elements-link-with-arrow :type="type" title="Перейти" href="#"/>
      </div>
      <div class="areas-box__img img-third">
        <h3>Челестно-лицевая хирургия</h3>
        <elements-link-with-arrow :type="type" title="Перейти" href="#"/>
      </div>
      <div class="areas-box__img img-fourth">
        <h3>Детская клиника</h3>
        <elements-link-with-arrow :type="type" title="Перейти" href="#"/>
      </div>
      <div class="areas-box__img img-fifth ">
        <h3>Лечение во сне</h3>
        <elements-link-with-arrow :type="type" title="Перейти" href="#"/>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { id: 1, url: '@/assets/images/areas/children-dentistry.png', title:"Стоматологические услуги" },
        { id: 2, url: '@/assets/images/areas/children-dentistry.png', title:"Стоматологические услуги"  },
        { id: 3, url: '@/assets/images/areas/children-dentistry.png', title:"Стоматологические услуги"  },
        { id: 4, url: '@/assets/images/areas/children-dentistry.png', title:"Стоматологические услуги"  },
        { id: 5, url: '@/assets/images/areas/children-dentistry.png', title:"Стоматологические услуги"  }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import '/assets/styles/style.scss';
.areas-wrapper {
  padding: 40px 0;

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
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 40px;
    border-radius: 25px;
    
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
}

.img-second {
  background-image: url("@/assets/images/areas/children-dentistry.png");
  width: 632px;
  height: 380px;
}

.img-third {
  background-image: url("@/assets/images/areas/card-maxillofacial-surgery.png");
  width: 416px;
  height: 380px;
}

.img-fourth {
  background-image: url("@/assets/images/areas/children-clinic.png");
  width: 416px;
  height: 380px;
}

.img-fifth {
  background-image: url("@/assets/images/areas/sleep-treatment.png");
  width: 416px;
  height: 380px;
}
</style>