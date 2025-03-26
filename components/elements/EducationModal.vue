<template>
  <transition name="modal">
    <div
        v-if="educationStore.isModalOpen"
        class="modal-mask"
        @click="educationStore.closeModal"
    >
      <div class="modal-container" @click.stop>
        <div class="left-side">
          <div class="gray-block">
            <img src="@/assets/images/icons/logoDental.svg" alt="icon" />
          </div>
          <div class="gray-block">
            <h5>Правила заполнения</h5>
            <p>Внимательно заполняйте данные своих <br /> подчиненных</p>
          </div>
          <div class="participants">
            <div
                v-for="(participant, index) in participants"
                :key="index"
                class="participant"
                @click="selectParticipant(index)"
                :class="{ active: selectedParticipantIndex === index }"
            >
              {{ participant.name }}
            </div>
            <button @click="addParticipant" class="participant">+</button>
          </div>
        </div>
        <div class="right-side">
          <h2>Запись на курс для</h2>
          <div class="form">
            <elements-input-base
                v-model="selectedParticipant.fullName"
                tag-type="input"
                label="ФИО"
            />
            <elements-input-base
                v-model="selectedParticipant.phoneNumber"
                tag-type="phoneMask"
                type="tel"
                label="Номер телефона"
            />
            <elements-input-base
                v-model="selectedParticipant.email"
                tag-type="input"
                label="Электронная почта"
            />
            <elements-input-base
                v-model="selectedParticipant.birthDate"
                tag-type="input"
                label="Дата рождения"
            />
            <elements-input-base
                v-model="selectedParticipant.passportNumber"
                tag-type="input"
                label="Серия и номер паспорта"
            />
            <elements-input-base
                v-model="selectedParticipant.passportIssuer"
                tag-type="input"
                label="Кем выдан"
            />
            <elements-input-base
                v-model="selectedParticipant.passportIssueDate"
                tag-type="input"
                label="Дата выдачи"
            />
            <elements-input-base
                v-model="selectedParticipant.registration"
                tag-type="input"
                label="Прописка"
            />
          </div>
          <p v-if="isSuccess" class="privacy">
            Заявка успешно отправлена
          </p>
          <button @click="submitModal" class="send-btn">Отправить</button>
          <p class="privacy">
            Нажимая кнопку отправить, вы соглашаетесь с Политикой обработки
            персональных данных
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const educationStore = useModalEducationStore();

const participants = ref([
  {
    name: 'Первый участник',
    fullName: '',
    phoneNumber: '',
    email: '',
    birthDate: '',
    passportNumber: '',
    passportIssuer: '',
    passportIssueDate: '',
    registration: '',
  },
]);
const isSuccess = ref(false);

const selectedParticipantIndex = ref(0);

const selectedParticipant = computed(() => participants.value[selectedParticipantIndex.value]);

const selectParticipant = (index) => {
  selectedParticipantIndex.value = index;
};


const addParticipant = () => {
  participants.value.push({
    name: `Участник ${participants.value.length + 1}`,
    fullName: '',
    phoneNumber: '',
    email: '',
    birthDate: '',
    passportNumber: '',
    passportIssuer: '',
    passportIssueDate: '',
    registration: '',
  });
};

const handleEscapePress = (e) => {
  if (e.key === "Escape" && educationStore.isModalOpen) {
    educationStore.closeModal();
  }
};


function resetForm() {
  participants.value = [{
    name: 'Первый участник',
    fullName: '',
    phoneNumber: '',
    email: '',
    birthDate: '',
    passportNumber: '',
    passportIssuer: '',
    passportIssueDate: '',
    registration: '',
  },]
}

async function submitModal() {
  if (participants.value.length === 0) return;

  const msg = participants.value
      .map((participant, index) => {
        const participantData = `
        Участник ${index + 1}:
        ФИО: ${participant.fullName || 'Не указано'}
        Телефон: ${participant.phoneNumber || 'Не указано'}
        Электронная почта: ${participant.email || 'Не указано'}
        Дата рождения: ${participant.birthDate || 'Не указано'}
        Серия и номер паспорта: ${participant.passportNumber || 'Не указано'}
        Кем выдан: ${participant.passportIssuer || 'Не указано'}
        Дата выдачи: ${participant.passportIssueDate || 'Не указано'}
        Прописка: ${participant.registration || 'Не указано'}
      `;
        return participantData.trim();
      })
      .join('\n\n');

  const subject = "Заявка на запись на курс";

  try {
    const mail = useMail();
    await mail.send({
      config: "course",
      from: "dev@sloy.design",
      subject,
      text: msg,
    });

    resetForm();
    isSuccess.value = true;
  } catch (error) {
    console.error(error);
    isError.value = true;
  } finally {
    setTimeout(() => {
      educationStore.closeModal();
      isError.value = false;
      isSuccess.value = false;
    }, 2000);
  }
}

onMounted(() => {
  window?.addEventListener("keydown", handleEscapePress);
});

onBeforeUnmount(() => {
  window?.removeEventListener("keydown", handleEscapePress);
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

.modal-container {
  background-color: #fff;
  transition: all 0.3s ease;
  padding: 40px 20px;
  position: relative;
  width: 100%;
  max-width: 848px;

  height: 100%;
  max-height: 855px;
  // aspect-ratio: 16/9;
  overflow: auto;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-family: Manrope, serif;
  gap: 36px;
  @media all and (orientation: landscape) {
    height: 90vh;
    width: calc(70vh / 9 * 16);
  }
  @media all and (orientation: portrait) {
    width: 90vw;
    // max-width: 1340px;

    // height: auto;
    // max-height: 80%;
  }
  // @supports not (aspect-ratio: 16 / 9) {
  //   &::before {
  //     float: left;
  //     padding-top: 56.25%;
  //     content: "";
  //   }

  //   &::after {
  //     display: block;
  //     content: "";
  //     clear: both;
  //   }
  // }

  @media screen and (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr;
  }

  & :deep(iframe) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.53);
  }
}

.left-side {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.right-side {
  display: flex;
  flex-direction: column;
  h2 {
    font-size: 22px;
    font-weight: 500;
    color: #1E2433;
    text-align: center;
    margin-bottom: 40px;
  }
}

.participants {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.participant {
  border: 1px solid #E9E9E9;
  padding: 14px 20px;
  border-radius: 10px;
  color: #525660;
  background: transparent;
  cursor: pointer;
  transition: .2s;
  &:hover {
    background: #ecebeb;
  }

  &.active {
    background: #ecebeb;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.send-btn {
  background: #232D5B;
  outline: none;
  border: none;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 45px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 40px;
}

.privacy {
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: #525660;
  margin-top: 14px;
}

.gray-block {
  padding: 20px;
  background: #F9F9FA;
  border-radius: 15px;
  h5 {
    font-size: 22px;
    font-weight: 400;
  }
  p {
    font-size: 14px;
    margin-top: 20px;
    color: #7F838C;
    line-height: 19px;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
