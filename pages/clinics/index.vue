<script setup>
const item = ref(true);
const route = useRoute();
const checkScreenSize = () => {
  item.value = window.innerWidth <= 1110 ? false : true;
};

onMounted(() => {
  checkScreenSize();
  window?.addEventListener("resize", checkScreenSize);
});

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;

const [{ data: clinicsData }, { data: specialistsData }] = await Promise.all([
  useFetch(`${apiBaseUrl}clinics`, {
    query: {
      populate: "photoBanner.*",
    },
  }),
  useFetch(`${apiBaseUrl}specialists`, {
    query: {
      populate: "fotoSpecialist.*,achievements.*",
      "sort[0]": "order:asc",
    },
  }),
]);

if (!specialistsData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

const sortSpecialistsByOrder = (data) => {
  if (
    data.attributes &&
    data.attributes.specialists &&
    data.attributes.specialists.data
  ) {
    const withOrder = [];
    const withoutOrder = [];

    data.attributes.specialists.data.forEach((item) => {
      if (item.attributes.order === null) {
        withoutOrder.push(item);
      } else {
        withOrder.push(item);
      }
    });

    // Сортировка элементов с order по убыванию
    withOrder.sort(
      (a, b) =>
        parseInt(a.attributes.order, 10) - parseInt(b.attributes.order, 10),
    );

    data.attributes.specialists.data = [...withoutOrder, ...withOrder];
  }
  return data;
};
// const newSpec = specialistsData.data;

const sortedData = sortSpecialistsByOrder(specialistsData.value.data);

const assetsStore = useAssets();

const bigImage = "images/big-images/clinics.jpg";
const imageAlt = "Клиники";

const arrayImg = [
  "clinic-gallery1.jpg",
  "clinic-gallery2.jpg",
  "clinic-gallery3.jpg",
  "clinic-gallery4.jpg",
  "clinic-gallery5.jpg",
].map((item) => `images/gallery/${item}`);

const mockArray = {
  name: "Миссия и ценности клиник Стамус",
  img: "images/specialists/main-doctor2.png",
  text: `Миссия нашей сети клиник:  обеспечить пациентов экспертным медицинским сопровождением в любом районе Краснодара. Главная ценность – понять каждого пациента: сделать результат, о котором он мечтал.<br /><br />Новым пациентам мы обеспечиваем комфорт пребывания в клинике, понятные цены и планы лечения; анестезия и другие сопутствующие услуги не требуют доплаты. <br /><br />Наши пациенты доверяют Стамус – при повышении цен они продолжают идти по плану лечения с прежними ценами. Мы реагируем на замечания пациентов и исправляем их, будь то размер бахил, фоновая музыка, или пол ассистента и врача. <br /><br />И наконец, нам доверяют врачи других клиник – направляют пациентов при сложных медицинских случаях: перелечивания, отягощенного анамнеза, патологий.`,
};

useHead({
  title: "Все стоматологические клиники Стамус: адреса и контактная информация",
  meta: [
    {
      name: "twitter:title",
      content:
        "Все стоматологические клиники Стамус: адреса и контактная информация",
    },
    {
      property: "og:title",
      content:
        "Все стоматологические клиники Стамус: адреса и контактная информация",
    },
    {
      name: "description",
      content:
        "Сеть клиник Стамус представлена в каждом районе города Краснодара. Узнайте на сайте адреса и контактную информацию интересующей вас стоматологии.",
    },
    {
      name: "twitter:description",
      content:
        "Сеть клиник Стамус представлена в каждом районе города Краснодара. Узнайте на сайте адреса и контактную информацию интересующей вас стоматологии.",
    },
    {
      property: "og:description",
      content:
        "Сеть клиник Стамус представлена в каждом районе города Краснодара. Узнайте на сайте адреса и контактную информацию интересующей вас стоматологии.",
    },
    // {
    //   name: "keywords",
    //   content:
    //     "стамус, stamus, клиника стамус, стоматология стамус, стамус краснодар, стоматологическая клиника стамус",
    // },
  ],
  link: [{ rel: "canonical", href: "https://stamus.ru" + route.path }],
});
</script>

<template>
  <elements-main-info
    :title="`${clinicsData?.data?.length ?? 5} клиник в Краснодаре`"
    :imgBg="bigImage"
    :imgAlt="imageAlt"
    local
    :isButtonBase="false"
    :typeColorWhite="item"
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
    text="«Стамус» работает уже более 17 лет, за это время мы создали:
 <br /><br />– Коллектив из более 120 врачей<br />– Самое большое детское стоматологическое отделение<br />– Центр челюстно-лицевой хирургии (одними из первых частных клиник)<br />– Детскую многопрофильную клинику<br />– Возможность лечиться взрослым и детям под наркозом (во сне) 365 дней в году<br /><br />В «Стамус» ежегодно обслуживается более 50 тысяч пациентов."
  />
  <blocks-chief-doctor-block :specialists="mockArray" />
  <blocks-clinics-photo-block :clinics-data="clinicsData" />
  <blocks-gallery :arrayImg="arrayImg" :local="true" />
  <blocks-our-specialists
    v-if="specialistsData.data"
    :data="sortedData"
    title="Наши врачи"
  />
  <BlocksMainBanner
    :title="'Добровольное медицинское страхование'"
    :text="'Сотрудничаем со всеми страховыми компаниями'"
    :titleLink="'Узнать подробнее'"
    link="#"
    bgColor="light-blue"
    type
    img="cards2.png"
    bigImg="true"
    :handleLinkClick="openBidModal"
  />
  <BlocksMainBanner
    :title="'Наше приложение'"
    :text="'Мы разработали собственное приложение для вашего удобства! Оно есть и на iOS и на Android. Теперь вам не нужно ждать ответа оператора и вы можете записаться на прием самостоятельно! А еще в приложении есть история визитов, информация об акциях и можно ознакомиться с документацией клиники'"
    :titleLink="'Узнать подробнее'"
    link="/stamusapp"
    bgColor="grey"
    type
    img="phone5.png"
    bigImg="true"
  />
  <blocks-main-feedback />
  <blocks-main-form />
</template>
