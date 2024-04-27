<script>
import { useService } from "../stores/services.js";
import { useAssets } from "../stores/useAsset";
import ButtonBase from "./elements/Button-base.vue";
import { useActuveLink } from "../stores/activeLink";
import ElementsLinkWithArrow from "./elements/ElementsLinkWithArrow.vue";
export default {
  components: { ButtonBase, ElementsLinkWithArrow },
  props: {
    showMenuPatients: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
  },
  data() {
    return {
      showServices: false,
      showSearch: false,
      showMenuMob: false,
      categories: false,
      firstBlockMobMenu: true,
      secondBlockMobMenu: false,
      thirdBlockMobMenu: false,
      // showMenuPatients: false,
      // directionTitle: '',
      activeDirection: "",
      activeClass: "",
      showServicesAll: false,
      storeS: useService(),
      navigationPatients: [
        { id: 1, title: "Клиники", path: "/clinics" },
        { id: 2, title: "Наше приложение", path: "/stamusapp" },
        { id: 3, title: "Корпоративным клиентам", path: "/business" },
        { id: 4, title: "Информация для пациентов", path: "/info" },
        { id: 5, title: "Налоговый вычет", path: "/nalog-vichet" },
        { id: 6, title: "Статьи", path: "/articles" },
      ],
    };
  },
  mounted() {
    this.activeClass = this.storeS.getStateService?.[0]?.id;
  },
  methods: {
    openModal() {
      this.$refs.modal.openModal("Modal Title", "Modal Message");
    },

    toggleMenu() {
      this.$emit("toggleMenu");
    },

    closeMenu(event) {
      if (event.target.classList.contains("modal-menu")) {
        this.showServices = false;
        // this.showMenuPatients = false;
        this.showSearch = false;
      }
    },

    changeActiveClass(cls, title) {
      this.activeClass = cls;
      this.activeDirection = title;
    },

    closeSearch() {
      this.showSearch = false;
    },
  },
  setup() {
    const assetsStore = useAssets();
    const storeServices = useService();
    const router = useRouter();
    const route = useRoute();
    const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
    const directionTitle = ref("");
    let activeClass2 = "";
    const modalStore = useModalStore();

    const togglerPopup = (state) => {
      isOpenPopup.value = state;
    };

    const defaultServices = () => {
      activeClass2 = storeServices.getStateService[0];
    };

    const toggleServices = (direction) => {
      storeServices.getStateService.forEach((dir) => {
        dir.directions.forEach((dir2) => {
          dir2.showServices = false;
        });
        direction.showServices = true;
        directionTitle.value = direction.title;
      });
    };

    const store = useActuveLink();
    const isOpenPopup = ref(false);
    const navigation = [
      { title: "Врачи", path: "/team" },
      { title: "Пациентам", path: "" },
      { title: "Отзывы", path: "/reviews" },

      { title: "Акции и скидки", path: "/discounts" },
      { title: "Портфолио", path: "/portfolio" },
      { title: "Цены", path: "/prices" },
      { title: "Контакты", path: "/contacts" },
    ];

    return {
      assetsStore,
      navigation,
      route,
      isOpenPopup,
      togglerPopup,
      store,
      storeServices,
      toggleServices,
      directionTitle,
      activeClass2,
      defaultServices,
      router,
      modalStore,
    };
  },
};
</script>

