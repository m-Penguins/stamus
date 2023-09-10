<template>
  <div class="radio-btn">
    <label v-for="option in options" :key="option.id" :class="['radio-btn-label', { selected: option.id === selectedOption }]">
      <input type="radio" :value="option.id" v-model="selectedOption" />
      <span class="custom-radio">
        <span class="inner-circle"></span>
      </span>
      {{ option.label }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    options: Array, 
  },
  data() {
    return {
      selectedOption: null,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/style.scss';
.radio-btn {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.radio-btn-label input[type="radio"] {
  display: none;
}

.radio-btn-label {
  @include body-16-regular;
  color: $placeholder;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.radio-btn-label.selected {
  color: #232D5B;
}

.radio-btn-label:hover {
  color: #525660;
}

.radio-btn-label .custom-radio {
  width: 20px;
  height: 20px;
  border: 1px solid #7F838C;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
  position: relative;
}

.radio-btn-label:hover .custom-radio {
  border-color: #525660;
}

.radio-btn-label input[type="radio"]:checked + .custom-radio {
 
  border-color: #232D5B;
}

.radio-btn-label input[type="radio"]:checked + .custom-radio .inner-circle {
  width: 14px;
  height: 14px;
  background-color: #232D5B;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
}

</style>