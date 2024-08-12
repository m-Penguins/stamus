import { defineStore } from "pinia";

export const useFormStore = defineStore("form-store", () => {
  // vars for sending form state
  const isLoading = ref(false);
  const isError = ref(false);
  const isSuccess = ref(false);

  const getterNameField = ref("");
  const digitField = ref("");
  const phoneField = ref("");

  const checkBoxes = ref([]);
  const whoIsGettingDocument = ref(null);
  const patientNameField = ref("");
  const address = ref("");

  const startValidation = ref(false);
  const digitRegex = /^[0-9]+$/;

  const isNameInfoValid = computed(() => {
    if (startValidation.value) {
      return getterNameField.value.length > 1;
    }
    return true;
  });

  const isNamePatientFieldValid = computed(() => {
    if (startValidation.value) {
      return patientNameField.value.length > 1;
    }
    return true;
  });

  const isDigitValidInfo = computed(() => {
    if (startValidation.value) {
      return (
        digitRegex.test(digitField.value) && digitField.value?.length >= 10
      );
    }
    return true;
  });

  const isPhoneValidInfo = computed(() => {
    if (startValidation.value) {
      return phoneField.value.length === 18;
    }
    return true;
  });

  const isSubmitActivePersonalIncomeTax = computed(() => {
    return (
      getterNameField.value.length &&
      phoneField.value.length > 0 &&
      digitField.value.length > 0 &&
      patientNameField.value.length > 0
    );
  });

  function resetForm() {
    getterNameField.value = "";
    phoneField.value = "";
    digitField.value = "";
    startValidation.value = false;
    checkBoxes.value = [];
  }

  function resetSendingState() {
    isError.value = false;
    isLoading.value = false;
    isSuccess.value = false;
  }

  async function submitModal() {
    startValidation.value = true;

    if (
      isSubmitActivePersonalIncomeTax.value &&
      isPhoneValidInfo.value &&
      isDigitValidInfo.value &&
      isNamePatientFieldValid.value &&
      isNameInfoValid.value
    ) {
      isLoading.value = true;

      const mail = useMail();

      const getterNameFieldValue = getterNameField.value
        ? `ФИО налогоплательщика: ${getterNameField.value}`
        : "";
      const digitFieldValue = digitField.value
        ? `ИНН: ${digitField.value}`
        : "";
      const phoneFieldValue = phoneField.value
        ? `Телефон: ${phoneField.value}`
        : "";

      const checkBoxesValue =
        checkBoxes.value?.length > 0
          ? `Когда проходил лечение: ${checkBoxes.value?.join(", ")}`
          : "";
      const whoIsGettingDocumentValue = whoIsGettingDocument.value
        ? `Для кого получает справку: ${whoIsGettingDocument.value}`
        : "";
      const patientNameFieldValue = patientNameField.value
        ? `ФИО пациента: ${patientNameField.value}`
        : "";
      const addressValue = address.value
        ? `Как хочет получить справку: ${address.value}`
        : "";

      const msg = [
        getterNameFieldValue,
        digitFieldValue,
        phoneFieldValue,
        checkBoxesValue,
        whoIsGettingDocumentValue,
        patientNameFieldValue,
        addressValue,
      ]
        .filter(Boolean)
        .join("\n");

      try {
        await mail.send({
          config: "ndfl",
          from: getterNameFieldValue,
          subject: "Заявка на возврат НДФЛ",
          text: msg,
        });

        resetForm();
        isSuccess.value = true;
      } catch (error) {
        console.log(error);
        isError.value = true;
      } finally {
        isLoading.value = false;
      }
    }
  }

  return {
    checkBoxes,
    whoIsGettingDocument,
    address,
    getterNameField,
    phoneField,
    patientNameField,
    digitField,
    isNameInfoValid,
    isDigitValidInfo,
    isPhoneValidInfo,
    startValidation,
    isSubmitActivePersonalIncomeTax,
    submitModal,
    isNamePatientFieldValid,

    isLoading,
    isSuccess,
    isError,
    resetSendingState,
  };
});
