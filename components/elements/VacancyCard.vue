<template>
  <div class="vacancy-card">
    <div class="vacancy-card-inner">
      <div class="vacancy-card-title">
        <h5>{{ vacancy.title }}</h5>
        <div class="vacancy-card-title-logo">
          <img src="@/assets/images/icons/video-logo-block.svg" alt="icon" />
        </div>
      </div>
      <div class="vacancy-card-description">
        {{ vacancy.description }}
      </div>
      <div class="vacancy-card-location">
        <img src="@/assets/images/icons/placeIcon.svg" alt="">
        {{ vacancy.clinic }}
      </div>
    </div>
    <div class="vacancy-card-under">
      <div class="vacancy-card-under-price">
        {{ vacancy.salary || 'Не указана' }}
      </div>
      <NuxtLink class="vacancy-card-under-link" :to="`/vacancies/${vacancy.id}`">
        Подробнее
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['vacancy'])
</script>

<style lang="scss" scoped>
.vacancy-card {
  border: 1px solid #EDEDED;
  border-radius: 15px;
  padding: 16px 12px;
  width: 100%;
  max-width: 308px;
  height: 285px;
  &-inner {
    background: #F9F9FA;
    display: flex;
    flex-direction: column;
    padding: 12px 8px;
    border-radius: 7px;
  }
  &-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    h5 {
      font-size: 20px;
      font-weight: 400;
      color: #1E2433;
      line-height: 27px;
    }
    &-logo {

      img {
        width: 18px;
        height: 18px;
      }
    }
  }
  &-description {
    font-size: 14px;
    color: #7F838C;
  }
  &-logo {

  }
  &-location {
    background: #232D5B0D;
    height: 30px;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 10px;
    color: #232D5B;
    max-width: 152px;
    border-radius: 5px;
    margin-top: 40px;
    font-size: 12px;
    justify-content: space-between;
  }

  &-under {
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-price {
      font-size: 16px;
      height: 100%;
      display: flex;
      align-items: center;
    }
    &-link {
      background: #232D5B;
      color: #fff;
      height: 50px;
      border-radius: 45px;
      max-width: 147px;
      width: 100%;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      outline: none;
      cursor: pointer;
    }
  }

  @media (max-width: 1000px) {
    max-width: 32%;
  }

  @media (max-width: 950px) {
    max-width: 49%;
  }

  @media (max-width: 600px) {
    max-width: 100%;
  }
}
</style>
