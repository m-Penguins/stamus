<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
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
          <div  v-if="selected === option.name" class="selected-item">
            <img src="../../assets/images/icons/check.svg" alt="icon">
          </div>
        </div>
        <hr v-if="i !== options.length - 1"/>
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
  mounted() {
    this.$emit("input", this.selected);
  },
};
</script>

<style  lang="scss" scoped>
@import '/assets/styles/style.scss';
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 56px;
}

.custom-select .selected:hover {
  border: 1px solid var(--dissabled, #CFD5E1);
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

.custom-select .selected {
  border-radius: 45px;
  border: 1px solid var(--stroke, #E9E9E9);
  background: var(--white, #FFF);
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
    top: 57%;
    right: 22px;
    display: block;
    width: 10px;
    height: 2px;
    transition: all 0.3s ease-out;
    background-color: #7F838C;
    transform: translate(-3px, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(3px, -50%) rotate(-45deg);
  }
}

.custom-select .selected.open {
  border: 1px solid #E9E9E9;
  border-radius: 45px;

    &::before,
    &::after {
    content: "";
    position: absolute;
    top: 57%;
    right: 22px;
    display: block;
    width: 10px;
    height: 2px;
    transition: all 0.3s ease-out;
    background-color: #7F838C;
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
  border: 1px solid #E9E9E9;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  top: 62px;
  z-index: 1;
  overflow-y: scroll;
  height: 188px;
}

.custom-select .items div {
  color: #525660;
  cursor: pointer;
  user-select: none;
}

.custom-select .items .select-box:hover {
  background-color: #F0F0F0;
  border-radius: 5px;
}

.selected-item:hover {
  background-image: url('../../assets/images/icons/check.svg');
  background-repeat: no-repeat;
}

.selectHide {
  display: none;
}
</style>