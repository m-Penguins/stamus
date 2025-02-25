<template>
  <div
    class="custom-select"
    :tabindex="tabindex"
    @blur="open = false"
    :class="{ dopText: dopText }"
  >
    <div class="selected" :class="{ open: open }" @click="open = !open">
      <div v-if="isSelectedId && selected" class="label">{{ label }}</div>
      <div
        v-if="
          () =>
            selected &&
            (isSelectedId !== selectedItem?.id ||
              isSelectedId !== selectedItem?.name)
        "
        class="default"
        :class="{
          'select-margin':
            selectedItem?.id || selectedItem?.name || isSelectedId,
        }"
      >
        {{ value || selected }}
      </div>
      <div v-if="!selected" class="default">
        {{ default }}
      </div>
    </div>
    <p v-if="dopText" class="select-dop-text">Не обязательно для заполнения</p>
    <div class="items" :class="{ selectHide: !open }">
      <div @click="resetChosen" class="select-container">
        <div class="select-box">
          <div>
            <div class="select-title">Сбросить выбор</div>
            <!-- <div class="select-text">123123</div> -->
          </div>
          <div v-if="!selected" class="selected-item">
            <img src="../../assets/images/icons/check.svg" alt="icon" />
          </div>
        </div>
        <hr />
      </div>
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option.name;
          open = false;
          $emit('input', option);
        "
        class="select-container"
      >
        <div class="select-box">
          <div>
            <div class="select-title">{{ option.name }}</div>
            <div class="select-text">{{ option.address }}</div>
          </div>
          <div v-if="selected === option.name" class="selected-item">
            <img src="../../assets/images/icons/check.svg" alt="icon" />
          </div>
        </div>
        <hr v-if="i !== options.length - 1" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    value: {
      type: String,
      required: false,
      default: null,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    dopText: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
    },
    isSelectedId: {
      type: Number,
    },
    selectedItem: {
      type: Object,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  methods: {
    resetChosen() {
      this.selected = null;
      this.open = false;
      this.$emit("input", null);
    },
  },
  mounted() {
    this.$emit("input", this.selected);
  },
  computed: {
    isSelectedNotDefault() {
      return this.selected !== this.default;
    },
  },
};
</script>

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
  width: 100%;
  text-align: left;
  outline: none;
  height: 56px;
}

.custom-select .selected:hover {
  border: 1px solid #cfd5e1;
}

.select-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 14px;
}

.select-title {
  @include body-14-regular;
  color: $gray-text;
  padding-bottom: 2px;
}

.select-text {
  @include body-10-regular;
  color: $placeholder;
}

.items {
  padding: 20px;
}

hr {
  margin: 14px;
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
  margin: -10px -1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 323px;
}

.custom-select .selected {
  align-items: center;
  border-radius: 45px;
  border: 1px solid #e9e9e9;
  background: #fff;
  color: #525660;
  padding: 20px;
  cursor: pointer;
  user-select: none;
  @include body-16-regular;
  color: $placeholder;
  height: 57px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 53%;
    right: 22px;
    display: block;
    width: 9px;
    height: 1px;
    transition: all 0.3s ease-out;
    background-color: #7f838c;
    transform: translate(-3px, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(3px, -50%) rotate(-45deg);
  }
}

.custom-select .selected.open {
  border: 1px solid #e9e9e9;
  border-radius: 45px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 57%;
    right: 22px;
    display: block;
    width: 9px;
    height: 1px;
    transition: all 0.3s ease-out;
    background-color: #7f838c;
    transform: translate(-3px, -50%) rotate(-45deg);
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
  top: 62px;
  z-index: 12;
  overflow-y: scroll;
  height: 250px;
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
    max-width: 230px;
    margin-right: 15px;
  }
}
</style>
