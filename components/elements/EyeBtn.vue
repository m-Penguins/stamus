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
      Слабовидящим
    </button>
  </div>
</template>

<style scoped lang="scss">
.visually-button {
  @media (max-width: 1360px) {
    .specialists-btn-base {
      max-height: 60px;
      padding: 4px 16px;
    }
  }
}
</style>
