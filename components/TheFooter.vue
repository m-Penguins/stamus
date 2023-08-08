<template>
  <footer class="footer">
    <div class="footer-wrap">
      <div class="footer__box">
        <img src="@/assets/images/icons/logo.svg" alt="logo">
      </div>
      <div class="footer__box">
        <div class="footer-menu">
          <h3 class="footer-subtitle">Меню</h3>
          <div class="footer-menu-container">
            <div class="footer-menu-container__link">
              <a class="footer-text" href="/">Пункт</a>
              <a class="footer-text" href="/">Пункт</a>
              <a class="footer-text" href="/">Пункт</a>
            </div>
            <div class="footer-menu-container__link">
              <a class="footer-text" href="/">Пункт</a>
              <a class="footer-text" href="/">Пункт</a>
              <a class="footer-text" href="/">Пункт</a>
            </div>
          </div>
        </div>
        <div class="footer-contacts">
          <h3 class="footer-subtitle">Контакты</h3>
          <div class="footer-text">+7 (999) 888 - 77 - 66</div>
          <div class="footer-text">stamus-med@info.ru</div>
          <div class="">
            <a href="/">
              <img class="footer-img" src="@/assets/images/icons/YouTube-fill.svg" alt="Social icon">
            </a>
            <a href="/">
              <img class="footer-img" src="@/assets/images/icons/vk-fill.svg" alt="Social icon">
            </a>
            <a href="/">
              <img class="footer-img" src="@/assets/images/icons/Telegram-fill.svg" alt="Social icon">
            </a>
          </div>
        </div>
        <div class="footer-address">
          <h3 class="footer-subtitle">Наши адреса</h3>
          <div class="footer-address__container">
            <div class="footer-address__container-link">
              <p class="footer-text">ул. Московская 140</p>
              <p class="footer-text">ул. Хакурате 34</p>
              <p class="footer-text">ул. Мачуги 1/1</p>
              <p class="footer-text">ул. Черкасская 17</p>
            </div>
            <div class="footer-address__container-link">
              <p class="footer-text">ул. Гимназическая 85</p>
              <p class="footer-text">Платановый бульвар 19/3</p>
              <p class="footer-text">ул. Средняя 1/3</p>
            </div>
          </div>
        </div>
        <div>
          <div class="footer-text">Политика конфидециальности</div>
          <div class="footer-text">Лицензия</div>
          <div class="footer-text">Версия для слабовидящих</div>
       </div>
   
      </div>
      <!-- <div class="footer__box width">
        <p class="footer-text">Политика конфидециальности</p>
        <p class="footer-text">Лицензия</p>
        <p class="footer-text">Версия для слабовидящих</p>
      </div> -->
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      socialsList: {
        youTube: {
          href: '',
          iconName: 'YouTube-fill'
        },
        telegramm: {
          href: '',
          iconName: 'Telegram'
        },
        vk: {
          href: '',
          iconName: 'vk-fill'
        },
      },
      setup() {
        const localePath = useLocalePath();

        return {
          localePath,
        }  
      } 
    }
  }
}
</script>

<style lang="scss">
@import '/assets/styles/style.scss';

  .footer {
    @include flex-column-center;
    width: 100%;
    padding: 60px 0;
    box-sizing: border-box;
    background: $light-gray;

    .footer-wrap {
      display: flex;
      flex-direction: column;
      width: 1160px;
      max-width: 95%;
    }

    .footer__box {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      width: 100%;
      height: 100%;
    }

    .footer-menu {
      .footer-menu-container {
        display: flex;

        &__link {
          @include flex-column-center;
          padding-right: 40px
        }
      }
    }

    .footer-subtitle {
      padding-bottom: 20px;
      @include body-18-regular;
      color: $dark-blue-subtitle;
    }

    .footer-address {
      &__container {
        display: flex;
      }

      &__container-link {
        padding-right: 40px
      }
    }

    .footer-text {
      padding-bottom: 14px;
      @include body-14-regular;
      color: $gray-text;
    }

    .footer-img {
      padding-right: 16px;
    }

    .width {
      width: 86.5%;
    }
  }
</style>