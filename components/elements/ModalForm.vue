<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      title: '',
      message: '',
    };
  },
  methods: {
    openModal(title, message) {
      this.isOpen = true;
      this.title = title;
      this.message = message;
    },
    closeModal() {
      this.isOpen = false;
    },
  },
};
</script>