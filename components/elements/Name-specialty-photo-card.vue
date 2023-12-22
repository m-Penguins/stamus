<template>
  <div class="card-photo-name">
    <div class="card-photo-name-img">
      <img :src="specialists?.img" alt="specialist" class="card-img" />
    </div>
    <div
      :class="
        specialists?.address
          ? 'card-photo-name-container-discount'
          : 'card-photo-name-container'
      "
    >
      <div>
        <div class="card-photo-name-title">{{ specialists?.name }}</div>
        <div class="card-photo-name-text">{{ specialists?.position }}</div>
      </div>
      <div
        v-if="isTooltip && specialists?.achievements?.length > 0"
        class="tooltip"
      >
        <img src="@/assets/images/icons/icons-badge.svg" />
        <span class="info">
          <div
            class="tooltip-box"
            v-for="item in specialists?.achievements"
            :key="item"
          >
            <img
              v-if="item?.icon?.data?.attributes?.url"
              :src="baseUrl + item?.icon?.data?.attributes?.url"
              alt="icon"
            />
            <p class="tooltip-text">{{ item?.achievement }}</p>
          </div>
        </span>
      </div>
    </div>
    <elements-link-with-arrow
      v-if="isLink"
      type="true"
      title="Подробнее о враче"
      :link="`/specialists/${specialists.id}`"
      :clickHandler="handleLinkClick"
    />
    <div v-if="specialists?.address" class="card-photo-name-box-discount">
      <p class="card-photo-name-box-discount__addres">
        {{ specialists?.address }}
      </p>
      <p
        v-if="specialists?.description"
        class="card-photo-name-box-discount__addres"
      >
        {{ specialists?.description }}
      </p>
      <div v-if="specialists?.time" class="time__container">
        <div
          v-for="(time, index) in specialists.time"
          :key="index"
          class="card-photo-name-box-discount__time"
        >
          {{ time }}
        </div>
      </div>
      <elements-button-base
        title="Записаться"
        class="card-photo-name-box-discount__btn"
        @click="openStartupModal"
      />
      <!-- :link="specialists?.link ?? ''" -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps([
  "specialists",
  "link",
  "isLink",
  "isTooltip",
  "handleLinkClick",
]);

const baseUrl = useRuntimeConfig().public.baseUrl;
</script>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

.time__container {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.card-img {
  height: 308px;
  border-radius: 15px;
  border: 1px solid #ededed;
  width: 100%;
  object-fit: contain;
}
.card-photo-name {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.card-photo-name-container-discount {
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
}

.card-photo-name-box-discount {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__addres {
    @include body-14-regular;
    color: #232d5b;
  }

  &__time {
    border-radius: 5px;
    background: rgba(35, 45, 91, 0.05);
    padding: 6px 10px 8px 10px;
    @include body-20-regular;
    color: #232d5b;
    width: fit-content;
  }

  &__btn {
    width: 100%;
  }
}
.tooltip {
  position: relative;
  cursor: pointer;
  &:hover .info,
  &:focus .info {
    visibility: visible;
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.info {
  display: flex;
  flex-direction: column;
  gap: 22px;
  box-sizing: border-box;
  position: absolute;
  bottom: 56px;
  left: -263px;
  padding: 12px 12px;
  background: white;
  box-shadow: 2px 5px 45px -5px rgba(30, 32, 40, 0.08);
  border-radius: 15px;
  width: 287px;
  font-size: 16px;
  line-height: 24px;
  cursor: text;
  visibility: hidden;
  opacity: 0;
  transform: translate3d(0, -20px, 0);
  transition: all 0.5s ease-out;

  &:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 14px;
    bottom: -14px;
    left: 0;
  }

  &:after {
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    bottom: -1px;
    left: 48%;
    margin-left: 130px;
    background: white;
  }
}

// .info::-webkit-scrollbar {
//   display: none;
// }

.tooltip-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tooltip-text {
  @include body-16-regular;
  color: $gray-text;
}

.card-photo-name-img {
  padding-bottom: 30px;
}

.card-photo-name-container {
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
}

.card-photo-name-title {
  @include body-20-regular;
  color: $dark-blue-subtitle;
  padding-bottom: 4px;
}

.card-photo-name-text {
  @include body-12-regular;
  color: $gray-text;
  opacity: 0.7;
}

@media (max-width: 695px) {
  .card-img {
    object-fit: cover;
  }
}

@media (max-width: 590px) {
  .card-img {
    object-fit: contain;
  }
}
</style>
