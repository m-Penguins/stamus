<script setup>
const props = defineProps(["block", "blockServices"]);

if (props.blockServices) {
  props.block.services = props.blockServices;
}

const getServiceLink = (item) => {
  const direction =
    item?.attributes?.category?.data?.attributes?.napravleniya_uslug_1_col?.data
      ?.attributes?.slug;

  const service = item?.attributes?.slug;

  if (direction && service) {
    return `/${direction}/${service}`;
  }
  return "/";
};
</script>

<template>
  <div class="activities-block-wrap">
    <h2 class="activities-block-title">
      {{ block?.title ?? "Основные виды деятельности" }}
    </h2>
    <div class="activities-block-box">
      <div
        v-for="(item, index) in block?.services?.data?.filter(
          (el) => el?.attributes?.publishedAt,
        )"
        :key="item?.id"
      >
        <NuxtLink class="activities-card" :to="getServiceLink(item)">
          <div class="activities-card-container">
            <p class="activities-card-num">{{ index + 1 }}.</p>
            <p class="activities-card-title">{{ item?.attributes?.heading }}</p>
          </div>
          <div>
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="activities-card-img-fill"
                d="M12 21.5C11.7239 21.5 11.5 21.7239 11.5 22C11.5 22.2761 11.7239 22.5 12 22.5V21.5ZM32.3536 22.3536C32.5488 22.1583 32.5488 21.8417 32.3536 21.6464L29.1716 18.4645C28.9763 18.2692 28.6597 18.2692 28.4645 18.4645C28.2692 18.6597 28.2692 18.9763 28.4645 19.1716L31.2929 22L28.4645 24.8284C28.2692 25.0237 28.2692 25.3403 28.4645 25.5355C28.6597 25.7308 28.9763 25.7308 29.1716 25.5355L32.3536 22.3536ZM12 22.5H32V21.5H12V22.5Z"
                fill="#525660"
              />
              <rect
                class="activities-card-img-stroke"
                x="0.5"
                y="0.5"
                width="43"
                height="43"
                rx="21.5"
                stroke="#E9E9E9"
              />
            </svg>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/style.scss";

.activities-block-wrap {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
}

.activities-block-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
  padding-bottom: 30px;
}

.activities-block-box {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.activities-card {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #e9e9e9;

  &:hover {
    border: 1px solid #cfd5e1;
    .activities-card-img-fill {
      fill: #232d5b;
    }
    .activities-card-img-stroke {
      stroke: #cfd5e1;
    }
  }
}

.activities-card-container {
  display: flex;
  align-items: baseline;
  width: 80%;
  gap: 20px;
}

.activities-card-num {
  @include body-12-regular;
  color: $placeholder;
}

.activities-card-title {
  @include body-16-regular;
  color: $gray-text;
}
</style>
