import { defineStore } from "pinia";

export const useFormStore = defineStore("form-store", () => {
	const nameFieldInfo = ref("");
	const phoneFieldInfo = ref("");
	const emailFieldInfo = ref("");
	const digitFieldInfo = ref("");
	const namePatientField = ref("");

	const startValidation = ref(false);
	const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	const digitRegex = /^[0-9]+$/;

  const isNameInfoValid = computed(() => {
		if (startValidation.value) {
			return nameFieldInfo.value.length > 1;
		}
		return true;
  });

	const isNamePatientFieldValid = computed(() => {
		if (startValidation.value) {
			return namePatientField.value.length > 1;
		}
		return true;
  });

  const isDigitValidInfo = computed(() => {
		if (startValidation.value) {
			return digitRegex.test(digitFieldInfo.value);
		}
		return true;
  });

	const isEmailVaildInfo = computed(() => {
    if (startValidation.value) {
      return emailRegex.test(emailFieldInfo.value);
    }
    return true;
  });

	const isPhoneValidInfo = computed(() => {
    if (startValidation.value) {
      return phoneFieldInfo.value.substring(0, 16).length === 16;
    }
    return true;
  });

	const isSubmitActivePersonalIncomeTax = computed(() => {
		return ( 
			nameFieldInfo.value.length &&
			phoneFieldInfo.value.length > 0 &&
			emailFieldInfo.value.length > 0 &&
			digitFieldInfo.value.length > 0 &&
			namePatientField.value.length > 0
		);
	});

	function resetForm() {
		nameFieldInfo.value = "";
		phoneFieldInfo.value = "";
		emailFieldInfo.value = "";
		digitFieldInfo.value = "";
		startValidation.value = false;
	}

	async function submitModal() {
		startValidation.value = true;
	}

	return {
		nameFieldInfo,
		phoneFieldInfo,
		namePatientField,
		digitFieldInfo,
		emailFieldInfo,
		isNameInfoValid,
		isDigitValidInfo,
		isEmailVaildInfo,
		isPhoneValidInfo,
		startValidation,
		isSubmitActivePersonalIncomeTax,
		submitModal,
		isNamePatientFieldValid,
	}

})