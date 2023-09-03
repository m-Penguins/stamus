<template>
  <NuxtLink class="activities-card" :to="activitiesCard.link">
    <div class="activities-card-container">
      <p class="activities-card-num">{{activitiesCard.id}}.</p>
      <p class="activities-card-title">{{activitiesCard.title}}</p>
    </div>
    <div>
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path class="activities-card-img-fill" d="M12 21.5C11.7239 21.5 11.5 21.7239 11.5 22C11.5 22.2761 11.7239 22.5 12 22.5V21.5ZM32.3536 22.3536C32.5488 22.1583 32.5488 21.8417 32.3536 21.6464L29.1716 18.4645C28.9763 18.2692 28.6597 18.2692 28.4645 18.4645C28.2692 18.6597 28.2692 18.9763 28.4645 19.1716L31.2929 22L28.4645 24.8284C28.2692 25.0237 28.2692 25.3403 28.4645 25.5355C28.6597 25.7308 28.9763 25.7308 29.1716 25.5355L32.3536 22.3536ZM12 22.5H32V21.5H12V22.5Z" fill="#525660"/>
      <rect class="activities-card-img-stroke" x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="#E9E9E9"/>
      </svg>
    </div>
  </NuxtLink>
</template>

<script>
  export default {
    props: {
      activitiesCard: {
        type: Object
      },
    },
  }
</script>

<style scoped lang="scss">
@import '/assets/styles/style.scss';
.activities-card {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #E9E9E9;

  &:hover {
    border: 1px solid #CFD5E1;
    .activities-card-img-fill {
      fill: #232D5B;
    }
    .activities-card-img-stroke {
      stroke: #CFD5E1;
    }
  }
}

.activities-card-container {
  display: flex;
  align-items: baseline;
  width: 80%;
  gap: 20px;
}

.activities-card-num {
  @include body-12-regular;
  color: $placeholder;
}

.activities-card-title {
  @include body-16-regular;
  color: $gray-text;
}

</style>