<script setup lang="ts">
defineProps(["block"]);
</script>

<template>
  <div class="achievement">
    <div class="achievement-title">{{ block?.title ?? "Важно знать" }}</div>
    <div class="achievement-container">
      <div
          class="achievement-box"
          v-for="item in block?.item"
          :key="item?.id"
      >
        <img src="@/assets/images/icons/icons-badge.svg" />
        {{item?.text}}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

.achievement {
  display: flex;
  width: 1280px;
  max-width: 100%;
  justify-content: space-between;
  margin: 0 auto 100px;
}

.achievement-title {
  width: 600px;
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
}

.achievement-container {
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.achievement-box {
  @include body-16-regular;
  color: $gray-text;
  border-radius: 10px;
  border: 1px solid $border-card;
  padding: 14px 20px;
  gap: 10px;
  text-wrap: pretty;
  width: 100%;
  max-width: 100%;
  display: flex;
  align-items: center;
}

@media screen and (max-width: 800px) {
  .achievement {
    flex-wrap: wrap;
  }

  .achievement-container {
    flex-direction: inherit;
    flex-wrap: wrap;
    flex: 1 1 auto;
  }

  .achievement-title {
    padding-bottom: 30px;
  }

  .achievement-box {
    @include body-14-regular;
    width: 49%;
  }
}

@media screen and (max-width: 717px) {
  .achievement {
    margin: 0 auto 80px auto;
  }

  .achievement-container {
    justify-content: center;
  }

  .achievement-box {
    width: 100%;
  }
}
</style>
