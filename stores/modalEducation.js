import { defineStore, acceptHMRUpdate } from "pinia";

export const useModalEducationStore = defineStore("modal-video-store", () => {
   const isModalOpen = ref(false);

   function openModal() {
      isModalOpen.value = true;
      document?.body?.classList?.add("modal-open");
   }

   function closeModal() {
      isModalOpen.value = false;
      document?.body?.classList?.remove("modal-open");
   }

   return {
      isModalOpen,
      openModal,
      closeModal,
   };
});

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useModalVideoStore, import.meta.hot));
}
