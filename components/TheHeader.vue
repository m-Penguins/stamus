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
      scrolled: false,
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
    const base = useBaseDataStore();
    const router = useRouter();
    const route = useRoute();
    const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
    const directionTitle = ref("");
    let activeClass2 = "";
    const modalStore = useModalStore();
    const scrolled = ref(false);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        scrolled.value = true;
      } else {
        scrolled.value = false;
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    const activeItem = ref(null);
    const activeDirection = ref(null);

    const handleFirstClick = (itemId) => {
      if (activeItem.value == itemId) {
        activeItem.value = null;
        activeDirection.value = null;
      } else {
        activeItem.value = itemId;
      }
    };
    const handleSecondClick = (itemId, directionId) => {
      if (activeDirection.value == directionId) {
        activeDirection.value = null;
      } else {
        activeItem.value = itemId;
        activeDirection.value = directionId;
      }
    };

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

    const handleServiceChange = ({id}) => {
      router.push(`/clinics/${id}`)
    }

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
      scrolled,
      storeServices,
      handleFirstClick,
      activeItem,
      activeDirection,
      handleSecondClick,
      toggleServices,
      directionTitle,
      activeClass2,
      base,
      defaultServices,
      router,
      modalStore,
      handleServiceChange,
    };
  },
};
</script>

