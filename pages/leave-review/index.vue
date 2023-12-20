<script setup>
const reviewStore = useReviewStore();

const baseDataStore = useBaseDataStore();
const baseUrl = useRuntimeConfig().public.baseUrl;

const privacyLink = baseDataStore?.footerData?.data?.attributes?.privacy?.data
  ?.attributes?.url
  ? baseUrl +
    baseDataStore?.footerData?.data?.attributes?.privacy?.data?.attributes?.url
  : "";

const clinics = baseDataStore.clinics?.data;

const moveStep2 = computed(() => {
  // good review
  if (isGoodReview.value) {
    return () => {
      if (window) {
        window?.open(reviewStore?.clinic?.prodoctorov_link);
      }
      reviewStore.moveStep3();
    };
  }
  // bad review
  else {
    return () => {
      reviewStore.moveStep2();
    };
  }
});

const isGoodReview = computed(() =>
  ["Отлично", "Хорошо", "Приемлемо"].includes(reviewStore?.pickedRating),
);

const stepHeader = [
  {
    title: "Оцените ваш прием",
    text: "Выберите клинику, которую вы посещали",
  },
  {
    title: "Оцените ваш прием",
    text: "Выберите пункт, который больше всего описывает процесс приема у специалиста",
  },
  {
    title: "Написать руководителю",
    text: "Расскажите, почему не понравился прием и что мы можем сделать, <br/>чтобы улучшить впечатления в дальнейшем?",
  },
  {
    title: "Спасибо за оценку",
    text: "Мы признательны за выбор нашей клиники и очень рады, что вам все понравилось!",
  },
  {
    title: "Что-то пошло не так",
    text: "Мы просим прощения. Попробуйте отправить отзыв еще раз.",
  },
];

const radioButtons = [
  {
    title: "Отлично",
  },
  {
    title: "Хорошо",
  },
  {
    title: "Приемлемо",
  },
  {
    title: "Плохо",
  },
  {
    title: "Ужасно",
  },
];

const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Оцените ваш прием",
    url: "/",
  },
];
</script>

<template>
  <div class="reviews">
    <elements-bread-crumbs :breadcrumbs="breadcrumbs" />

    <div class="reviews-header">
      <h1 class="prices-title">
        {{ stepHeader?.[reviewStore.currentStep]?.title }}
      </h1>
      <p
        class="prices-text"
        v-html="stepHeader?.[reviewStore.currentStep]?.text"
      ></p>
    </div>
    <div v-if="reviewStore?.currentStep === 0" class="radio-buttons">
      <label v-for="radio in clinics" :key="radio?.title" class="radio-button">
        <input
          type="radio"
          :value="radio?.attributes"
          v-model="reviewStore.clinic"
        />
        <div class="radio-circle"></div>
        <span class="radio-label">{{ radio?.attributes?.heading }}</span>
      </label>
      <button
        class="button-base review-button"
        :disabled="!reviewStore.clinic"
        @click="reviewStore.moveStep1"
      >
        Далее
      </button>
    </div>
    <div v-if="reviewStore?.currentStep === 1" class="radio-buttons">
      <label
        v-for="radio in radioButtons"
        :key="radio?.title"
        class="radio-button"
      >
        <input
          type="radio"
          :value="radio.title"
          v-model="reviewStore.pickedRating"
        />
        <div class="radio-circle"></div>
        <span class="radio-label">{{ radio?.title }}</span>
      </label>
      <button
        class="button-base review-button"
        :disabled="!reviewStore.pickedRating"
        @click="moveStep2"
      >
        Далее
      </button>
    </div>

    <div v-else-if="reviewStore.currentStep === 2">
      <div class="popup-container">
        <div class="popup-inner">
          <div class="popup-input">
            <elements-input-base
              tag-type="input"
              label="Ваше имя"
              class="popup-form-input"
              v-model="reviewStore.nameField"
              :error-message="
                reviewStore.isNameValid ? '' : '*Минимум 2 символа'
              "
            />
            <elements-input-base
              tag-type="phoneMask"
              label="Ваш номер телефона"
              class="popup-form-input"
              v-model="reviewStore.phoneField"
              :error-message="
                reviewStore.isPhoneValid ? '' : '*Неверный формат'
              "
            />
          </div>
          <elements-input-base
            tag-type="textarea"
            placeholder="Опишите проблему"
            class="popup-form-input"
            v-model="reviewStore.commentField"
          />
          <input
            type="date"
            v-model="reviewStore.dateField"
            class="date-picker"
          />
        </div>
        <div
          :class="[
            reviewStore.isModalOpenDiscounts
              ? 'popup-button-box-discounts'
              : 'popup-button-box',
          ]"
        >
          <elements-button-base
            title="Отправить"
            class="popup-btn"
            :onClick="reviewStore.submitModal"
            :disabled="!reviewStore.isSubmitActive"
          />
          <div class="popup-text">
            Нажимая кнопку отправить, вы соглашаетесь с
            <a :href="privacyLink" target="_blank"
              >Политикой обработки персональных данных</a
            >
          </div>
        </div>
      </div>
    </div>
    <NuxtLink
      v-if="reviewStore.currentStep === 2 || reviewStore.currentStep === 3"
      class="button-base review-button"
      to="/"
    >
      На главную
    </NuxtLink>
  </div>
  <blocks-main-form />
</template>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";

.review-button {
  width: 100%;
  max-width: 190px;

  margin-top: 40px;
}

.reviews {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 1280px;
  margin: 20px auto 80px auto;
}

.reviews-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;

  margin-top: 80px;
  margin-bottom: 80px;
}

.prices-title {
  @include body-60-medium;
  color: $dark-blue-subtitle;
  text-align: left;
  line-height: 120%;
}

.prices-text {
  @include body-20-regular;
  color: $gray-text;
}

@media screen and (max-width: 900px) {
  .prices-title {
    font-size: 22px;
  }
  .prices-text {
    font-size: 16px;
  }
  .reviews-header {
    margin-top: 40px;
    margin-bottom: 60px;
  }
}

@media screen and (max-width: 500px) {
  .reviews-header {
    margin-top: 30px;
  }
}

/* RADIO STYLES */
.radio-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: white;
}

.radio-button {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
}

.radio-button input[type="radio"] {
  display: none;
}

.radio-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #7f838c;
  position: relative;
  margin-right: 10px;
}

.radio-circle::before {
  content: "";
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: all 0.2s ease-in-out;
}

.radio-button input[type="radio"]:checked + .radio-circle::before {
  transform: translate(-50%, -50%) scale(1);
}

.radio-button input[type="radio"]:checked + .radio-circle::before {
  background-color: #232d5b;
}

.radio-label {
  font-size: 16px;
  font-weight: 400;
  color: #7f838c;
}

.radio-button input[type="radio"]:checked ~ .radio-label {
  color: #232d5b;
}

.radio-button:hover .radio-circle {
  border-color: #232d5b;
}

.radio-button:hover .radio-circle::before {
  background-color: #232d5b;
}

/* 2nd STEP */

.popup-container {
  justify-self: flex-start;

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
  padding-top: 14px;
  text-align: center;

  & a {
    color: inherit;
    font-size: inherit;
    text-decoration: underline;
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
    position: static;
    padding: 0 0 16px;
  }

  .popup-button-box-discounts {
    flex-wrap: wrap;
    position: static;
    margin-top: 60px;
  }
}

/* Date Picker */
.date-picker {
  padding: 15px;
  @include body-16-regular;
  color: #525660;

  outline: 1px solid transparent;
  border: 1px solid #e9e9e9;

  border-radius: 45px;
}
</style>
