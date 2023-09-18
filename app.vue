<template>
  <div class="wrap">
    <TheHeader :showMenuPatients="showMenuPatients" @toggleMenu="toggleMenu" />
    <div class="main" @click="closeMenu">
      <main>
        <NuxtPage />
      </main>
    </div>
    <TheFooter />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenuPatients: false
    };
  },
  methods: {
    toggleMenu() {
      this.showMenuPatients = !this.showMenuPatients;
    },
    closeMenu() {
      if (this.showMenuPatients) {
        this.showMenuPatients = false;
      }
    }
  }
};
</script>

<style lang="scss">
@import "./assets/styles/style.scss";
@import url("https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=IBM+Plex+Sans:ital,wght@1,700&family=Manrope:wght@200;300;400;500;600;700;800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=IBM+Plex+Sans:ital,wght@1,700&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Manrope:wght@200;300;400;500;600;700;800&display=swap");

  @font-face {
  font-family: 'Neue Machin';
  src: url('./fonts/NeueMachina-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

  @font-face {
    font-family: 'Neue Machin';
    src: url('./fonts/NeueMachina-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Neue Machin';
    src: url('./fonts/NeueMachina-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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

@media (max-width: 1400px) {
  main {
    padding: 0 31px;
  }
}

@media (max-width: 744px) {
  main {
    overflow-x: hidden;
  }
}

@media (max-width: 650px) {
  main {
    padding: 0 16px;
  }
}
</style>
