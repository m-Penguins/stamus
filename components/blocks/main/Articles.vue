<template>
<div class="article-wrap">
  <div class="container-size container-article">
    <elements-slider-article :programs="mockArray"/>
  </div>
</div>
</template>

<script setup>
  const mockArray = [
    {name: 'Наименование статьи', category: 'Стоматология', description: 'Равным образом, реализация намеченных плановых '},
    {name: 'Наименование статьи', category: 'Стоматология', description: 'Равным образом, реализация намеченных плановых '},
    {name: 'Наименование статьи', category: 'Стоматология', description: 'Равным образом, реализация намеченных плановых '},
    {name: 'Наименование статьи', category: 'Стоматология', description: 'Равным образом, реализация намеченных плановых '},
    {name: 'Наименование статьи', category: 'Стоматология', description: 'Равным образом, реализация намеченных плановых '},
    ];
</script>

<style lang="scss" scoped>
@import '/assets/styles/style.scss';

.article-wrap {
    width: 1400px;
    margin: 0 auto;
    max-width: 100%;
    padding: 0 30px;
}
  .feedback-bloks {
      width: 1280px;
      max-width: 100%;
      margin: 0 auto;
      padding: 50px 0;
  }

  @media (max-width: 1080px) {
  .article-wrap {
    padding: 0;
  }
}
@media (max-width: 650px) {
  .container-article {
    margin: 0 auto 40px !important;
  }
}
</style>