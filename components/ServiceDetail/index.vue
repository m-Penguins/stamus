<script setup>
const route = useRoute();

const store = useModalStore();

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const assetsStore = useAssets();
const storeServices = useService();
if (!storeServices?.getAllServicesArray?.length) {
  await storeServices.fetchdataService(apiBaseUrl);
}
const serviceId = storeServices.getAllServicesArray.find((el) =>
  el.path.includes(route.params.slot),
).id;

const { data: serviceData } = await useFetch(
  `${apiBaseUrl}services/${serviceId}`,
  {
    query: {
      populate:
        "photoBanner.*,blocks.*, blocks.price_lists.servicePrice.Sale_popular.*, blocks.specialists.fotoSpecialist.*, blocks.specialists.achievements.icon.*, blocks.reviews.*, blocks.image.*, blocks.video.videoPreview.*",
    },
  },
);

// console.log(serviceData.value);

const serviceBlocks = serviceData.value?.data?.attributes?.blocks;

console.log(serviceBlocks);
</script>

<template>
  <div>
    <DynamicBlockHero
      :title="serviceData?.data?.attributes?.heading"
      :text="serviceData?.data?.attributes?.description"
      :imgBg="
        serviceData?.data?.attributes?.photoBanner?.data?.attributes?.url
          ? baseUrl +
            serviceData?.data?.attributes?.photoBanner?.data?.attributes?.url
          : assetsStore.useAsset('images/big-images/removal-tooth.png')
      "
      :imgAdaptive="
        serviceData?.data?.attributes?.photoBanner?.data?.attributes?.url
          ? baseUrl +
            serviceData?.data?.attributes?.photoBanner?.data?.attributes?.url
          : assetsStore.useAsset('images/big-images/removal-tooth.png')
      "
      :breadcrumbs="[
        {
          title: 'Главная',
          url: '/',
        },
        {
          title: `${serviceData?.data?.attributes?.category}`,
          url: `/${linkTransform(serviceData?.data?.attributes?.category)}`,
        },
        {
          title: `${serviceData.data.attributes.heading}`,
          url: '',
        },
      ]"
      :link="serviceData?.data?.attributes?.link"
      :link_text="serviceData?.data?.attributes?.link_text"
    />

    <section class="service-section-block" v-for="block in serviceBlocks">
      <component
        :is="getServicesBlock(block?.['__component'])"
        :block="block"
      />
    </section>
    <teleport to="body">
      <ModalVideo />
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
.service-section-block {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  margin-bottom: 100px;
}
</style>
