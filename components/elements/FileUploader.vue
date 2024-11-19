<template>
  <div class="file-uploader" @click="triggerFileInput">
    <input
        ref="fileInput"
        type="file"
        :multiple="multiple"
        class="file-input"
        @change="handleFileChange"
    />
    <div class="input-box">
      <span>{{ uploadedFile?.name || placeholder }}</span>
      <i class="icon-attachment"></i>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue", "change"])
const props = defineProps({
  modelValue: Array,
  multiple: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: 'Прикрепить резюме'
  }
});

const fileInput = ref(null);
const uploadedFile = ref(null)

watch(
    () => props.modelValue,
    (newVal) => {
      if (newVal && newVal.length > 0) {
      }
    }
);

const handleFileChange = (event) => {
  const file = event.target.files[0]
  uploadedFile.value = file
  emit('update:modelValue', file);
  emit("change", file)

};

const triggerFileInput = () => {
  fileInput.value.click();
};
</script>

<style scoped lang="scss">
.file-uploader {
  display: inline-flex;

  .file-input {
    display: none;
  }

  .input-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    height: 56px;
    cursor: pointer;
    transition: background-color 0.3s;
    outline: none;
    width: 100%;
    border-radius: 45px;
    border: 1px solid #e9e9e9;
    background: transparent;
    color: #525660;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 21.6px;
    &:hover {
      background-color: #f1f1f1;
    }

    span {
      color: #aaa;
    }

    .icon-attachment {
      background: url('/icons/attachment-icon.svg') no-repeat center center;
      width: 24px;
      height: 24px;
    }
  }
}
</style>
