<template>
  <div class="card-photo-name">
    <div class="card-photo-name-img">
      <img :src="assetsStore.useAsset(`images/specialists/${specialists.img}`)" :alt="alt"/>
    </div>
    <div class="card-photo-name-container">
      <div>
        <div class="card-photo-name-title">{{specialists.name}}</div>
        <div class="card-photo-name-text">{{specialists.category}}</div>
      </div>
      <div class="tooltip">
      <!-- <div class="avatar" :data-tooltip="selectButton()"> -->
        <img src="../../assets/images/icons/icons-badge.svg"/>
        <span class="info">
					<div class="tooltip-box">
            <img src="../../assets/images/icons/tooltip/tool1.svg" alt="icon">
            <p>Победитель Гран-при Продокторов «Лучший ортопед России» 2021</p>
          </div>
          <div class="tooltip-box">
            <img src="../../assets/images/icons/tooltip/tool2.svg" alt="icon">
            <p>2 место Премия Продокторов «Детский стоматолог» 2022 Краснодар</p>
          </div>
          <div class="tooltip-box">
            <img src="../../assets/images/icons/tooltip/tool3.svg" alt="icon">
            <p>Врач высшей категории</p>
          </div>
          <div class="tooltip-box">
            <img src="../../assets/images/icons/tooltip/tool4.svg" alt="icon">
            <p>Работает с эстетическими коронками</p>
          </div>
          <div class="tooltip-box">
            <img src="../../assets/images/icons/tooltip/tool5.svg" alt="icon">
            <p>Работает под микроскопом</p>
          </div>
				</span>
        <!-- <div class="s avatar2">
          {{specialists.name}}
          {{specialists.category}}
        </div> -->
      </div>
    </div>
    <elements-link-with-arrow type="true" title="Подробнее о враче" :link="link"/>
    <!-- <elements-tool/> -->
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
    }
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
  box-sizing: border-box;
  position: absolute;
  bottom: 53px;
  left: -85px;
  display: block;
  background: white;
  width: 373px;
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
    bottom: -5px;
    left: 50%;
    margin-left: -5px;
    background: #286F8A;
  }
}

.tooltip-box {
  display: flex;
  align-items: center;
}
// .s {
//   display: none;
// }
// .avatar:hover {
//   .s {
//     display: block;
//   }
// }
// .avatar {
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
//   // background-image: url('https://source.unsplash.com/nKC772R_qog');
//   background-size: cover;
//   background-position: center;
//   position: relative;
// }
// .avatar::before,
// .avatar::after {
//   --scale: 0;
//   --arrow-size: 10px;
//   --tooltip-color: #333;

//   position: absolute;
//   top: -.25rem;
//   left: 50%;
//   transform: translateX(-50%) translateY(var(--translate-y, 0)) scale(var(--scale));
//   transition: 150ms transform;
//   transform-origin: bottom center;
// }

// .avatar::before {
//   --translate-y: calc(-100% - var(--arrow-size));

//   content: attr(data-tooltip);
//   color: white;
//   padding: .5rem;
//   border-radius: .3rem;
//   text-align: center;
//   width: max-content;
//   max-width: 100%;
//   background: var(--tooltip-color);
// }

// .avatar:hover::before,
// .avatar:hover::after {
//   --scale: 1;
// }

// .avatar::after {
//   --translate-y: calc(-1 * var(--arrow-size));

//   content: '';
//   border: var(--arrow-size) solid transparent;
//   border-top-color: var(--tooltip-color);
//   transform-origin: top center;
// }

// //////////
// .avatar2::before,
// .avatar2::after {
//   --scale: 0;
//   --arrow-size: 10px;
//   --tooltip-color: #333;

//   position: absolute;
//   top: -.25rem;
//   left: 50%;
//   transform: translateX(-50%) translateY(var(--translate-y, 0)) scale(var(--scale));
//   transition: 150ms transform;
//   transform-origin: bottom center;
// }

// .avatar2::before {
//   --translate-y: calc(-100% - var(--arrow-size));

//   content: attr(data-tooltip);
//   color: white;
//   padding: .5rem;
//   border-radius: .3rem;
//   text-align: center;
//   width: max-content;
//   max-width: 100%;
//   background: var(--tooltip-color);
// }

// .avatar2:hover::before,
// .avatar2:hover::after {
//   --scale: 1;
// }

// .avatar2::after {
//   --translate-y: calc(-1 * var(--arrow-size));

//   content: '';
//   border: var(--arrow-size) solid transparent;
//   border-top-color: var(--tooltip-color);
//   transform-origin: top center;
// }

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