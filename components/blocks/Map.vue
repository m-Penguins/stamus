<template>
  <div class="tabs">
    <div class="tabs-title" v-html="text"></div>
    <div class="tabs2">
      <div class="tabs-wrapper">
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
      </div>
    </div>
    <div class="tab-content">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        v-show="activeTab === index"
      >
        <div v-if="activeTab === index">
          <div class="tab-map">
            <div class="map-container">
              <client-only>
                <YandexMap
                  v-bind="config"
                  :coordinates="currentCoordinates"
                  :detailed-controls="detailedControls"
                  :controls="controls"
                  map-type="map"
                >
                  <YandexMarker
                    :coordinates="currentCoordinates"
                    :marker-id="123"
                  >
                  </YandexMarker>
                  <!-- <YmapMarker
              v-for="marker in tabs"
              :key="marker.id"
              :markerId="marker.id"
              v-bind="{
                icon: {
                  layout: 'default#image',
                  imageHref: icon,
                },
                ...marker
              }"
          /> -->
                </YandexMap>
              </client-only>
            </div>
            <elements-map-nav :info="tab" />
          </div>
          <!-- <img class="tab-map" :src="assetsStore.useAsset(`images/${tab.image}`)" alt=""> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAssets } from "../../stores/useAsset";
import {
  yandexMap,
  ymapMarker,
} from "vue-yandex-maps/dist/vue-yandex-maps.esm";
import icon from "../../assets/images/icons/Telegram-fill.svg";
const DEFAULT_CENTER = [55.75222, 37.61556]; //mskcenter
export default {
  components: { yandexMap, ymapMarker },
  props: {
    dataInfo: {
      type: Array,
    },
    text: {
      type: String,
      default: "",
    },
    config: {
      type: Object,
      default: () => ({
        settings: {
          apiKey: "b4ed0b4f-9710-4113-bfd7-ef2be1938fa2",
          lang: "ru_RU",
          coordorder: "latlong",
          version: "2.1",
        },
      }),
    },
  },
  data() {
    return {
      icon,
      activeTab: 0,
      scrollOffset: 0,
      tabs: [
        {
          name: "ул. Московская 140",
          image: "map.png",
          hours: "8:00 до 21:00",
          tel: "+7 (999) 888 - 77 - 66",
          email: "hakurate@stamus-info.ru",
          address: "Краснодар, ул. Московская 140",
          coordinates: [45.085805, 39.002218],
        },
        {
          name: "ул. Хакурате 34",
          image: "map.png",
          hours: "8:00 до 21:00",
          tel: "+7 (999) 888 - 77 - 66",
          email: "hakurate@stamus-info.ru",
          address: "Краснодар, ул. Хакурате 34",
          coordinates: [45.041031, 38.982473],
        },
        {
          name: "ул. Мачуги 1/1",
          image: "map.png",
          hours: "8:00 до 21:00",
          tel: "+7 (999) 888 - 77 - 66",
          email: "hakurate@stamus-info.ru",
          address: "Краснодар, ул. Мачуги 1/1",
          coordinates: [45.014403, 39.063016],
        },
        // {
        //   name: 'ул. Черкасская 17',
        //   image: 'map.png',
        //   hours: '8:00 до 21:00',
        //   tel: '+7 (999) 888 - 77 - 66',
        //   email:"hakurate@stamus-info.ru",
        //   address:"Краснодар, ул. Черкасская 17"
        // },
        {
          name: "ул. Гимназическая 85",
          image: "map.png",
          hours: "8:00 до 21:00",
          tel: "+7 (999) 888 - 77 - 66",
          email: "hakurate@stamus-info.ru",
          address: "Краснодар, ул. Гимназическая 85",
          coordinates: [45.024673, 38.975978],
        },
        {
          name: "Платановый бульвар 19/3",
          image: "map.png",
          hours: "8:00 до 21:00",
          tel: "+7 (999) 888 - 77 - 66",
          email: "hakurate@stamus-info.ru",
          address: "Краснодар, Платановый бульвар 19/3",
          coordinates: [45.033521, 38.909799],
        },
        // {
        //   name: 'ул. Средняя 1/3',
        //   image: 'map.png',
        //   hours: '8:00 до 21:00',
        //   tel: '+7 (999) 888 - 77 - 66',
        //   email:"hakurate@stamus-info.ru",
        //   address:"Краснодар, ул. Средняя 1/3"
        //   }
      ],
    };
  },
  computed: {
    currentCoordinates() {
      return this.tabs[this.activeTab].coordinates;
    },
  },
  methods: {
    scrollToTab(index) {
      const tabWidth = this.getTabWidth();
      this.scrollOffset = -index * tabWidth;
    },
    getTabWidth() {
      const tabsWrapperWidth = this.$refs.tabsWrapper.offsetWidth;
      const numTabs = this.tabs.length;
      return tabsWrapperWidth / numTabs;
    },
  },
  setup() {
    const assetsStore = useAssets();
    const coordinates = [45.085805, 39.002218];
    const controls = ["fullscreenControl"];
    const detailedControls = {
      zoomControl: { position: { right: 10, top: 50 } },
    };
    return {
      assetsStore,
      coordinates,
      controls,
      detailedControls,
      yandexMap,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";
.map-container {
  background-color: #f0f0f0;
  width: 100%;
  height: 500px;
}
.yandex-container {
  -webkit-filter: grayscale(100%);
  height: 100%;
  border-radius: 15px;
}

.ymaps-2-1-79-inner-panes {
  border-radius: 15px;
}
// .tabs2 {
//   width: 100%;
//   overflow-x: scroll;

//   .tabs-wrapper {
//     display: flex;
//     overflow-x: auto;

//     .tabs-list {
//       display: flex;
//       transition: transform 0.3s;
//     }

//     .tab {
//       cursor: pointer;
//     }
//   }
// }
.tabs-btn-base {
  display: none;
}
.tabs {
  width: 1280px;
  max-width: 100%;
  margin: 0 auto 100px;
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
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  max-width: 1280px;
  height: 500px;
  border-radius: 20px;
  position: relative;
}

button:focus::after,
button.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: $hover;
  transition: all 0.3s ease;
}

@media (max-width: 1000px) {
  .tab-map {
    background: none;
    height: 100%;
    margin-bottom: 100px;
  }
  .tabs-btn-base {
    display: flex;
    justify-content: center;
    padding: 27px 0 100px 0;
  }

  .tabs {
    margin: 0 auto;
  }

  .map-container {
    height: 300px !important;
  }
}

@media (max-width: 700px) {
  .tabs-btn-base {
    padding: 20px 0 80px 0;
  }
  .tab-map {
    margin-bottom: 80px;
  }
}
</style>
