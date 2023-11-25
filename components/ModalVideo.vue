<template>
  <transition name="modal">
    <div
      v-if="videoStore.isModalOpen"
      class="modal-mask"
      @click="videoStore.closeModal"
    >
      <div class="modal-container" @click.stop v-html="videoStore.link"></div>
    </div>
  </transition>
</template>

<script setup>
const videoStore = useModalVideoStore();

const handleEscapePress = (e) => {
  if (e.key === "Escape" && videoStore.isModalOpen) {
    videoStore.closeModal();
  }
};

onMounted(() => {
  window?.addEventListener("keydown", handleEscapePress);
});

onBeforeUnmount(() => {
  window?.removeEventListener("keydown", handleEscapePress);
});
</script>

<style scoped lang="scss">
@import "/assets/styles/style.scss";
.modal-mask {
  position: fixed;
  z-index: 9998;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0 50px;

  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

@media screen and (max-width: 1100px) {
  .modal-mask {
    padding: 0 32px;
  }
}
@media screen and (max-width: 640px) {
  .modal-mask {
    padding: 0 32px;
  }
}

.modal-container {
  background-color: transparent;
  transition: all 0.3s ease;

  position: relative;
  width: 100%;
  // max-width: 1340px;

  height: auto;
  max-height: 80%;
  // aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 20px;
  @media all and (orientation: landscape) {
    height: 70vh;
    width: calc(70vh / 9 * 16);
  }
  @media all and (orientation: portrait) {
    width: 90vw;
    height: calc(90vw / 16 * 9);
    // max-width: 1340px;

    // height: auto;
    // max-height: 80%;
  }
  // @supports not (aspect-ratio: 16 / 9) {
  //   &::before {
  //     float: left;
  //     padding-top: 56.25%;
  //     content: "";
  //   }

  //   &::after {
  //     display: block;
  //     content: "";
  //     clear: both;
  //   }
  // }

  & :deep(iframe) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.53);
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
