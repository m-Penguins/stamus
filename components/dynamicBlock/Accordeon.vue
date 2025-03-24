<script setup>
const props = defineProps(["block"]);
const { block } = props;
const openItem = ref(null);
const shouldMap = !props.block?.content;
const slots = useSlots();

const toggleOpenItem = (itemId) => {
  if (!shouldMap) {
    openItem.value = !openItem.value;
  } else {
    if (openItem.value === itemId) {
      openItem.value = null;
    } else {
      openItem.value = itemId;
    }
  }
};
</script>

<template>
  <div class="info">
    <h3 v-if="shouldMap" class="info-title">{{ block.title }}</h3>
    <div
      v-if="!shouldMap"
      class="info-card"
      :class="{
        open: openItem,
      }"
    >
      <div class="info-card__box" @click="toggleOpenItem">
        <h3 class="accordion-title">{{ block.title }}</h3>
        <div v-if="!openItem">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="card-img-fill"
              d="M12 22L32 22.003M22 12V32"
              stroke="#525660"
              stroke-linecap="round"
            />
            <rect
              class="card-img-stroke"
              x="0.5"
              y="0.5"
              width="43"
              height="43"
              rx="21.5"
              stroke="#E9E9E9"
            />
          </svg>
        </div>
        <div v-else>
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="card-img-fill"
              d="M12 21.9985L32 22.0015"
              stroke="#525660"
              stroke-linecap="round"
            />
            <rect
              class="card-img-stroke"
              x="0.5"
              y="0.5"
              width="43"
              height="43"
              rx="21.5"
              stroke="#E9E9E9"
            />
          </svg>
        </div>
      </div>

      <transition name="dop-info">
        <div class='info-card__slot' v-show="openItem" v-if="Object.keys(slots).length > 0">
          <slot name="content" />
        </div>
        <div v-else v-show="openItem" v-html="block.content"></div>
      </transition>
    </div>
    <div
      v-else
      v-for="(item) in block.items"
      :key="item?.id"
      class="info-card"
      :class="{
        open: openItem === item?.id,
      }"
    >
      <div class="info-card__box" @click="toggleOpenItem(item?.id)">
        <h3 class="accordion-title">{{ item.title }}</h3>
        <div v-if="openItem !== item?.id">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="card-img-fill"
              d="M12 22L32 22.003M22 12V32"
              stroke="#525660"
              stroke-linecap="round"
            />
            <rect
              class="card-img-stroke"
              x="0.5"
              y="0.5"
              width="43"
              height="43"
              rx="21.5"
              stroke="#E9E9E9"
            />
          </svg>
        </div>
        <div v-else>
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="card-img-fill"
              d="M12 21.9985L32 22.0015"
              stroke="#525660"
              stroke-linecap="round"
            />
            <rect
              class="card-img-stroke"
              x="0.5"
              y="0.5"
              width="43"
              height="43"
              rx="21.5"
              stroke="#E9E9E9"
            />
          </svg>
        </div>
      </div>

      <transition name="dop-info">
        <div
          v-if="item?.id"
          v-show="openItem === item?.id"
          v-html="item?.content"
        ></div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";
* :deep(p) {
  list-style-type: unset;
  list-style-position: inside;
  line-height: normal;
  font-family: Manrope, serif;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  display: flex;
  width: 100%;
  padding: 16px 20px;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid var(--stroke, #e9e9e9);

  &__slot {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: 14px;
  }

  &__box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 20px;
    cursor: pointer;

    & svg {
      height: 44px;
      width: 44px;
    }
  }
}

.info-title {
  font-size: 22px;
  font-weight: 500;
  padding-bottom: 20px;
}

.info-card:hover {
  border: 1px solid var(--stroke, #cfd5e1);
  .card-img-fill {
    stroke: #232d5b;
  }
  .card-img-stroke {
    stroke: #cfd5e1;
  }
}

@media (max-width: 900px) {
  .accordion-title {
    font-size: 16px;
  }
}

@media (max-width: 740px) {
  .info-card {
    max-height: 10000px;
  }
}

.info-card {
  // overflow: hidden;
  max-height: 84px;
  transition: max-height 0.9s ease-in-out;
}

.info-card.open {
  max-height: 10000px;
}

.info-card {
  .accordion-content {
    max-height: 0;
    opacity: 0;
    transition: max-height 0.4s ease-in-out, opacity 0.6s ease-in-out,
      margin-top 0.3s ease-in-out;
  }
  &.open {
    & .accordion-content {
      margin-top: 16px;
      max-height: 10000px;
      opacity: 1;
    }
  }
}

.accordion-title {
  @include body-18-regular;
  color: $dark-blue-subtitle;
  width: 95%;
}

.info-card {
  max-height: 100px;
  transition: max-height 0.9s ease-in-out;
}

.info-card.open {
  max-height: 10000px;
}

.accordion-title {
  @include body-18-regular;
  color: $dark-blue-subtitle;
  width: 95%;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  display: flex;
  width: 100%;
  padding: 14px 20px;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid var(--stroke, #e9e9e9);

  &__box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    width: 100%;
    cursor: pointer;
    scroll-margin-top: 160px;
  }

  & .accordion-content {
    max-height: 0;
    opacity: 0;
    transition: max-height 0.4s ease-in-out, opacity 0.6s ease-in-out,
      margin-top 0.3s ease-in-out;
    /* overflow-y: auto; */
    width: 100%;
  }
  &.open {
    & .accordion-content {
      margin-top: 16px;
      max-height: 10000px;
      opacity: 1;
      padding-right: 10px;
    }
  }
}

.info-card:hover {
  border: 1px solid var(--stroke, #cfd5e1);
}

@media (max-width: 1356px) {
  .info-card {
    &__box {
      scroll-margin-top: 120px;
    }
  }
}

@media (max-width: 900px) {
  .accordion-title {
    font-size: 16px;
  }
}

@media (max-width: 740px) {
  .info-card {
    max-height: 300px;
  }
}

.dop-info-enter-active,
.dop-info-leave-active {
  transition: all 0.5s ease-in-out;
  max-height: 10000px;
}

.dop-info-enter-from,
.dop-info-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
