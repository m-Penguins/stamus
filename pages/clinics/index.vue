<script>
export default {
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
  async setup() {
    const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;

    const { data: specialistsData } = await useFetch(
      `${apiBaseUrl}specialists`,
      {
        query: {
          populate: "deep",
          "sort[0]": "order:asc",
        },
      },
    );

    if (!specialistsData.value) {
      throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
    }

    const assetsStore = useAssets();

    const bigImage = assetsStore.useAsset("images/big-images/clinics.png");

    const imgAdaptiv = assetsStore.useAsset(
      "images/big-images/clinic-adaptiv.png",
    );

    const arrayImg = [
      "gallery6.png",
      "gallery5.png",
      "gallery4.png",
      "gallery3.png",
      "gallery2.png",
    ].map((item) => assetsStore.useAsset(`images/gallery/${item}`));

    const mockArray = {
      name: "Овсоян Григорий",
      category: "Челюстно-лицевой хирург",
      img: assetsStore.useAsset("images/specialists/main-doctor.png"),
      text: "Лишь элементы политического процесса неоднозначны и будут призваны к ответу. Кстати,  элементы политического процесса набирают популярность среди определенных слоев населения, а значит, должны быть в равной степени предоставлены сами себе. Таким образом, сложившаяся структура организации способствует повышению качества своевременного выполнения сверхзадачи. Мы вынуждены отталкиваться от того, что сплочённость команды профессионалов прекрасно подходит для реализации как самодостаточных, так и внешне зависимых концептуальных решений. И нет сомнений, что независимые государства, инициированные исключительно синтетически.",
    };
    return {
      mockArray,
      specialistsData,
      arrayImg,
      bigImage,
      imgAdaptiv,
    };
  },
};
</script>

<template>
  <elements-main-info
    title="5 клиник в Краснодаре"
    text="1 место в Краснодаре"
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
        title: 'Клиники',
        url: '/clinics',
      },
    ]"
  />
  <blocks-video-block
    title="О компании"
    text="Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены. С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта не даёт нам иного выбора, кроме определения приоретизации разума над эмоциями. Разнообразный и богатый опыт говорит нам, что укрепление и развитие внутренней структуры в значительной степени обусловливает важность системы массового участия."
  />
  <blocks-chief-doctor-block :specialists="mockArray" />
  <blocks-clinics-photo-block />
  <blocks-gallery :arrayImg="arrayImg" />
  <blocks-our-specialists
    v-if="specialistsData.data && !error"
    :data="specialistsData.data"
    title="Наши специалисты"
  />
  <BlocksMainBanner
    :title="'Добровольное медицинское страхование'"
    :text="'которое в отличие от обязательного обеспечивает получение гражданином дополнительных медицинских услуг'"
    :titleLink="'Узнать подробнее'"
    link="#"
    bgColor="light-blue"
    type="true"
    img="cards2.png"
    bigImg="true"
    :handleLinkClick="openBidModal"
  />
  <BlocksMainBanner
    :title="'Наше приложение'"
    :text="'Мы разработали собственное приложение для вашего удобства! Оно есть и на iOS и на Android. Теперь вам не нужно ждать ответа администратора и вы можете записаться на прием самостоятельно! А еще в приложении есть программа лояльности и все актуальные скидки)'"
    :titleLink="'Узнать подробнее'"
    link="/stamusapp"
    bgColor="grey"
    type="true"
    img="mob5.png"
    bigImg="true"
  />
  <blocks-main-feedback />
  <blocks-main-form />
</template>
