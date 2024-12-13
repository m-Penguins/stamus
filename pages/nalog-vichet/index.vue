<script setup>
const route = useRoute();

const store = useFormStore();
const baseDataStore = useBaseDataStore();

const mockCheckBoxes = Array.from({ length: new Date().getFullYear() - 2021 + 1 }, (_, i) => ({
  name: (2021 + i).toString()
}));
const optionsData = [
  { name: "Получаю справку за себя" },
  { name: "Получаю справку за другого" },
];

const optionsDoc = baseDataStore.clinics?.data
    ?.map((el) => {
      const address = el?.attributes?.address;

      if (address) {
        return {
          name: `Заберу справку на ${el?.attributes?.address}`,
        };
      }
    })
    ?.filter(Boolean);

const sendData = () => {
  store.submitModal();
};

const baseUrl = useRuntimeConfig().public.baseUrl;

const privacyLink = baseDataStore?.footerData?.data?.attributes?.privacy?.data
    ?.attributes?.url
    ? baseUrl +
    baseDataStore?.footerData?.data?.attributes?.privacy?.data?.attributes?.url
    : "";
const bigImage = "images/big-images/info.jpg";

useHead({
  title: "Налоговый вычет в Стамус. Верните до 13% от стоимости лечения.",
  meta: [
    {
      name: "twitter:title",
      content: "Налоговый вычет в Стамус. Верните до 13% от стоимости лечения.",
    },
    {
      property: "og:title",
      content: "Налоговый вычет в Стамус. Верните до 13% от стоимости лечения.",
    },
    {
      name: "description",
      content:
          "На сайте можно заполнить онлайн заявку на получение налогового вычета в сеть стоматологий Стамус. Срок готовности справки до 14 рабочих дней.",
    },
    {
      name: "twitter:description",
      content:
          "На сайте можно заполнить онлайн заявку на получение налогового вычета в сеть стоматологий Стамус. Срок готовности справки до 14 рабочих дней.",
    },
    {
      property: "og:description",
      content:
          "На сайте можно заполнить онлайн заявку на получение налогового вычета в сеть стоматологий Стамус. Срок готовности справки до 14 рабочих дней.",
    },
  ],
  link: [{ rel: "canonical", href: "https://stamus.ru" + route.path }],
});
</script>

<template>
  <elements-main-info
      title="Налоговый <br/>вычет"
      :imgBg="bigImage"
      imgAlt="Налоговый вычет"
      local
      :isButtonBase="false"
      :breadcrumbs="[
      {
        title: 'Главная',
        url: '/',
      },
      {
        title: 'Налоговый вычет',
        url: '/nalog-vichet',
      },
    ]"
  />

  <div class="info">
    <div class="info-card">
      <div class="wrapper">
        <form class="accordion-content-inputs" @submit.prevent="sendData">
          <h3>Налогоплательщик</h3>
          <elements-input-base
              tag-type="input"
              label="ФИО"
              v-model="store.getterNameField"
              :errorMessage="store.isNameInfoValid ? '' : '*Минимум 2 символа'"
          />
          <elements-input-base
              tag-type="date"
              label="Дата рождения"
              v-model="store.birthDate"
              :errorMessage="store.isDateBirthValidInfo ? '' : '*Заполните поле'"
          />
          <elements-input-base
              tag-type="input"
              label="Номер и серия паспорта"
              v-model="store.passportSeries"
              :errorMessage="store.isPassportSeriesValid ? '' : '*Заполните поле'"
          />
          <elements-input-base
              tag-type="date"
              label="Дата выдачи документа"
              v-model="store.dateOfIssue"
              :errorMessage="store.isDateBirthValidInfo ? '' : '*Заполните поле'"
          />
          <elements-input-base
              minlength="10"
              tag-type="input"
              label="ИНН"
              v-model="store.digitField"
              :errorMessage="
              store.isDigitValidInfo
                ? ''
                : '*Проверьте правильность заполнения данных'
            "
          />

          <h3>Пациент</h3>
          <elements-input-base
              tag-type="input"
              label="ФИО"
              v-model="store.patientNameField"
              :errorMessage="
              store.isNamePatientFieldValid ? '' : '*Минимум 2 символа'
            "
          />
          <elements-input-base
              tag-type="date"
              label="Дата рождения"
              v-model="store.patientBirthDate"
              :errorMessage="store.isPatientBirthDateValid ? '' : '*Заполните поле'"
          />
          <elements-input-base
              tag-type="input"
              label="Номер и серия паспорта/свидетельства о рождении"
              v-model="store.patientPassportSeries"
              :errorMessage="store.isPatientPassportValid ? '' : '*Заполните поле'"
          />
          <elements-input-base
              tag-type="date"
              label="Дата выдачи документа"
              v-model="store.patientDateOfIssue"
              :errorMessage="store.isPatientDateValid ? '' : '*Заполните поле'"
          />
          <elements-input-base
              minlength="10"
              tag-type="input"
              label="ИНН"
              v-model="store.patientINN"
              :errorMessage="
              store.isPatientINNValid
                ? ''
                : '*Проверьте правильность заполнения данных'
            "
          />
          <elements-input-base
              tag-type="phoneMask"
              label="Контактный номер телефона"
              v-model="store.phoneField"
              :errorMessage="store.isPhoneValidInfo ? '' : '*Неверный формат'"
          />

          <h3>Общая информация</h3>
          <elements-select
              :options="optionsData"
              :default="'Получаю справку за'"
              class="select"
              @input="(v) => (store.whoIsGettingDocument = v?.name ?? '')"
          />
          <elements-select
              :options="optionsDoc"
              :default="'Как хотите получить справку'"
              class="select"
              @input="(v) => (store.address = v?.name ?? '')"
          />
          <elements-select
              :options="mockCheckBoxes"
              :default="'Проходил лечение в'"
              class="select"
              @input="(v) => (store.selectedYear = v)"
          />

          <div>
            <elements-button-base
                type="submit"
                title="Отправить"
                class="form-btn"
                :disabled="
                !store.isSubmitActivePersonalIncomeTax || store.isLoading
              "
            />
            <div v-if="store.isError" class="error-text">
              Что-то пошло не так, попробуйте еще раз чуть позже.
            </div>
            <div v-if="store.isSuccess" class="success-text">
              Спасибо, Ваша заявка отправлена.
            </div>
            <div class="info-dop-card-subtext">
              Нажимая кнопку отправить, вы соглашаетесь с
              <a :href="privacyLink" target="_blank"
              >Политикой обработки персональных данных</a
              >
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";
.info {
  width: 1280px;
  max-width: 100%;
  margin: 0 auto 100px;
}

