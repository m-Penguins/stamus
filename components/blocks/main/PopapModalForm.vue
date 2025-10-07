<template>
  <transition name="modal">
    <div
      v-if="
        store.isModalOpen || store.isModalOpenDiscounts || store.isModalOpenBid || store.isModalOpenApplicationAccepted || store.isModalCommunicationInterruptions
      "
      @click="store.closeModal"
      class="popup-wrap"
      @keydown="handleEscapePress"
    >
      <div
        :class="[store.isModalOpenDiscounts ? 'popup-discounts' : (store.isModalOpenApplicationAccepted || store.isModalCommunicationInterruptions) ? 'popup-alert' : 'popup']"
        @click.stop
      >
        <div class="popup-close">
          <svg
              @click="store.closeModal"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="20" height="20" rx="2" fill="#FBFBFB" />
            <path
                d="M6 6L14 14M14 6L6 14"
                class="close-reg"
                stroke="#33383A"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
        </div>
        <!-- Акция -->
        <div v-if="store.isModalOpenDiscounts" class="popup-discounts-wrap">
          <div class="popup-discounts-logo">
            <img
              class="popup-discounts-logo-img"
              src="../../../assets/images/icons/logo-big.png"
              alt="logo"
            />
          </div>
          <div class="popup-discounts-container">
            <div class="popup-discounts-box">
              <h3 class="popup-discounts-title">Правила акции</h3>
              <div class="expanded" @click="toggleExpansion">
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22L32 22.003M22 12V32"
                    stroke="#525660"
                    stroke-linecap="round"
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="43"
                    height="43"
                    rx="21.5"
                    stroke="#E9E9E9"
                  />
                </svg>
              </div>
            </div>
            <p v-if="isExpanded" class="popup-discounts-text">
              Как уже неоднократно упомянуто, активно развивающиеся страны
              третьего мира превращены в посмешище, хотя само их существование
              приносит несомненную пользу обществу. И нет сомнений, что
              диаграммы связей являются только методом политического участия и
              преданы социально-демократической анафеме. В своём стремлении
              улучшить пользовательский опыт мы упускаем, что активно
              развивающиеся страны третьего мира и по сей день остаются уделом
              либералов, которые жаждут быть ограничены исключительно образом
              мышления.
            </p>
            <p class="popup-discounts-text-desc">
              Как уже неоднократно упомянуто, активно развивающиеся страны
              третьего мира превращены в посмешище, хотя само их существование
              приносит несомненную пользу обществу. И нет сомнений, что
              диаграммы связей являются только методом политического участия и
              преданы социально-демократической анафеме. В своём стремлении
              улучшить пользовательский опыт мы упускаем, что активно
              развивающиеся страны третьего мира и по сей день остаются уделом
              либералов, которые жаждут быть ограничены исключительно образом
              мышления.
            </p>
          </div>
        </div>

        <!-- Прайс форма -->
        <div v-else-if="store.isModalOpenBid" class="popup-container">
          <div class="popup-title">Оставить заявку</div>
          <div class="popup-inner price">
            <div class="popup-input">
              <elements-input-base
                tag-type="input"
                label="Введите имя"
                class="popup-form-input"
                v-model="store.nameField"
                :error-message="store.isNameValid ? '' : '*Минимум 2 символа'"
              />
              <elements-input-base
                tag-type="phoneMask"
                label="Укажите номер телефона"
                class="popup-form-input"
                v-model="store.phoneField"
                :error-message="store.isPhoneValid ? '' : '*Неверный формат'"
              />
            </div>
            <elements-input-base
              tag-type="email"
              label="Укажите адрес электронной почты"
              class="popup-form-input"
              v-model="store.emailField"
              :error-message="
                store.isEmailVaild
                  ? ''
                  : '*Проверьте правильность заполнения данных'
              "
            />
          </div>
          <div
            :class="[
              store.isModalOpenDiscounts
                ? 'popup-button-box-discounts'
                : 'popup-button-box',
            ]"
          >
            <elements-button-base
              :onClick="sendData"
              :disabled="!store.isSubmitActiveBid || store.isLoading"
              title="Отправить"
              class="popup-btn"
            />

            <div v-if="store.isError" class="error-text">
              Что-то пошло не так, попробуйте еще раз чуть позже.
            </div>
            <div v-if="store.isSuccess" class="success-text">
              Спасибо, Ваша заявка отправлена.
            </div>

            <div class="popup-text">
              Нажимая кнопку отправить, вы соглашаетесь с
              <a :href="privacyLink" target="_blank"
                >Политикой обработки персональных данных</a
              >
            </div>
          </div>
        </div>
        <!-- Заявка принята -->
        <div v-else-if="store.isModalOpenApplicationAccepted" class="popup-applications-accept">
          <div class="popup-title">
            <p>Ваша заявка принята.</p>
            <p>По готовности с вами свяжется администратор</p>
          </div>
        </div>
        <!-- перебои в работе связи-->
        <div v-else-if="store.isModalCommunicationInterruptions" class="popup-applications-accept popup-communication" >
          <div class="popup-title">
            <p>Из-за перебоев в работе связи просим писать в мессенджеры.</p>
            <p>Звонки могут не проходить на нашу линию.</p>
          </div>
        </div>
        <!-- Основная форма -->
        <div v-else class="popup-container">
          <div class="popup-title">Перезвоните мне</div>
          <div class="popup-inner">
            <div class="popup-input">
