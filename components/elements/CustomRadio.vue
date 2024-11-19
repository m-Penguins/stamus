<template>
  <div class="radio-group">
    <div
        v-for="option in options"
        :key="option.value"
        :class="['radio-item', { 'active': modelValue === option.value }]"
        @click="updateValue(option.value)"
    >
      <span>{{ option.label }}</span>
      <div class="radio-circle"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    required: true
  },
  options: {
    type: Array,
    required: true,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (value) => {
  emit('update:modelValue', value);
};
</script>

<style scoped lang="scss">
.radio-group {
  display: flex;
  gap: 16px;
  width: 100%;
  @media screen and (max-width: 900px) {
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

.radio-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 17px 18px 17px 20px;
  border: 1px solid #E9E9E9;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;
  max-width: 308px;
  font-size: 16px;
  color: #7F838C;
  user-select: none;
  &.active {
    background-color: #1F2957;
    color: #fff;
    border-color: #1F2957;

    .radio-circle {
      border: 1.5px solid #fff;
      background: transparent;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      &::after {
        content: ' ';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: absolute;
        background: #fff;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    max-width: 333px;
  }

  @media screen and (max-width: 740px) {
    max-width: none;

  }
}

.radio-circle {
  width: 20px;
  height: 20px;
  border: 1.5px solid #E9E9E9;
  border-radius: 50%;
  margin-right: 8px;
  background-color: transparent;
  transition: 0.3s;
}
</style>
