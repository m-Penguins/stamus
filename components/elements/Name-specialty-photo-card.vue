<template>
  <div class="card-photo-name">
    <div class="card-photo-name-img">
      <img :src="assetsStore.useAsset(`images/specialists/${specialists.img}`)" alt="specialists"/>
    </div>
    <div class="card-photo-name-container">
      <div>
        <div class="card-photo-name-title">{{specialists.name}}</div>
        <div class="card-photo-name-text">{{specialists.category}}</div>
      </div>
      <div class="tooltip">
        <img src="../../assets/images/icons/icons-badge.svg"/>
        <span class="info">
					<div class="tooltip-box" v-for="(item) in arrayTooltip" :key="item">
            <img :src="assetsStore.useAsset(`images/icons/tooltip/${item.img}`)" alt="icon">
            <p class="tooltip-text">{{item.text }}</p>
          </div>
				</span>
      </div>
    </div>
    <elements-link-with-arrow type="true" title="Подробнее о враче" :link="link" :clickHandler="handleLinkClick"/>
  </div>
</template>

<script>
import { useAssets } from '../../stores/useAsset'
export default {
  props: {
    specialists: {
      type: Object
    },
    link: {
      type: String
    },
    arrayTooltip: {
      type: Array
    },
    handleLinkClick: Function
  },
    methods: {
    selectButton() {
      this.arr.map(item => {
        return item
      });
    },
  },
  setup() {
    const assetsStore = useAssets();
    const arr = ['1', '2', '3']
    return {
      arr,
      assetsStore
    }
  }
}
</script>

<style scoped lang="scss">
@import '/assets/styles/style.scss';
.tooltip {
  position: relative;
  cursor: pointer;
    &:hover .info,
		&:focus .info {
			visibility: visible;
			opacity: 1;
			transform: translate3d(0,0,0);
		}
}
.info {
  display: flex;
  flex-direction: column;
  gap: 28px;
  box-sizing: border-box;
  position: absolute;
  bottom: 64px;
  bottom: 62px;
  left: -272px;
  padding: 14px 20px;
  background: white;
  -webkit-box-shadow: 2px 5px 45px -5px rgba(30, 32, 40, 0.08);
  -moz-box-shadow: 2px 5px 45px -5px rgba(30, 32, 40, 0.08);
  box-shadow: 2px 5px 45px -5px rgba(30, 32, 40, 0.08);
  border-radius: 15px;
  width: 297px;
  font-size: 16px;
  line-height: 24px;
  cursor: text;
  visibility: hidden;
  opacity: 0;
  transform: translate3d(0,-20px,0);
  transition: all .5s ease-out;
  
  &:before {
    position: absolute;
    content: '';
    width: 100%;
    height: 14px;
    bottom: -14px;
    left: 0;
  }
        
  &:after {
    position: absolute;
    content: '';
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    bottom: -3px;
    left: 50%;
    margin-left: 130px;
    background: white;
  }
}

.tooltip-box {
  display: flex;
  align-items: center;
  gap: 10px
}

.tooltip-text {
  @include body-16-regular;
  color: $gray-text;
}

.card-photo-name-img {
  padding-bottom: 30px;
}

.card-photo-name-container {
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
}

.card-photo-name-title {
  @include body-20-regular;
  color: $dark-blue-subtitle;
  padding-bottom: 4px;
}

.card-photo-name-text {
  @include body-12-regular;
  color: $gray-text;
  opacity: 0.7;
}
</style>