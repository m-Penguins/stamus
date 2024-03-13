/* eslint-disable no-undef */
import { defineStore, acceptHMRUpdate } from "pinia";

export const useModalVideoStore = defineStore("modal-video-store", () => {
  const isModalOpen = ref(false);

  const link = ref("");

  function openModal(videoLink) {
    link.value = videoLink;
    isModalOpen.value = true;
    document?.body?.classList?.add("modal-open");
  }

  function closeModal() {
    isModalOpen.value = false;
    link.value = "";
    document?.body?.classList?.remove("modal-open");
  }

  return {
    link,
    isModalOpen,
    openModal,
    closeModal,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModalVideoStore, import.meta.hot));
}
