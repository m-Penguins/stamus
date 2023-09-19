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
