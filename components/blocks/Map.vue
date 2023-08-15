<template>
  <div class="tabs">
    <div class="tabs-title">Контакты</div>
    <div class="tabs-container">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
        class="tabs-btn header-nav-item"
      >
        {{ tab.name }}
      </button>
    </div>
    <div class="tab-content">
      <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index">
        <div v-if="activeTab === index">
          <div class="tab-map">
            <elements-map-nav :info="tab"/>
          </div>
          <!-- <img class="tab-map" :src="assetsStore.useAsset(`images/${tab.image}`)" alt=""> -->
        </div>
      </div>
    </div>
    <div class="tabs-btn-base">
      <elements-button-base title="Смотреть на карте" :arrow="true"/>
    </div>
  </div> 
</template>

<script>
import { useAssets } from '../../stores/useAsset';
export default {
  props: {
      dataInfo: {
        tpye: Array,
      },
    },
  data() {
    return {
      activeTab: 0,
      tabs: [
        {
          name: 'ул. Московская 140',
          image: 'map.png',
          hours: '8:00 до 21:00', 
          tel: '+7 (999) 888 - 77 - 66', 
          email:"hakurate@stamus-info.ru", 
          address:"Краснодар, ул. Московская 140"
        },
        {
          name: 'ул. Хакурате 34',
          image: 'map.png',
          hours: '8:00 до 21:00', 
          tel: '+7 (999) 888 - 77 - 66', 
          email:"hakurate@stamus-info.ru", 
          address:"Краснодар, ул. Хакурате 34" 
        },
        {
          name: 'ул. Мачуги 1/1',
          image: 'map.png',
          hours: '8:00 до 21:00', 
          tel: '+7 (999) 888 - 77 - 66', 
          email:"hakurate@stamus-info.ru", 
          address:"Краснодар, ул. Мачуги 1/1"
        },
        {
          name: 'ул. Черкасская 17',
          image: 'map.png',
          hours: '8:00 до 21:00', 
          tel: '+7 (999) 888 - 77 - 66', 
          email:"hakurate@stamus-info.ru", 
          address:"Краснодар, ул. Черкасская 17"
        },
        {
          name: 'ул. Гимназическая 85',
          image: 'map.png',
          hours: '8:00 до 21:00', 
          tel: '+7 (999) 888 - 77 - 66', 
          email:"hakurate@stamus-info.ru", 
          address:"Краснодар, ул. Гимназическая 85"
        },
        {
          name: 'Платановый бульвар 19/3',
          image: 'map.png',
          hours: '8:00 до 21:00', 
          tel: '+7 (999) 888 - 77 - 66', 
          email:"hakurate@stamus-info.ru", 
          address:"Краснодар, Платановый бульвар 19/3"
        },
        {
          name: 'ул. Средняя 1/3',
          image: 'map.png',
          hours: '8:00 до 21:00', 
          tel: '+7 (999) 888 - 77 - 66', 
          email:"hakurate@stamus-info.ru", 
          address:"Краснодар, ул. Средняя 1/3"
          }
        ]
    }
  },
    setup() {
    const assetsStore = useAssets();
    return {
      assetsStore,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/styles/style.scss';
.tabs-btn-base {
  display: none;
}
.tabs {
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
  padding: 50px 0;
}

.tabs-title {
  padding-bottom: 30px;
  @include body-22-medium-Neue;
  color: black;
}

.tabs-container::-webkit-scrollbar {
    display: none;
}

.tabs-container {
  display: flex;
  padding-bottom: 22px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  button {
    border: none;
    background-color: transparent;
    margin-right: 20px;
    cursor: pointer;
  }
}

.tab-content {
  position: relative;
}

.tab-map {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  max-width: 1280px;
  height: 40vh;
  border-radius: 20px;
  background-image: url('../../assets/images/map.png');
  position: relative;
}

button:focus::after,
button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: $hover;
  transition: all .3s ease;
}

  @media (max-width: 1000px) {
    .tab-map {
      background: none;
      height: 100%;
    }
    .tabs-btn-base {
      display: flex;
      justify-content: center;
      padding: 27px 0 100px 0;
    }
}

  @media (max-width: 700px) {
    .tabs-btn-base {
      padding: 20px 0 80px 0;
    }
}
</style>