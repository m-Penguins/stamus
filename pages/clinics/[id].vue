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
    const arrayImg = [
      "gallery6.png",
      "gallery5.png",
      "gallery4.png",
      "gallery3.png",
      "gallery2.png",
      "gallery1.png",
    ];

    const mockArray = {
      name: "Овсоян Григорий",
      category: "Челюстно-лицевой хирург",
      img: "main-doctor.png",
      text: "Лишь элементы политического процесса неоднозначны и будут призваны к ответу. Кстати,  элементы политического процесса набирают популярность среди определенных слоев населения, а значит, должны быть в равной степени предоставлены сами себе. Таким образом, сложившаяся структура организации способствует повышению качества своевременного выполнения сверхзадачи. Мы вынуждены отталкиваться от того, что сплочённость команды профессионалов прекрасно подходит для реализации как самодостаточных, так и внешне зависимых концептуальных решений. И нет сомнений, что независимые государства, инициированные исключительно синтетически.",
    };
    const route = useRoute();

    const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;

    const baseUrl = useRuntimeConfig().public.baseUrl;

    const { data: clinicsData } = await useFetch(
      `${apiBaseUrl}clinics?populate=deep`,
    );

    if (!clinicsData.value) {
      throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
    }

    const clinicData = computed(() =>
      clinicsData.value?.data?.find(
        (cl) => String(cl.id) === String(route.params.id),
      ),
    );

    const chiefDoctor = computed(() => clinicData.value?.chiefDoctor);

    const otherClinics = computed(() =>
      clinicsData.value?.data
        ?.filter((cl) => String(cl.id) !== String(route.params.id))
        .map((cl) => {
          return {
            name: cl?.attributes?.heading,
            img: baseUrl + cl?.attributes?.photoBanner?.data?.attributes?.url,
            link: String(cl?.id),
          };
        }),
    );

    const breadcrumbs = [
      {
        title: "Главная",
        url: "/",
      },
      {
        title: "Клиники",
        url: "/clinics",
      },
      {
        title: `${clinicsData.value?.data?.attributes?.heading}`,
        url: `/clinics/${route.params.id}`,
      },
    ];
    return {
      clinicData,
      baseUrl,
      route,
      breadcrumbs,
      mockArray,
      otherClinics,
      arrayImg,
    };
  },
};
</script>

<template>
  <elements-main-info
    :title="clinicData?.attributes?.heading"
    :text="clinicData?.attributes?.address"
    :imgBg="
      baseUrl + clinicData?.attributes?.photoBanner?.data?.attributes?.url
    "
    :imgAdaptiv="`${baseUrl}${
      clinicData?.attributes?.photoBanner?.data?.attributes?.formats?.small
        ?.url ??
      clinicData?.attributes?.photoBanner?.data?.attributes?.formats?.medium
        ?.url ??
      clinicData?.attributes?.photoBanner?.data?.attributes?.url
    }`"
    :isDital="true"
    :isButtonBase="false"
    :typeColorWhite="item"
    :typeColorWhiteText="item"
    :breadcrumbs="breadcrumbs"
  />
  <blocks-video-block
    v-if="clinicData?.attributes?.infoBlock"
    :title="clinicData?.attributes?.infoBlock?.heading"
    :text="clinicData?.attributes?.infoBlock?.text"
    :link="clinicData?.attributes?.infoBlock?.link"
    :video="
      baseUrl + clinicData?.attributes?.infoBlock?.video?.data?.attributes?.url
    "
    :videoThumbnail="
      baseUrl + clinicData?.attributes?.infoBlock?.image?.data?.attributes?.url
    "
  />
  <blocks-chief-doctor-block :specialists="mockArray" />
  <blocks-services-block
    :addresData="addresData"
    title="Оказываемые услуги"
    :isLink="false"
  />
  <blocks-gallery :arrayImg="arrayImg" />
  <blocks-our-specialists
    v-if="clinicData?.attributes?.specialists?.data"
    title="Наши специалисты"
    :data="clinicData?.attributes?.specialists?.data"
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
  <blocks-main-feedback />
  <blocks-clinics-adress
    v-if="otherClinics"
    text="Другие клиники"
    :dataDirection="otherClinics"
  />
  <blocks-main-form />
</template>
