<template>
  <div class="specialists-btn">
    <div  class="specialists-btn-wrap">
      <div class="specialists-btn__img">
        <img :src="assetsStore.useAsset(`${spesialistCard.img}`)"/>
      </div>
      <div class="specialists-box">
        <div class="specialists-box__name">{{ spesialistCard.name }}</div>
        <div class="specialists-box__spec">{{ spesialistCard.category }}</div>
      </div>
    </div>
    <div>
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path class="activities-card-img-fill" d="M12 21.5C11.7239 21.5 11.5 21.7239 11.5 22C11.5 22.2761 11.7239 22.5 12 22.5V21.5ZM32.3536 22.3536C32.5488 22.1583 32.5488 21.8417 32.3536 21.6464L29.1716 18.4645C28.9763 18.2692 28.6597 18.2692 28.4645 18.4645C28.2692 18.6597 28.2692 18.9763 28.4645 19.1716L31.2929 22L28.4645 24.8284C28.2692 25.0237 28.2692 25.3403 28.4645 25.5355C28.6597 25.7308 28.9763 25.7308 29.1716 25.5355L32.3536 22.3536ZM12 22.5H32V21.5H12V22.5Z" fill="#525660"/>
      <rect class="activities-card-img-stroke" x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="#E9E9E9"/>
      </svg>
    </div>
  </div>
</template>

<script>
import { useAssets } from '../../stores/useAsset';
  export default {
    props: {
      spesialistCard: {
        type: Object
      },
    },
    setup() {
      const assetsStore = useAssets();
        return {
        assetsStore,
        }
    }
  }
</script>

<style lang="scss" scoped>
@import '/assets/styles/style.scss';

.specialists-btn {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
    align-items: center;
    gap: 20px;
    border-radius: 10px;
    border: 1px solid #E9E9E9;

        &:hover {
          border: 1px solid #D5D5D5;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
      }

      &__img {
        width: 60px;
        height: 60px;
        border-radius: 5px;
        background: #E8E8E8;
      }

    }

    .specialists-btn-wrap {
      display:  flex;
      align-items: center;
      gap: 10px;
    }

    .specialists-box {
      @include flex-column-start;
      gap: 10px;

        &__name {
          @include body-18-regular;
          color: $dark-blue-subtitle;
        }

        &__spec {
          @include body-14-regular;
          opacity: 0.7;
          color: $gray-text;
        }
  }

</style>