<template>
  <div class="share-block">
    <a href="https://wa.me/79284217386" class="share-item" target="_blank">
      <span>Написать в WhatsApp</span>
      <img
          :src="assetsStore.useAsset('images/icons/shareWhatsapp.svg')"
          alt="Logo"
      />
    </a>
    <a href="https://t.me/+79284217386" class="share-item" target="_blank">
      <span>Написать в Telegram</span>
      <img
          :src="assetsStore.useAsset('images/icons/shareTg.svg')"
          alt="Logo"
      />
    </a>
    <a href="tel:+79284217386" class="share-item">
      <span>Позвонить на телефон</span>
      <img
          :src="assetsStore.useAsset('images/icons/formPhone.svg')"
          alt="Logo"
      />
    </a>
  </div>
</template>

<script setup>
const assetsStore = useAssets();
</script>

<style lang="scss" scoped>
.share-block {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.share-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 420px;
  width: 100%;
  height: 102px;
  background: #232D5B0D;
  border: none;
  border-radius: 10px;
  outline: none;
  padding: 24px 20px;
  font-size: 20px;
  cursor: pointer;

  span {
    max-width: 118px;
    text-align: start;
    color: #1E2433;
    line-height: 27.32px;
  }
}


@media screen and (max-width: 1360px) {
  .share-block {
    gap: 16px;
  }
}

@media screen and (max-width: 1018px) {
  .share-block {
    flex-wrap: wrap;
  }
  .share-item {
    max-width: none;
  }
}


@media screen and (max-width: 744px) {
  .share-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    justify-content: center;
    align-items: center;
  }

}

@media screen and (max-width: 640px) {
  .share-block {
    display: flex;
    flex-direction: column;
  }
}
</style>
