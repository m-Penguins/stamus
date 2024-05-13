<<<<<<< HEAD
<script setup>
const props = defineProps(["block"]);

const documents = props?.block?.certificates?.data?.map(
  (el) => el?.attributes?.url,
);
</script>

<template>
  <BlocksCertificateSlider
    :imagesScroll="documents"
    :title="block?.title ?? 'Сертификаты и документы'"
  />
</template>

<style lang="scss" scoped></style>
=======
<script setup>
const props = defineProps(["block"]);

const baseUrl = useRuntimeConfig().public.baseUrl;

const documents = props?.block?.certificates?.data?.map((el) =>
  el?.attributes?.url ? baseUrl + el?.attributes?.url : "",
);
</script>

<template>
  <BlocksCertificateSlider
    :imagesScroll="documents"
    :title="block?.title ?? 'Сертификаты и документы'"
  />
</template>

<style lang="scss" scoped></style>
>>>>>>> a32cc7504d371827e54429370578101f655096b2
