<template>
  <header class="header">
    <div class="header-logo">
      <NuxtLink :to="'/'" :exact="true" active-class="active-link">
        <img style="width: 59px; height: 34px;" :src="assetsStore.useAsset('images/icons/logo.svg')" alt="Logo">
      </NuxtLink>
    </div>
    <div class="header-nav">
      <nav>
        <ul class="header-nav-list">
          <li v-for="item in navigation" :key="item.id">
            <NuxtLink class="header-nav-item m-r-20" to="#">{{ item.title }}</NuxtLink>
          </li>
        </ul>
      </nav>
      <div>
        <button-base title="Записаться на прием"/>
      </div>
    </div>
  </header>
</template>

<script>
import { useAssets } from '../stores/useAsset';
import ButtonBase from './elements/Button-base.vue';
  export default {
  components: { ButtonBase },
    setup() {
      const assetsStore = useAssets();
      const navigation = [
        { id: 1, title: 'Услуги', path: '/services' },
        { id: 2, title: 'Специалисты', path: '/specialists' },
        { id: 3, title: 'Пациентам', path: '/patients' },
        { id: 4, title: 'Акции и скидки', path: '/promotions-discounts' },
        { id: 5, title: 'Цены', path: '/prices' },
        { id: 6, title: 'Контакты', path: '/contacts' }
      ];
      return {
        assetsStore,
        navigation,
      }
    }
  }
</script>

<style lang="scss">
@import '/assets/styles/style.scss';
  .header {
    width: 1280px;
    height: 78px;
    padding: 14px 20px;
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

        // .header-nav-item {
        //   @include body-14-regular;
        //   padding-right: 20px;
        //   color: $gray-text;
        // }
      }
    }
  }
  .active-link {
    color: red;
  }
</style>