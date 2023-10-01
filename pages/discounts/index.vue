<template>
  <elements-main-info 
    title="Акции и скидки" 
    text="Небольшое описание в несколько строчек" 
    :imgBg="bigImage" 
    :imgAdaptiv="imgAdaptiv" 
    :isButtonBase="false"
    :breadcrumbs="[
        {
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Акции и скидки',
          url: '/discounts'
        }
        ]"
  />
  <BlocksMainBanner 
    :title="'Счастливые часы'"
    :text="'Скидки до 50%'"
    :titleLink="'Воспользоваться акцией'"
    :link="`/discounts/${linkTransform('Счастливые часы')}`"
    bgColor="dark-blue-gradient"
    img="tooth.png"
    bigImg=true
  />
  <BlocksMainBanner 
    :title="'Выезд педиатра на дом'"
    :text="'Скидка 25% в июне'"
    :titleLink="'Воспользоваться акцией'"
    link="#"
    :handleLinkClick="openDiscountsModal"
    bgColor="dark-blue-gradient"
    img="bag.png"
    bigImg=true
  />
  <BlocksMainBanner 
    :title="'Боитесь стоматологов?'"
    :text="'В стоматологии Стамус есть оптимальное вариант для вас – лечение зубов во сне'"
    :titleLink="'Воспользоваться акцией'"
    link="#"
    :handleLinkClick="openDiscountsModal"
    bgColor="dark-blue-gradient"
    img="tooth.png"
    bigImg=true
  />
  <blocks-main-form />
</template>

<script>
export default {
   props: {
      isDiscounts: {
        type: Boolean,
        default: false
      },
   },
   methods: {
    handleLinkClick() {
      this.isOpenPopup = true
    }
  },
  setup() {
    const assetsStore = useAssets();
    const bigImage = assetsStore.useAsset("images/big-images/discounts.png");

    const imgAdaptiv = assetsStore.useAsset(
      "images/big-images/discounts-adaptiv.png",
    );
    const togglerPopup = (state) => {
      isOpenPopup.value = state
    }
    const isOpenPopup = ref(false);
    return {
      isOpenPopup,
      togglerPopup,
      bigImage,
      imgAdaptiv
    }
  }
}
</script>