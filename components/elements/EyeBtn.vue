<script setup lang="ts">
const isAccessibilityActive = ref(false);

function triggerAccessibility() {
  const btn = document.getElementById("specialButton");
  if (btn) btn.click();
}
</script>

<template>
  <div class="visually-button">
    <button id="specialButton" style="display: none"></button>

    <button
      @click="triggerAccessibility"
      class="button-base specialists-btn-base"
      v-if="!isAccessibilityActive"
    >
      Настройки для слабовидящих
    </button>
  </div>
</template>

<style scoped lang="scss">
.visually-button {
  @media (max-width: 1360px) {
    right: 50%;
    transform: translateX(50%);
    display: block;
    position: fixed;
    z-index: 99999;
    bottom: 15px;
  }
}
</style>
