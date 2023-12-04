<template>
  <!-- <div class="article-wrap" v-if="articles?.length">
    <div class="container-size container-article">
      <elements-slider-article :title="title" :programs="articles" />
    </div>
  </div> -->
</template>

<script setup>
const props = defineProps(["title", "articles"]);
</script>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

.article-wrap {
  width: 1400px;
  margin: 0 auto;
  max-width: 100%;
  padding: 60px 30px;
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
