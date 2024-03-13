<template>
  <ClientOnly>
    <div class="tabs">
      <div class="tabs-title">{{ block?.title ?? "Контакты" }}</div>
      <div class="tab-content">
        <div class="tab-map">
          <div class="map-container">
            <yandex-map
              v-model="map"
              :settings="{
                location: {
                  center: [38.982473, 45.081031],
                  zoom: 11.09,
                  duration: 1000,
                },
              }"
            >
              <yandex-map-default-scheme-layer
                :settings="{ theme, visible: true }"
              />
              <yandex-map-default-features-layer />
              <yandex-map-controls :settings="{ position: 'right' }">
                <yandex-map-zoom-control />
              </yandex-map-controls>
              <yandex-map-marker
                v-for="(marker, index) in tabs"
                :key="index"
                :settings="{
                  coordinates: marker?.coordinates,
                  onClick: () => {
                    map?.setLocation({
                      center: [
                        marker?.coordinates?.[0],
                        marker?.coordinates?.[1],
                      ],
                      zoom: 17,
                      duration: 1000,
                    });
                    activeTab = index;
                  },
                  zIndex: activeTab === index ? 1 : 0,
                }"
              >
                <img
                  :src="activeTab === index ? baloon : baloon1"
                  alt="logo"
                  :style="{
                    minWidth: '50px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    transform: 'translate(-50%, calc(-50% - 24px))',
                    cursor: 'pointer',
                  }"
                />
              </yandex-map-marker>
            </yandex-map>
          </div>
          <elements-map-nav :tab="tabs?.[activeTab]" />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import {
  YandexMap,
  YandexMapControls,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapMarker,
  YandexMapDefaultMarker,
  YandexMapZoomControl,
} from "vue-yandex-maps";
import baloon from "@/assets/images/icons/map_baloon.svg";
import baloon1 from "@/assets/images/icons/map_baloon1.svg";

const map = shallowRef(null);

defineProps(["block"]);

const theme = "light";

const activeTab = ref(0);

const baseDataStore = useBaseDataStore();

const tabs = baseDataStore.clinics?.data
  ?.map((el) => {
    const coords =
      el?.attributes?.coordx && el?.attributes?.coordy
        ? [el?.attributes?.coordx, el?.attributes?.coordy]
        : null;

    if (coords) {
      return {
        email: el?.attributes?.email,
        address: el?.attributes?.address,
        phone: el?.attributes?.phone,
        hours: el?.attributes?.working_time,
        coordinates: coords,
      };
    }
  })
  ?.filter(Boolean);
</script>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";

.map-marker-icon {
  width: 50px;
  height: 50px;
}
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
