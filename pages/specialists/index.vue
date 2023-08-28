<template>
  <div class="spicialists-page">
    <div class="spicialists-page-wrap">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs"/>
      <div class="spicialists-page-title">
        Специалисты
      </div>
      <div class="specialist-form">
        <div class="specialist-box">
          <elements-select
            :options="addresData"
            :default="'Взрослым'"
            class="select"
          />
          <elements-select
            :options="addresData"
            :default="'Направление'"
            class="select"
          />
        </div>
        <div class="specialist-box">          
          <elements-select
            :options="addresData"
            :default="'Клиника'"
            class="select"
          />
          <div class="input-search">
            <elements-input-search class="input-search" placeholder="Найти"/>
          </div>
        </div> 
      </div>
      <div class="spicialists-page-cards">
        <div  class="spicialists-page-card" v-for="item in mockArrayOurSpecialists" :key="item" >
          <elements-name-specialty-photo-card :specialists="item" />
        </div>
      </div>
      <elements-pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:current-page="setCurrentPage"
      />
      <blocks-main-popular-services/>
      <blocks-main-form />
    </div>
  </div>
</template>

<script>
import {mockArrayOurSpecialists} from '../../stores/mockData';
  export default {
    data() {
    return {
      currentPage: 1,
      totalPages: 10 
    };
  },
  methods: {
    setCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
    }
  },
    setup() {
      const breadcrumbs = [{
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Специалисты',
          url: '/specialists'
        }]
        const mockArray = [
          {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
          {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
          {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
          {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
          {name: 'Профессиональная гигиена полости рта и зубов временный прикус', price: 'от 3 400 ₽', type: 'Рекомендуем'},
          ];
      return {
        breadcrumbs,
        mockArray,
        mockArrayOurSpecialists
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/style.scss';
.input-search {
  width: 100%
}

.spicialists-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  max-width: 100%;
  margin: 20px auto 0 auto;
}

.spicialists-page-wrap {
  width: 100%;
}

.spicialists-page-title {
  @include body-60-medium;
  color: $dark-blue-subtitle;
  padding: 100px 0;
}

.specialist-form {
  display: flex;
  width: 100%;
  gap: 20px;
  padding-bottom: 40px;
}

.spicialists-page-cards {
  display: flex;
  gap: 40px 16px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.spicialists-page-card {
  max-width: 308px;
}

.specialist-box {
  display: flex;
  gap: 20px;
  width: 50%;
}

@media (max-width: 1351px) {
  .specialist-box {
    flex-wrap: wrap;
  }
  .spicialists-page-card {
    max-width: 334px;
  }
}

@media (max-width: 1201px) {
  .spicialists-page-title {
    padding: 50px 0 100px;
    }
}

@media (max-width: 1098px) {
  .spicialists-page-card {
    max-width: 270px;
  }
}

@media (max-width: 904px) {
  .spicialists-page-title {
    font-size: 22px;
    line-height: normal;
    padding: 10px 0 100px;
  }
  .spicialists-page-card {
    max-width: 334px;
  }
  .spicialists-page-cards {
    gap: 40px 14px;
  }
}

@media (max-width: 743px) {
  .spicialists-page-card {
    max-width: 300px;
  }
}

@media (max-width: 676px) {
  .spicialists-page-title {
    padding: 10px 0 50px;
  }
  .specialist-form {
    flex-wrap: wrap;
  }

  .specialist-box {
    width: 100%;
  }

  .spicialists-page-card {
    max-width: 270px;
  }
}

@media (max-width: 586px) {
  .spicialists-page-card {
    max-width: 230px;
  }
}

@media (max-width: 506px) {
  .spicialists-page-card {
    max-width: 343px;
  }
}
</style>