<template>
  <label class="checkbox" :class="{ checked: isChecked }">
    <input type="checkbox" v-model="isChecked" @change="toggleCheckbox" />
    <span class="checkmark"></span>
    <span class="label-text">{{ label }}</span>
  </label>
</template>

<script>
export default {
  props: {
    label: String,
    value: Boolean,
  },
  data() {
    return {
      isChecked: this.value || false,
    };
  },
  methods: {
    toggleCheckbox() {
      this.$emit("input", this.isChecked);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";
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
</style>
