<template>
    <div class="input-base">
      <input type="text" :placeholder="placeholder" v-model="searchTerm" class="input bg" @keyup.enter="search">
      <button @click="search()" class="btn-search">
        <img src="../../assets/images/icons/icon_search.svg" alt="icon search"/>
      </button>
      <button @click="clearInput" v-if="searchTerm" class="btn-close">
        <img src="../../assets/images/icons/close.svg" alt="icon close"/>
      </button>
    </div>
  </template>
  
  <script>
    export default {
      name: 'Input',
      props: {
        placeholder: String
      },
    data() {
      return {
        searchTerm: ''
      }
    },
    methods: {
      search() {
        // if (this.searchTerm) {
        //   this.$router.push({
        //     path: '/search',
        //     query: { term: this.searchTerm }
        //   })
        //   this.$emit('enterPressed');
        // }
      },
      clearInput() {
        this.searchTerm = '';
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
    .input-base {
      width: 308px;
      position: relative;
    }
  
    .bg {
      background: white;
      padding: 14px 20px 14px 46px;
    }
  
  .btn-search, .btn-close  {
      border: none;
      outline: none;
      background: transparent;
  }
  
  .btn-search {
    height: 20px;
    width: 20px;
    position: absolute;
    bottom: 17px;
    left: 20px;
    cursor: pointer;
  }

  .btn-close {
    height: 20px;
    width: 20px;
    position: absolute;
    bottom: 17px;
    right: 20px;
    cursor: pointer;
  }

  .input:focus {
    color: #525660;
  }
  
    
    .input-error {
      border-color: red;
    }
  
    .error-message {
      color: red;
    }
  </style>