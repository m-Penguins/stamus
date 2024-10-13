<template>
  <div class="dop-block">
    <div class="left-block">
      <p class="dop-block-title">Принимает по адресу:</p>
      <div class="dop-block-container">
        <img src="../../assets/images/icons/addres.svg" alt="icon">
        <p v-html="address" class="dop-block-text"></p>
      </div>
    </div>
    <div class="right-block">
      <div class="dop-block-box">
        <p class="dop-block-title">Требуемый опыт:</p>
        <div class="dop-block-container">
          <img src="../../assets/images/icons/clock3.png" alt="icon">
          <p v-html="time" class="dop-block-text"></p>
        </div>
      </div>
      <hr class="vertical-line">
      <div class="dop-block-box">
        <p class="dop-block-title">Заработная плата::</p>
        <div class="dop-block-container">
          <img src="../../assets/images/icons/money.png" alt="icon">
          <p v-html="money" class="dop-block-text"></p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    time: String,
    money: String,
    address: String
  }
}
</script>

<style scoped lang="scss">
@import '/assets/styles/style.scss';
.dop-block {
  position: absolute;
  top: 80%;
  right: 10%;
  left: 15%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1800px) {
    left: 10%;
  }

  @media (max-width: 1580px) {
    left: 5%;
  }

  @media (max-width: 1400px) {
    flex-direction: column;
    right: 10%;
    left: auto;
    top: 60%;
    gap: 10px;
  }

  @media (max-width: 1110px) {
    margin-top: 10px;
  }
}

.right-block {
  display: flex;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid var(--stroke, #E9E9E9);
  background: var(--white, #FFF);
  padding: 10px;
}

.left-block {
  max-width: 293px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid var(--stroke, #E9E9E9);
  background: var(--white, #FFF);
  padding: 16px 20px;
  @media (max-width: 1400px) {
    max-width: none;
  }
}

.dop-block-box {
  padding: 10px 14px;
}

.dop-block-container {
  display: flex;
  align-items: center;
  gap: 12px
}

.dop-block-title {
  @include body-12-regular;
  color: $placeholder;
  padding-bottom: 15px
}

.dop-block-text {
  @include body-16-regular;
  color: $dark-blue-subtitle;
}

.vertical-line {
  margin: 0 10px 0 10px;
  width: 0;
  border: 0;
  height: auto;
  border-right: 1px solid #E9E9E9;
}

@media (max-width: 900px) {
  .dop-block {
    flex-direction: column;
  }

  .vertical-line {
    margin: 0 6px 0 6px;
    width: auto;
    border: 0;
    height: 0;
    border-bottom: 1px solid #E9E9E9;
  }
}
</style>
