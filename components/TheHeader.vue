<template>
<blocks-main-popap-modal-form @togglerPopup='togglerPopup' :isOpen="isOpenPopup" />
  <header class="header">
    <div class="header-logo">
      <NuxtLink :to="'/'" :exact="true" active-class="active">
        <img style="width: 59px; height: 34px;" :src="assetsStore.useAsset('images/icons/logo.svg')" alt="Logo">
      </NuxtLink>
    </div>
    <div class="header-nav">
      <nav>
        <ul class="header-nav-list">
          <li v-for="item in navigation" :key="item.title">
            <NuxtLink active-class="active-link" class="header-nav-item m-r-20" :to="item.path">{{ item.title }}</NuxtLink>
          </li>
        </ul>
      </nav>
      <div>
        <button-base @click="isOpenPopup = true" title="Записаться на прием"/>
      </div>
    </div>
    <div class="header-menu">
      <img src="../assets/images/icons/burger.svg" alt="">
      <!-- <div>Меню</div> -->
    </div>
  </header>
</template>

<script>
import { useAssets } from '../stores/useAsset';
import ButtonBase from './elements/Button-base.vue';
import { useActuveLink } from '../stores/activeLink'
  export default {
  components: { ButtonBase },
  methods: {
    openModal() {
      this.$refs.modal.openModal('Modal Title', 'Modal Message');
    },
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
        { title: 'Услуги', path: '/services' },
        { title: 'Специалисты', path: '/specialists' },
        { title: 'Пациентам', path: '/patients' },
        {title: 'Акции и скидки', path: '/discounts' },
        {title: 'Портфолио', path: '/portfolio' },
        { title: 'Цены', path: '/prices' },
        { title: 'Контакты', path: '/contacts' }
      ];
      return {
        assetsStore,
        navigation,
        route,
        isOpenPopup,
        togglerPopup,
        store,
      }
    }
  }
</script>

<style lang="scss">
@import '/assets/styles/style.scss';
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
    height: 78px;
    padding: 14px 31px;
    max-width: 95%;
    display: flex;
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
    }

    .header-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 92%;
      width: 100%;

      .header-nav-list {
        display: flex;
      }
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
  }
}

@media (max-width: 650px) {
  .header  {
    padding: 14px 16px;
  }
}
</style>