<script setup>
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;
const assetsStore = useAssets();

const { data: fourSpecialists } = await useFetch(`${apiBaseUrl}specialists`, {
  query: {
    "pagination[page]": 1,
    "pagination[pageSize]": 4,
    populate: "deep",
  },
});

const mainSpecialists = fourSpecialists.value?.data?.map((sp) => {
  return {
    id: sp?.id,
    name: `${sp?.attributes?.firstName} ${sp?.attributes?.lastName}`,
    category: sp?.attributes?.position,
    img: sp?.attributes?.fotoSpecialist?.data?.attributes?.formats?.thumbnail
      ?.url
      ? baseUrl +
        sp?.attributes?.fotoSpecialist?.data?.attributes?.formats?.thumbnail
          ?.url
      : assetsStore.useAsset("images/icons/logo.svg"),
    imgBig: sp?.attributes?.fotoSpecialist?.data?.attributes?.url
      ? baseUrl + sp?.attributes?.fotoSpecialist?.data?.attributes?.url
      : assetsStore.useAsset("images/icons/logo.svg"),
    experience: {
      year: sp?.attributes?.meetingPerson?.dataMeeting?.[0]?.total,
      text: sp?.attributes?.meetingPerson?.dataMeeting?.[0]?.item,
    },
    review: {
      year: sp?.attributes?.meetingPerson?.dataMeeting?.[1]?.total,
      text: sp?.attributes?.meetingPerson?.dataMeeting?.[1]?.item,
    },
    consultation: {
      year: sp?.attributes?.meetingPerson?.dataMeeting?.[2]?.total,
      text: sp?.attributes?.meetingPerson?.dataMeeting?.[2]?.item,
    },
  };
});

console.log(mainSpecialists);
</script>

<template>
  <blocks-main-primary-banner />
  <BlocksMainBanner
    :title="'Лечим не только зубы'"
    :text="'Многопрофильная детская клиника СтамусМед'"
    :titleLink="'Узнать подробнее'"
    link="/detskaya-klinika"
    bgColor="light-blue-gradient"
    type="true"
    img="girl.png"
  />
  <blocks-main-areas />
  <blocks-main-specialists :mainSpecialists="mainSpecialists" />
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
  <blocks-main-popularServices />
  <BlocksMainBanner
    :selectedText="true"
    :text="'Независимый всеройсийский портал Продокторов'"
    :titleLink="'Записаться онлайн'"
    link="#"
    bgColor="blue-gradient"
    img="mobile.svg"
    bigImg="true"
  />
  <blocks-main-feedback />
  <BlocksMainBanner
    :title="'Лучшая детская стоматология'"
    :text="'среди частных детских стоматологий Краснодара по версии экспертного журнала Startsmile при поддержке ИД “КоммерстантЪ”'"
    :additionalText="' *1 место в рейтинге детских стоматологических клиник Краснодара за 2022 (клиники, которым более 3-х лет)'"
    :titleLink="'Узнать подробнее'"
    link="/detskaya-stomatologiya"
    bgColor="dark-red"
    img="image.png"
  />
  <blocks-main-articles title="Статьи" />
  <blocks-main-seo
    title="СЕО текст"
    text="Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены.
            С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта не даёт нам иного выбора,
            кроме определения приоретизации разума над эмоциями. Разнообразный и богатый опыт говорит нам,
            что укрепление и развитие внутренней структуры в значительной степени обусловливает важность системы массового участия."
    img="rectangle.png"
  />
  <blocks-main-form />
</template>

<style lang="scss" scoped>
@import "../assets/styles/style.scss";
</style>
