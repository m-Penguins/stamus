<script setup>
import { IMaskComponent } from 'vue-imask';
const props = defineProps({
  showError: Boolean,
  errorMessage: String,
  placeholder: String,
  label: String,
  dopText: String,
  tagType: {
    type: String,
    default: "input" | "textarea" | "phoneMask" | "email"
  },
  modelValue: {
    type: String,
    default: '' 
  }
});

const emit = defineEmits(["update:modelValue"]);
const labelEl = ref();
const isFocused = ref(false);

const updateInputValue = (e) => {
  emit("update:modelValue", e.target.value);
};

const onFocus = (e) => {
  isFocused.value = true;
  labelEl.value.style.marginLeft = 0 + "px";
};

const onBlur = (e) => {
  isFocused.value = false;
  labelEl.value.style.marginLeft = 0 + "px";
  labelEl.value.style.backgroundColor = "transparent";
};
</script>

<template>
  <div
    v-if="tagType === 'textarea'"
    class="form-group"
  >
    <label
      ref="labelEl"
      :for="label"
      :class="isFocused || modelValue.length > 0 ? 'focused' : ''"
      class="form-label textarea"
      >{{ label }}</label
    >
    <textarea
      :id="label"
      rows="5"
      class="form-textarea textarea-base"
      :placeholder="placeholder"
      :value="modelValue"
      @focus="onFocus($event)"
      @input="updateInputValue"/>
      <p v-if="dopText" v-html="dopText" class="dop-text"></p>
  </div>
  <div v-else-if="tagType === 'email'" class="input-base form-group">
    <label
      ref="labelEl"
      :for="label"
      :class="isFocused || modelValue.length ? 'focused' : ''"
      class="form-label"
      >{{ label }}</label
    >
    <input
      v-bind="$attrs"
      :placeholder="placeholder"
      class="form-input input"
      :class="isFocused || modelValue.length ? 'focused-input' : ''"
      @input="updateInputValue"
      :value="modelValue"
      @focus="onFocus($event)"
      @blur="onBlur($event)"
    />
    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>
  </div>
  <div v-else-if="tagType === 'input'" class="input-base form-group">
    <label
      ref="labelEl"
      :for="label"
      :class="isFocused || modelValue.length ? 'focused' : ''"
      class="form-label"
      >{{ label }}</label
    >
    <input
      v-bind="$attrs"
      :placeholder="placeholder"
      class="form-input input"
      :class="isFocused || modelValue.length ? 'focused-input' : ''"
      @input="updateInputValue"
      :value="modelValue"
      @focus="onFocus($event)"
      @blur="onBlur($event)"
    />
    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>
  </div>
  <div v-else-if="tagType === 'phoneMask'" class="input-base form-group">
    <label
      ref="labelEl"
      :for="label"
      :class="isFocused || modelValue.length ? 'focused' : ''"
      class="form-label"
      >{{ label }}</label
    >
    <IMaskComponent
      v-bind="$attrs"
      :placeholder="placeholder"
      class="form-input input"
      :class="isFocused || modelValue.length ? 'focused-input' : ''"
      :mask="'+{7}(000)000-00-00'"
      :unmask="true"
      @input="updateInputValue"
      :value="modelValue"
      @focus="onFocus($event)"
      @blur="onBlur($event)"
    />
    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped lang="scss">
@import '/assets/styles/style.scss';
.form-group {
  position: relative;
}
.form-label {
  position: absolute;
  left: 17px;
  top: 19px;
  @include body-16-regular;
  color: $placeholder;
  z-index: 10;
  transition: transform 150ms ease-out, font-size 150ms ease-out;
  transition: 150ms;
}

.form-label.focused {
  transform: translateY(-80%);
  padding-left: 3px;
  @include body-10-regular;
  padding-top: 10px;
}

.form-input {
  position: relative;
  z-index: 11;
}

.form-input.focused-input {
  padding: 30px 20px 10px;
}
.input-error {
  border-color: red;
}

.error-message {
  position: absolute;
  bottom: -16px;
  @include body-10-regular;
  color: #F53636;
  opacity: 0.7;
  padding-left: 20px;
}

.dop-text {
  @include body-12-regular;
  color: #525660;
  opacity: 0.7;
  padding: 6px 0 0px 20px;
}

</style>