<script setup>
const props = defineProps({
  showError: Boolean,
  errorMessage: String,
  placeholder: String,
  label: String,
  dopText: String,
  tagType: {
    type: String,
    default: "input" | "textarea" | "phoneMask" | "email" | "date",
  },
  modelValue: {
    type: String,
    default: "",
  },
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
  <div v-if="tagType === 'textarea'" class="form-group">
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
      :name="label"
      class="form-textarea textarea-base"
      :class="isFocused ? 'focused-input-color' : ''"
      :placeholder="placeholder"
      :value="modelValue"
      @focus="onFocus($event)"
      @blur="onBlur($event)"
      @input="updateInputValue"
    />
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
      :name="label"
      class="form-input input"
      :class="{
        'focused-input': isFocused || modelValue.length,
        'focused-input-color': isFocused,
      }"
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
      :name="label"
      :placeholder="placeholder"
      class="form-input input"
      :class="{
        'focused-input': isFocused || modelValue.length,
        'focused-input-color': isFocused,
      }"
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
    <input
      v-maska
      v-bind="$attrs"
      :name="label"
      :placeholder="placeholder"
      class="form-input input"
      :class="{
        'focused-input': isFocused || modelValue.length,
        'focused-input-color': isFocused,
      }"
      data-maska="+7 (###) ###-##-##"
      :data-maska-tokens="{ '#': { pattern: /[0-9]/ } }"
      @input="updateInputValue"
      :value="modelValue"
      @focus="onFocus($event)"
      @blur="onBlur($event)"
    />
    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>
  </div>
  <div v-else-if="tagType === 'date'" class="input-base form-group">
    <label
        ref="labelEl"
        :for="label"
        :class="isFocused || modelValue.length ? 'focused' : ''"
        class="form-label"
    >{{ label }}</label
    >
    <input
        v-maska
        data-maska="##.##.####"
        v-bind="$attrs"
        :name="label"
        :placeholder="placeholder"
        class="form-input input"
        :class="{
        'focused-input': isFocused || modelValue.length,
        'focused-input-color': isFocused,
      }"
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
@import "/assets/styles/style.scss";
.focused-input-color {
  color: #525660 !important;
}

.focused-textarea-color {
  color: #525660;
}
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
  &.date {
    font-size: 12px;
    top: 0;
  }
}

.form-label.focused {
  transform: translateY(-80%);
  padding-left: 3px;
  @include body-10-regular;
  padding-top: 10px;
  &.date {
    font-size: 8px;
    top: 0;
    padding-top: 65px;
  }
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
  color: #f53636;
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
