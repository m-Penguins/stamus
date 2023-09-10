<template>
  <div class="info">
    <div 
      v-for="(item, index) in mockInfoDop" 
      @click="toggleAccordion(index)" 
      :key="index"
      class="info-card"
    >
    <div class="info-card__box">
      <h3 class="accordion__title">{{ item.title }}</h3>
      <div v-if="!item.isOpen">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22L32 22.003M22 12V32" stroke="#525660" stroke-linecap="round"/>
        <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="#E9E9E9"/>
        </svg>
      </div>
      <div v-else>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.9985L32 22.0015" stroke="#525660" stroke-linecap="round"/>
        <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="#E9E9E9"/>
        </svg>
      </div>
    </div>
    <div v-show="item.isOpen" class="accordion__content">
      <div v-if="item.id === 7">
        <div>
          <p class="accordion-content-text">{{ item.text }}</p>
          <div class="accordion-content-inputs">
            <elements-input-base placeholder="ФИО налогоплательщика" class="popup-form-input"/>
            <elements-input-base placeholder="Введите ИНН" class="popup-form-input"/>
            <elements-input-base placeholder="Контактный номер телефона" class="popup-form-input"/>
            <elements-checkbox label="Выбрать опцию" v-model="isChecked"/>
            <elements-checkbox label="Выбрать опцию" v-model="isChecked"/>
            <elements-checkbox label="Выбрать опцию" v-model="isChecked"/>
            <elements-checkbox label="Выбрать опцию" v-model="isChecked"/>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { mockInfoDop } from '../../stores/mockData'
export default {
  props: {
    data: Array,
  },
 data() {
    return {
      mockInfoDop,
      isChecked: false
    };
  },
  methods: {
    toggleAccordion(index) {
      this.mockInfoDop.forEach((item, i) => {
        if (i === index) {
          item.isOpen = !item.isOpen;
        } else {
          item.isOpen = false;
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/style.scss';

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
  border: 1px solid var(--stroke, #E9E9E9);
  transition: .3s;

  &__box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-bottom: 16px;
  }
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
  max-width: 376px;
}

</style>