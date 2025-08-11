<script setup>
import EyeBtn from "~/components/elements/EyeBtn.vue";

const baseDataStore = useBaseDataStore();

const baseUrl = useRuntimeConfig()?.public?.baseUrl;

const widgets = baseDataStore.footerData?.data?.attributes?.widget;
</script>

<template>
  <div class="widget-wrapper">
    <!-- <EyeBtn /> -->
    <NuxtLink
      v-for="widget in widgets"
      class="widget"
      :style="{ backgroundColor: widget?.background_color ?? '#232D5B' }"
      :to="widget?.link"
      target="_blank"
    >
      <img
        :src="
          widget?.icon?.data?.attributes?.url
            ? baseUrl + widget?.icon?.data?.attributes?.url
            : ''
        "
        :alt="widget?.icon?.data?.attributes?.alternativeText ?? 'Icon'"
        width="30"
        height="30"
      />
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.widget-wrapper {
  position: fixed;
  z-index: 99999;
  bottom: 15px;
  right: 15px;

  display: none;
}

.widget {
  position: relative;
  width: 60px;
  height: 60px;

  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  cursor: pointer;

  & img {
    width: 30px;
    height: 30px;

    object-fit: contain;
  }

  &:hover img {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  &:hover {
    animation: pulse 2s infinite;
  }
}

@keyframes shake {
  10%,
  90% {
    transform: rotate(-10deg);
  }

  20%,
  80% {
    transform: rotate(10deg);
  }

  30%,
  50%,
  70% {
    transform: rotate(-10deg);
  }

  40%,
  60% {
    transform: rotate(0deg);
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}

@media (max-width: 1360px) {
  .widget-wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
}
</style>
