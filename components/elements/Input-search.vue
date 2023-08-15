<template>
  <form  class="input-base">
    <input type="text" placeholder="Найти" class="input bg">
    <button type="submit">
      <img src="../../assets/images/icons/icon_search.svg" alt="icon search"/>
    </button>
  </form>
</template>


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