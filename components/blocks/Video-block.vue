<template>
  <div class="video-block">
    <div class="video-block-wrap">
      <div class="video-block-container">
        <div class="video-block-info">
          <h3 v-html="title" class="video-block-title"></h3>
          <p v-if="!isContactsBlock" v-html="text" class="video-block-text"></p>
          <div v-if="isContactsBlock" class="video-block-contacts">
            <div class="video-block-contacts-box grey">
              <div>Номер телефона</div>
              <div>Мессенджеры</div>
              <div>Электронная почта</div>
            </div>
            <div class="video-block-contacts-box dark-grey">
              <div>8 (861) 202-98-27</div>
              <div>Написать в WhatsApp</div>
              <div>stamus.dent@yandex.ru</div>
            </div>
          </div>
          <div v-if="isAcquaintanceBlock" class="video-block-info-card">
            <elements-specialists-info-card :info="info"/>
          </div>
        </div>
        <div class="video-block-logo">
          <img src="../../assets/images/icons/video-logo-block.svg" alt="icon"/>
        </div>
      </div>
      <div class="video-block-inner">
        <div class="video-block-box">
          <img src="../../assets/images/video.png" alt="video"/>
        </div>
        <div class="video-block-rectangle">
          <div class="desktop">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.5761 38.7168C24.3809 38.912 24.3809 39.2286 24.5761 39.4239C24.7714 39.6191 25.088 39.6191 25.2832 39.4239L24.5761 38.7168ZM39.5718 24.9282C39.5718 24.652 39.348 24.4282 39.0718 24.4282L34.5718 24.4282C34.2957 24.4282 34.0718 24.652 34.0718 24.9282C34.0718 25.2043 34.2957 25.4282 34.5718 25.4282L38.5718 25.4282L38.5718 29.4282C38.5718 29.7043 38.7957 29.9282 39.0718 29.9282C39.348 29.9282 39.5718 29.7043 39.5718 29.4282L39.5718 24.9282ZM25.2832 39.4239L39.4254 25.2817L38.7183 24.5746L24.5761 38.7168L25.2832 39.4239Z" fill="white"/>
            <rect x="1.5948" y="32" width="43" height="43" rx="21.5" transform="rotate(-45 1.5948 32)" stroke="#7F838C"/>
            </svg>
          </div>
          <div class="mob">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.0005 21.5C11.7243 21.5 11.5005 21.7239 11.5005 22C11.5005 22.2761 11.7243 22.5 12.0005 22.5L12.0005 21.5ZM32.354 22.3536C32.5493 22.1583 32.5493 21.8417 32.354 21.6464L29.1721 18.4645C28.9768 18.2692 28.6602 18.2692 28.465 18.4645C28.2697 18.6597 28.2697 18.9763 28.465 19.1716L31.2934 22L28.465 24.8284C28.2697 25.0237 28.2697 25.3403 28.465 25.5355C28.6602 25.7308 28.9768 25.7308 29.1721 25.5355L32.354 22.3536ZM12.0005 22.5H32.0005L32.0005 21.5H12.0005L12.0005 22.5Z" fill="white"/>
            <rect x="0.500488" y="0.5" width="43" height="43" rx="21.5" stroke="#7F838C"/>
            </svg>
          </div>
          <div class="video-block-feedback">Читать отзывы</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      isContactsBlock: {
        type: Boolean,
        default: false
      },
      isAcquaintanceBlock: {
        type: Boolean,
        default: false
      },
      info: {
        type: Object,
      }
    }
  }
</script>

<style scoped lang="scss">
@import '/assets/styles/style.scss';

.video-block-info-card {
  padding-top: 40px;
}

.mob {
  display: none;
}

.video-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 100px;
}

.video-block-wrap {
  display: flex;
  justify-content: space-between;
  width: 1280px;
  max-width: 100%;
  background: var(--light-bg, #F9F9FA);
  border-radius: 25px;
  margin: 0 auto;
  padding: 20px;
}

.video-block-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 524px;
  margin: 40px 40px 0;
}

.video-block-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
  padding-bottom: 14px;
}

.video-block-text {
  @include body-14-regular;
  color: $gray-text;
}

.video-block-contacts {
  display: flex;
  gap: 14px;
  align-items: baseline;
  padding-top: 10px;
}

.video-block-contacts-box {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.grey {
  @include body-12-regular;
  color: $placeholder;
}

.dark-grey {
  @include body-14-regular;
  color: $gray-text;
  gap: 12px;
}

.video-block-inner {
  display: flex;
  gap: 20px;
}

.video-block-box {
  width: 373px;
    display: inline-block;
    overflow: hidden;
    border-radius: 15px;
    img {
      width: 373px;
      height: 348px;
      transition: 1s;
      display: block;
      cursor: pointer;
      border-radius: 15px;
    }

    img:hover {
      transform: scale(1.1);
      border-radius: 15px;
    }
}

.video-block-rectangle {
  width: 220px;
  height: 348px;
  border-radius: 15px;
  background: var(--text, #525660);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 1s;
  cursor: pointer;

  svg {
    position: sticky;
    top: 52%;
    left: 93%;
  }
}

.video-block-rectangle:hover {
  background: var(--accent, #232D5B);
}

.video-block-feedback {
  @include body-22-medium-Neue;
  color: $white;
  padding: 20px;
  width: 100px;
}

@media (max-width: 1140px) {
  .video-block-info-card {
    padding: 0 0 30px;
  }

  .video-block-wrap {
    flex-wrap: wrap;
  }
  .video-block-container {
    align-items: start;
    flex-direction: inherit;
    max-width: 100%;
    margin: 0;
    justify-content: space-between;
    width: 100%;
  }
  .video-block-contacts {
    padding-bottom: 30px;
  }
  .video-block-inner {
    width: 100%;
    justify-content: flex-start;
  }
  .video-block-box {
    width: 488px;
    height: 348px;
    border-radius: 15px;
     img {
        object-fit: cover;
        object-position: 0% 22%;
        width: 488px;
        height: 348px;
        border-radius: 15px;
    }
  }
  .video-block-rectangle {
    height: 100%;
    width: 30%;
  }

  .video-block-logo {
    width: 30px;
  }

  .video-block-text {
    padding-bottom: 30px;
  }

  .video-block-info {
    width: 90%;
  }
}

@media (max-width: 800px) {
  .video-block-title {
    font-size: 16px;
    padding-bottom: 24px;
  }

  .video-block-text {
    font-size: 16px;
    padding-bottom: 30px;
  }
}

@media (max-width: 670px) {
  .desktop {
    display: none;
  }

  .mob {
    display: block;
    margin-right: 10px;
  }

  .video-block {
     margin-bottom: 80px; 
  }

  .video-block-inner {
    flex-wrap: wrap;
  }

  .video-block-box {
      height: 348px;
      width: 100%;
      img {
        width: 100%;
        object-position: 50% 24%;
      }
  }

  .video-block-rectangle {
    height: 64px;
    width: 100%;
    flex-direction: row-reverse;
    align-items: center;

      svg {
        transform: rotate(45 1.5948 32)
      }
  }

  .video-block-feedback {
    font-size: 16px;
    line-height: 17px;
  }

  .video-block-text {
    font-size: 14px;
  }
}

</style>