<template>
  <div class="dentistry-wrapper">
    <div
      class="dentistry-container"
      :style="`background-image:url(${assetsStore.useAsset(
        `big-images/${imgBg}`,
      )})`"
    >
      <div class="dentistry-box">
        <div class="mob">
          <img :src="assetsStore.useAsset(`big-images/${imgAdaptiv}`)" />
        </div>
        <elements-title-text-button
          textButtonBase="Записаться онлайн"
          :title="title"
          :text="text"
          fontSize
        />
      </div>
    </div>
    <blocks-main-seo :title="titleSeo" :text="textSeo" :img="imgSeo" />
  </div>
</template>