<!--              <elements-input-base-->
<!--                tag-type="input"-->
<!--                label="Введите имя"-->
<!--                class="popup-form-input"-->
<!--                v-model="store.nameField"-->
<!--                :error-message="store.isNameValid ? '' : '*Минимум 2 символа'"-->
<!--              />-->
              <elements-input-base
                tag-type="phoneMask"
                label="Укажите номер телефона"
                class="popup-form-input"
                v-model="store.phoneField"
                :error-message="store.isPhoneValid ? '' : '*Неверный формат'"
              />
            </div>
<!--            <elements-select-->
<!--              :options="dynamicClinics"-->
<!--              :default="'Выберите клинику'"-->
<!--              class="select"-->
<!--              :dopText="true"-->
<!--              @input="(v) => (store.clinicSelect = v)"-->
<!--            />-->
<!--            &lt;!&ndash; <elements-textarea-->
<!--              placeholder="Опишите проблему"-->
<!--              class="popup-textarea"-->
<!--            /> &ndash;&gt;-->
<!--            <elements-input-base-->
<!--              tag-type="textarea"-->
<!--              placeholder="Опишите проблему"-->
<!--              class="popup-form-input"-->
<!--              v-model="store.commentField"-->
<!--              dopText="Не обязательно для заполнения"-->
<!--            />-->
            <!-- <p>Не обязательно для заполнения</p> -->
          </div>
          <div
            :class="[
              store.isModalOpenDiscounts
                ? 'popup-button-box-discounts'
                : 'popup-button-box',
            ]"
          >
            <div class="popup-text">
              Нажимая кнопку отправить, вы соглашаетесь с
              <a class="popup-text-link" :href="privacyLink" target="_blank"
              >Политикой обработки персональных данных</a
              >
            </div>
            <elements-button-base
              title="Отправить"
              class="popup-btn"
              :onClick="sendData"
              :disabled="!store.isSubmitActive || store.isLoading"
            />
            <div v-if="store.isError" class="error-text">
              Что-то пошло не так, попробуйте еще раз чуть позже.
            </div>
            <div v-if="store.isSuccess" class="success-text">
              Спасибо, Ваша заявка отправлена.
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps(["isOpen", "addresData", "clinics"]);

const baseDataStore = useBaseDataStore();
const baseUrl = useRuntimeConfig().public.baseUrl;

const privacyLink = baseDataStore?.footerData?.data?.attributes?.privacy?.data
  ?.attributes?.url
  ? baseUrl +
    baseDataStore?.footerData?.data?.attributes?.privacy?.data?.attributes?.url
  : "";

const isExpanded = ref(false);

const clinics = [
  {
    name: "Клиника на Гимназической",
    address: "ул. Гимназическая 85",
  },
  {
    name: "Клиника на Мачуги",
    address: "ул. Мачуги 1/1",
  },
  {
    name: "Клиника на Московской",
    address: "ул. Московская 140",
  },
  {
    name: "Клиника на Платановом бульваре",
    address: "Платановый бульвар 19/3",
  },
  {
    name: "Клиника на Хакурате",
    address: "ул. Хакурате 34",
  },
];

