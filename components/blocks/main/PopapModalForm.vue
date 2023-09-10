<template>
  <div v-if="isOpen" class="popup-wrap">
    <div :class="[isDiscounts ? 'popup-discounts' : 'popup']">
      <!-- Акция -->
      <div v-if="isDiscounts" class="popup-discounts-wrap">
        <div class="popup-discounts-logo">
          <img class="popup-discounts-logo-img" src="../../../assets/images/icons/logo-big.png" alt="logo"/>
        </div>
        <div class="popup-discounts-container">
          <div class="popup-discounts-box">
            <h3 class="popup-discounts-title">Правила акции</h3>
            <div class="expanded" @click="toggleExpansion">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22L32 22.003M22 12V32" stroke="#525660" stroke-linecap="round"/>
              <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="#E9E9E9"/>
              </svg>
            </div>
          </div>
          <p v-if="isExpanded" class="popup-discounts-text">Как уже неоднократно упомянуто, активно развивающиеся 
            страны третьего мира превращены в посмешище, хотя само их 
            существование приносит несомненную пользу обществу. И нет 
            сомнений, что диаграммы связей являются только методом политического 
            участия и преданы социально-демократической анафеме. В своём стремлении 
            улучшить пользовательский опыт мы упускаем, что активно развивающиеся 
            страны третьего мира и по сей день остаются уделом либералов, которые 
            жаждут быть ограничены исключительно образом мышления.</p>
          <p class="popup-discounts-text-desc">Как уже неоднократно упомянуто, активно развивающиеся 
            страны третьего мира превращены в посмешище, хотя само их 
            существование приносит несомненную пользу обществу. И нет 
            сомнений, что диаграммы связей являются только методом политического 
            участия и преданы социально-демократической анафеме. В своём стремлении 
            улучшить пользовательский опыт мы упускаем, что активно развивающиеся 
            страны третьего мира и по сей день остаются уделом либералов, которые 
            жаждут быть ограничены исключительно образом мышления.</p>
        </div>
      </div>
      <div class="popup-close">
        <svg @click="setIsOpen" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="20" rx="2" fill="#FBFBFB"/>
          <path d="M6 6L14 14M14 6L6 14" class="close-reg" stroke="#33383A" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <!-- Прайс форма -->
      <div v-if="isPriceForm" class="popup-container">
        <div class="popup-title">
          Записаться на прием
        </div>
        <div class="popup-inner price">
          <div class="popup-input">
            <elements-input-base placeholder="Введите имя" class="popup-form-input"/>
            <elements-input-base placeholder="Укажите номер телефона" class="popup-form-input"/>
          </div>
          <elements-input-base placeholder="Укажите адрес электронной почты" class="popup-form-input"/>
        </div>
        <div :class="[isDiscounts ? 'popup-button-box-discounts' : 'popup-button-box']">
          <elements-button-base title="Отправить" class="popup-btn"/>
          <div class="popup-text">
            Нажимая кнопку отправить, вы соглашаетесь с Политикой обработки персональных данных
          </div>
        </div>
      </div>
      <!-- Основная форма -->
      <div v-else class="popup-container">
        <div class="popup-title">
          Записаться на прием
        </div>
        <div class="popup-inner">
          <div class="popup-input">
            <elements-input-base placeholder="Введите имя" class="popup-form-input"/>
            <elements-input-base placeholder="Укажите номер телефона" class="popup-form-input"/>
          </div>
          <elements-select
            :options="addresData"
            :default="'Выберите клинику'"
            class="select"
          />
          <elements-textarea placeholder="Опишите проблему" class="popup-textarea"/>
        </div>
        <div :class="[isDiscounts ? 'popup-button-box-discounts' : 'popup-button-box']">
          <elements-button-base title="Отправить" class="popup-btn"/>
          <div class="popup-text">
            Нажимая кнопку отправить, вы соглашаетесь с Политикой обработки персональных данных
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isExpanded: false
      }
    },
    props: {
      isOpen: {
        type: Boolean,
      },
      isDiscounts: {
        type: Boolean,
      },
      isPriceForm: {
        type: Boolean,
        default: false
      }
    },
    methods: {
    toggleExpansion() {
      this.isExpanded = !this.isExpanded;
    }
  },
    setup(props, context) {
      function setIsOpen () {
        context.emit('togglerPopup', false)
      }

      return {
        setIsOpen,
      }
    }
  }
