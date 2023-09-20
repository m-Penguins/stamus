<template>
    <button class="button-base" 
        :disabled="disabled"
        :class="{'disabled': disabled}"
        @click="sendCustomClickEvent">
        {{title}}
        <div v-if="arrow"  class="button__image">
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="svg" d="M4.49999 9.5C4.22385 9.5 3.99999 9.72386 3.99999 10C3.99999 10.2761 4.22385 10.5 4.49999 10.5V9.5ZM16.8535 10.3536C17.0488 10.1583 17.0488 9.84171 16.8535 9.64645L13.6716 6.46447C13.4763 6.2692 13.1597 6.2692 12.9645 6.46447C12.7692 6.65973 12.7692 6.97631 12.9645 7.17157L15.7929 10L12.9645 12.8284C12.7692 13.0237 12.7692 13.3403 12.9645 13.5355C13.1597 13.7308 13.4763 13.7308 13.6716 13.5355L16.8535 10.3536ZM4.49999 10.5H16.5V9.5H4.49999V10.5Z" fill="white"/>
          </svg>
        </div>
        <div v-if="isDownload"  class="button__image">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="svg-stroke" d="M3.33301 14.1665V15.8332C3.33301 16.2752 3.5086 16.6991 3.82116 17.0117C4.13372 17.3242 4.55765 17.4998 4.99967 17.4998H14.9997C15.4417 17.4998 15.8656 17.3242 16.1782 17.0117C16.4907 16.6991 16.6663 16.2752 16.6663 15.8332V14.1665" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
          <path class="svg-stroke" d="M5.83301 9.1665L9.99967 13.3332L14.1663 9.1665" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
          <path class="svg-stroke" d="M10 3.3335V13.3335" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
    </button>
</template>

<script>

export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      disabled: {
          type: Boolean,
          default: false
      },
      arrow: {
          type: Boolean,
          default: false
      }, 
      isDownload: {
          type: Boolean,
          default: false
      }
    },
    methods: {
      sendCustomClickEvent() {
        this.$emit('custom-click');
      },
  },
}
</script>

<style lang="scss" scoped>
.button-base {
  .button__image {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    display: flex;
    align-items: center;
  }
  
}
</style>