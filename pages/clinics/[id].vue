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

    const chiefDoctor = computed(() => {
      return {
        name: clinicData.value?.attributes?.chiefDoctor?.heading,
        category: clinicData.value?.attributes?.chiefDoctor?.position,
        img:
          baseUrl +
          clinicData.value?.attributes?.chiefDoctor?.image?.data?.attributes
            ?.url,
        text: clinicData.value?.attributes?.chiefDoctor?.text,
      };
    });

    console.log(chiefDoctor.value);

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
        title: `${clinicData.value?.attributes?.heading}`,
        url: `/clinics/${route.params.id}`,
      },
    ];
    return {
      clinicData,
      baseUrl,
      route,
      breadcrumbs,
      chiefDoctor,
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
    :isBgDark="true"
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
  <blocks-chief-doctor-block
    v-if="chiefDoctor.name"
    :specialists="chiefDoctor"
  />
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

<!-- <style>
.bg-dark {
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.3);
}
</style> -->
