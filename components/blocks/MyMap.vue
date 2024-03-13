<template>
  <div class="tabs">
    <div class="tabs-title">{{ block?.title ?? "Контакты" }}</div>
    <div class="tab-content">
      <div class="tab-map">
        <div class="map-container">
          <client-only>
            <yandex-map
              :settings="settings"
              :coords="[45.085805, 39.002218]"
              :detailed-controls="detailedControls"
              :controls="controls"
              map-type="map"
              zoom="10"
            >
              <ymap-marker
                v-for="(item, index) in tabs"
                :key="item?.name"
                :coords="item?.coordinates"
                :marker-id="item?.name"
                @click="activeTab = index"
                :icon="activeTab === index ? iconActive : iconNotActive"
                :hint-content="item?.name"
              >
              </ymap-marker>
            </yandex-map>
          </client-only>
        </div>
        <elements-map-nav :info="tabs?.[activeTab]" />
      </div>
      <!-- <img class="tab-map" :src="assetsStore.useAsset(`images/${tab.image}`)" alt=""> -->
    </div>
  </div>
</template>

<script setup>
import baloon from "@/assets/images/icons/map_baloon.svg";
import baloon1 from "@/assets/images/icons/map_baloon1.svg";

defineProps(["block"]);

const activeTab = ref(0);

const iconActive = {
  layout: "default#image", // 'default#imageWithContent' для использования с контентом
  imageHref: baloon, // адрес изображения или data:image/svg+xml;base64
  imageSize: [43, 55], // размер иконки в px
  imageOffset: [-22, -55], // смещение иконки в px,
  /* Следующие поля актуальны для layout: 'default#imageWithContent' */
  content: "some content here", // содержимое контента
  contentOffset: [-22, -55], // смещение контента в px,
  contentLayout:
    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>', // строковый HTML шаблон для контента
};

const iconNotActive = {
  layout: "default#image", // 'default#imageWithContent' для использования с контентом
  imageHref: baloon1, // адрес изображения или data:image/svg+xml;base64
  imageSize: [43, 55], // размер иконки в px
  imageOffset: [-22, -55], // смещение иконки в px,
  /* Следующие поля актуальны для layout: 'default#imageWithContent' */
  content: "some content here", // содержимое контента
  contentOffset: [-22, -55], // смещение контента в px,
  contentLayout:
    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>', // строковый HTML шаблон для контента
};

const settings = {
  apiKey: "b4ed0b4f-9710-4113-bfd7-ef2be1938fa2",
  lang: "ru_RU",
  coordorder: "latlong",
  version: "2.1",
};

const tabs = [
  {
    name: "ул. Московская 140",
    hours: "8:00 до 21:00",
    tel: "+7 (999) 888 - 77 - 66",
    email: "hakurate@stamus-info.ru",
    address: "Краснодар, ул. Московская 140",
    coordinates: [45.085805, 39.002218],
  },
  {
    name: "ул. Хакурате 34",
    hours: "8:00 до 21:00",
    tel: "+7 (999) 888 - 77 - 66",
    email: "hakurate@stamus-info.ru",
    address: "Краснодар, ул. Хакурате 34",
    coordinates: [45.041031, 38.982473],
  },
  {
    name: "ул. Мачуги 1/1",
    hours: "8:00 до 21:00",
    tel: "+7 (999) 888 - 77 - 66",
    email: "hakurate@stamus-info.ru",
    address: "Краснодар, ул. Мачуги 1/1",
    coordinates: [45.014403, 39.063016],
  },
  // {
  //   name: 'ул. Черкасская 17',
  //   hours: '8:00 до 21:00',
  //   tel: '+7 (999) 888 - 77 - 66',
  //   email:"hakurate@stamus-info.ru",
  //   address:"Краснодар, ул. Черкасская 17"
  // },
  {
    name: "ул. Гимназическая 85",
    hours: "8:00 до 21:00",
    tel: "+7 (999) 888 - 77 - 66",
    email: "hakurate@stamus-info.ru",
    address: "Краснодар, ул. Гимназическая 85",
    coordinates: [45.024673, 38.975978],
  },
  {
    name: "Платановый бульвар 19/3",
    hours: "8:00 до 21:00",
    tel: "+7 (999) 888 - 77 - 66",
    email: "hakurate@stamus-info.ru",
    address: "Краснодар, Платановый бульвар 19/3",
    coordinates: [45.033521, 38.909799],
  },
  // {
  //   name: 'ул. Средняя 1/3',
  //   hours: '8:00 до 21:00',
  //   tel: '+7 (999) 888 - 77 - 66',
  //   email:"hakurate@stamus-info.ru",
  //   address:"Краснодар, ул. Средняя 1/3"
  //   }
];

const assetsStore = useAssets();
const coordinates = [45.085805, 39.002218];
const controls = ["fullscreenControl"];
const detailedControls = {
  zoomControl: { position: { right: 10, top: 50 } },
};
</script>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";
.map-container {
  background-color: #f0f0f0;
  width: 100%;
  height: 500px;
}
.ymap-container {
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
