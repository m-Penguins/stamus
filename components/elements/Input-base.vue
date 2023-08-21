<template>
  <div class="input-base">
    <input v-bind="$attrs" :placeholder="placeholder" class="input" :class="{ 'input-error': showError }" />
    <p v-if="showError" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
  export default {
    name: 'Input',
    props: {
      showError: Boolean,
      errorMessage: String,
      placeholder: String
    },
  }
</script>

<style scoped lang="scss">
  .input-error {
    border-color: red;
  }

  .error-message {
    color: red;
  }
</style>