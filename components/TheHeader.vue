<template>
  <blocks-main-popap-modal-form @togglerPopup='togglerPopup' class="modal-menu" :isOpen="isOpenPopup" />
  <header :class="showServices || showSearch ? 'showServicesHeader' : ''" @click="closeMenu" class="modal-menu">
    <div :class="showServices || showSearch ? 'header header-services' : 'header'">
      <div class="header-wrap">
        <div class="header-logo">
          <NuxtLink :to="'/'" :exact="true" active-class="active" @click="showServices = false; showSearch = false">
            <img style="width: 59px; height: 34px;" :src="assetsStore.useAsset('images/icons/logo.svg')" alt="Logo">
          </NuxtLink>
        </div>
        <div class="header-nav">
          <nav>
            <ul class="header-nav-list">
              <li class="first-item">
                <div class="header-services-img m-r-20" @click="showServices = !showServices; showSearch = false" :class="{'active-btn-services': showServices === true}">
                  <img v-if="!showServices" src="../assets/images/icons/burger.svg" alt="burger">
                  <img v-else src="../assets/images/icons/burger-close.svg" alt="burger-close">
                  <p>Услуги</p>
                </div>
              </li>
              <li v-for="item in navigation" :key="item.title">
                <NuxtLink 
                  active-class="active-link" 
                  @click="showServices = false; showSearch = false" 
                  class="header-nav-item m-r-20" 
                  :to="item.path">
                  <div v-if="item.title !== 'Пациентам'">{{ item.title }}</div>
                  <div v-else class="header-arrow-icon">
                    <div>{{ item.title }}</div>
                    <div v-if="item.title === 'Пациентам'" class="arrow-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M6 8L10 12L14 8" stroke="#7F838C" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="menu-patients">
                      <ul class="menu-patients-list">
                        <NuxtLink v-for="(elem, index) in navigationPatients" :key="elem" :to="elem.path" class="menu-patients-items">
                          <li>
                            <div>{{elem.title}}</div>
                            <hr class="menu-patients-line" v-if="index < navigationPatients.length - 1"/>
                          </li>
                        </NuxtLink>
                      </ul>
                    </div>
                  </div>
                </NuxtLink>
              </li>
            </ul>
          </nav>
          <div class="header-btn-base">
            <div class="header-search-img" @click="showSearch = !showSearch; showServices = false;">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect class="header-search-svg" width="30" height="30" rx="5" opacity="0.5"  fill="white"/>
              <path d="M14.3333 20.1667C17.555 20.1667 20.1667 17.555 20.1667 14.3333C20.1667 11.1117 17.555 8.5 14.3333 8.5C11.1117 8.5 8.5 11.1117 8.5 14.3333C8.5 17.555 11.1117 20.1667 14.3333 20.1667Z" stroke="#525660" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21.5 21.5L18.5 18.5" stroke="#525660" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <button-base @click="isOpenPopup = true" title="Записаться на прием"/>
          </div>
        </div>
        <div class="header-menu">
          <div class="header-search-img" @click="showSearch = !showSearch; showServices = false;">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect class="header-search-svg" width="30" height="30" rx="5" opacity="0.5"  fill="white"/>
            <path d="M14.3333 20.1667C17.555 20.1667 20.1667 17.555 20.1667 14.3333C20.1667 11.1117 17.555 8.5 14.3333 8.5C11.1117 8.5 8.5 11.1117 8.5 14.3333C8.5 17.555 11.1117 20.1667 14.3333 20.1667Z" stroke="#525660" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21.5 21.5L18.5 18.5" stroke="#525660" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="first-item">
            <div class="header-services-img m-r-20" @click="showMenuMob = !showMenuMob; showSearch = false" :class="{'active-btn-services': showServices === true}">
              <img v-if="!showServices" src="../assets/images/icons/burger.svg" alt="burger">
              <img v-else src="../assets/images/icons/burger-close.svg" alt="burger-close">
              <p>Меню</p>
            </div>
          </div>
          <!-- <img src="../assets/images/icons/burger.svg" alt="">
          <div>Меню</div> -->
        </div>
      </div>

      <!-- Услуги модалка-->
      <div v-if="showServices" class="header-services-menu">
        <hr>
        <div class="header-services-menu-container">
          <div class="header-services-menu-list">
            <div 
              v-for="navigationService in navigationServices2" 
              :key="navigationService.id" 
              class="header-services-menu-item"
              @mouseover="changeActiveClass(navigationService.id)"
              >
              <div :class="{'active-directions-line': navigationService.id === activeClass}" class="a2"></div>
              <NuxtLink exact active-class="active-link" @click="showServices = false; showSearch = false" class="header-nav-item m-r-20" :to="`main-page-clinic-${navigationService.id - 1}`">
                  {{ navigationService.title }}
              </NuxtLink>
            </div>
          </div>
          <ul class="header-services-menu-inner">
            <div 
              v-for="item in navigationServices2" 
              :key="item.id" 
              :class="{'active-directions': item.id === activeClass}" 
              class="a2"
            >
              <li v-for="direction in item.directions" :key="direction.id" class="cursor-pointer">
                <div class="header-services-menu-text header-nav-item" 
                  :class="{'active-serv': direction.showServices === true}" 
                  @click="toggleServices(direction)">
                  {{ direction.title }}
                </div>
                <ul v-if="direction.showServices" class="header-services-menu-box">
                  <div class="header-services-menu-box-title">{{ direction.title }}:</div>
                  <div class="header-services-menu-box-items">
                    <li class="header-services-menu-text" v-for="(service, id) in direction.services" :key="service">
                        <NuxtLink  @click="showServices = false; showSearch = false; $router.push(`/main-page-clinic/` + id)" class="header-services-menu-box-link" to="#">
                          {{ service }}
                        </NuxtLink>
                    </li>
                  </div>
                </ul>
              </li>
            </div>
          </ul>
          <hr class="vertical-line">
        </div>
      </div>
      <!-- Search модалка-->
      <div v-show="showSearch" class="header-services-menu">
        <hr>
        <div>
          <elements-input-search class="elements-input-search" placeholder="Введите запрос"/>
        </div>
      </div>
      <!-- Menu модалка-->
      <div v-show="showMenuMob" class="header-services-menu">
        <hr>
        <ul class="header-nav-list">
          <li v-for="item in navigation" :key="item.title">
            <NuxtLink active-class="active-link" @click="showServices = false; showSearch = false" class="header-nav-item m-r-20" :to="item.path">
                {{ item.title }}
            </NuxtLink>
          </li>
          <div 
              v-for="item in navigationServices2" 
              :key="item.id" 
              class="header-services-menu-item"
              @click="changeActiveClass(item.id)" :class="{'display-none': categories}">
              <!-- <div :class="{'active-directions-line': navigationService.id === activeClass}" class="a2">:class="{'display-none': categories}"</div> -->
              <div @click="showServices = false; showSearch = false; categories = true" class="header-nav-item m-r-20">
                  {{ item.title }}
              </div>
              <!-- <div :class="{'active-directions': item.id === activeClass}" 
              class="a2" v-show="categories" v-for="direction in item.directions" :key="direction.id">
                <div class="header-services-menu-text header-nav-item"  :class="{'active-serv': direction.showServices === true}" @click="toggleServices(direction)">
                  {{ direction.title }}
                  {{categories}}
                </div>
              </div> -->
          </div>
          <div v-show="categories" v-for="item in navigationServices2" 
              :key="item.id" 
              >
              <div :class="{'active-directions': item.id === activeClass}" 
                  class="a2" v-for="direction in item.directions" :key="direction.id">

                <div class="header-services-menu-text header-nav-item"  
                  :class="{'display-none': direction.showServices === true}" 
                  @click="toggleServices(direction)">
                  {{ direction.title }}
                </div>
                <div v-if="direction.showServices">
                  <div v-for="service in direction.services" 
                  :key="service" 
                  class="header-services-menu-text header-nav-item"  
                  :class="{'active-serv': direction.showServices === true}" 
                  @click="toggleServices(direction)">
                    {{ service }}
                  </div>
                </div>
              </div>
          </div>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { useAssets } from '../stores/useAsset';
