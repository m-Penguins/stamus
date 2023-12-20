import { defineStore } from "pinia";

export const useReviewStore = defineStore("review-store", () => {
  const currentStep = ref(0);

  const clinic = ref(null);
  const pickedRating = ref(null);

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
        clinic: clinic.value,
        rating: pickedRating.value,
        name: nameField.value,
        phone: phoneField.value.substring(0, 16),
        comment: commentField.value,
        date: dateField.value,
      };

      const mail = useMail();
      const clinicData = formData.clinic
        ? `Клиника: ${formData.clinic?.heading}`
        : null;
      const rating = formData.rating ? `Оценка: ${formData.rating}` : null;
      const name = formData.name ? `Имя: ${formData.name}` : null;
      const phone = formData.phone ? `Телефон: ${formData.phone}` : null;

      const comment = formData.comment
        ? `Комментарий: ${formData.comment}`
        : null;

      const date = formData.date ? `Дата посещения: ${formData.date}` : null;

      const msg = [clinicData, rating, name, phone, comment, date]
        .filter(Boolean)
        .join("\n");

      try {
        await mail.send({
          config: "review",
          from: "dev@sloy.design",
          subject: "Плохой отзыв",
          text: msg,
        });

        moveStep3();
      } catch (error) {
        console.log(error);
        currentStep.value = 3;
      }

      return formData;
    }
  }

  const moveStep1 = (v) => {
    currentStep.value = 1;
  };
  const moveStep2 = (v) => {
    currentStep.value = 2;
  };
  const moveStep3 = () => {
    currentStep.value = 3;
  };

  const resetStore = () => {
    currentStep.value = 0;
    clinic.value = null;
    pickedRating.value = null;
    nameField.value = "";
    phoneField.value = "";
    commentField.value = "";
    dateField.value = null;
    startValidation.value = false;
  };
  return {
    currentStep,
    moveStep1,
    moveStep2,
    moveStep3,
    resetStore,
    clinic,
    pickedRating,
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
