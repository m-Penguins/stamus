<script>
import { mockBusinessCards } from '../../stores/mockData'
export default {
  props: {
    isDiscounts: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      item: true
    };
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.item = window.innerWidth <= 1110 ? false : true;
    },
  },
  setup() {
     const togglerPopup = (state) => {
      isOpenPopup.value = state
    }
    const isOpenPopup = ref(false);
    const mockArray = 
    {
      name: 'Овсоян Григорий', 
      category: 'Челюстно-лицевой хирург', 
      img:"main-doctor.png", 
      text:"Лишь элементы политического процесса неоднозначны и будут призваны к ответу. Кстати,  элементы политического процесса набирают популярность среди определенных слоев населения, а значит, должны быть в равной степени предоставлены сами себе. Таким образом, сложившаяся структура организации способствует повышению качества своевременного выполнения сверхзадачи. Мы вынуждены отталкиваться от того, что сплочённость команды профессионалов прекрасно подходит для реализации как самодостаточных, так и внешне зависимых концептуальных решений. И нет сомнений, что независимые государства, инициированные исключительно синтетически." 
    }
    const mockArrayImg = [
      {img: 'partner1.png'},
      {img: 'partner2.png'},
      {img: 'partner3.png'},
      {img: 'partner4.png'},
      {img: 'partner5.png'},
      {img: 'partner6.png'},
    ]

    const assetsStore = useAssets();
    const bigImage = assetsStore.useAsset("images/big-images/business.png");

    const imgAdaptiv = assetsStore.useAsset(
      "images/big-images/business-adaptiv.png",
    );
   return {
      mockArrayImg,
      mockBusinessCards,
      mockArray,
      isOpenPopup,
      togglerPopup,
      bigImage,
      imgAdaptiv
    };
  }
};
</script>

<template>
<blocks-main-popap-modal-form :isPriceForm=true @togglerPopup='togglerPopup' :isOpen="isOpenPopup"/>
  <elements-main-info 
    title="Бизнесу и корпортивным клиентам" 
    text="Небольшое описание в несколько строчек" 
    :imgBg="bigImage" 
    :imgAdaptiv="imgAdaptiv" 
    :isButtonBase="false"
    :typeColorWhite="item"
    :typeColorWhiteText="item"
    :breadcrumbs="[
        {
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Бизнесу и корпоративным клиентам',
          url: '/business'
        }
        ]"
  />
  <blocks-business-block :data="mockBusinessCards"/>
  <BlocksMainBanner 
    :title="'Корпоративные цены'"
    :text="'Для организаций предусмотрен лояльный прайс лист на все базовые услуги'"
    :titleLink="'Оставить заявку'"
    link="#"
    :handleLinkClick="openBidModal"
    bgColor="light-blue"
    type="true"
    img="price.png"
    bigImg=true
  />
  <blocks-chief-doctor-block :specialists="mockArray" />
  <blocks-partners-block :data="mockArrayImg"/>
  <blocks-main-form />
</template>