const dynamicClinics = props?.clinics
  ? props?.clinics?.data?.map((cl) => ({
      name: cl?.attributes?.heading,
      address: cl?.attributes?.address,
    }))
  : clinics;

const toggleExpansion = () => (isExpanded.value = !isExpanded.value);

const store = useModalStore();

const sendData = () => {
  if (window.ym) {
    window.ym(49742548, "reachGoal", 'popup-form-send');
  }
  store.submitModal();
};

const handleEscapePress = (e) => {
  if (e.key === "Escape" && (store.isModalOpen || store.isModalOpenDiscounts)) {
    store.closeModal();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleEscapePress);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleEscapePress);
});

const emits = defineEmits(["togglerPopup"]);

function setIsOpen() {
  emits("togglerPopup", false);
  store.resetForm();
}
</script>

<style lang="scss">
@import "/assets/styles/style.scss";

.error-text {
  @include body-16-regular;
  color: red;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;
}

.success-text {
  @include body-16-regular;
  color: rgb(32, 196, 32);
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;
}

.price {
  padding-bottom: 40px;
}

.expanded {
  display: none;
}

.popup-alert {
  max-height: 20%;
  display: flex;
  position: relative;
  padding: 20px;
  background: #ffffff;
  border-radius: 20px;
  max-width: 416px;
  width: 100%;
  z-index: 902;
  height: 100%;
  overflow: auto;
}

.popup-wrap {
  width: 100%;
  height: 100vh;
  height: 100svh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  z-index: -11;
  opacity: 0;
  transition: 0.3s;
  background-color: rgb(0, 0, 0, 0.6);
  visibility: visible;
  opacity: 1;
  z-index: 901;
}

.popup-discounts {
  display: flex;
  max-width: 848px;
  position: relative;
  padding: 20px;
  background: #ffffff;
  border-radius: 20px;
  width: 100%;
  z-index: 902;
}

.popup-discounts-wrap {
  width: 565px;
  padding: 20px;
}

.popup-applications-accept{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .popup-title {
    padding: 0;
  }
}

.popup-discounts-logo {
  border-radius: 15px;
  background: var(--light-bg, #f9f9fa);
  height: 85px;
  margin-bottom: 10px;
}

.popup-discounts-logo-img {
  height: 100px;
}

.popup-discounts-container {
  border-radius: 15px;
  background: var(--light-bg, #f9f9fa);
  padding: 20px;
}

.popup-discounts-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
  padding-bottom: 20px;
}

.popup-discounts-text,
.popup-discounts-text-desc {
  @include body-14-regular;
  color: $placeholder;
}

.popup {
  display: flex;
  position: relative;
  padding: 20px;
  background: #ffffff;
  border-radius: 20px;
  max-width: 416px;
  width: 100%;
  z-index: 902;

  height: fit-content;
  max-height: 700px;

  overflow: auto;
}

.popup-close {
  position: absolute;
  top: 16px;
  right: 20px;
  cursor: pointer;
}

.popup-close:hover {
  .close-reg {
    stroke: #d81f1f;
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
  padding-bottom: 60px;
}

.popup-input,
.popup-button-box-discounts {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.popup-button-box {
  display: flex;
  flex-direction: column;
  gap: 0px;
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
  padding-bottom: 14px;
  text-align: center;

  &-link {
    color: inherit;
    font-size: inherit;
    text-decoration: underline !important;
  }
}

@media (max-width: 900px) {
  .expanded {
    display: block;
  }

  .popup-discounts-container {
    border-radius: 10px;
    border: 1px solid var(--stroke, #e9e9e9);
    background: var(--white, #fff);
  }

  .popup-discounts-text-desc {
    display: none;
  }
  .popup,
  .popup-discounts {
    height: fit-content;
    padding: 16px 31px;
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

  .popup-input,
  .popup-button-box,
  .popup-button-box-discounts {
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
  .popup,
  .popup-discounts {
    padding: 16px 16px 0 16px;
  }
  .popup-communication {
    p {
      font-size: 18px;
    }
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
