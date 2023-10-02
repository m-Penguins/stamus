<template>
  <div class="input-base">
    <form @submit.prevent="(e) => handleSubmit(e.target[0].value.trim())">
      <input
        type="text"
        :placeholder="placeholder"
        :value="modelValue"
        @input="(e) => handleInput(e.target.value.trim())"
        class="input bg"
      />
      <button type="submit" class="btn-search">
        <img
          src="../../assets/images/icons/icon_search.svg"
          alt="icon search"
        />
      </button>
      <button @click="clearInput" v-if="modelValue" class="btn-close">
        <img src="../../assets/images/icons/close.svg" alt="icon close" />
      </button>
    </form>
  </div>
</template>

<script setup>
defineProps(["modelValue", "placeholder"]);

const emit = defineEmits(["update:modelValue", "submit"]);

const handleInput = (v) => emit("update:modelValue", v);

const handleSubmit = (v) => emit("submit", v);

const clearInput = () => emit("submit", "");
</script>

<style scoped lang="scss">
.input-base {
  width: 308px;
  position: relative;
}

.bg {
  background: white;
  padding: 14px 20px 14px 46px;
}

.btn-search,
.btn-close {
  border: none;
  outline: none;
  background: transparent;
}

.btn-search {
  height: 20px;
  width: 20px;
  position: absolute;
  bottom: 17px;
  left: 20px;
  cursor: pointer;
}

.btn-close {
  height: 20px;
  width: 20px;
  position: absolute;
  bottom: 17px;
  right: 20px;
  cursor: pointer;
}

.input:focus {
  color: #525660;
}

.input-error {
  border-color: red;
}

.error-message {
  color: red;
}
</style>