</script>

<style lang="scss">
@import '/assets/styles/style.scss';

.price {
  padding-bottom: 40px;
}

.expanded {
  display: none;
}

.popup-wrap {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  z-index: -11;
  opacity: 0;
  transition: .3s;
  background-color: rgb(0, 0, 0, .6);
  visibility: visible;
  opacity: 1;
  z-index: 901;
}

.popup-discounts {
  display: flex;
  max-width: 848px;
  position: relative;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 20px;
  width: 100%;
  z-index: 902;
}

.popup-discounts-wrap {
  width: 565px;
  padding: 20px;
}

.popup-discounts-logo {
  border-radius: 15px;
  background: var(--light-bg, #F9F9FA);
  height: 85px;
  margin-bottom: 10px;
}

.popup-discounts-logo-img {
  height: 100px;
}

.popup-discounts-container {
  border-radius: 15px;
  background: var(--light-bg, #F9F9FA);
  padding: 20px;
}

.popup-discounts-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
  padding-bottom: 20px
}

.popup-discounts-text, .popup-discounts-text-desc {
  @include body-14-regular;
  color: $placeholder;
}

.popup {
  display: flex;
  position: relative;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 20px;
  max-width: 416px;
  width: 100%;
  z-index: 902;
}

.popup-close {
  position: absolute;
  top: 16px;
  right: 20px;
  cursor: pointer;
}

.popup-close:hover {
  .close-reg {
    stroke: #D81F1F;
  }
}

.popup-close:active {
  .close-reg {
    opacity: 0.7px;
  }
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.popup-title {
  @include body-22-medium-Neue;
  color: $black;
  padding-bottom: 40px;
  text-align: center;
}

.popup-inner {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.popup-input, .popup-button-box, .popup-button-box-discounts {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.popup-textarea {
  padding-bottom: 40px;
}

.popup-btn {
  width: 100% !important;
}

.popup-text {
  @include body-12-regular;
  color: $gray-text;
  opacity: 0.7;
  padding-top: 14px;
  text-align: center;
}

@media (max-width: 900px) {
  .expanded {
    display: block;
  }

  .popup-discounts-container {
    border-radius: 10px;
    border: 1px solid var(--stroke, #E9E9E9);
    background: var(--white, #FFF);
  }

  .popup-discounts-text-desc {
    display: none;
  }
  .popup, .popup-discounts {
    height: 100%;
    max-width: none;
    padding: 16px 31px;
    border-radius: 0;
    overflow-y: scroll;
    flex-wrap: wrap;
  }

  .popup-container {
    width: 100%;
  }

  .popup-discounts-wrap {
    width: 100%;
    padding: 80px 0 60px;
  }

  .popup-discounts-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .popup-discounts-title {
    padding-bottom: 0;
    font-size: 18px;
  }

  .popup-discounts-text {
    padding-top: 20px;
  }

  .popup-close {
    padding-bottom: 40px;
  }

  .popup-input, .popup-button-box, .popup-button-box-discounts { 
    flex-direction: initial;
    justify-content: space-between;
    align-items: center;
    gap: 14px;
  }

  .popup-form-input {
    width: 100%;
  }

  .popup-title {
    padding-bottom: 60px;
  }

  .popup-text {
    text-align: start;
    padding-top: 0;
  }

  .popup-textarea {
    padding-bottom: 60px;
  }
}

@media (max-width: 560px) {
  .popup, .popup-discounts {
    padding: 16px 16px 0 16px;
  }

  .popup-input { 
    flex-wrap: wrap;
    gap: 20px;
  }

  .popup-text {
    text-align: center;
  }

  .popup-textarea {
    padding-bottom: 0;
  }

  .popup-btn {
    height: 50px !important;
  }

  .popup-button-box {
    flex-wrap: wrap; 
    gap: 14px;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0 16px 16px;
  }

  .popup-button-box-discounts {
    flex-wrap: wrap; 
    position: static;
    margin-top: 60px;
  }
}

</style>