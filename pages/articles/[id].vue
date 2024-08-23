<script setup>
const placeholdersStore = usePlaceholdersStore();

const route = useRoute();
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
const baseUrl = useRuntimeConfig().public.baseUrl;

const { data: articleData } = await useFetch(
  `${apiBaseUrl}articles/${route.params.id}`,
  {
    query: {
      populate:
        blocksQuey +
          ",meta.metaImage.*,napravleniya_uslug_1.*,other_articles.fotoArticles.*,blocks.*,blocks.expert.*,blocks.items.*,fotoArticles.*",
    },
  },
);
if (!articleData.value?.data) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}
console.log(articleData)
const heading = articleData.value?.data?.attributes?.heading;
const tags = articleData.value?.data?.attributes?.tag_category;
const date = articleData.value?.data?.attributes?.date;
const blocks = articleData.value?.data?.attributes?.blocks;
const img =
  articleData.value?.data?.attributes?.fotoArticles?.data?.attributes?.url ??
  placeholdersStore?.imagePlaceholders?.articles;

const imgAlt =
  articleData.value?.data?.attributes?.fotoArticles?.data?.attributes
    ?.alternativeText;

const otherArticles = articleData.value?.data?.attributes?.other_articles;

const shouldShowBlock = (block) => {
  const excludedComponents = [
    "blocks-story.galereya",
    "blocks-story.o-vazhnom",
    "blocks-story.expert",
  ];
  return !excludedComponents.includes(block.__component);
};

const getVisibleIndex = (currentIndex) => {
  let count = 0;
  for (let i = 0; i <= currentIndex; i++) {
    if (shouldShowBlock(blocks[i])) {
      count++;
    }
  }
  return count;
};

const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Статьи",
    url: "/articles",
  },
  {
    title: articleData.value?.data?.attributes?.heading,
    url: `/articles/${route.params.id}`,
  },
];

const metaData = articleData.value?.data?.attributes?.meta;
useHead(getMetaObject(metaData, baseUrl));
</script>

<template>
  <div class="articles-dital-wrapper-container">
    <div class="articles-dital-wrapper">
      <div class="articles-dital-wrapper-container">
        <elements-bread-crumbs :breadcrumbs="breadcrumbs" />
        <div class="articles-dital-inner">
          <h1 class="articles-dital-title">{{ heading }}</h1>
          <div class="articles-dital-img">
            <NuxtImg
              v-if="img"
              :src="img"
              provider="strapi"
              :alt="imgAlt"
              sizes="xa:400px sm:600px md:1000px lg:1280px xl:1560 xxl:1920px "
              format="webp"
              class="banner-img"
            />
            <div class="articles-dital-box">
              <div>
                <div class="articles-dital-box__item">
                  {{ tags }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="articles-digital-wrapper">
          <div class="articles-digital-left">
            <BlocksMapper :blocks="blocks" />
          </div>
          <div class="articles-digital-right">
            <div v-for="(block, index) in blocks" :key="block.id">
              <a v-if="shouldShowBlock(block)" :href="'#' + block.id">
                {{ getVisibleIndex(index) + ". " + block.title }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 100%;">
        <div class="articles-dital-box__item">{{ date }}</div>
        <NuxtLink class="back-btn" to="/articles">
          <svg
            width="25"
            height="9"
            viewBox="0 0 18 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="svg"
              d="M1 4C0.723858 4 0.5 4.22386 0.5 4.5C0.5 4.77614 0.723858 5 1 5V4ZM17.3536 4.85355C17.5488 4.65829 17.5488 4.34171 17.3536 4.14645L14.1716 0.964466C13.9763 0.769204 13.6597 0.769204 13.4645 0.964466C13.2692 1.15973 13.2692 1.47631 13.4645 1.67157L16.2929 4.5L13.4645 7.32843C13.2692 7.52369 13.2692 7.84027 13.4645 8.03553C13.6597 8.2308 13.9763 8.2308 14.1716 8.03553L17.3536 4.85355ZM1 5H17V4H1V5Z"
              fill="#525660"
            />
          </svg>
          <span>Все статьи</span>
        </NuxtLink>
      </div>
    </div>
    <section class="section-wrapper" v-if="otherArticles?.data?.length">
      <DynamicBlockBlog
        :block="{ articles: otherArticles, title: 'Другие статьи' }"
      />
    </section>
    <blocks-main-form />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";
* :deep(.seo-block-text__text a) {
  text-decoration: underline !important;
  text-decoration-color: #232d5b;
}
.articles-digital-left {
  max-width: 900px;
  width: 100%;
}
.articles-digital-wrapper {
  display: flex;
  position: relative;
  gap: 5%;
}
.articles-digital-right {
  position: sticky;
  top: 20%;
  height: 100%;
  width: 100%;
  padding: 20px 2%;
  border: 1px solid #dfdfdf;
  border-radius: 20px;
  background: #232d5b;
  max-width: 316px;
  & div {
    margin: 20px 0;
    font-size: 16px;
    // text-decoration: underline;
    color: #fff;
  }
}
.service-section-block {
  border: 1px solid #dfdfdf;
}
.banner-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 0;

  object-fit: cover;
}
.section-wrapper {
  width: 100%;
  max-width: 1280px;

  margin: 0 auto 100px;

  @include media(680px) {
    margin: 0 auto 80px;
  }
}

.back-btn {
  position: relative;
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 5px;
  color: #525660;
  font-size: 18px;
  margin-top: 40px;
  cursor: pointer;
  svg {
    transform: rotate(180deg);
  }
}

.articles-dital-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  max-width: 100%;
  margin: 20px auto 100px auto;
}

.articles-dital-wrapper-container {
  width: 100%;
}

.articles-dital-inner {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

.articles-dital-title {
  @include body-60-medium;
  color: $dark-blue-subtitle;
  padding-bottom: 40px;
  padding-top: 100px;
}

.articles-dital-img {
  width: 100%;
  border-radius: 25px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 600px;
  position: relative;

  overflow: hidden;
}

.articles-dital-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  @include body-14-regular;
  color: $gray-text;
  p {
    color: black;
  }

  & :deep(a),
  & :deep(a:link),
  & :deep(a:visited) {
    text-decoration: underline !important;
    text-decoration-color: #232d5b;
  }
  & :deep(.seo-block, .gallery) {
    margin-bottom: 0;
  }

  h1 {
  }

  h2 {
  }

  ul {
  }

  ol {
  }
}

.articles-dital-box {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  bottom: 7%;
  left: 20px;
  gap: 10px;

  &__item {
    @include body-12-regular;
    color: $hover;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.9);
    padding: 6px 10px 6px 10px;
  }
}

@media (max-width: 1200px) {
  .articles-dital-title {
    padding-top: 40px;
  }
}

@media (max-width: 900px) {
  .articles-dital-inner {
    flex-direction: row-reverse;
    align-items: center;
    gap: 34px;
    width: 100%;
  }

  .articles-dital-title {
    font-size: 22px;
    width: 50%;
  }
  .articles-dital-img {
    width: 50%;
    height: 334px;
  }

  .articles-dital-box {
    top: 88%;
    left: 9px;
  }
}

@media (max-width: 740px) {
  .articles-dital-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .articles-dital-title {
    padding: 0;
  }

  .articles-dital-img {
    width: 100%;
  }
}

@media (max-width: 650px) {
  .articles-dital-wrapper {
    margin: 20px auto 80px auto;
  }
  .articles-dital-inner {
    gap: 30px;
  }
  .articles-dital-title {
    padding-top: 30px;
    line-height: unset;
  }
}
</style>
