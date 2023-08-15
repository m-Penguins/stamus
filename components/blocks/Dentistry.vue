<template>
  <div class="dentistry-wrapper">
    <div class="dentistry-container" :style="`background-image:url(${assetsStore.useAsset(`images/big-images/${imgBg}`)})`">
      <div class="dentistry-box">
      
        <!-- <elements-bread-crumbs :breadcrumbs="[
        {
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Детская стоматология',
          url: '/children-dentistry'
        }
        ]"/> -->
        <div class="mob">
          <img :src="assetsStore.useAsset(`images/big-images/${imgAdaptiv}`)"/>
        </div>
        <elements-title-text-button :title="title" :text="text" fontSize="true"/>
      </div>
    </div>
    <blocks-main-seo 
      :title="titleSeo"
      :text="textSeo"
      :img="imgSeo"      
    />
  </div>
  <blocks-about-important 
    :arrayText="textAboutImportantArray"
  />
  <blocks-services-block :addresData="addresData"/>
  <blocks-cases-direction :dataDirection="mockArrayDirection"/>
    <BlocksMainBanner 
      :title="'Счастливые часы'"
      :text="'Скидки до 50%'"
      :titleLink="'Воспользоваться акцией'"
      link="#"
      bgColor="dark-blue-gradient"
      img="tooth.png"
      bigImg=true
  />
  <blocks-our-specialists :data="data"/>
  <blocks-main-feedback />
  <blocks-map :dataInfo="infoData"/>
  <blocks-gallery />
  <blocks-main-form />
</template>

<script>
import { useAssets } from '../../stores/useAsset'
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      titleSeo: {
        type: String,
        default: ''
      },
      textSeo: {
        type: String,
        default: ''
      },
      imgSeo: {
        type: String,
        default: ''
      },
      dataDirection: {
        tpye: Array,
      },
      data: {
        tpye: Array,
      },
      infoData: {
        tpye: Array,
      },
      addresData: {
        tpye: Array,
      },
      imgBg: {
        type: String,
        default: ''
      },
      imgAdaptiv: {
        type: String,
        default: ''
      },
    },
    setup() {
      const assetsStore = useAssets();
      const textAboutImportantArray = [
        'Кариес не бывает «детским». Это инфекция, которая может распространиться на постоянные зубы, если не начать лечение молочных зубов',
        'Разрушенные зубы влияют на отношение детей в коллективе',
        'Молочные зубы у детей болят точно так же, как и постоянные у взрослых',
        'Разрушенные и отсутствующие зубы ведут к логопедическим дефектам (нарушается произносительная сторона речи ребенка) и к проблемам с прикусом'
      ]
    const mockArrayDirection = [
    {name: 'Название кейса', category: 'Взрослая стоматология', img:"avatar1.png", description:"Небольшое описание кейса. Сложности и проблемы, с которыми столкнулись" },
    {name: 'Название кейса', category: 'Взрослая стоматология', img:"avatar2.png", description:"Небольшое описание кейса. Сложности и проблемы, с которыми столкнулись" },
    {name: 'Название кейса', category: 'Взрослая стоматология', img:"avatar3.png", description:"Небольшое описание кейса. Сложности и проблемы, с которыми столкнулись" },
    {name: 'Название кейса', category: 'Взрослая стоматология', img:"avatar4.png", description:"Небольшое описание кейса. Сложности и проблемы, с которыми столкнулись" },
    ];
      return {
        assetsStore,
        textAboutImportantArray,
        mockArrayDirection
      }
    }
  }
</script>

<style scoped lang="scss">
@import '/assets/styles/style.scss';

.mob {
  display: none;
}

.dentistry-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1880px;
    max-width: 95%;
    margin: 20px auto 0 auto;
    border-radius: 45px;
}
.dentistry-container {
  width: 100%;
  height: 920px;
  border-radius: 45px;
  background-size: contain;
  background-repeat: no-repeat;
  margin-bottom: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.dentistry-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
}

  @media (max-width: 1577px) {
    .dentistry-box {
      margin-left: 80px;
    }
  }

  @media (max-width: 1920px) and (min-width: 1110px) {
    .dentistry-container {
      height: calc(500px + ((100vw - 1110px) * (420 / 810)));
    }
  }

  @media (max-width: 1110px) {
    .mob {
      display: flex;
      width: 60%;

        img {
          width: 100%;
        }
    }
    .dentistry-container {
      height: 100%;
      background: none !important;
    }

    .dentistry-box {
      margin-left: 0;
      gap: 34px;
    }
  }

    @media (max-width: 600px) {
    .dentistry-box {
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }

    .mob {
      width: 100%;
    }
  }

</style>