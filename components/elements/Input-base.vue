<template>
  <div v-if="tagType === 'input'" class="input-base form-group">
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
    <p v-if="showError" class="error-message">{{ errorMessage }}</p>
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
      :mask="mask"
      @input="updateInputValue"
      :value="modelValue"
      @focus="onFocus($event)"
      @blur="onBlur($event)"
    />
    <p v-if="showError" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { IMaskComponent } from 'vue-imask';
  export default {
    name: 'Input',
    props: {
      showError: Boolean,
      errorMessage: String,
      placeholder: String,
      label: String,
      tagType: {
        type: String,
        default: "input"
      },
      modelValue: {
       type: String,
       default: '' 
      },
      mask: {
       type: String,
       default: '' 
      }
    },
    components: {
      IMaskComponent, 
    },
    setup() {
      const labelEl = ref();
      const isFocused = ref(false);
      const updateInputValue = (e) => {
        emit("update:modelValue", e.target.value);
      };
      const onFocus = (e) => {
        console.log(e)
        isFocused.value = true;
        labelEl.value.style.marginLeft = 0 + "px";
      };

      const onBlur = (e) => {
        isFocused.value = false;
        labelEl.value.style.marginLeft = 0 + "px";
        labelEl.value.style.backgroundColor = "transparent";
      };

      return {
        onFocus,
        onBlur,
        labelEl,
        updateInputValue,
        isFocused
      }
    }
  }
</script>

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
  padding-left: 5px;
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
    color: red;
  }
</style>