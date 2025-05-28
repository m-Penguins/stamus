<script setup>
const route = useRoute();

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;
const directionSlug = route?.params?.direction;

const { data: directionData } = await useFetch(`${apiBaseUrl}main-derections`, {
  query: {
    "filters[slug][$eq]": directionSlug,
    populate: blocksQuey,
    sort: "order:asc",
  },
});

if (!directionData?.value?.data?.length) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

const placeholdersStore = usePlaceholdersStore();

const { data: serviceData } = await useFetch(`${apiBaseUrl}services`, {
  query: {
    "filters[slug][$eq]": route.params?.service,
    sort: "specialists.order:asc",
    populate:
      blocksQuey +
      ",specialists.fotoSpecialist.*,category.napravleniya_uslug_1_col.*,specialists.speczialnosti.*",
  },
});
console.log(serviceData);

if (!serviceData?.value?.data?.length) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

const serviceDirectionSlug =
  serviceData.value?.data?.[0]?.attributes?.category?.data?.attributes
    ?.napravleniya_uslug_1_col?.data?.attributes?.slug;

if (serviceDirectionSlug !== directionSlug) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

const mainInfo = serviceData?.value?.data?.[0]?.attributes;

const serviceId = serviceData?.value?.data?.[0]?.id;

const mainImg =
  mainInfo?.photoBanner?.data?.attributes?.url ??
  placeholdersStore?.imagePlaceholders?.services;

const mainImgAlt = mainInfo?.photoBanner?.data?.attributes?.alternativeText;

const serviceBlocks = mainInfo?.blocks.map((block) => {
  if (
    block.__component === "blocks-story.booking-doctor" &&
    block.spec?.data?.attributes
  ) {
    return {
      ...block,
      spec: {
        ...block.spec,
        data: {
          ...block.spec.data,
          attributes: {
            ...block.spec.data.attributes,
            uslugi: true,
          },
        },
      },
    };
  }
  return block;
});
// console.log(serviceBlocks)

const blockSpecialists = mainInfo?.specialists;

// console.log(blockSpecialists);

const directionName =
  mainInfo?.category?.data?.attributes?.napravleniya_uslug_1_col?.data
    ?.attributes?.heading;

const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: directionName,
    url: `/${route.params?.direction}`,
  },
  {
    title: mainInfo?.heading,
    url: `${route.fullPath}`,
  },
];

const metaData = mainInfo?.meta;
useHead(getMetaObject(metaData, baseUrl));

const medicalProcedureData = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: mainInfo?.heading,
  url: `${baseUrl}${route.fullPath}`,
  description: mainInfo?.description,
  procedureType: "Surgical",
  medicalSpecialty: "Dentistry",
  provider: {
    "@type": "MedicalOrganization",
    name: "Сеть стоматологических клиник «Стамус»",
    url: "https://stamus.ru/",
    logo: "https://stamus.ru/_nuxt/logo.-lH8lLee.svg",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+7-861-205-92-38",
      contactType: "customer service",
      availableLanguage: ["Russian"],
    },
  },
};

useHead({
  script: [
    {
      type: "application/ld+json",
      children: medicalProcedureData,
    },
  ],
});
</script>

<template>
  <DynamicBlockHero
    :title="mainInfo?.heading"
    :text="mainInfo?.description"
    :imgBg="mainImg"
    :imgAlt="mainImgAlt"
    :breadcrumbs="breadcrumbs"
    :link="mainInfo?.link"
    :link_text="mainInfo?.link_text"
  />
  <BlocksMapper
    :blocks="serviceBlocks"
    :serviceId="serviceId"
    :block-specialists="blockSpecialists"
  />
</template>

<style lang="scss" scoped></style>
