<template>
  <blocks-discounts-banner-dital 
    :breadcrumbs="breadcrumbs" 
  />
  <div class="spicialists-page-cards">
    <div class="spicialists-page-card" v-for="item in mockArrayOurSpecialistsTwoDoctorsDiscounts" :key="item" >
      <elements-name-specialty-photo-card 
      link="#" 
      :specialists="item"
      :isLink="false"
      :isTooltip="false"
      />
    </div>
  </div>
  <blocks-main-form />
</template>

<script>
import { mockArrayOurSpecialistsTwoDoctorsDiscounts } from '../../stores/mockData';
  export default {
    props: {
    },
    data() {
      return {
      };
    },
    setup() {
      const breadcrumbs = [{
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Акции и скидки',
          url: '/discounts'
        },
        {
          title: 'Счастливые часы',
          url: `/discounts/schastlivye-chasy`
        }]
      return {
        breadcrumbs,
        mockArrayOurSpecialistsTwoDoctorsDiscounts
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/style.scss';

.spicialists-page-cards {
  display: flex;
  gap: 40px 16px;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 1280px;
  max-width: 100%;
  margin: 0 auto 100px;
}

.spicialists-page-card {
  max-width: 308px;
}

@media (max-width: 900px) {
  .spicialists-page-card {
    max-width: 334px;
  }

  .spicialists-page-cards {
    margin: 0 auto 80px;
    gap: 40px 14px;
  }
}

@media (max-width: 676px) {
  .spicialists-page-card {
    max-width: 343px;
  }
  .spicialists-page-cards {
    margin: 0 auto 80px;
  }
}

</style>