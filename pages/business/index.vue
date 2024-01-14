<script>
import { mockBusinessCards } from "../../stores/mockData";
export default {
  props: {
    isDiscounts: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      item: true,
    };
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.item = window.innerWidth <= 1110 ? false : true;
    },
  },
  setup() {
    const togglerPopup = (state) => {
      isOpenPopup.value = state;
    };
    const isOpenPopup = ref(false);

    const mockArrayImg = [
      { img: "partner1.png" },
      { img: "partner2.png" },
      { img: "partner3.png" },
      { img: "partner4.png" },
      { img: "partner5.png" },
      { img: "partner6.png" },
      { img: "partner7.png" },
      { img: "partner8.png" },
      { img: "partner9.png" },
      { img: "partner10.png" },
      { img: "partner11.png" },
      { img: "partner12.svg" },
      { img: "partner13.svg" },
      { img: "partner14.svg" },
      { img: "partner15.svg" },
      { img: "partner16.svg" },
      { img: "partner17.svg" },
      { img: "partner18.svg" },
    ];

    const assetsStore = useAssets();
    const bigImage = assetsStore.useAsset("images/big-images/business.png");

    const imgAdaptiv = assetsStore.useAsset(
      "images/big-images/business-adaptiv.png",
    );

    const baseDataStore = useBaseDataStore();

    const mockArray = {
      name: "Клиника Стамус",
      img: assetsStore.useAsset("images/specialists/main-doctor2.png"),
      text: "Во всех клиниках Стамус врачи ведут прием по ДМС, а так же проводят лечение корпоративным клиентам. Это очень удобно, так как организации с которыми мы сотрудничаем имеют офисы по всему Краснодару и ваши сотрудники могут обратиться в ближайшую для себя клинику Стамус.<br /><br />Мы давно сотрудничаем с предприятиями, но всегда готовы подойти индивидуально к запросам организации.<br /><br />Постоплата предусмотрена для всех организаций.<br /><br />По ДМС мы предоставляем весь перечень услуг от лечения зубов до имплантации и протезирования. Сотрудничаем с большинством страховых компаний и ежемесячно заключаем договора с новыми.",
    };

    useHead({
      title: "Лечение по ДМС. Взрослая и детская стоматология Стамус",
      meta: [
        {
          name: "twitter:title",
          content: "Лечение по ДМС. Взрослая и детская стоматология Стамус",
        },
        {
          property: "og:title",
          content: "Лечение по ДМС. Взрослая и детская стоматология Стамус",
        },
        {
          name: "description",
          content:
            "Все филиалы сети стоматологий «СТАМУС» в Краснодаре оказывают услуги по системе ДМС. А так же предоставляют выгодные условия корпоративным клиентам",
        },
        {
          name: "twitter:description",
          content:
            "Все филиалы сети стоматологий «СТАМУС» в Краснодаре оказывают услуги по системе ДМС. А так же предоставляют выгодные условия корпоративным клиентам",
        },
        {
          property: "og:description",
          content:
            " дмс стоматология, дмс стоматология краснодар, полис дмс стоматлогия, лмс стоматология для физических, согаз дмс стоматология",
        },
        {
          name: "keywords",
          content:
            "оставить отзыв стамус, оставить отзыв стамусмед, оставить отзыв stamus",
        },
      ],
    });
    return {
      mockArrayImg,
      mockBusinessCards,
      mockArray,
      isOpenPopup,
      togglerPopup,
      bigImage,
      imgAdaptiv,
      mockArray,
      baseDataStore,
    };
  },
};
</script>

<template>
  <blocks-main-popap-modal-form
    :isPriceForm="true"
    @togglerPopup="togglerPopup"
    :isOpen="isOpenPopup"
    :clinics="baseDataStore.clinics"
  />
  <elements-main-info
    title="Бизнесу и корпоративным клиентам"
    text="Все клиники Стамус работают с ДМС"
    :imgBg="bigImage"
    :imgAdaptiv="imgAdaptiv"
    :isButtonBase="false"
    :typeColorWhite="item"
    :typeColorWhiteText="item"
    :breadcrumbs="[
      {
        title: 'Главная',
        url: '/',
      },
      {
        title: 'Бизнесу и корпоративным клиентам',
        url: '/business',
      },
    ]"
  />
  <blocks-business-block :data="mockBusinessCards" />
  <BlocksMainBanner
    :title="'Корпоративные цены'"
    :text="'Индивидуальный прайс для организаций, система лояльности для ваших сотрудников'"
    :titleLink="'Оставить заявку'"
    link="#"
    :handleLinkClick="openBidModal"
    bgColor="business"
    img="price.png"
    bigImg="true"
    :type="false"
  />
  <blocks-chief-doctor-block :specialists="mockArray" />
  <blocks-partners-block :data="mockArrayImg" />
  <blocks-main-form />
</template>
