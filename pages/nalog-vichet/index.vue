<script setup>
const route = useRoute();

const store = useFormStore();
const baseDataStore = useBaseDataStore();

const mockCheckBoxes = [
  "Проходил лечение в 2021 г",
  "Проходил лечение в 2022 г",
  "Проходил лечение в 2023 г",
];
const optionsData = [
  { name: "Получаю справку за себя" },
  { name: "Получаю справку за ребенка" },
  { name: "Получаю справку за супруга(-и)" },
  { name: "Получаю справку за родителя" },
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
    // {
    //   name: "keywords",
    //   content:
    //     "ндфл стамус, ндфл стамусмед, налоговый вычет за лечение зубов, налоговый вычет стамус, налоговый вычет стамусмед, налоговый вычет имплантация",
    // },
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
        <p class="accordion-content-text">
          Вы можете сделать налоговый вычет за медицинские услуги,
          предоставленные лично вам, вашему мужу (жене), детям и подопечным до
          18 лет, родителям. В наших клиниках вы можете получить справку об
          оплате медицинских услуг для предоставления в налоговую инспекцию. Для
          получения такой справки вам необходимо заполнить заявку на нашем сайте
          или обратиться к администраторам на ресепшн клиники. Срок подготовки
          справки — от 14 до 21 рабочих дней с момента обращения. Вместе со
          справкой мы выдаем копию лицензии на ведение медицинской деятельности
          (она также понадобится в налоговой)
        </p>
        <form class="accordion-content-inputs" @submit.prevent="sendData">
          <elements-input-base
            tag-type="input"
            label="ФИО налогоплательщика"
            v-model="store.getterNameField"
            :errorMessage="store.isNameInfoValid ? '' : '*Минимум 2 символа'"
          />
          <elements-input-base
            minlength="10"
            tag-type="input"
            label="Введите ИНН"
            v-model="store.digitField"
            :errorMessage="
              store.isDigitValidInfo
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

          <label
            v-for="(box, index) in mockCheckBoxes"
            :key="index"
            :for="box"
            class="checkbox"
          >
            <input
              v-model="store.checkBoxes"
              type="checkbox"
              :id="box"
              :value="box"
            />
            <span class="checkmark"></span>
            <span class="label-text">{{ box }}</span>
          </label>

          <elements-select
            :options="optionsData"
            :default="'Получаю справку'"
            class="select"
            @input="(v) => (store.whoIsGettingDocument = v?.name ?? '')"
          />
          <elements-input-base
            tag-type="input"
            label="ФИО пациента"
            v-model="store.patientNameField"
            :errorMessage="
              store.isNamePatientFieldValid ? '' : '*Минимум 2 символа'
            "
          />
          <elements-select
            :options="optionsDoc"
            :default="'Как хотите получить справку'"
            class="select"
            @input="(v) => (store.address = v?.name ?? '')"
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
