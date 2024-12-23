import { defineStore } from "pinia";

export const useFormStore = defineStore("form-store", () => {
  const isLoading = ref(false);
  const isError = ref(false);
  const isSuccess = ref(false);

  const getterNameField = ref("");
  const digitField = ref("");
  const phoneField = ref("");
  const birthDate = ref("");
  const dateOfIssue = ref("");
  const passportSeries = ref("");

  const patientNameField = ref("");
  const patientBirthDate = ref("");
  const patientPassportSeries = ref("");
  const patientDateOfIssue = ref("");
  const patientINN = ref("");

  const checkBoxes = ref([]);
  const whoIsGettingDocument = ref(null);
  const address = ref("");
  const selectedYear = ref("");

  const startValidation = ref(false);

  const digitRegex = /^[0-9]+$/;

  const isNameInfoValid = computed(() => {
    return !startValidation.value || getterNameField.value.length > 1;
  });

  const isDigitValidInfo = computed(() => {
    return (
       !startValidation.value ||
       (digitRegex.test(digitField.value) && digitField.value.length >= 10)
    );
  });

  const isDateBirthValidInfo = computed(() => {
    return !startValidation.value || birthDate.value.length > 0;
  });

  const isDateOfIssueValidInfo = computed(() => {
    return !startValidation.value || dateOfIssue.value.length > 0;
  });

  const isPassportSeriesValid = computed(() => {
    return !startValidation.value || passportSeries.value.length > 0;
  });

  const isPhoneValidInfo = computed(() => {
    return !startValidation.value || phoneField.value.length === 18;
  });

  const isNamePatientFieldValid = computed(() => {
    return !startValidation.value || patientNameField.value.length > 1;
  });

  const isPatientBirthDateValid = computed(() => {
    return !startValidation.value || patientBirthDate.value.length > 0;
  });

  const isPatientPassportValid = computed(() => {
    return !startValidation.value || patientPassportSeries.value.length > 0;
  });

  const isPatientDateValid = computed(() => {
    return !startValidation.value || patientDateOfIssue.value.length > 0;
  });

  const isPatientINNValid = computed(() => {
    return (
       !startValidation.value ||
       (digitRegex.test(patientINN.value) && patientINN.value.length >= 10)
    );
  });

  const isSubmitActivePersonalIncomeTax = computed(() => {
    return (
       getterNameField.value.length > 0 &&
       phoneField.value.length > 0 &&
       digitField.value.length > 0 &&
       patientNameField.value.length > 0 &&
       birthDate.value &&
       dateOfIssue.value &&
       passportSeries.value.length > 0 &&
       patientBirthDate.value &&
       patientPassportSeries.value.length > 0 &&
       patientDateOfIssue.value &&
       patientINN.value.length > 0
    );
  });

  function resetForm() {
    getterNameField.value = "";
    digitField.value = "";
    phoneField.value = "";
    birthDate.value = "";
    dateOfIssue.value = "";
    passportSeries.value = "";

    patientNameField.value = "";
    patientBirthDate.value = "";
    patientPassportSeries.value = "";
    patientDateOfIssue.value = "";
    patientINN.value = "";

    address.value = "";
    checkBoxes.value = [];
    whoIsGettingDocument.value = null;
    selectedYear.value = "";

    startValidation.value = false;
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
       isNameInfoValid.value &&
       isDateBirthValidInfo.value &&
       isDateOfIssueValidInfo.value
    ) {
      isLoading.value = true;

      const mail = useMail();

      const msg = [
        `ФИО налогоплательщика: ${getterNameField.value}`,
        `ИНН: ${digitField.value}`,
        `Дата рождения: ${birthDate.value}`,
        `Серия и номер паспорта: ${passportSeries.value}`,
        `Дата выдачи паспорта: ${dateOfIssue.value}`,
        `ФИО пациента: ${patientNameField.value}`,
        `Дата рождения пациента: ${patientBirthDate.value}`,
        `Серия и номер паспорта пациента: ${patientPassportSeries.value}`,
        `Дата выдачи паспорта пациента: ${patientDateOfIssue.value}`,
        `Телефон: ${phoneField.value}`,
        `Когда проходил лечение: ${checkBoxes.value?.join(", ")}`,
        `Для кого получает справку: ${whoIsGettingDocument.value}`,
        `Как хочет получить справку: ${address.value}`,
      ]
         .filter(Boolean)
         .join("\n");

      try {
        await mail.send({
          config: "ndfl",
          from: "dev@sloy.design",
          subject: `${getterNameField.value} Заявка на возврат НДФЛ`,
          text: msg,
        });

        resetForm();
        isSuccess.value = true;
      } catch (error) {
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
    digitField,
    phoneField,
    birthDate,
    dateOfIssue,
    passportSeries,
    patientNameField,
    patientBirthDate,
    patientPassportSeries,
    patientDateOfIssue,
    patientINN,
    selectedYear,
    isNameInfoValid,
    isDigitValidInfo,
    isPhoneValidInfo,
    isNamePatientFieldValid,
    isDateBirthValidInfo,
    isDateOfIssueValidInfo,
    isPassportSeriesValid,
    isPatientBirthDateValid,
    isPatientPassportValid,
    isPatientDateValid,
    isPatientINNValid,
    startValidation,
    isSubmitActivePersonalIncomeTax,
    resetForm,
    resetSendingState,
    submitModal,
    isLoading,
    isError,
    isSuccess,
  };
});
