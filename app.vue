<template>
  <div class="wrap">
    <TheHeader
      :showMenuPatients="showMenuPatients"
      :showMenuDoctors="showMenuDoctors"
      @toggleMenu="toggleMenu"
      @toggleMenuDoctors="toggleMenuDoctors"
      @closeMenu="closeMenu"
      @closeMenuDoctors="closeMenuDoctors"
      :phone="footerData?.data?.attributes?.phone"
    />
    <div class="main" @click="closeAllMenu">
      <main>
        <NuxtLoadingIndicator color="#232D5B" :throttle="0" :height="8" />
        <NuxtPage />
      </main>
    </div>
    <TheFooter :footerData="footerData" />
    <Teleport to="body"
      ><blocks-main-popap-modal-form :clinics="baseDataStore.clinics"
    /></Teleport>
    <Teleport to="body"><elements-cookie-consent /></Teleport>
    <Teleport to="body"><ModalVideo /></Teleport>
    <NuxtErrorBoundary
      ><Teleport to="body"><BlocksWidget /></Teleport
    ></NuxtErrorBoundary>
  </div>
</template>

<script setup>
const showMenuPatients = ref(false);
const showMenuDoctors = ref(false);
const closeAllMenu = () => {
  showMenuPatients.value = false
  showMenuDoctors.value = false
}
const toggleMenu = () => (showMenuPatients.value = !showMenuPatients.value);
const toggleMenuDoctors = () => (showMenuDoctors.value = !showMenuDoctors.value);
const closeMenu = () => (showMenuPatients.value = false);
const closeMenuDoctors = () => (showMenuDoctors.value = false);
const route = useRoute();
const reviewStore = useReviewStore();
watch(
  () => route.fullPath,
  () => {
    if (reviewStore.currentStep > 0) reviewStore.resetStore();
    showMenuPatients.value = false;
  },
);

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;

const baseDataStore = useBaseDataStore();
const servicesStore = useService();
const placeholdersStore = usePlaceholdersStore();

const [{ data: footerData }] = await Promise.all([
  useFetch(`${apiBaseUrl}footer`, {
    query: {
      populate:
        "links.icon.*,privacy.*,license_stamus.*,license_stamusmed.*,widget.icon.*, header_widget.icon.*",
    },
  }),
  baseDataStore.getClinics(),
  baseDataStore.getDirections(),
  baseDataStore.getPopularServices(),
  servicesStore.fetchdataService(apiBaseUrl),
  placeholdersStore.getImagePlaceholders(),
]);

baseDataStore.footerData = footerData.value;

// useHead({
//   link: [
//     {
//       rel: "stylesheet",
//       href: "./bvi.css",
//       type: "text/css",
//     },
//   ],
//   script: [
//     {
//       src: "/bvi.js",
//       tagPosition: "bodyClose",
//       type: "text/javascript",
//       defer: true,
//     },
//     {
//       innerHTML: `new isvek.Bvi({
//         images: false,
//         panelHide: true
//       });`,
//       tagPosition: "bodyClose",
//       type: "text/javascript",
//       defer: true,
//     },
//   ],
// });
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Neue Machin";
}

body.modal-open {
  height: 100vh;
  height: 100svh;
  overflow: hidden;
}

a,
a:link,
a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

ul,
ul li {
  list-style: none;
}

h1,
h2,
h3,
p {
  margin: 0;
}

img {
  vertical-align: top;
}

img,
svg {
  max-width: 100%;
  height: auto;
}

.wrap {
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  max-height: max-content;
}

main {
  padding: 0 20px;
}

.main {
  margin: 0 auto;
}

@media (max-width: 1328px) {
  main {
    padding: 0 31px;
  }
}

@media (max-width: 1200px) {
  main {
    overflow: hidden;
  }
}

@media (max-width: 650px) {
  main {
    padding: 0 16px;
  }
}
</style>
