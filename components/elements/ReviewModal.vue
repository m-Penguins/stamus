<template>
  <transition name="modal">
    <div
        v-if="modelValue" class="modal-mask" @click="closeModal"
    >
      <div class="modal-container" @click.stop>
        <button class="close" @click="closeModal">
          <img src="@/assets/images/icons/close-icon.svg"/>
        </button>
        <h3>Оставить отзыв</h3>
        <div class="form">
          <elements-input-base
              tag-type="input"
              class="form-input"
              label="Введите имя"
              v-model="formData.name"
          />
          <elements-input-base
              label="Укажите номер телефона"
              tag-type="phoneMask"
              type="tel"
              v-model="formData.phone"
              class="form-input"
          />
          <elements-custom-select
              :options="allClinics"
              label="Выберите клинику"
              class="select"
              @select="handleClinicChange"
              :selectedId="clinicFilter"
          />
          <elements-input-base
              label="Текст отзыва"
              tag-type="textarea"
              class="form-textarea"
              v-model="formData.text"
          />
          <div class="form-review">
            <h6>Поставьте оценку</h6>
            <div class="form-review-stars">
              <img
                  v-for="(star, index) in 5"
                  :key="index"
                  src="@/assets/images/icons/star-icon.svg"
                  :class="{ active: index < rating }"
                  @click="setRating(index + 1)"
              />
            </div>
          </div>
          <elements-button-base @click="submit" class="form-submit" title="Отправить"/>
          <p class="form-privacy">Нажимая кнопку отправить, вы соглашаетесь с Политикой обработки персональных данных</p>
          <span class="message" :class="{ error: isError, success: isSuccess }">{{message}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const baseDataStore = useBaseDataStore();

const allClinics = baseDataStore.clinics?.data?.map((cl) => ({
  id: cl?.id,
  name: cl?.attributes?.heading,
}));

const clinicFilter = ref(null);
const formData = ref({
  name: '',
  phone: '',
  text: ''
})

const isSuccess = ref(false)
const isError = ref(false)
const message = ref('')
const rating = ref(0);

const resetForm = () => {
  clinicFilter.value = null
  formData.value = {
    name: '',
    phone: '',
    text: ''
  }
  rating.value = 0
}
const submit = async () => {
  if (formData.value.name && formData.value.phone && formData.value.text && clinicFilter.value && rating.value) {
    isError.value = false
    isSuccess.value = false
    const mail = useMail();

    const msg = [
      `Имя: ${formData.value.name}`,
      `Номер телефона: ${formData.value.phone}`,
      `Клиника: ${allClinics.find(clinic => clinic.id === clinicFilter.value).name}`,
      `Отзыв: ${formData.value.text}`,
      `Оценка: ${rating.value}`
    ]
        .filter(Boolean)
        .join("\n");
    try {
      await mail.send({
        config: "review",
        from: "dev@sloy.design",
        subject: `${formData.value.name} отзыв`,
        text: msg,
      });
      resetForm();
      isSuccess.value = true
      message.value = "Ваша отзыв успешно отправлен"
      setTimeout(() => {
        isError.value = false;
        isSuccess.value = false;
        message.value = "";
      }, 5000);
    } catch (error) {
      isError.value = true
      message.value = "Произошла ошибка, попробуйте позже"
    }
  } else {
    message.value = "Заполните все поля"
    isError.value = true
  }
}

const handleClinicChange = async (clinic) => {
  clinicFilter.value = clinic?.id;
};

const setRating = (value) => {
  rating.value = value;
};

const closeModal = () => {
  emit("update:modelValue", false);
};

const handleEscapePress = (e) => {
  if (e.key === "Escape" && props.modelValue) {
    closeModal();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleEscapePress);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleEscapePress);
});
</script>

<style scoped lang="scss">
@import "/assets/styles/style.scss";
.modal-mask {
  position: fixed;
  z-index: 9998;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0 50px;

  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  background-color: #fff;
  transition: all 0.3s ease;
  padding: 40px 20px;
  position: relative;
  width: 100%;
  max-width: 416px;
  height: 100%;
  max-height: 720px;
  overflow: hidden;
  border-radius: 20px;
  font-family: Manrope, serif;
  h3 {
    font-weight: 500;
    font-size: 22px;
    text-align: center;
  }

  .close {
    width: 20px;
    height: 20px;
    background: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    img {
      width: 100%;
    }
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;

  &-review {
    h6 {
      font-weight: 400;
      font-size: 16px;
      line-height: 135%;
      color: #7F838C;
      margin-bottom: 8px;
    }
    &-stars {
      display: flex;
      gap: 7px;
      img {
        cursor: pointer;
        width: 26px;
        height: 26px;
        &.active {
          filter: brightness(0) saturate(100%) invert(12%) sepia(22%) saturate(639%) hue-rotate(180deg) brightness(96%) contrast(92%);
        }
      }
    }
  }
  &-submit {
    width: 100%;
    margin-top: 20px;
  }
  &-privacy {
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    text-align: center;
    color: #525660;
    margin-top: -6px;
  }
  .message {
    width: 100%;
    font-size: 12px;
    height: 20px;
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
    opacity: 0;
    text-align: center;
    &.error {
      color: red;
      opacity: 1;
    }
    &.success {
      color: #06b206;
      opacity: 1;
    }
  }
}

@media screen and (max-width: 1100px) {
  .modal-mask {
    padding: 0 32px;
  }
}
@media screen and (max-width: 640px) {
  .modal-mask {
    padding: 0 32px;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