<template>
  <div class="header-additional">
    <div class="header-additional__select">
      <p>{{ base.clinics.data.length }} клиник в Краснодаре:</p>
      <elements-custom-select-menu
        :options="base.clinics.data"
        label="Выберите клинику"
        class="select"
        @select="handleServiceChange"
        :selectedId="base.clinics.data"
      />
    </div>
    <div class="header-additional__time">
      <li>Ежедневно 09:00 – 21:00</li>
    </div>
    <a
      :href="'tel:' + base.footerData.data.attributes.phone.replace(/-/g, '')"
      class="header-additional__phone"
    >
      <svg
        width="10"
        height="15"
        viewBox="0 0 10 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.18149 1.12677L2.89949 0.897435C3.57149 0.682768 4.29016 1.0301 4.57816 1.70877L5.15149 3.06077C5.40149 3.64944 5.26282 4.3421 4.80882 4.77277L3.54682 5.97144C3.62482 6.68877 3.86549 7.39477 4.26949 8.08944C4.65338 8.76156 5.1682 9.34983 5.78349 9.81944L7.30082 9.31277C7.87549 9.12144 8.50149 9.3421 8.85416 9.8601L9.67549 11.0668C10.0862 11.6694 10.0122 12.5001 9.50349 13.0108L8.95816 13.5581C8.41549 14.1028 7.64082 14.3008 6.92349 14.0768C5.23082 13.5488 3.67482 11.9814 2.25482 9.37477C0.832823 6.7641 0.33149 4.5481 0.74949 2.72943C0.92549 1.9641 1.47082 1.3541 2.18282 1.12677H2.18149Z"
          fill="#232D5B"
        />
      </svg>
      {{ base.footerData.data.attributes.phone }}
    </a>
    <div class="header-additional__links">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM12.43 8.85893C11.2628 9.3444 8.93014 10.3492 5.43189 11.8733C4.86383 12.0992 4.56626 12.3202 4.53917 12.5363C4.49339 12.9015 4.95071 13.0453 5.57347 13.2411C5.65818 13.2678 5.74595 13.2954 5.83594 13.3246C6.44864 13.5238 7.27283 13.7568 7.70129 13.766C8.08994 13.7744 8.52373 13.6142 9.00264 13.2853C12.2712 11.079 13.9584 9.96381 14.0643 9.93977C14.139 9.92281 14.2426 9.90148 14.3128 9.96385C14.3829 10.0262 14.376 10.1443 14.3686 10.176C14.3233 10.3691 12.5281 12.0381 11.5991 12.9018C11.3095 13.171 11.1041 13.362 11.0621 13.4056C10.968 13.5033 10.8721 13.5958 10.78 13.6846C10.2108 14.2333 9.78391 14.6448 10.8036 15.3168C11.2936 15.6397 11.6858 15.9067 12.0769 16.1731C12.5042 16.4641 12.9303 16.7543 13.4816 17.1157C13.6221 17.2077 13.7562 17.3034 13.8869 17.3965C14.3841 17.751 14.8307 18.0694 15.3826 18.0186C15.7032 17.9891 16.0345 17.6876 16.2027 16.7884C16.6002 14.6631 17.3816 10.0585 17.5622 8.16097C17.578 7.99473 17.5581 7.78197 17.5422 7.68857C17.5262 7.59518 17.4928 7.46211 17.3714 7.3636C17.2276 7.24694 17.0056 7.22234 16.9064 7.22408C16.455 7.23203 15.7626 7.47282 12.43 8.85893Z"
          fill="#232D5B"
        />
      </svg>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM16.2519 7.7439C15.1239 6.61983 13.6236 6.00063 12.0253 6C8.73199 6 6.05146 8.6673 6.0502 11.9459C6.04981 12.994 6.32498 14.017 6.84771 14.9186L6 18L9.16745 17.1732C10.0401 17.647 11.0228 17.8966 12.0227 17.897H12.025C15.3181 17.897 17.9986 15.2293 18 11.9509C18.001 10.3618 17.3802 8.86788 16.2519 7.7439ZM14.7495 13.191C14.6001 13.1166 13.8663 12.7572 13.7293 12.7076C13.5925 12.6581 13.4928 12.6332 13.3933 12.7821C13.2938 12.9309 13.0078 13.2654 12.9206 13.3646C12.8335 13.4638 12.7464 13.4761 12.5972 13.4017C12.5728 13.3896 12.5395 13.3752 12.4983 13.3574C12.2881 13.2667 11.8735 13.0877 11.3966 12.6642C10.9528 12.2701 10.6532 11.7836 10.566 11.635C10.4789 11.4862 10.5566 11.4058 10.6314 11.3319C10.6762 11.2874 10.7277 11.225 10.7791 11.1626L10.7834 11.1574C10.8076 11.1281 10.8318 11.0988 10.8553 11.0715C10.9185 10.998 10.946 10.9422 10.9833 10.8666L10.9833 10.8665C10.99 10.853 10.997 10.8387 11.0047 10.8237C11.0545 10.7245 11.0295 10.6377 10.9922 10.5634C10.9677 10.5142 10.8291 10.1787 10.7019 9.87072L10.6975 9.86007L10.6734 9.8015C10.6186 9.66901 10.568 9.54634 10.5319 9.46017C10.4249 9.20443 10.3165 9.20506 10.2294 9.20561H10.2294C10.2179 9.20569 10.2067 9.20577 10.196 9.20522C10.109 9.20081 10.0093 9.20003 9.90987 9.20003C9.81041 9.20003 9.64871 9.23717 9.51171 9.38597C9.50386 9.39452 9.49513 9.40382 9.48576 9.41382L9.48228 9.41752L9.48223 9.41758C9.32664 9.58293 8.98922 9.94151 8.98922 10.6255C8.98922 11.3547 9.52158 12.06 9.59879 12.1623L9.5989 12.1624C9.6037 12.1689 9.61243 12.1813 9.62479 12.199L9.62493 12.1992C9.80351 12.4541 10.7495 13.8043 12.1492 14.4059C12.5055 14.559 12.7834 14.6503 13.0004 14.7188C13.358 14.8319 13.6834 14.816 13.9408 14.7777C14.2277 14.7351 14.824 14.4184 14.9484 14.0714C15.0728 13.7243 15.0728 13.4267 15.0356 13.3648C15.0054 13.3147 14.9349 13.2807 14.8303 13.2305C14.8053 13.2183 14.7783 13.2054 14.7495 13.191Z"
          fill="#232D5B"
        />
      </svg>
    </div>
  </div>
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
        scrolled ? 'header-scrolled' : '',
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
<!--              <li>-->
<!--                <NuxtLink-->
<!--                  target="_blank"-->
<!--                  class="footer-text header-nav-item"-->
<!--                  :to="`tel:+${phone?.replace(/\D/g, '')}`"-->
<!--                >-->
<!--                  {{ phone }}-->
<!--                </NuxtLink>-->
<!--              </li>-->
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
            :autofocus="showSearch"
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
<!--          <NuxtLink-->
<!--            target="_blank"-->
<!--            class="header-nav-item-mob p-t-20"-->
<!--            :to="`tel:+${phone?.replace(/\D/g, '')}`"-->
<!--          >-->
<!--            {{ phone }}-->
<!--          </NuxtLink>-->
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
                @click.stop="handleFirstClick(item.id)"
                :class="{ 'display-none': secondBlockMobMenu }"
              >
                <div class="menu-mob-first-block-title">
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
                <div class="menu-mob-second-block-container">
                  <div
                    class="a2"
                    v-if="activeItem == item.id"
                    v-for="direction in item.directions"
                    :key="direction.id"
                  >
                    <div
                      class="header-services-menu-item-mob"
                      @click.stop="handleSecondClick(item.id, direction.id)"
                    >
                      <div class="menu-mob-second-block-title">
                        <div
                          class="header-services-menu-text header-nav-item-mob"
                        >
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

                      <div
                        v-if="
                          activeItem == item.id &&
                          activeDirection == direction.id
                        "
                        :class="{
                          'active-directions': item.id === activeClass,
                        }"
                        class="a2"
                      >
                        <div class="menu-mob-third-block">
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
        <!-- <div v-show="secondBlockMobMenu">
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
        </div> -->
        <!-- Третья страница-->
        <!-- <div v-show="thirdBlockMobMenu">
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
        </div> -->
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@import "/assets/styles/style.scss";