import ButtonBase from './elements/Button-base.vue';
import { useActuveLink } from '../stores/activeLink'
export default {
  components: { ButtonBase },
    data() {
      return {
        showServices: false,
        showSearch: false,
        showMenuMob: false,
        categories: false,
        activeClass: "",
        showServicesAll: false,
        navigationPatients: [
        { id: 1, title: 'Клиники', path: '/clinics' },
        { id: 2, title: 'Наше приложение', path: 'stamusapp' },
        { id: 3, title: 'Информация для пациентов', path: '/' },
        { id: 4, title: 'Налоговый вычет', path: '/' },
        { id: 5, title: 'До/после', path: '/' },
      ],
        navigationServices2: [
        {
          id: 1,
          title: 'Взрослая стоматология',  
          directions: [
            {
              id: 1,
              title: 'Терапия. Лечение зубов',
              services: ['Лечение кариеса', 'Лечение пульпита', 'Лечение периодонтита', 'Лечение каналов зуба', 'Лечение зубов под микроскопом', 'Лечение зубов под наркозом', 'Лечение зубов при беременности', 'Реставрация зуба'],
            },
            {
              id: 2,
              title: 'Диагностика',
              services: ['Рентген зубов', 'Панорамный снимок зубов (ОПТГ)', 'Телерентгенограмма (ТРГ)', 'КЛКТ', 'Сканирование 3Shape'],
            },
            {
              id: 3,
              title: 'Гигиена и отбеливание',
              services: ['Профессиональная гигиена полости рта', 'Проф гигиена при брекетах', 'Отбеливание ZOOM4', 'Капповое отбеливание', 'Внутрикоронковое отбеливание'],
            },
            {
              id: 4,
              title: 'Ортопедия. Коронки и протезы',
              services: ['Протезирование зубов: вкладки, коронки, мосты', 'Керамические коронки', 'Коронки на имплантаты', 'Виниры', 'Съемные протезы', 'Несъемные протезы (All on 4)'],
            },   
          ],
        },
        {
          id: 2,
          title: 'Детская стоматология',  
          directions: [
            {
              id: 1,
              title: 'Терапия. Лечение зубов',
              services: ['Лечение кариеса2', 'Лечение пульпита', 'Лечение периодонтита', 'Лечение каналов зуба', 'Лечение зубов под микроскопом', 'Лечение зубов под наркозом', 'Лечение зубов при беременности', 'Реставрация зуба'],
            },
            {
              id: 2,
              title: 'Консультация и профилактика ',
              services: ['Лечение кариеса', 'Лечение пульпита', 'Лечение периодонтита', 'Лечение каналов зуба', 'Лечение зубов под микроскопом', 'Лечение зубов под наркозом', 'Лечение зубов при беременности', 'Реставрация зуба'],
            },
            {
              id: 3,
              title: 'Хирургия. Удаление зубов и др',
              services: ['Лечение кариеса3', 'Лечение пульпита', 'Лечение периодонтита', 'Лечение каналов зуба', 'Лечение зубов под микроскопом', 'Лечение зубов под наркозом', 'Лечение зубов при беременности', 'Реставрация зуба'],
            },
            {
              id: 4,
              title: 'Адаптация',
              services: ['Лечение кариеса4', 'Лечение пульпита', 'Лечение периодонтита', 'Лечение каналов зуба', 'Лечение зубов под микроскопом', 'Лечение зубов под наркозом', 'Лечение зубов при беременности', 'Реставрация зуба'],
            },   
          ],
        },
        {
          id: 3,
          title: 'Детская клиника',  
          directions: [
            {
              id: 1,
              title: 'Услуги',
              services: ['Лечение кариеса', 'Лечение пульпита', 'Лечение периодонтита', 'Лечение каналов зуба', 'Лечение зубов под микроскопом', 'Лечение зубов под наркозом', 'Лечение зубов при беременности', 'Реставрация зуба'],
            },
            {
              id: 2,
              title: 'Специалисты',
              services: ['Педиатр', 'Аллерголог', 'Аллерголог', 'Дерматолог', 'Детский хирург', 'Уролог', 'Кардиолог', 'Функциональный диагност', 'Логопед', 'Невролог', 'Ортопед травматолог', 'ЛОР', 'Офтальмолог', 'Физиотерапевт', 'Эндокринолог'],
            },
          ],
        },
        {
          id: 4,
          title: 'Челюстно-лицевая хирургия',  
          directions: [
            {
              id: 1,
              title: 'Травмы челюстно-лицевой области (переломы)',
              services: ['Лечение кариеса', 'Лечение пульпита', 'Лечение периодонтита', 'Лечение каналов зуба', 'Лечение зубов под микроскопом', 'Лечение зубов под наркозом', 'Лечение зубов при беременности', 'Реставрация зуба'],
            },
            {
              id: 2,
              title: 'Скуловая имплантация',
              services: ['Лечение кариеса2', 'Лечение пульпита', 'Лечение периодонтита', 'Лечение каналов зуба', 'Лечение зубов под микроскопом', 'Лечение зубов под наркозом', 'Лечение зубов при беременности', 'Реставрация зуба'],
            },
            {
              id: 3,
              title: 'Опухоли и новообразования',
              services: ['Лечение кариеса3', 'Лечение пульпита', 'Лечение периодонтита', 'Лечение каналов зуба', 'Лечение зубов под микроскопом', 'Лечение зубов под наркозом', 'Лечение зубов при беременности', 'Реставрация зуба'],
            },
            {
              id: 4,
              title: 'Опухоли и новообразования',
              services: ['Лечение кариеса4', 'Лечение пульпита', 'Лечение периодонтита', 'Лечение каналов зуба', 'Лечение зубов под микроскопом', 'Лечение зубов под наркозом', 'Лечение зубов при беременности', 'Реставрация зуба'],
            }, 
            {
              id: 5,
              title: 'Гайморотомия',
              services: ['Лечение кариеса4', 'Лечение пульпита', 'Лечение периодонтита', 'Лечение каналов зуба', 'Лечение зубов под микроскопом', 'Лечение зубов под наркозом', 'Лечение зубов при беременности', 'Реставрация зуба'],
            },   
          ],
        },
        {
          id: 5,
          title: 'Лечение во сне',  
          directions: [
            {
              id: 1,
              title: 'Лечение зубов детям во сне',
              services: ['Лечение кариеса', 'Лечение пульпита', 'Лечение периодонтита', 'Лечение каналов зуба', 'Лечение зубов под микроскопом', 'Лечение зубов под наркозом', 'Лечение зубов при беременности', 'Реставрация зуба'],
            },
            {
              id: 2,
              title: 'Масочный наркоз',
              services: ['Лечение кариеса2', 'Лечение пульпита', 'Лечение периодонтита', 'Лечение каналов зуба', 'Лечение зубов под микроскопом', 'Лечение зубов под наркозом', 'Лечение зубов при беременности', 'Реставрация зуба'],
            },
            {
              id: 3,
              title: 'Лечение зубов взрослым во сне',
              services: ['Лечение кариеса3', 'Лечение пульпита', 'Лечение периодонтита', 'Лечение каналов зуба', 'Лечение зубов под микроскопом', 'Лечение зубов под наркозом', 'Лечение зубов при беременности', 'Реставрация зуба'],
            },
            {
              id: 4,
              title: 'Удаление зубов под наркозом',
              services: ['Лечение кариеса4', 'Лечение пульпита', 'Лечение периодонтита', 'Лечение каналов зуба', 'Лечение зубов под микроскопом', 'Лечение зубов под наркозом', 'Лечение зубов при беременности', 'Реставрация зуба'],
            },   
          ],
        },
      ]
      };
  },
  methods: {
    openModal() {
      this.$refs.modal.openModal('Modal Title', 'Modal Message');
    },
    toggleServices(direction) {
      this.navigationServices2.forEach(dir => {
        dir.directions.forEach(dir2 => {
          dir2.showServices = false;
           });
           direction.showServices = true;
        });
    },
    closeMenu(event) {
      if (event.target.classList.contains("modal-menu")) {
        this.showServices = false;
      }
    },
    changeActiveClass(cls) {
      this.activeClass = cls;
      console.log(cls)
    }
  },
    setup() {
      const assetsStore = useAssets();
      const togglerPopup = (state) => {
        isOpenPopup.value = state
      }
      const route = useRoute();
      const store = useActuveLink();
      const isOpenPopup = ref(false);
      const navigation = [
        { title: 'Специалисты', path: '/specialists' },
        { title: 'Пациентам', path: '' },
        { title: 'Акции и скидки', path: '/discounts' },
        { title: 'Портфолио', path: '/portfolio' },
        { title: 'Цены', path: '/prices' },
        { title: 'Контакты', path: '/contacts' }
      ];
      const navigationServices = [
        { title: 'Взрослая стоматология', path: '/adult-dentistry', class: "class1" },
        { title: 'Детская стоматология', path: '/children-dentistry', class: "class2" },
        { title: 'Детская клиника', path: '/children-clinic', class: "class3" },
        { title: 'Челюстной-лицевая хирургия', path: '/portfolio', class: "class4" },
        { title: 'Лечение во сне', path: '/prices', class: "class5" },
      ];

      return {
        assetsStore,
        navigation,
        route,
        isOpenPopup,
        togglerPopup,
        store,
        navigationServices,
      }
    }
  }