.wrapper {
  margin-bottom: 40px;
}

.error-text {
  @include body-18-regular;
  color: red;
  text-align: center;
  margin-bottom: 10px;
}

.success-text {
  @include body-18-regular;
  color: rgb(32, 196, 32);
  text-align: center;
  margin-bottom: 10px;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  display: flex;
  width: 100%;
  padding: 16px 20px;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid var(--stroke, #e9e9e9);

  &__box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 20px;
    cursor: pointer;

    & svg {
      height: 44px;
      width: 44px;
    }
  }
}

.info-card:hover {
  border: 1px solid var(--stroke, #cfd5e1);
  .card-img-fill {
    stroke: #232d5b;
  }
  .card-img-stroke {
    stroke: #cfd5e1;
  }
}

@media (max-width: 900px) {
  .accordion-title {
    font-size: 16px;
  }
}

.info-links-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.link-info-doc {
  width: fit-content;
}

.accordion-content-subtitle {
  margin: 24px 0 24px;
}

.accordion-content-subtext {
  @include body-12-regular;
  color: $placeholder;
}

.accordion-content-text {
  padding-top: 14px;
  gap: 14px;
  @include body-14-regular;
  color: $gray-text;
}

.accordion-content-title {
  padding-bottom: 10px;
}

.accordion-title {
  @include body-18-regular;
  color: $dark-blue-subtitle;
  width: 95%;
}

.checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.checkbox input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid #7f838c;
  margin-right: 8px;
  display: inline-block;
  position: relative;
}

.checkbox input[type="checkbox"]:checked + .checkmark:after {
  content: "✓";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #fff;
}

.checkbox:hover .checkmark {
  border-color: #525660;
}

.label-text {
  @include body-16-regular;
  color: #7f838c;
}

.checkbox input[type="checkbox"]:checked + .checkmark {
  background-color: #232d5b;
  border-color: #232d5b;
}

.checkbox:hover .label-text {
  color: #525660;
}

.checkbox.checked .label-text {
  color: #232d5b;
}

.accordion-title {
  @include body-18-regular;
  color: $dark-blue-subtitle;
  width: 95%;
}

.form-btn {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
}

.info-dop-card-subtext {
  @include body-12-regular;
  color: $gray-text;
  opacity: 0.7;
  text-align: center;

  & a {
    color: inherit;
    font-size: inherit;
    text-decoration: underline;
  }
}

.info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  display: flex;
  width: 100%;
  padding: 14px 20px;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid var(--stroke, #e9e9e9);

  &__box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    width: 100%;
    cursor: pointer;
    scroll-margin-top: 160px;
  }
}

.info-card:hover {
  border: 1px solid var(--stroke, #cfd5e1);
}

.accordion-content-text {
  @include body-14-regular;
  color: $gray-text;
  padding-bottom: 16px;
}

.accordion-content-inputs {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 450px;
  padding-top: 20px;

  h3 {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16.2px;
    color: #7F838C;

    @media (max-width: 800px) {
      font-size: 12px;
    }
  }
}

.accordion-content-id1-box {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.accordion-content-id1-title {
  @include body-18-medium;
  color: $dark-blue-subtitle;
  padding-bottom: 4px;
}

.accordion-content-id1-subtitle {
  @include body-16-regular;
  font-weight: 500;
  color: $dark-blue-subtitle;
  padding-bottom: 4px;
}

.link-info-doc {
  width: fit-content;
}

@media (max-width: 1356px) {
  .info-card {
    &__box {
      scroll-margin-top: 120px;
    }
  }
}

@media (max-width: 900px) {
  .accordion-title {
    font-size: 16px;
  }
}
</style>
