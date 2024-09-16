<script setup lang="ts">
const props = defineProps(["block", "handleLinkClick"]);
const showBlock = !!props.block?.spec?.data;
const baseUrl = useRuntimeConfig().public.baseUrl;
</script>

<template>
  <div v-if="showBlock" class="expert-wrapper">
    <div class="expert-container">
      <div class="expert-content">
        <h2>
          {{
            block.title
              ? block.title
              : "Содержание данной страницы проверено экспертом:"
          }}
        </h2>
        <p>{{ block?.spec?.data?.attributes?.fullName }}</p>
        <p>{{ block?.spec?.data?.attributes?.position }}</p>
        <p>{{ block?.spec?.data?.attributes?.description }}</p>
        <elements-link-with-arrow
          type="type"
          title="Подробнее о враче"
          :link="block?.spec?.data?.id ? `/team/${block?.spec?.data?.id}` : ''"
        />
      </div>
      <img
        :src="`${baseUrl}${block?.spec?.data?.attributes?.fotoSpecialist?.data?.attributes?.url}`"
      />
      <!-- <div class="expert-img">
      </div> -->
    </div>
    <!-- {{ block.title }} -->
  </div>
</template>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

.expert-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  @media screen and (max-width: 600px) {
    flex-direction: column-reverse;
  }
}
img {
  max-height: 200px;
  height: 100%;
  // width: 100%;
  // height: 100%;
  object-fit: contain;
}
.expert-wrapper {
  background: #f9f9fa;
  border-radius: 20px;
  padding: 20px 40px;
  @media screen and (max-width: 600px) {
    padding: 20px 20px;
  }
}
.expert-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: space-between;
  max-width: 60%;
  & p:nth-child(4) {
    font-size: 14px;
  }
  @media screen and (max-width: 600px) {
    max-width: 100%;
  }
}
</style>
