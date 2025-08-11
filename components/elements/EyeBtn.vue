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
  display: none;
  @media (max-width: 1360px) {
    /* right: 50%; */
    /* transform: translateX(50%); */
    display: block;
    /* position: fixed; */
    /* z-index: 99999; */
    bottom: 15px;
    font-size: 14px;
    & button {
      font-size: 12px;
      padding: 5px 10px;
    }
  }
}
</style>
