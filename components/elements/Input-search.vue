<template>
  <form  class="input-base">
    <input type="text" :placeholder="placeholder" v-model="searchTerm" class="input bg" @keyup.enter="search">
    <button type="submit">
      <img src="../../assets/images/icons/icon_search.svg" alt="icon search"/>
    </button>
  </form>
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
      console.log(searchTerm)
      if (this.searchTerm) {
        this.$router.push({
          path: '/search',
          query: { term: this.searchTerm }
        })
      }
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

  button {
    border: none;
    outline: none;
    background: transparent;
}

button {
  height: 20px;
  width: 20px;
  position: absolute;
  bottom: 17px;
  left: 20px;
  cursor: pointer;
}
  
  .input-error {
    border-color: red;
  }

  .error-message {
    color: red;
  }
</style>