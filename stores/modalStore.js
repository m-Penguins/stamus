import { defineStore } from "pinia";

export const useModalStore = defineStore("modal-store", () => {
  // vars for sending form state
  const isLoading = ref(false);
  const isError = ref(false);
  const isSuccess = ref(false);

  const nameField = ref("");
  const phoneField = ref("");
  const emailField = ref("");
  const clinicSelect = ref(null);
  const commentField = ref("");

  const startValidation = ref(false);

  const isModalOpenApplicationAccepted = ref(false);
  const isModalOpen = ref(false);
  const isModalOpenDiscounts = ref(false);
  const isModalCommunicationInterruptions = ref(false);
  const isModalOpenBid = ref(false);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const isNameValid = computed(() => {
    if (startValidation.value) {
      return nameField.value.length > 1;
    }
    return true;
  });

  const isEmailVaild = computed(() => {
    if (startValidation.value) {
      return emailRegex.test(emailField.value);
    }
    return true;
  });

  const isPhoneValid = computed(() => {
    if (startValidation.value) {
      return phoneField.value.length === 18;
    }
    return true;
  });

  function openModal() {
    resetForm();
    isModalOpen.value = true;
    document.body.classList.add("modal-open");
  }

  function openModalApplicationAccepted() {
    resetForm();
    isModalOpenApplicationAccepted.value = true;
    document.body.classList.add("modal-open");
  }

  function openModalBid() {
    resetForm();
    isModalOpenBid.value = true;
    document.body.classList.add("modal-open");
  }

  function openModalDiscounts() {
    resetForm();
    isModalOpenDiscounts.value = true;
    document.body.classList.add("modal-open");
  }

    function openModalCommunicationInterruptions() {
      resetForm();
      isModalCommunicationInterruptions.value = true;
      document.body.classList.add("modal-open");
    }

  function closeModal() {
    resetForm();
    isModalOpen.value = false;
    isModalOpenDiscounts.value = false;
    isModalOpenBid.value = false;
    isModalOpenApplicationAccepted.value = false;
    isModalCommunicationInterruptions.value = false;
    document.body.classList.remove("modal-open");
  }

  const isSubmitActive = computed(() => {
    return nameField.value.length && phoneField.value.length > 0;
  });

  const isSubmitActiveBid = computed(() => {
    return (
      nameField.value.length &&
      phoneField.value.length > 0 &&
      emailField.value.length > 0
    );
  });

  async function submitModal() {
    startValidation.value = true;

    if (isNameValid.value && isPhoneValid.value) {
      isLoading.value = true;

      const formData = {
        name: nameField.value,
        phone: phoneField.value,
        clinic:
          clinicSelect.value === "Выберите клинику"
            ? null
            : clinicSelect.value?.name,
        comment: commentField.value,
      };

      const mail = useMail();

      const name = formData.name ? `Имя: ${formData.name}` : null;
      const phone = formData.phone ? `Телефон: ${formData.phone}` : null;
      const clinic = formData.clinic
        ? `Адрес клиники: ${formData.clinic}`
        : null;
      const comment = formData.comment
        ? `Комментарий: ${formData.comment}`
        : null;

      const msg = [name, phone, clinic, comment].filter(Boolean).join("\n");

      const subject = () => {
        if (isModalOpenBid.value) {
          return "Корпоративная заявка";
        } else if (isModalOpenDiscounts.value) {
          return "Заявка из Счастливых часов";
        }
        return "Заявка на прием Стамус";
      };
      const fromStr = formData.name + " <dev@sloy.design>";

      try {
        await mail.send({
          config: "form",
          from: fromStr,
          subject: subject(),
          text: msg,
        });

        resetForm();
        isSuccess.value = true;
      } catch (error) {
        console.log(error);
        isError.value = true;
      } finally {
        isLoading.value = false;
        setTimeout(() => {
          closeModal();
          isError.value = false;
          isSuccess.value = false;
        }, 2000);
      }

      return formData;
    }
  }

  function resetForm() {
    nameField.value = "";
    phoneField.value = "";
    emailField.value = "";
    commentField.value = "";
    clinicSelect.value = null;
    startValidation.value = false;
  }

  return {
    isSubmitActive,
    nameField,
    phoneField,
    emailField,
    commentField,
    isNameValid,
    submitModal,
    isPhoneValid,
    resetForm,
    isModalOpen,
    openModal,
    closeModal,
    openModalDiscounts,
    isModalOpenDiscounts,
    isModalCommunicationInterruptions,
    isModalOpenApplicationAccepted,
    openModalApplicationAccepted,
    openModalCommunicationInterruptions,
    openModalBid,
    isModalOpenBid,
    isEmailVaild,
    isSubmitActiveBid,
    clinicSelect,
    isError,
    isLoading,
    isSuccess,
  };
});
