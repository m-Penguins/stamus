import { defineStore } from "pinia";

export const useReviewStore = defineStore("review-store", () => {
  const currentStep = ref(0);

  const nameField = ref("");
  const phoneField = ref("");
  const commentField = ref("");
  const dateField = ref(null);

  const startValidation = ref(false);

  const isNameValid = computed(() => {
    if (startValidation.value) {
      return nameField.value.length > 1;
    }
    return true;
  });

  const isPhoneValid = computed(() => {
    if (startValidation.value) {
      return phoneField.value.substring(0, 16).length === 16;
    }
    return true;
  });

  const isSubmitActive = computed(() => {
    return isNameValid.value && isPhoneValid.value;
  });

  async function submitModal() {
    startValidation.value = true;

    if (isNameValid.value && isPhoneValid.value) {
      const formData = {
        name: nameField.value,
        phone: phoneField.value.substring(0, 16),
        comment: commentField.value,
        date: dateField.value,
      };

      const mail = useMail();

      const name = formData.name ? `Имя: ${formData.name}` : null;
      const phone = formData.phone ? `Телефон: ${formData.phone}` : null;

      const comment = formData.comment
        ? `Комментарий: ${formData.comment}`
        : null;

      const date = formData.date ? `Дата посещения: ${formData.date}` : null;

      const msg = [name, phone, comment, date].filter(Boolean).join("\n");

      try {
        await mail.send({
          config: "form",
          from: "dev@sloy.design",
          subject: "Плохой отзыв",
          text: msg,
        });

        moveStep3();
      } catch (error) {
        console.log(error);
        currentStep.value = 3;
      } finally {
        setTimeout(() => {
          moveStep3();
        }, 1500);
      }

      return formData;
    }
  }

  const moveStep2 = (v) => {
    currentStep.value = 1;
  };
  const moveStep3 = () => {
    currentStep.value = 2;
  };

  const resetStore = () => {
    currentStep.value = 0;
    nameField.value = "";
    phoneField.value = "";
    commentField.value = "";
    dateField.value = null;
    startValidation.value = false;
  };
  return {
    currentStep,
    moveStep2,
    moveStep3,
    resetStore,
    nameField,
    phoneField,
    commentField,
    dateField,
    isSubmitActive,
    isNameValid,
    isPhoneValid,
    submitModal,
  };
});
