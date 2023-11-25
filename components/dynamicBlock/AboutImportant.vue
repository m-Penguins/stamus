<script setup lang="ts">
defineProps(["block"]);
</script>

<template>
  <div class="about-important">
    <div class="about-important-title">{{ title }}</div>
    <div class="about-important-container">
      <div
        class="about-important-box"
        v-for="item in text?.split('|')"
        :key="item"
        v-text="item"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

.about-important {
  display: flex;
  width: 1280px;
  max-width: 100%;
  justify-content: space-between;
  margin: 0 auto 100px;
}

.about-important-title {
  width: 600px;
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
}

.about-important-container {
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.about-important-box {
  @include body-16-regular;
  color: $gray-text;
  border-radius: 10px;
  border: 1px solid $border-card;
  display: flex;
  padding: 14px 20px;
  align-items: flex-start;
  gap: 10px;
}

@media screen and (max-width: 800px) {
  .about-important {
    flex-wrap: wrap;
  }

  .about-important-container {
    flex-direction: inherit;
    flex-wrap: wrap;
    flex: 1 1 auto;
  }

  .about-important-title {
    padding-bottom: 30px;
  }

  .about-important-box {
    @include body-14-regular;
    width: 49%;
    height: 104px;
  }
}

@media screen and (max-width: 717px) {
  .about-important {
    margin: 0 auto 80px auto;
  }

  .about-important-container {
    justify-content: center;
  }

  .about-important-box {
    width: 100%;
  }
}
</style>