</script>

<style lang="scss">
@import '/assets/styles/style.scss';

.menu-patients {
  display: none;
  position: absolute;
  top: 100%;
  left: -76px;
  border-radius: 15px;
  border: 1px solid var(--menu-burger-hover-bg, #F0F0F0);
  background: var(--white, #FFF);
  z-index: 999;
  padding: 10px;
  width: 243px;
}

.menu-patients-list {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 10px;
}

.menu-patients-items {
  width: 100%;
  @include body-14-regular;
  color: $gray-text;

  div {
    padding: 10px;
    width: 100%;
  }
}

.menu-patients-line {
  margin: 4px 0 4px;
  width: auto;
  border: 0;
  height: 0;
  border-bottom: 1px solid #E9E9E9;
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
  gap: 20px
}

.header-search-img {
  cursor: pointer;
}

.header-search-svg {
  &:hover {
    fill: #F0F0F0;
    opacity: 1;
  }
}

.elements-input-search {
  width: 100% !important;
  margin: 30px 0 16px;
}

hr {
  margin-top: 20px;
  width: auto;
  border: 0;
  height: 0;
  border-bottom: 1px solid #E9E9E9;
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
  background: #232D5B;

    p {
      color:  #FFF;
    }

    &:hover {
      background: #232D5B !important;
    }
}


.active-link {
  color: #101944;

  &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: $click;
      transition: all .3s ease;
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
      transition: all .3s ease-in-out, opacity .3s ease-in-out;
      cursor: pointer;

        img {
          margin-right: 7px;
        }
    }
    .header-services-img:hover {
      border-radius: 5px;
      background: #F0F0F0;
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
  background: #FFF;
}

.header-services-menu-container {
  display: flex;
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
  border: 1px solid var(--stroke, #E9E9E9);
  display: flex;
  padding: 14px 20px;
  align-items: center;
  gap: 10px;
  position: relative;
  cursor: pointer;

      &:hover {
        border: 1px solid var(--dissabled, #CFD5E1);
    }
      &:hover a {
        color: $hover;
      }
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

.header-services-menu-text {
  @include body-14-regular;
  color: $placeholder;
  cursor: pointer;
  position: relative;
}

.header-services-menu-inner {
  width: 266px;
  padding-top: 20px;
}

.vertical-line {
  margin: 0 90px 0 0;
  width: 0;
  border: 0;
  height: auto;
  border-right: 1px solid #E9E9E9;
}

.active-directions-line {
  display: block;
  border-radius: 0px 15px 16px 0px;
  background: var(--accent, #232D5B);
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
        color: #232D5B;
      }
}

.active-serv {
  color: #101944;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: $click;
      transition: all .3s ease;
    }
}

@media (max-width: 1357px) {
  .header {
    justify-content: space-between;
    width: 100%;
    max-width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    .header-nav {
      display: none;
    }
}
  .header-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }
}

@media (max-width: 650px) {
  .header  {
    padding: 14px 16px;
  }
}
</style>