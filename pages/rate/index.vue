<template>
  <div class="rate-page">
    <div class="rate-page-wrap">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs"/>
      <div class="rate-page-title">
        Оцените ваш прием
      </div>
      <div class="rate-page-text">
        Выберите пункт, который больше всего описывает процесс приема у специалиста
      </div>
      <div class="rate-page-radio-btns">
        <elements-radio-button :options="options" @input="handleOptionChange"/>
      </div>
      <elements-button-base title="Далее" class="rate-page-btn-base"/>
      <blocks-main-form />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
    },
    data() {
      return {
        options: [
          { id: 'option1', label: 'Отлично' },
          { id: 'option2', label: 'Хорошо' },
          { id: 'option3', label: 'Приемлемо' },
          { id: 'option4', label: 'Плохо' },
          { id: 'option5', label: 'Ужасно' },
        ],
        selectedOption: null,
      };
    },
    methods: {
      handleOptionChange(newOptionId) {
        this.selectedOption = newOptionId;
      },
    },
    setup() {
      const breadcrumbs = [{
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Оцените ваш прием',
          url: '/rate'
        }]
      return {
        breadcrumbs,
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/style.scss';

.rate-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  max-width: 100%;
  margin: 20px auto 0 auto;
}

.rate-page-wrap {
  width: 100%;
}

.rate-page-title {
  @include body-60-medium;
  color: $dark-blue-subtitle;
  padding: 100px 0 30px;
}

.rate-page-text {
  @include body-20-regular;
  color: $gray-text;
  padding-bottom: 60px;
}

.rate-page-radio-btns {
  padding-bottom: 60px;
}

.rate-page-btn-base {
  width: 190px;
  margin-bottom: 100px;
}

@media (max-width: 1201px) {
.rate-page-title {
  padding: 50px 0 100px;
  }
}

@media (max-width: 904px) {
  .rate-page-title {
    font-size: 22px;
    line-height: normal;
    padding: 10px 0 30px;
  }

  .rate-page-text {
    font-size: 16px;
  }
}

@media (max-width: 676px) {
  .rate-page-title {
    padding: 10px 0 30px;
  }
  .rate-page-text {
    padding: 0 0 30px;
  }
}

</style>