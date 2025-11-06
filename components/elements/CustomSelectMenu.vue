<script setup>
const props = defineProps(["label", "options", "selectedId"]);
const emits = defineEmits(["select"]);
const isOpen = ref(false);
const currentItem = ref(props.options[0].attributes.address);

const selectedItem = computed(
  () =>
    props.options?.find((el) => String(el?.id) === String(props?.selectedId))
      ?.name,
);

const handleSelect = (option) => {
  isOpen.value = false;
  currentItem.value = option.attributes.address;
  emits('select', option)
};

const handleScroll = () => {
  const scrollTop = window.scrollY;
  if (scrollTop > 0) {
    isOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="custom-select" :tabindex="1" @blur="isOpen = false">
    <div class="selected" :class="{ open: isOpen }" @click="isOpen = !isOpen">
      <div v-if="selectedItem" class="label">{{ label }}</div>
      <div
        class="default"
        :class="{
          'select-margin': selectedId,
        }"
      >
        {{ currentItem }}
      </div>
    </div>
    <div class="items" :class="{ selectHide: !isOpen }">
      <!-- <div @click="resetChosen" class="select-container"> -->
      <!-- <div class="select-box">
          <div>
            <div class="select-title">Сбросить выбор</div>
          </div>
        </div> -->
      <!-- <hr /> -->
      <!-- </div> -->
      <div
        v-for="(option, i) in options"
        :key="i"
        @click="handleSelect(option)"
        class="select-container"
      >
        <div class="select-box">
          <div>
            <div class="select-title">{{ option.attributes.address }}</div>
          </div>
          <div
            v-if="selectedItem === option.attributes.address"
            class="selected-item"
          >
            <img src="@/assets/images/icons/check.svg" alt="icon" />
          </div>
        </div>
        <hr v-if="i !== options.length - 1" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

.default {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 15px;
}

.dopText {
  margin-bottom: 20px;
}

.select-dop-text {
  @include body-12-regular;
  color: #525660;
  opacity: 0.7;
  padding: 6px 0 0px 20px;
}
.custom-select {
  position: relative;
  // width: 100%;
  text-align: left;
  outline: none;
  max-height: 27px;
}

.select-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px 5px;
}

.select-title {
  @include body-12-regular;
  color: $gray-text;
  padding-bottom: 2px;
}

.select-text {
  @include body-10-regular;
  color: $placeholder;
}

// .items {
//   padding: 20px;
// }

hr {
  margin: 5px;
  width: auto;
  border: 0;
  height: 1px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
}

.label {
  transform: translateY(-80%);
  @include body-10-regular;
}

.select-margin {
  white-space: nowrap;
  max-width: 175px;
}

.custom-select .selected {
  align-items: center;
  border-radius: 45px;
  // background: #fff;
  color: #525660;
  padding: 4px;
  cursor: pointer;
  user-select: none;
  @include body-14-regular;
  color: $placeholder;
  max-height: 57px;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    display: block;
    width: 6px;
    height: 1px;
    transition: all 0.3s ease-out;
    background-color: #7f838c;
    transform: translate(-1px, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(3px, -50%) rotate(-45deg);
  }
}

.custom-select .selected.open {
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    display: block;
    width: 6px;
    height: 1px;
    transition: all 0.3s ease-out;
    background-color: #7f838c;
    transform: translate(-1px, -50%) rotate(-45deg);
  }
  &::after {
    transform: translate(3px, -50%) rotate(45deg);
  }
}

.custom-select .items {
  color: #525660;
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid #e9e9e9;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  top: 32px;
  z-index: 12;
  overflow-y: scroll;
  height: 240px;
  min-width: 175px;
}

.custom-select .items div {
  color: #525660;
  cursor: pointer;
  user-select: none;
}

.custom-select .items .select-box:hover {
  background-color: #f0f0f0;
  border-radius: 5px;
}

.selected-item:hover {
  background-image: url("../../assets/images/icons/check.svg");
  background-repeat: no-repeat;
}

.selectHide {
  display: none;
}

@media (max-width: 900px) {
  .select-margin {
  }
}

@media (max-width: 443px) {
  .default {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    margin-right: 15px;
    font-size: 10px;
  }
}
</style>
