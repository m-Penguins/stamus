<template>
  <div class="error">
    <div class="error-back">
      {{error.statusCode}}
    </div>
  </div>
</template>

<script setup>
  defineProps(['error'])
</script>


<style scoped>
.error {
    width: 1880px;
    max-width: 100%;
    margin: 20px auto 0 auto;
    padding: 0 20px;
}

.error-back {
  background: url('/assets/images/error/404.png');
  background-size: cover;
  width: 100%;
  height: 900px;
  border-radius: 45px;
}

</style>