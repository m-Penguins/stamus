<template>
  <div class="map-nav">
    <ul>
      <li class="map-nav-item">
        <img src="../../assets/images/icons/clock.svg" alt="icon" />
        <div>
          <div class="map-nav-title">Режим работы</div>
          <div class="map-nav-info">{{ tab?.hours }}</div>
        </div>
      </li>
      <!-- <img class="map-nav-line" src="../../assets/images/icons/line.svg" alt="icon"/> -->
      <hr />
      <li class="map-nav-item">
        <img src="../../assets/images/icons/phone.svg" alt="icon" />
        <div>
          <div class="map-nav-title">Номер телефона</div>
          <a
            class="map-nav-info header-nav-item"
            :href="`tel:+${tab?.phone?.replace(/\D/g, '')}`"
            >{{ tab?.phone }}</a
          >
        </div>
      </li>
      <hr />
      <!-- <img class="map-nav-line" src="../../assets/images/icons/line.svg" alt="icon"/> -->
      <li class="map-nav-item">
        <img src="../../assets/images/icons/email.svg" alt="icon" />
        <div>
          <div class="map-nav-title">E-mail</div>
          <a
            class="map-nav-info header-nav-item"
            :href="`mailto:${tab?.email}`"
            >{{ tab?.email }}</a
          >
        </div>
      </li>
      <hr />
      <!-- <img class="map-nav-line" src="../../assets/images/icons/line.svg" alt="icon"/> -->
      <li class="map-nav-item">
        <img src="../../assets/images/icons/addres.svg" alt="icon" />
        <div>
          <div class="map-nav-title">Адрес</div>
          <div class="map-nav-info">{{ tab?.address }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps(["tab"]);
</script>

<style scoped lang="scss">
@import "/assets/styles/style.scss";
.map-nav {
  position: absolute;
  top: calc(50% - 34%);
  left: calc(50% - 44%);
  display: flex;
  width: 308px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
  background: #fff;
}

.map-nav-item {
  display: flex;
  padding: 10px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
}

.map-nav-item:hover {
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
}

.map-nav-title {
  @include body-12-regular;
  color: $placeholder;
  padding-bottom: 4px;
}

.map-nav-info {
  @include body-14-regular;
  color: $gray-text;
}

ul {
  width: 100%;
}

hr {
  margin: 10px 0;
  width: auto;
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
}

@media (max-width: 1000px) {
  .map-nav {
    position: initial;
    border-radius: 10px;
    border: 1px solid var(--stroke, #e9e9e9);
    width: 100%;
    height: 100%;
  }
}
</style>
