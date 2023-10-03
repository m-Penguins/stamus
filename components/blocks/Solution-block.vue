<script setup>
defineProps(["title", "cards", "image"]);
</script>

<template>
  <div class="solution-block">
    <div>
      <div class="solution-block-box">
        <h3 class="solution-block-title" v-html="title"></h3>
      </div>
      <div class="solution-block-container">
        <div class="solution-block-container__img">
          <img
            :src="image"
            alt="img"
            class="solution-block-container-picture"
          />
        </div>
        <div class="solution-block-container__text">
          <elements-solution-card
            v-for="card in cards"
            :key="card.id"
            :card="card"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

.solution-block {
  display: flex;
  width: 1280px;
  max-width: 100%;
  justify-content: space-between;
  margin: 0 auto 100px;
}

.solution-block-box {
  padding: 40px;
  border-radius: 15px;
  background: #f9f9fa;
  margin-bottom: 40px;
}

.solution-block-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
  text-align: center;
}

.solution-block-container-picture {
  min-width: 334px;
  min-height: 334px;
}

.solution-block-container {
  display: flex;
  gap: 16px;
  width: 100%;

  &__text {
    width: 67%;
  }
}

@media (max-width: 650px) {
  .solution-block-box {
    margin-bottom: 20px;
  }

  .solution-block-container {
    flex-wrap: wrap;

    &__text {
      width: 100%;
    }

    &__img {
      width: 100%;
    }
  }

  .solution-block-container-picture {
    width: 100%;
  }
}
</style>
