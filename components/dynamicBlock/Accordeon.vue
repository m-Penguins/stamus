<script setup>
defineProps(["block"]);

const openItem = ref(null);

const toggleOpenItem = (itemId) => {
    openItem.value = !openItem.value;
};

</script>

<template>
  <div class="info">
    <div
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
        <div
            v-show="openItem"
            v-html="block.content"
        ></div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";

.error-text {
  @include body-18-regular;
  color: red;
  text-align: center;
  margin-bottom: 10px;
}

.success-text {
  @include body-18-regular;
  color: rgb(32, 196, 32);
  text-align: center;
  margin-bottom: 10px;
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

.info-links-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.link-info-doc {
  width: fit-content;
}

.info-card {
  .accordion-content {
    max-height: 0px;
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

.accordion-content-subtitle {
  margin: 24px 0 24px;
}

.accordion-content-subtext {
  @include body-12-regular;
  color: $placeholder;
}

.accordion-content-text {
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  @include body-14-regular;
  color: $gray-text;
}

.accordion-content-title {
  padding-bottom: 10px;
}

.accordion-title {
  @include body-18-regular;
  color: $dark-blue-subtitle;
  width: 95%;
}

.checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.checkbox input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid #7f838c;
  margin-right: 8px;
  display: inline-block;
  position: relative;
}

.checkbox input[type="checkbox"]:checked + .checkmark:after {
  content: "✓";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #fff;
}

.checkbox:hover .checkmark {
  border-color: #525660;
}

.label-text {
  @include body-16-regular;
  color: #7f838c;
}

.checkbox input[type="checkbox"]:checked + .checkmark {
  background-color: #232d5b;
  border-color: #232d5b;
}

.checkbox:hover .label-text {
  color: #525660;
}

.checkbox.checked .label-text {
  color: #232d5b;
}
.ndfl.open {
  scroll-margin-top: 160px;
  max-height: 1500px !important;
  .accordion-content {
    overflow-y: hidden !important;
  }
}

.ndfl.open {
  .accordion-content {
    max-height: 1500px !important;
  }
}
.info-card {
  // overflow: hidden;
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

.form-btn {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
}

.info-dop-card-subtext {
  @include body-12-regular;
  color: $gray-text;
  opacity: 0.7;
  text-align: center;

  & a {
    color: inherit;
    font-size: inherit;
    text-decoration: underline;
  }
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
    max-height: 0px;
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

.accordion-content-text {
  @include body-14-regular;
  color: $gray-text;
  padding-bottom: 16px;
}

.accordion-content-inputs {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 450px;
}

.accordion-content-id1-box {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.accordion-content-id1-title {
  @include body-18-medium;
  color: $dark-blue-subtitle;
  padding-bottom: 4px;
}

.accordion-content-id1-subtitle {
  @include body-16-regular;
  font-weight: 500;
  color: $dark-blue-subtitle;
  padding-bottom: 4px;
}

.link-info-doc {
  width: fit-content;
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