<template>
  <header
    :class="showServices || showSearch ? 'showServicesHeader' : ''"
    @click="closeMenu"
    class="modal-menu"
  >
    <div
      :class="[
        showServices || showSearch ? 'header-services' : '',
        showMenuMob ? 'header-menu-mob' : '',
        'header',
      ]"
    >
      <div class="header-wrap">
        <div class="header-logo">
          <NuxtLink
            :to="'/'"
            :exact="true"
            active-class="active"
            @click="
              showServices = false;
              showSearch = false;
              showMenuPatients = false;
              showMenuMob = false;
            "
          >
            <img
              style="width: 59px; height: 34px"
              :src="assetsStore.useAsset('images/icons/logo.svg')"
              alt="Logo"
            />
          </NuxtLink>
        </div>
        <div class="header-nav">
          <nav>
            <ul class="header-nav-list">
              <li class="first-item">
                <div
                  class="header-services-img m-r-20"
                  @click="
                    showServices = !showServices;
                    defaultServices();
                    showSearch = false;
                    showMenuPatients = false;
                  "
                  :class="{ 'active-btn-services': showServices === true }"
                >
                  <img
                    v-if="!showServices"
                    src="../assets/images/icons/burger.svg"
                    alt="burger"
                  />
                  <img
                    v-else
                    src="../assets/images/icons/burger-close.svg"
                    alt="burger-close"
                  />
                  <p>Услуги</p>
                </div>
              </li>
              <li v-for="item in navigation" :key="item.title">
                <NuxtLink
                  active-class="active-link"
                  @click="
                    showServices = false;
                    showSearch = false;
                  "
                  class="header-nav-item m-r-20"
                  :to="item.path"
                >
                  <div
                    v-if="item.title !== 'Пациентам'"
                    @click="showMenuPatients = false"
                  >
                    {{ item.title }}
                  </div>
                  <div
                    v-else
                    class="header-arrow-icon"
                    @click="
                      showSearch = false;
                      showServices = false;
                      toggleMenu();
                    "
                  >
                    <div>{{ item.title }}</div>
                    <div v-if="item.title === 'Пациентам'" class="arrow-icon">
                      <div v-if="!showMenuPatients" class="timeline-svg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M6 8L10 12L14 8"
                            stroke="#7F838C"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div v-else class="timeline-svg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M6 12L10 8L14 12"
                            stroke="#232D5B"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div v-if="showMenuPatients" class="menu-patients">
                      <ul class="menu-patients-list">
                        <NuxtLink
                          v-for="(elem, index) in navigationPatients"
                          :key="elem"
                          :to="elem.path"
                          class="menu-patients-items"
                          @click="showMenuPatients = false"
                        >
                          <li class="menu-patients-items-link">
                            <div>
                              {{ elem.title }}
                            </div>
                            <hr
                              class="menu-patients-line"
                              v-if="index < navigationPatients.length - 1"
                            />
                          </li>
                        </NuxtLink>
                      </ul>
                    </div>
                  </div>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  target="_blank"
                  class="footer-text header-nav-item"
                  :to="`tel:+${phone?.replace(/\D/g, '')}`"
                >
                  {{ phone }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
          <div class="header-btn-base">
            <div
              class="header-search-img"
              @click="
                showSearch = !showSearch;
                showServices = false;
                showMenuPatients = false;
              "
            >
              <!-- <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect class="header-search-svg" width="30" height="30" rx="5" opacity="0.95"/>
              <path d="M14.3333 20.1667C17.555 20.1667 20.1667 17.555 20.1667 14.3333C20.1667 11.1117 17.555 8.5 14.3333 8.5C11.1117 8.5 8.5 11.1117 8.5 14.3333C8.5 17.555 11.1117 20.1667 14.3333 20.1667Z" stroke="#525660" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21.5 21.5L18.5 18.5" stroke="#525660" stroke-linecap="round" stroke-linejoin="round"/>
              </svg> -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M14.3333 20.1667C17.555 20.1667 20.1667 17.555 20.1667 14.3333C20.1667 11.1117 17.555 8.5 14.3333 8.5C11.1117 8.5 8.5 11.1117 8.5 14.3333C8.5 17.555 11.1117 20.1667 14.3333 20.1667Z"
                  stroke="#525660"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21.5 21.5L18.5 18.5"
                  stroke="#525660"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <button-base
              @click="
                isOpenPopup = true;
                showSearch = false;
                showServices = false;
                showMenuPatients = false;
                modalStore.openModal();
              "
              title="Перезвоните мне"
            />
          </div>
        </div>
        <div class="header-menu">
          <div
            class="header-search-img"
            @click="
              showSearch = !showSearch;
              showServices = false;
              showMenuMob = false;
            "
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                class="header-search-svg"
                width="30"
                height="30"
                rx="5"
                opacity="0.5"
                fill="white"
              />
              <path
                d="M14.3333 20.1667C17.555 20.1667 20.1667 17.555 20.1667 14.3333C20.1667 11.1117 17.555 8.5 14.3333 8.5C11.1117 8.5 8.5 11.1117 8.5 14.3333C8.5 17.555 11.1117 20.1667 14.3333 20.1667Z"
                stroke="#525660"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.5 21.5L18.5 18.5"
                stroke="#525660"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="first-item">
            <div
              class="header-services-img"
              @click="
                showMenuMob = !showMenuMob;
                showSearch = false;
              "
              :class="{ 'active-btn-services': showMenuMob === true }"
            >
              <img
                v-if="!showMenuMob"
                src="../assets/images/icons/burger.svg"
                alt="burger"
              />
              <img
                v-else
                src="../assets/images/icons/burger-close.svg"
                alt="burger-close"
              />
              <p>Меню</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Услуги модалка-->
      <div v-if="showServices" class="header-services-menu">
        <hr class="hr-header" />
        <div class="header-services-menu-container">
          <div class="header-services-menu-list">
            <div
              v-for="navigationService in storeServices.getStateService"
              :key="navigationService.id"
              class="header-services-menu-item"
              @mouseover="
                changeActiveClass(navigationService.id, navigationService)
              "
            >
              <div
                :class="{
                  'active-directions-line':
                    navigationService.id === activeClass ||
                    (activeClass === '' && navigationService.id === 1),
                }"
                class="a2"
              ></div>
              <NuxtLink
                @click="
                  showServices = false;
                  showSearch = false;
                "
                class="header-nav-item-without-after m-r-20"
                :to="`${navigationService.path}`"
              >
                {{ navigationService.title }}
              </NuxtLink>
            </div>
          </div>
          <ul class="header-services-menu-inner">
            <div
              v-for="item in storeServices.getStateService"
              :key="item.id"
              :class="{
                'active-directions':
                  item.id === activeClass ||
                  (activeClass === '' && item.id === 1),
              }"
              class="a2"
            >
              <li
                v-for="direction in item.directions"
                :key="direction.id"
                class="cursor-pointer"
              >
                <div
                  class="header-services-menu-text"
                  :class="{
                    'active-serv':
                      direction.showServices === true ||
                      (activeClass === '' && item.id === 1),
                  }"
                  @click="toggleServices(direction)"
                >
                  {{ direction.title }}
                </div>
                <ul
                  v-if="
                    direction.showServices ||
                    (activeClass === '' && item.id === 1)
                  "
                  class="header-services-menu-box"
                >
                  <div class="header-services-menu-box-title">
                    {{ direction.title }}:
                  </div>
                  <div class="header-services-menu-box-items">
                    <li
                      class="header-services-menu-text"
                      v-for="(service, id) in direction.services"
                      :key="service"
                    >
                      <NuxtLink
                        @click="
                          showServices = false;
                          showSearch = false;
                        "
                        class="header-services-menu-box-link"
                        :to="item?.path + service?.path"
                      >
                        {{ service.title }}
                      </NuxtLink>
                    </li>
                  </div>
                </ul>
              </li>
            </div>
          </ul>
          <hr class="vertical-line" />
        </div>
      </div>
      <!-- Search модалка-->
      <div v-show="showSearch" class="header-services-menu">
        <hr class="hr-header" />
        <div>
          <elements-input-search
            class="elements-input-search"
            placeholder="Введите запрос"
            @enterPressed="closeSearch"
          />
        </div>
      </div>
      <!-- Menu модалка mob-->
      <div v-show="showMenuMob" class="header-services-menu">
        <hr class="hr-header" />
        <!-- Первая страница-->
        <ul
          class="header-nav-list"
          :class="{ 'display-none': !firstBlockMobMenu }"
        >
          <NuxtLink
            target="_blank"
            class="header-nav-item-mob p-t-20"
            :to="`tel:+${phone?.replace(/\D/g, '')}`"
          >
            {{ phone }}
          </NuxtLink>
          <div
            :class="showMenuPatients ? 'menu-mob-modal-flex' : 'menu-mob-modal'"
          >
            <li v-for="item in navigation" :key="item.title">
              <NuxtLink
                active-class="active-link"
                @click="
                  showServices = false;
                  showSearch = false;
                "
                class="header-nav-item-mob m-r-20"
                :to="item.path"
              >
                <div
                  v-if="item.title !== 'Пациентам'"
                  @click="
                    showMenuPatients = false;
                    showMenuMob = false;
                  "
                >
                  {{ item.title }}
                </div>
                <div
                  v-else
                  @click="
                    showMenuPatients = !showMenuPatients;
                    showSearch = false;
                    showServices = false;
                  "
                  class="menu-mob-first-block"
                >
                  <div class="menu-patients-container">
                    <div class="p-bt-14">{{ item.title }}</div>
                    <div v-if="item.title === 'Пациентам'" class="arrow-icon">
                      <div v-if="!showMenuPatients" class="timeline-svg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M6 8L10 12L14 8"
                            stroke="#7F838C"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div v-else class="timeline-svg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M6 12L10 8L14 12"
                            stroke="#232D5B"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div v-if="showMenuPatients">
                    <ul class="menu-patients-list-mob">
                      <NuxtLink
                        v-for="elem in navigationPatients"
                        @click="showMenuMob = false"
                        :key="elem"
                        :to="elem.path"
                        class="menu-patients-items-mob"
                      >
                        <li>
                          <div>{{ elem.title }}</div>
                          <!-- <hr class="menu-patients-line" v-if="index < navigationPatients.length - 1"/> -->
                        </li>
                      </NuxtLink>
                    </ul>
                  </div>
                </div>
              </NuxtLink>
            </li>
          </div>
          <div class="header-services-menu-mob">
            <div class="header-services-menu-mob-title">Услуги</div>
            <div class="header-services-menu-mob-container">
              <div
                v-for="item in storeServices.getStateService"
                :key="item?.id"
                class="header-services-menu-item-mob"
                @click="
                  changeActiveClass(item?.id, item);
                  secondBlockMobMenu = true;
                  firstBlockMobMenu = false;
                "
                :class="{ 'display-none': secondBlockMobMenu }"
              >
                <div class="header-nav-item-mob m-r-20">
                  {{ item?.title }}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M8 14L12 10L8 6"
                    stroke="#7F838C"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="header-services-menu-mob-btn">
            <button-base
              @click="
                isOpenPopup = true;
                showSearch = false;
                showServices = false;
                showMenuPatients = false;
                modalStore.openModal();
              "
              title="Перезвоните мне"
              class="header-services-menu-mob-button"
            />
          </div>
        </ul>
        <!-- Вторая страница-->
        <div v-show="secondBlockMobMenu">
          <div class="header-services-menu-mob-breadCrumbs">
            <p
              @click="
                secondBlockMobMenu = false;
                firstBlockMobMenu = true;
              "
              class="breadCrumbs-first-text"
            >
              Услуги
            </p>
            <p class="breadCrumbs-slash">/</p>
            <p class="breadCrumbs-second-text">{{ activeDirection?.title }}</p>
          </div>
          <div class="menu-mob-second-block-title">
            {{ activeDirection?.title }}
          </div>
          <div
            v-for="item in storeServices.getStateService"
            :key="item.id"
            class="menu-mob-second-block-container"
          >
            <div
              :class="{ 'active-directions': item.id === activeClass }"
              class="a2"
              v-for="direction in item.directions"
              :key="direction.id"
            >
              <div
                class="header-services-menu-item-mob"
                @click="
                  toggleServices(direction);
                  thirdBlockMobMenu = true;
                  secondBlockMobMenu = false;
                  firstBlockMobMenu = false;
                "
              >
                <div class="header-services-menu-text header-nav-item-mob">
                  {{ direction.title }}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M8 14L12 10L8 6"
                    stroke="#7F838C"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div @click="showMenuMob = false" class="header-menu-mob-second-link">
            <elements-link-with-arrow
              type="type"
              title="На страницу раздела"
              :link="activeDirection?.path"
            />
          </div>
        </div>
        <!-- Третья страница-->
        <div v-show="thirdBlockMobMenu">
          <div class="header-services-menu-mob-breadCrumbs">
            <p
              class="breadCrumbs-first-text"
              @click="
                firstBlockMobMenu = true;
                secondBlockMobMenu = false;
                thirdBlockMobMenu = false;
              "
            >
              Услуги
            </p>
            <p class="breadCrumbs-slash">/</p>
            <p
              class="breadCrumbs-first-text"
              @click="
                secondBlockMobMenu = true;
                firstBlockMobMenu = false;
                thirdBlockMobMenu = false;
              "
            >
              {{ activeDirection?.title }}
            </p>
            <p class="breadCrumbs-slash">/</p>
            <p class="breadCrumbs-second-text">{{ directionTitle }}</p>
          </div>
          <div class="menu-mob-second-block-title">{{ directionTitle }}</div>
          <div v-for="(item, id) in storeServices.getStateService" :key="id">
            <div
              :class="{ 'active-directions': item.id === activeClass }"
              class="a2"
              v-for="direction in item.directions"
              :key="direction.id"
            >
              <div v-if="direction.showServices" class="menu-mob-third-block">
                <div
                  v-for="(service, id) in direction.services"
                  :key="service"
                  class="header-services-menu-text header-nav-item"
                >
                  <NuxtLink
                    @click="
                      showServices = false;
                      showSearch = false;
                      secondBlockMobMenu = false;
                      showMenuMob = false;
                      thirdBlockMobMenu = false;
                      firstBlockMobMenu = true;
                      $router.push(item.path + service.path);
                    "
                    class="header-services-menu-box-link"
                    to="#"
                  >
                    {{ service.title }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@import "/assets/styles/style.scss";

.menu-mob-modal {
  display: grid;
  grid-gap: 18px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 15px 15px 15px 15px;
  grid-auto-flow: column;
  padding: 20px 0 60px;
}

.menu-mob-modal-flex {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 281px;
  flex-wrap: wrap;
  padding: 20px 0 60px;
}

.menu-patients {
  position: absolute;
  top: 54px;
  left: -76px;
  border-radius: 15px;
  border: 1px solid #f0f0f0;
  background: var(--white, #fff);
  z-index: 999;
  padding: 10px;
  width: 252px;
}

.menu-patients-container {
  display: flex;
}

.menu-patients-list-mob {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-patients-items-mob {
  @include body-14-regular;
  color: $placeholder;
}

.menu-patients-list {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.menu-patients-items {
  width: 100%;
  @include body-14-regular;
  color: $gray-text;

  div {
    padding: 10px;
    width: 100%;
    &:hover {
      border-radius: 5px;
      background: #f0f0f0;
      color: #232d5b;
    }
  }
}

.menu-patients-line {
  margin: 4px 0 4px;
  width: auto;
  border: 0;
  height: 0;
  border-bottom: 1px solid #e9e9e9;
}

.header-services-menu-mob {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.header-services-menu-mob-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.header-services-menu-mob-breadCrumbs {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 20px 0 40px;

  overflow-x: clip;
}

.breadCrumbs-first-text {
  @include body-12-regular;
  color: $gray-text;
  cursor: pointer;
}

.breadCrumbs-slash {
  color: #7f838c;
  opacity: 0.7;
  font-size: 10px;
}

.breadCrumbs-second-text {
  @include body-12-regular;
  color: $placeholder;
  cursor: pointer;
}

.menu-mob-second-block-title {
  padding-bottom: 24px;
  @include body-16-regular;
  color: $dark-blue-subtitle;
}

.menu-mob-second-block-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.header-menu-mob-second-link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.header-arrow-icon {
  display: flex;
  align-items: center;
  position: relative;

  &:hover {
    .menu-patients {
      display: flex;
    }
  }
}

.arrow-icon {
  width: 20px;
  height: 20px;
}

.a2 {
  display: none;
}

.display-none {
  display: none !important;
  border: none !important;
}

.header-btn-base {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-search-img {
  cursor: pointer;
}

.header-search-svg {
  &:hover {
    fill: #f0f0f0;
    opacity: 1;
  }
}

.elements-input-search {
  width: 100% !important;
  margin: 30px 0 16px;
}

.hr-header {
  margin-top: 20px;
  width: auto;
  border: 0;
  height: 0;
  border-bottom: 1px solid #e9e9e9;
}

.header-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.active-directions {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.active-btn-services {
  border-radius: 5px;
  background: #232d5b;

  p {
    color: #fff;
  }

  &:hover {
    background: #232d5b !important;
  }
}

.active-link {
  color: #101944;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.5px;
    background-color: $click;
    transition: all 0.3s ease;
  }
}

.header-menu {
  display: none;
}
.header {
  width: 1280px;
  padding: 14px 31px;
  max-width: 95%;
  align-items: center;
  position: fixed;
  left: calc(50% - 640px);
  margin: 0 auto;
  top: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 5px 5px 45px -5px rgba(30, 32, 40, 0.08);
  z-index: 900;

  .header-logo {
    margin-right: 45px;
    display: flex;
    align-items: center;
  }

  .header-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 92%;
    width: 100%;

    .header-nav-list {
      display: flex;
      align-items: center;
    }
  }
}

.first-item {
  display: flex;
  .header-services-img {
    display: flex;
    padding: 6px 8px;
    @include body-14-regular;
    color: $gray-text;
    transition: all 0.3s ease-in-out, opacity 0.3s ease-in-out;
    cursor: pointer;

    img {
      margin-right: 7px;
    }
  }
  .header-services-img:hover {
    border-radius: 5px;
    background: #f0f0f0;
    padding: 6px 8px;
  }
}

.showServicesHeader {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: 0.3s;
  background-color: rgba(0, 0, 0, 0.6);
  visibility: visible;
  opacity: 1;
  z-index: 901;
}

.header-services {
  padding: 14px 31px 0px;
  background: #fff;
}

.header-services-menu-container {
  display: flex;
}

.menu-mob-third-block {
  display: flex;
  flex-direction: column;
  gap: 14px;

  div {
    color: #7f838c;
    width: fit-content;
  }
}

.header-services-menu-list {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  padding: 20px 60px 14px 0;
}

.header-services-menu-item {
  max-width: 100%;
  width: 271px;
  border-radius: 10px;
  border: 1px solid var(--stroke, #e9e9e9);
  display: flex;
  padding: 14px 20px;
  align-items: center;
  gap: 10px;
  position: relative;
  cursor: pointer;

  &:hover {
    border: 1px solid var(--dissabled, #cfd5e1);
  }
  &:hover a {
    color: $hover;
  }
}

.header-services-menu-item-mob {
  max-width: 100%;
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--stroke, #f5f5f5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  align-items: center;
  gap: 10px;
  position: relative;
  cursor: pointer;

  &:hover {
    border: 1px solid var(--dissabled, #cfd5e1);
  }
  &:hover a {
    color: $hover;
  }
}

.header-services-menu-mob-title {
  @include body-12-regular;
  color: $placeholder;
}

.header-services-menu-box {
  position: absolute;
  top: 108px;
  left: 725px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header-services-menu-box-title {
  @include body-14-medium;
  color: $hover;
}

.header-services-menu-box-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 255px;
  flex-wrap: wrap;
}

.header-services-menu-mob-btn {
  padding: 40px;
}

.header-services-menu-mob-button {
  margin: 0 auto;
}

.header-services-menu-text {
  @include body-14-regular;
  color: $placeholder;
  cursor: pointer;
  position: relative;
  width: fit-content;
}

.header-services-menu-inner {
  width: 266px;
  padding: 20px 0;
}

.vertical-line {
  margin: 0 90px 0 0;
  width: 0;
  border: 0;
  height: auto;
  border-right: 1px solid #e9e9e9;
}

.active-directions-line {
  display: block;
  border-radius: 0px 15px 16px 0px;
  background: var(--accent, #232d5b);
  width: 3px;
  height: 24px;
  position: absolute;
  left: -1px;
  top: 13px;
}

.header-services-menu-box-link {
  @include body-14-regular;
  color: $placeholder;
  cursor: pointer;

  &:hover {
    color: #232d5b;
  }
}

.active-serv {
  color: #101944;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.5px;
    background-color: $click;
    transition: all 0.3s ease;
  }
}

@media (max-width: 1357px) {
  .header-menu-mob {
    height: 100%;
  }
  .header {
    justify-content: space-between;
    width: 100%;
    max-width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    border-radius: 0;
    padding: 22px 31px;
    overflow-x: scroll;
    white-space: nowrap;
    .header-nav {
      display: none;
    }
  }
  .header::-webkit-scrollbar {
    display: none;
  }
  .header-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  // .header-services-menu {
  //   background-color: salmon;
  // }
}

@media (max-width: 650px) {
  .header {
    padding: 22px 16px;
  }
  .menu-mob-modal,
  .menu-mob-first-block {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .menu-mob-modal-flex {
    height: auto;
  }

  .p-bt-14 {
    padding-bottom: 0 !important;
  }
}
</style>
