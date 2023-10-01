import { defineStore } from "pinia";

export const useModalStore = defineStore("modal-store", () => {
	const nameField = ref("");
	const phoneField = ref("");
	const emailField = ref("");
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
      return phoneField.value.substring(0, 16).length === 16;
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
			return (
				nameField.value.length &&
				phoneField.value.length > 0
			);
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
		}

		function resetForm() {
			nameField.value = "";
			phoneField.value = "";
			emailField.value = "";
			commentField.value = "";
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
	}

})