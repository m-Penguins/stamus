<template>
  <div>
    <textarea :placeholder="placeholder" class="textarea-base"></textarea>
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: String
    },
  }
</script>