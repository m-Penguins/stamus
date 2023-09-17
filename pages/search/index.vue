<template>
  <div class="search">
    <div class="search-wrap">
      <elements-bread-crumbs :breadcrumbs="[{
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Поиск',
          url: '/search'
        },
        {
          title: `${searchTerm}`,
          url: `/search/`
        }]"/>
        <div>
          <h2 class="search-title">По вашему запросу найдено 5 совпадений</h2>
        </div>

        <div v-if="isServises" class="search-block">
          <h4 class="search-subtitle">Подходящие услуги</h4>
          <hr class="hr"/>
          <div v-for="item in mockActivitiesCard" :key="item" class="search-inner">
            <elements-activities-card :activitiesCard="item"/>
          </div>
        </div>

        <div v-if="isServises" class="search-block">
          <h4 class="search-subtitle">Подходящие статьи</h4>
          <hr class="hr"/>
          <div v-for="item in mockActivitiesCard" :key="item" class="search-inner">
            <elements-activities-card :activitiesCard="item"/>
          </div>
        </div>

        <div v-if="isServises" class="search-block">
          <h4 class="search-subtitle">Подходящие специалисты</h4>
          <hr class="hr"/>
          <div v-for="item in mockDataSpec" :key="item" class="search-inner">
            <elements-search-specialist-card :spesialistCard="item"/>
          </div>
        </div>
        <div class="search-form">
          <blocks-main-form />
        </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup() {
      const router = useRouter();
      const isServises = true;
      const searchTerm = ref('');

      const getSearchParams = () => {
        const { query } = router.currentRoute.value
        if (query && query.term) {
          searchTerm.value = query.term
        }
      }

      const mockActivitiesCard = [
        {id: 1, title: "Лечение кариеса", link: "#"},
        {id: 2, title: "Лечение кариеса", link: "#"},
        {id: 3, title: "Лечение кариеса", link: "#"}
      ]

      const mockDataSpec = [
        { 
          id: 1, 
          name: 'Овсоян Григорий', 
          category: 'Стоматолог-терапевт', 
          img: 'images/specialists/avatar-4.png',
        },
        { 
          id: 2, 
          name: 'Овсоян Григорий', 
          category: 'Стоматолог-терапевт', 
          img: 'images/specialists/avatar-4.png',
        },
        { 
          id: 3, 
          name: 'Овсоян Григорий', 
          category: 'Стоматолог-терапевт', 
          img: 'images/specialists/avatar-4.png',
        },
      ]

      getSearchParams()
      return {
        searchTerm,
        isServises,
        mockActivitiesCard,
        mockDataSpec
      }
    },
}
</script>

<style scoped lang="scss">
@import '/assets/styles/style.scss';

.search {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1280px;
    max-width: 100%;
    margin: 20px auto 0 auto;
}

.search-wrap {
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
}

.search-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
  padding-top: 100px;
}

.search-block {
  padding-top: 40px;
}

.search-subtitle {
  @include body-14-regular;
  color: $gray-text;
  padding-bottom: 10px;
}

.hr {
  width: auto;
  border: 0;
  height: 0;
  border-bottom: 1px solid #E9E9E9;
  margin-bottom: 14px;
}

.search-inner {
  padding-bottom: 14px;
}

.search-form {
  margin-top: 100px;
}

@media (max-width: 650px) { 
  .search-form {
    margin-top: 80px;
  }
}

</style>