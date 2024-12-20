/* eslint-disable no-undef */
import { defineStore, acceptHMRUpdate } from "pinia";

export const useModalVideoStore = defineStore("modal-video-store", () => {
  const isModalOpen = ref(false);
  const link = ref("");
  const videoOrientation = ref("horizontal");

  function extractDimensions(videoLink) {
    const widthMatch = videoLink.match(/width="(\d+)"/);
    const heightMatch = videoLink.match(/height="(\d+)"/);

    const width = widthMatch ? parseInt(widthMatch[1], 10) : 0;
    const height = heightMatch ? parseInt(heightMatch[1], 10) : 0;

    return { width, height };
  }

  function openModal(videoLink) {
    link.value = videoLink;
    isModalOpen.value = true;
    const { width, height } = extractDimensions(videoLink);
    console.log(width, height)
    if (width && height) {
      videoOrientation.value = width > height ? "horizontal" : "vertical";
    }
    document?.body?.classList?.add("modal-open");
  }

  function closeModal() {
    isModalOpen.value = false;
    link.value = "";
    videoOrientation.value = "horizontal";
    document?.body?.classList?.remove("modal-open");
  }

  return {
    link,
    isModalOpen,
    videoOrientation,
    openModal,
    closeModal,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModalVideoStore, import.meta.hot));
}
