<template>
  <a :href="info?.link" target="_blank" class="doc-card">
    <div class="doc-card-container">
      <div class="doc-card-box">
        <img
          src="../../assets/images/icons/icon-documentation.svg"
          alt="icon"
        />
      </div>
      <div class="doc-card-box-text">
        <div class="doc-card-title">{{ info?.title }}</div>
        <div class="doc-card-text">{{ info?.text }}</div>
      </div>
    </div>
    <div class="doc-card-arrow">
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="activities-card-img-fill"
          d="M12 21.5C11.7239 21.5 11.5 21.7239 11.5 22C11.5 22.2761 11.7239 22.5 12 22.5V21.5ZM32.3536 22.3536C32.5488 22.1583 32.5488 21.8417 32.3536 21.6464L29.1716 18.4645C28.9763 18.2692 28.6597 18.2692 28.4645 18.4645C28.2692 18.6597 28.2692 18.9763 28.4645 19.1716L31.2929 22L28.4645 24.8284C28.2692 25.0237 28.2692 25.3403 28.4645 25.5355C28.6597 25.7308 28.9763 25.7308 29.1716 25.5355L32.3536 22.3536ZM12 22.5H32V21.5H12V22.5Z"
          fill="#525660"
        />
        <rect
          class="activities-card-img-stroke"
          x="0.5"
          y="0.5"
          width="43"
          height="43"
          rx="21.5"
          stroke="#E9E9E9"
        />
      </svg>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
@import "/assets/styles/style.scss";

.doc-card {
  border-radius: 10px;
  border: 1px solid #f0f0f0;
  background: #fff;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    border: 1px solid #cfd5e1;
    .activities-card-img-fill {
      fill: #232d5b;
    }
    .activities-card-img-stroke {
      stroke: #cfd5e1;
    }
  }
}

.doc-card-container {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 83%;
}

.doc-card-box {
  display: flex;
  width: 66px;
  height: 66px;
  padding: 21px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #f0f0f0;
}

.doc-card-box-text {
  width: 70%;
  max-width: 336px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.doc-card-title {
  @include body-16-regular;
  color: $gray-text;
}

.doc-card-text {
  @include body-12-regular;
  color: $placeholder;
}

.doc-card-arrow {
  width: 44px;
  height: 44px;
}

@media (max-width: 900px) {
  .doc-card-title {
    font-size: 14px;
  }
  .doc-card-text {
    font-size: 10px;
  }
}
</style>
