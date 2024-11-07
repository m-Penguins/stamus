<template>
  <NuxtLink :to="`/education/${direction.id}`">
    <div class="article-card">
      <div class="article-card__box">
        <NuxtImg
            v-if="direction.img"
            :src="direction.img"
            provider="strapi"
            :alt="direction.alt || 'Курс'"
            sizes="xs:400px md:600px"
            format="webp"
            class="article-card__box-img"
            loading="lazy"
        />
      </div>
      <div class="tags-box">
        <div
            v-if="categoryTag"
            class="article-card__category"
        >
          {{ categoryTag }}
        </div>
        <div
            v-if="direction.archive"
            class="article-card__category"
        >
          Архив
        </div>
      </div>
      <h2 class="article-card__name">
        {{ direction.title}}
      </h2>
      <p class="text-article">{{ direction.description }}</p>
      <div class="under-card">
        <p>{{direction.data}}</p>
        <elements-link-with-arrow
            type="type"
            title="Подробнее"
            :link="`/education/${direction.id}`"
        />
      </div>
    </div>

  </NuxtLink>
</template>

<script>
import { useAssets } from "../../stores/useAsset";
export default {
  props: {
    direction: {
      type: Object,
    },
    isCategoryAndDescription: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const assetsStore = useAssets();
    const categoryTag = computed(() => {
      switch (props.direction.category) {
        case 'pacient':
          return 'Пациентам';
        case 'doctor':
          return 'Врачам';
        case 'manager':
          return 'Менеджерам';
        default:
          return '';
      }
    });
    return {
      assetsStore,
      router,
      categoryTag
    };
  },
};
</script>

<style scoped lang="scss">
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

.under-card {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