.header-additional {
  width: 1280px;
  padding: 10px 20px;
  max-width: 95%;
  align-items: center;
  position: absolute;
  left: calc(50% - 640px);
  margin: 0 auto;
  top: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 5px 5px 45px -5px rgba(30, 32, 40, 0.08);
  z-index: 901;
  display: flex;
  justify-content: space-between;
  &__select {
    display: flex;
    align-items: center;
    @include body-12-bold;
  }
  &__time {
    @include body-12-regular;
    @media screen and (max-width: 777px) {
      display: none;
    }
  }
  &__phone {
    @include body-12-regular;
    display: flex;
    gap: 5px;
    align-items: center;

    @media screen and (max-width: 777px) {
      display: none;
    }
  }
  &__links {
    display: flex;
    gap: 5px;
    @media screen and (max-width: 777px) {
      display: none;
    }
  }
  @media screen and (max-width: 1355px) {
    top: 0;
    left: 0;
    max-width: 100%;
    width: 100%;
  }
}

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
  order: -1;
  padding: 15px 0 0;
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
  // padding-bottom: 24px;
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
.header-services-menu-item-mob {
  .a2 {
    display: block;
  }
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
  top: 90px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 5px 5px 45px -5px rgba(30, 32, 40, 0.08);
  z-index: 900;
  transition: 0.5s;
  &.header-scrolled {
    top: 30px;
    @media screen and (max-width: 1365px) {
      top: 0;
    }
  }
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
      @media screen and (max-width: 540px) {
        flex-direction: column;
      }
    }
  }
}

.header-nav-list {
  @media screen and (max-width: 1360px) {
    display: flex;
    // align-items: center;
    flex-direction: column;
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
  flex-direction: column;
  justify-content: space-between;
  padding: 14px 20px;
  align-items: flex-start;
  gap: 25px;
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
    top: 50px;
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

.menu-mob-second-block-title,
.menu-mob-first-block-title {
  display: flex;
  align-items: center;
}
</style>
