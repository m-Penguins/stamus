<template>
  <div class="contacts-page">
    <div class="contacts-page-wrap">
      <elements-bread-crumbs :breadcrumbs="breadcrumbs"/>
      <div class="contacts-page-title">
        Контакты
      </div>
      <div class="contacts-page-text">
        Сети клиник “Стамус”
      </div>
      <blocks-video-block 
        :title="titleVideo" 
        :text="textVideo"
        :isContactsBlock=true
      />
      <blocks-map :dataInfo="infoData" text="Информация о клиниках"/>
      <blocks-documentation-block :cards="mockArrayDocumentationCard"/>
      <blocks-main-form />
    </div>
  </div>
</template>


<script>
import { mockArrayDocumentationCard } from '../../stores/mockData';
  export default {
    props: {
      titleVideo: {
        type: String,
        default: 'Единый колл-центр'
      },
      textVideo: {
        type: String,
        default: 'Небольшое описание в несколько строчек'
      },
    },
    setup() {
      const breadcrumbs = [{
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Контакты',
          url: '/contacts'
        }]
      return {
        breadcrumbs,
        mockArrayDocumentationCard
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/style.scss';

.contacts-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  max-width: 100%;
  margin: 20px auto 0 auto;
}

.contacts-page-wrap {
  width: 100%;
}

.contacts-page-title {
  @include body-60-medium;
  color: $dark-blue-subtitle;
  padding: 90px 0 30px;
}

.contacts-page-text {
  @include body-20-regular;
  color: $gray-text;
  padding-bottom: 100px;
}

@media (max-width: 1201px) {
.contacts-page-title {
  padding: 50px 0 100px;
  }
}

@media (max-width: 904px) {
  .contacts-page-title {
    font-size: 22px;
    line-height: normal;
    padding: 10px 0 30px;
  }

  .contacts-page-text {
    font-size: 16px;
  }
}

@media (max-width: 676px) {
  .contacts-page-title {
    padding: 10px 0 30px;
  }
  .contacts-page-text {
    padding: 0 0 60px;
  }
}
</style>