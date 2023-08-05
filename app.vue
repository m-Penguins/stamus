<template>
  <div class="main">
    <TheHeader />
      <main>
        <NuxtPage />
      </main>
    <TheFooter />
  </div>
</template>

<style lang="scss">
  @import '/assets/styles/style.scss';
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=IBM+Plex+Sans:ital,wght@1,700&family=Manrope:wght@200;300;400;500;600;700;800&display=swap');

  @font-face {
    font-family: 'Neue Machin';
    src: url('/assets/fonts/Neue Machina/NeueMachina-Medium.ttf');
  }

  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

  a { 
      text-decoration:none; 
      white-space: nowrap;
    }

  .main {
    width: 100%;
    min-height: 100vh;
    height: 100vh;
    max-height: max-content;
  }
</style>
