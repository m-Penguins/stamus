import { defineStore } from "pinia";

export const useFormStore = defineStore("form-store", () => {
  const getterNameField = ref("");
  const digitField = ref("");
  const phoneField = ref("");

  const checkBoxes = ref([]);
  const whoIsGettingDocument = ref(null);
  const patientNameField = ref("");
  const address = ref("");
  const emailField = ref("");

  const startValidation = ref(false);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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

  const isEmailValidInfo = computed(() => {
    if (startValidation.value) {
      return emailRegex.test(emailField.value);
    }
    return true;
  });

  const isPhoneValidInfo = computed(() => {
    if (startValidation.value) {
      return phoneField.value.substring(0, 16).length === 16;
    }
    return true;
  });

  const isSubmitActivePersonalIncomeTax = computed(() => {
    return (
      getterNameField.value.length &&
      phoneField.value.length > 0 &&
      emailField.value.length > 0 &&
      digitField.value.length > 0 &&
      patientNameField.value.length > 0
    );
  });

  function resetForm() {
    getterNameField.value = "";
    phoneField.value = "";
    emailField.value = "";
    digitField.value = "";
    startValidation.value = false;
  }

  async function submitModal() {
    startValidation.value = true;

    if (
      isSubmitActivePersonalIncomeTax.value &&
      isPhoneValidInfo.value &&
      isEmailValidInfo.value &&
      isDigitValidInfo.value &&
      isNamePatientFieldValid.value &&
      isNameInfoValid.value
    ) {
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
      const emailFieldValue = emailField.value
        ? `Емейл: ${emailField.value}`
        : "";

      const msg = [
        getterNameFieldValue,
        digitFieldValue,
        phoneFieldValue,
        checkBoxesValue,
        whoIsGettingDocumentValue,
        patientNameFieldValue,
        addressValue,
        emailFieldValue,
      ]
        .filter(Boolean)
        .join("\n");

      try {
        await mail.send({
          config: "ndfl",
          from: "dev@sloy.design",
          subject: "Заявка на возврат НДФЛ",
          text: msg,
        });

        resetForm();
      } catch (error) {
        console.log(error);
        isError.value = true;
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
    emailField,
    isNameInfoValid,
    isDigitValidInfo,
    isEmailValidInfo,
    isPhoneValidInfo,
    startValidation,
    isSubmitActivePersonalIncomeTax,
    submitModal,
    isNamePatientFieldValid,
  };
});
