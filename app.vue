<template>
  <div class="wrap">
    <TheHeader :showMenuPatients="showMenuPatients" @toggleMenu="toggleMenu" />
    <div class="main" @click="closeMenu">
      <main>
        <NuxtPage />
      </main>
    </div>
    <TheFooter />
    <Teleport to="body"><blocks-main-popap-modal-form /></Teleport>
    <Teleport to="body"><elements-cookie-consent /></Teleport>
  </div>
</template>

<script setup>
const showMenuPatients = ref(false);

const toggleMenu = () => (showMenuPatients.value = !showMenuPatients.value);

const closeMenu = () => (showMenuPatients.value = false);

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "./bvi.css",
      type: "text/css",
    },
  ],
  script: [
    { src: "./bvi.js", tagPosition: "bodyClose", type: "text/javascript" },
    {
      innerHTML: `new isvek.Bvi({
        images: false,
        panelHide: true
      });`,
      tagPosition: "bodyClose",
      type: "text/javascript",
    },
  ],
});
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
