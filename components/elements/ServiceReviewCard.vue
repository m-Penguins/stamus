<template>
  <div class="service-card">
    <div>
      <h6 class="service-card-title">2ГИС</h6>
      <div class="ratings">
        <div class="stars" >
          <svg v-for="item in new Array(6)" :key="item" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.8505 0.691392C13.3636 -0.230464 14.6364 -0.230464 15.1495 0.691392L18.8657 7.36744C19.0537 7.70513 19.3687 7.94459 19.7337 8.0273L26.9502 9.66242C27.9466 9.8882 28.3399 11.1548 27.6606 11.9503L22.7409 17.7115C22.4921 18.0029 22.3718 18.3903 22.4094 18.7791L23.1532 26.4657C23.2559 27.5271 22.2262 28.3099 21.2932 27.8797L14.5364 24.7643C14.1947 24.6067 13.8053 24.6067 13.4636 24.7643L6.70682 27.8797C5.77382 28.3099 4.74412 27.5271 4.84683 26.4657L5.59062 18.7791C5.62824 18.3903 5.50793 18.0029 5.25907 17.7115L0.339392 11.9503C-0.339938 11.1548 0.0533724 9.8882 1.04985 9.66242L8.26627 8.0273C8.6313 7.94459 8.94628 7.70513 9.13426 7.36744L12.8505 0.691392Z" fill="#232D5B"/>
          </svg>
        </div>
        <p>1500+ отзывов</p>
      </div>
    </div>
    <img src="@/assets/images/icons/2gis.svg" alt="">
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.service-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px;
  border: 1px solid #E9E9E9;
  border-radius: 10px;
  max-width: 416px;
  width: 100%;
  height: 111px;
  font-family: Manrope, serif;
  cursor: pointer;
  &-title {
    color: #939BAD;
    font-size: 27px;
    font-weight: 400;
  }
}

.stars {
  display: flex;
  align-items: center;
  gap: 1.84px;
}

.ratings {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-top: 8px;
  p {
    font-size: 12px;
    color: #1E2433;
  }
}
</style>
