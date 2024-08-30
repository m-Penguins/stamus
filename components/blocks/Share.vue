<template>
  <div class="share-block">
    <NuxtLink :to="whatsappShareLink" class="share-item" target="_blank">
      <span>Отправить в WhatsApp</span>
      <img
          :src="assetsStore.useAsset('images/icons/shareWhatsapp.svg')"
          alt="Logo"
      />
    </NuxtLink>
    <NuxtLink :to="telegramShareLink" class="share-item" target="_blank">
      <span>Отправить в Telegram</span>
      <img
          :src="assetsStore.useAsset('images/icons/shareTg.svg')"
          alt="Logo"
      />
    </NuxtLink>
    <NuxtLink :to="vkShareLink" class="share-item" target="_blank">
      <span>Отправить в Вконтакте</span>
      <img
          :src="assetsStore.useAsset('images/icons/shareVk.svg')"
          alt="Logo"
      />
    </NuxtLink>
    <button @click="copyLink" class="share-item" target="_blank">
      <span>{{ buttonText }}</span>
      <img
          :src="assetsStore.useAsset('images/icons/copyLink.svg')"
          alt="Logo"
      />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const assetsStore = useAssets();
const route = useRoute();
const path = 'https://stamus.ru' + route.href;

const vkShareLink = `https://vk.com/share.php?url=${encodeURIComponent(path)}`;
const telegramShareLink = `https://telegram.me/share/url?url=${encodeURIComponent(path)}`;
const whatsappShareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(path)}`;

const buttonText = ref('Копировать ссылку');

const copyLink = () => {
  navigator.clipboard.writeText(path).then(() => {
    buttonText.value = 'Ссылка скопирована!';
    setTimeout(() => {
      buttonText.value = 'Копировать ссылку';
    }, 1000);
  }).catch(err => {
    console.error('Failed to copy the link:', err);
  });
};
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
  max-width: 308px;
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
    flex-wrap: wrap;
    gap: 16px;
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

  .share-item {
    max-width: 333px;
  }
}

@media screen and (max-width: 640px) {
  .share-block {
    display: flex;
    flex-direction: column;
  }
}
</style>
