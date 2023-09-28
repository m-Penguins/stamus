<template>
  <div class="portfolio-page">
    <div class="portfolio-page-wrap">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs"/>
      <div class="portfolio-page-title">
        Портфолио
      </div>
      <div class="portfolio-page-text">
        Небольшое описание в несколько строчек
      </div>
      <div class="portfolio-form">
        <div class="portfolio-box">
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
        <div class="portfolio-box-search">          
          <div class="input-search">
            <elements-input-search-components class="input-search" placeholder="Найти"/>
          </div>
        </div> 
      </div>
      <div class="portfolio-page-cards">
        <div  class="portfolio-page-card" v-for="item in mockArrayDirection" :key="item" >
          <elements-cases-direction-card :direction="item" @click="$router.push(`/portfolio/` + 1)"/>
        </div>
      </div>
      <elements-pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:current-page="setCurrentPage"
      />
      <blocks-gallery/>
      <blocks-main-form />
    </div>
  </div>
</template>

<script>
import {mockArrayDirection} from '../../stores/mockData';
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
          title: 'Портфолио',
          url: '/portfolio'
        }]
      return {
        breadcrumbs,
        mockArrayDirection
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/style.scss';
.input-search {
  width: 308px;
}

.select {
  width: 308px;
}

.portfolio-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  max-width: 100%;
  margin: 20px auto 0 auto;
}

.portfolio-page-wrap {
  width: 100%;
}

.portfolio-page-title {
  @include body-60-medium;
  color: $dark-blue-subtitle;
  padding: 100px 0 30px;
}

.portfolio-page-text {
  @include body-20-regular;
  color: $gray-text;
  padding-bottom: 100px;
}

.portfolio-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 40px;
}

.portfolio-page-cards {
  display: flex;
  gap: 40px 16px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.portfolio-page-card {
  max-width: 308px;
}

.portfolio-box {
  display: flex;
  gap: 16px;
  margin-right: 16px;
}

@media (max-width: 1328px) {
  .portfolio-page-card {
    width: 32%;
    max-width: 100%;
  }
}

@media (max-width: 1201px) {
.portfolio-page-title {
  padding: 50px 0 100px;
  }
}

@media (max-width: 1098px) {
  .service-form {
    flex-wrap: wrap;
    gap: 10px;
  }
}

@media (max-width: 1017px) {
  .portfolio-form {
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 60px;
  }

  .portfolio-box {
      margin-right: 0;
      width: 100%;
  }

  .portfolio-box-search {
    width: 100%;
  }

  .input-search {
    width: 100%;
  }

  .select {
    width: 100%;
  }
}

@media (max-width: 904px) {
  .portfolio-page-title {
    font-size: 22px;
    line-height: normal;
    padding: 10px 0 30px;
  }

  .portfolio-page-text {
    font-size: 16px;
  }

  .portfolio-page-cards {
    gap: 40px 14px;
  }
}

@media (max-width: 860px) {
  .portfolio-page-card {
    width: 48.5%;
  }
}

@media (max-width: 676px) {
  .portfolio-page-title {
    padding: 10px 0 30px;
  }
  .portfolio-form {
    flex-wrap: wrap;
    padding-bottom: 40px;
  }

  .portfolio-box {
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
  }

  .portfolio-page-text {
    padding: 0 0 30px;
  }
}

@media (max-width: 550px) {
  .portfolio-page-card {
    width: 100%;
  }
}
</style>

