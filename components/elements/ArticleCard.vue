<template>
  <div class="article-card">
    <div class="article-card__box">
      <img :src="article?.img" alt="Articles" class="article-card__box-img" />
    </div>
    <div class="tags-box">
      <!-- <div
        v-for="(tag, index) in article?.tags"
        :key="index"
        class="article-card__category"
      >
        {{ tag }}
      </div> -->
      <div class="article-card__category" v-if="article?.tags">
        {{ article?.tags }}
      </div>
    </div>
    <h2 class="article-card__name">{{ article?.heading }}</h2>
    <p class="text-article">{{ article?.description }}</p>
    <elements-link-with-arrow
      type="type"
      title="Читать"
      :link="`/articles/${article?.id}`"
    />
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";
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
    min-height: 75px;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    box-orient: vertical;
  }

  &__box-img {
    width: 100%;
    object-fit: cover;
    border-radius: 20px;
    height: 346px;
  }
}

@media (max-width: 1328px) {
  .article-card {
    width: 100%;

    &__box {
      width: 100%;
    }
  }
}

.tags-box {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
}
</style>
