<template>
  <div class="article-card">
    <div class="article-card__box">
      <img src="@/assets/images/articles/tablet.svg" alt="Articles" class="article-card__box-img"/>
    </div>
    <div class="article-card__category">
      {{ article.category }}
    </div>
    <h2 class="article-card__name">{{ article.name }}</h2>
    <p class="text-article">{{ article.description }}</p>
    <elements-link-with-arrow type="type" title="Читать" @click="$router.push(`/articles/` + 1)"/>
  </div>
</template>

<script>
  export default {
    props: {
      article: {
        type: Object
      },
    },
  }
</script>

<style lang="scss" scoped>
@import '/assets/styles/style.scss';
 .article-card {
  @include flex-column-start;
  gap: 20px;
  width: 308px;

    &__category {
      @include flex-center-center;
      gap: 8px;
      padding: 6px 10px 8px 10px;
      border-radius: 5px;
      background: rgba(35, 45, 91, 0.05);
      color: $hover;
      text-align: center;
      @include body-12-regular;
    }

    &__name {
      @include body-20-regular-inter;
      color: $black;
    }
 }

@media (max-width: 1080px) {
  .article-card {
    width: 330px;
    
    &__box {
      width: 330px;

      &-img {
        width: 100%;
      }
    }
  }
}
</style>