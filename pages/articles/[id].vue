<script setup>
const route = useRoute()
const breadcrumbs = [
        {
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Статьи',
          url: 'articles'
        },
          {
            title: `Наименование статьи`,
            url: `/articles/${route.params.id}`
          }
      ]  
const categoryMock = ['Челюстно-лицевая хирургия', 'Стоматология']        
</script>

<template>
  <div class="articles-dital-wrapper">
    <div class="base-container-grey">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs"/>
      <div class="articles-dital-inner">
        <h1 class="articles-dital-title">Наименование статьи</h1>
        <div class="articles-dital-img">
          <div class="articles-dital-box">
            <div v-for="item in categoryMock" :key="item">
              <div class="articles-dital-box__item">
                {{item}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="articles-dital-container">
        <p>Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены. С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта не даёт нам иного выбора, кроме определения приоретизации разума над эмоциями. Разнообразный и богатый опыт говорит нам, что укрепление и развитие внутренней структуры в значительной степени обусловливает важность системы массового участия. </p>
        <p>Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены. С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта не даёт нам иного выбора, кроме определения приоретизации разума над эмоциями. Разнообразный и богатый опыт говорит нам, что укрепление и развитие внутренней структуры в значительной степени обусловливает важность системы массового участия. </p>
        <p>Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены. С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта не даёт нам иного выбора, кроме определения приоретизации разума над эмоциями. Разнообразный и богатый опыт говорит нам, что укрепление и развитие внутренней структуры в значительной степени обусловливает важность системы массового участия. </p>
        <ul>
          <li>Список</li>
          <li>Список</li>
          <li>Список</li>
          <li>Список</li>
        </ul>
        <p>Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены. С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта не даёт нам иного выбора, кроме определения приоретизации разума над эмоциями. Разнообразный и богатый опыт говорит нам, что укрепление и развитие внутренней структуры в значительной степени обусловливает важность системы массового участия. </p>
      </div>
      <blocks-main-articles title="Другие статьи"/>
      <blocks-main-form />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/style.scss';

.articles-dital-inner {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

.articles-dital-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%;
  margin: 20px auto 100px auto;
}

.articles-dital-title {
  @include body-60-medium;
  color: $dark-blue-subtitle;
  padding-bottom: 40px;
  padding-top: 100px;
}

.articles-dital-img {
  background: url('../../assets/images/articles/articles-dital.png');
  width: 100%;
  border-radius: 25px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 600px;
  position: relative;
}

.articles-dital-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  @include body-14-regular;
  color: $gray-text;
}

.articles-dital-box {
  display: flex;
  position: absolute;
  top: 93%;
  left: 20px;
  gap: 10px;

    &__item {
      @include body-12-regular;
      color: $hover;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.90);
      padding: 6px 10px 6px 10px;
    }
}

  @media (max-width: 1200px) {
    .articles-dital-title {
      padding-top: 40px;
    }
  }

  @media (max-width: 900px) {
    .articles-dital-inner {
      flex-direction: row-reverse;
      align-items: center;
      gap: 34px;
      width: 100%;
    }

    .articles-dital-title {
      font-size: 22px;
      width: 50%;
    }
    .articles-dital-img {
      width: 50%;
      height: 334px;
    }

    .articles-dital-box {
      top: 88%;
      left: 9px;
    }
}

  @media (max-width: 740px) {
    .articles-dital-inner {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }

    .articles-dital-title {
      padding: 0;
    }

    .articles-dital-img {
      width: 100%;
    }
    
  }

  @media (max-width: 650px) {
    .articles-dital-inner {
      gap: 30px;
    }
    .articles-dital-title {
      padding-top: 30px;
      line-height: unset;
    }
  }
</style>