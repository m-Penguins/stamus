<script setup>
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const [{ data: fourSpecialists }, { data: articlesData }] = await Promise.all([
  useFetch(`${apiBaseUrl}specialists`, {
    query: {
      "pagination[page]": 1,
      "pagination[pageSize]": 4,
      populate: "deep",
    },
  }),
  useFetch(`${apiBaseUrl}articles`, { query: { populate: "deep" } }),
]);

const articles = articlesData.value?.data?.map((art) => {
  return {
    id: art?.id,
    heading: art?.attributes?.heading,
    img: art?.attributes?.fotoArticles?.data?.attributes?.url
      ? baseUrl + art?.attributes?.fotoArticles?.data?.attributes?.url
      : assetsStore.useAsset("images/articles/articles-dital.png"),
    text: art?.attributes?.text,
    tags: art?.attributes?.tags,
    description: art?.attributes?.description,
  };
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

const reviews = [
  {
    name: "Пациент +7-989-00XXXXX",
    grade: "4,8",
    text: '"Стамус" отличная клиника для всей семьи. Познакомилась с этой клиникой благодаря сыну. Очень понравились детские стоматологи. И не раздумывая, решила выбрать эту клинику и для себя. Проходила здесь лечение, врач профессионально провел лечение в комфортной для меня обстановке. Доктор был очень внимательный, вежливый, отзывчивый. Очень подробно отвечал на все мои вопросы. Я осталась очень довольна. Кстати, цвет подобрал идеальный. Рекомендую эту клинику и этих специалистов.',
    date: "20 сентября",
  },
  {
    name: "Пациент +7-918-08XXXXX",
    grade: "4,9",
    text: "Обратилась с болью в зубе. Удалили зуб безболезненно и быстро, поставили имплант, поставили ортопедическую часть. Всем осталась максимально довольна: чистотой, вниманием, обслуживанием и улыбками! Данную клинику рекомендую на 100 процентов! Понравилось месторасположение, профессионализм врачей, спектр услуг, современное оборудование, доброжелательность! Абсолютно всё!",
    date: "14 сентября",
  },
  {
    name: "Пациент +7-928-43XXXXX",
    grade: "5,0",
    text: 'Мы обратились по поводу удаления зуба дочке, которая ранее наотрез отказалась идти к стоматологу в обычной поликлинике (истерика и убегание, отбивание руками и прочие "прелести"). По рекомендации другого доктора обратились в "Стамус" . Моему восторгу нет предела. Профессионализм, чуткость, доброта, забота - вызвали слезы на глазах. Спасибо вам огромное. Не навязывали лишние услуги и лишние расходы. Объективно отвечали на вопросы. Комфортно для детей. Игровая - супер, подарки после приема - супер.',
    date: "8 сентября",
  },
  {
    name: "Пациент +7-938-88XXXXX",
    grade: "4.9",
    text: 'Обращался по удалению и одновременной имплантации, было удалено и имплантировано 5 зубов. Операция проводилась под наркозом за 1 раз. Все очень понравилось, врачи провели осмотр, рассказали об этапах и как все будет проходить. Максимально подробно. После операции также все рассказали, дали рекомендации по питанию. Через неделю сняли швы и проконсультировали по дальнейшим шагам. Весь персонал отзывчивый, всегда готов помочь, даже присылают "напоминалки" о том, что прием назначен. Клиника технологична, не нужно рассказывать, зачем ты пришел.',
    date: "30 августа",
  },
  {
    name: "Пациент +7-918-37XXXXX",
    grade: "5,0",
    text: 'После неудачного посещения врача в детской поликлинике, обратились в детскую клинику "СтамусМед". И, начиная с ресепшен и до самого посещения врача, сразу увидели контраст. Уважительное отношение к пациентам. Внимательно выслушали, пригласили врача, который грамотно проконсультировал, все разъяснил. Записали на прием в удобное для нас время. Когда посетили врача, то увидели и почувствовали грамотного, внимательного специалиста. Врач осмотрела, очень внимательно слушала ребенка. Все делала квалифицированно и, главное, уважительно. После такого приема решили, что данная клиника и такой врач будет для нас постоянным.',
    date: "19 июня",
  },
];
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
    link="https://prodoctorov.ru/krasnodar/set/1642-stomatologiya-stamus/"
    bgColor="blue-gradient"
    img="mobile.svg"
    bigImg="true"
  />
  <blocks-main-feedback :reviews="reviews" />
  <BlocksMainBanner
    :title="'Лучшая детская стоматология'"
    :text="'среди частных детских стоматологий Краснодара по версии экспертного журнала Startsmile при поддержке ИД “КоммерстантЪ”'"
    :additionalText="' *1 место в рейтинге детских стоматологических клиник Краснодара за 2022 (клиники, которым более 3-х лет)'"
    :titleLink="'Узнать подробнее'"
    link="/detskaya-stomatologiya"
    bgColor="dark-red"
    img="image.png"
  />
  <blocks-main-articles title="Статьи" :articles="articles" />

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
