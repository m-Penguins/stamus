<template>
<blocks-main-popap-modal-form @togglerPopup='togglerPopup' :isOpen="isOpenPopup" :isDiscounts="true"/>
  <elements-main-info 
    title="Акции и скидки" 
    text="Небольшое описание в несколько строчек" 
    imgBg="discounts.png" 
    imgAdaptiv="discounts-adaptiv.png" 
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
    :link="`/discounts/${assetsStorelinkTransform.linkTransform('Счастливые часы')}`"
    bgColor="dark-blue-gradient"
    img="tooth.png"
    bigImg=true
  />
  <BlocksMainBanner 
    :title="'Выезд педиатра на дом'"
    :text="'Скидка 25% в июне'"
    :titleLink="'Воспользоваться акцией'"
    link="#"
    :handleLinkClick="handleLinkClick"
    bgColor="dark-blue-gradient"
    img="bag.png"
    bigImg=true
  />
  <BlocksMainBanner 
    :title="'Боитесь стоматологов?'"
    :text="'В стоматологии Стамус есть оптимальное вариант для вас – лечение зубов во сне'"
    :titleLink="'Воспользоваться акцией'"
    link="#"
    :handleLinkClick="handleLinkClick"
    bgColor="dark-blue-gradient"
    img="tooth.png"
    bigImg=true
  />
  <blocks-main-form />
</template>

<script>
import { linkTransforms } from '../../stores/linkTransform';
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
    const togglerPopup = (state) => {
      isOpenPopup.value = state
    }
    const isOpenPopup = ref(false);
    const assetsStorelinkTransform = linkTransforms();
    return {
      isOpenPopup,
      assetsStorelinkTransform,
      togglerPopup
    }
  }
}
</script>