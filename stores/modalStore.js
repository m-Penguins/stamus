import { defineStore } from "pinia";

export const useModalStore = defineStore("modal-store", () => {
  const nameField = ref("");
  const phoneField = ref("");
  const emailField = ref("");
  const clinicSelect = ref(null);
  const commentField = ref("");

  const startValidation = ref(false);

  const isModalOpen = ref(false);
  const isModalOpenDiscounts = ref(false);
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

  function closeModal() {
    resetForm();
    isModalOpen.value = false;
    isModalOpenDiscounts.value = false;
    isModalOpenBid.value = false;
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

      try {
        await mail.send({
          config: "form",
          from: "dev@sloy.design",
          subject: subject(),
          text: msg,
        });

        resetForm();
      } catch (error) {
        console.log(error);
        isError.value = true;
      } finally {
        setTimeout(() => {
          closeModal();
        }, 1500);
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
    openModalBid,
    isModalOpenBid,
    isEmailVaild,
    isSubmitActiveBid,
    clinicSelect,
  };
});
