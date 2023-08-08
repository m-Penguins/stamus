<template>
  <div class="container-size">
    <div>
      <h2>Наши специалисты</h2>
      <elements-link-with-arrow type="true" title="Смотреть всех специалистов"/>
    </div>
    <div class="specialists-container">
      <div class="specialists-list">
        <button 
          v-for="button in buttons" 
          :key="button.id" 
          :class="{ 'active': selectedButton === button.id }" 
          @click="selectButton(button.id)"
          class="specialists-btn">
          <div>
            <img :src="assetsStore.useAsset(`${button.img}`)"/>
          </div>
          <div class="specialists-box">
            <div class="specialists-box__name">{{ button.name }}</div>
            <div class="specialists-box__spec">{{ button.speciality }}</div>
          </div>
        </button>
      </div>
      <div class="specialists-inner">
        <div class="specialists-inner__img">
          <img :src="assetsStore.useAsset(`${selectedImg}`)"/>
        </div>
        <div class="specialists-inner__info">
          <div class="specialists-inner__info-name">
            <h2>{{selectedName}}</h2>
            <p>{{selectedSpeciality}}</p>
          </div>
          <div class="specialists-inner__info-numbers">
            <div>
              <p>6</p>
              <p>лет опыта</p>
            </div>
            <div>
              <p>24</p>
              <p>отзыва</p>
            </div>
            <div>
              <p>667</p>
              <p>консультаций</p>
            </div>
          </div>
          <div class="specialists-inner__info-btn">
            <elements-button-base title="О докторе"/>
            <elements-link-with-arrow type="true" title="Смотреть портфолио"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAssets } from '../../../stores/useAsset';
export default {
  data() {
    return {
      selectedButton: 2,
      selectedName: 'Унаньян Карина',
      selectedImg: 'images/specialists/avatar-1.png',
      selectedSpeciality: 'Челюстно-лицевой хирург',
      buttons: [
        { id: 1, name: 'Овсоян Григорий', speciality: 'Стоматолог-терапевт', img: 'images/specialists/avatar.png'},
        { id: 2, name: 'Унаньян Карина', speciality: 'Челюстно-лицевой хирург', img: 'images/specialists/avatar-1.png'},
        { id: 3, name: 'Маашев Магомед', speciality: 'Стоматолог-хирург', img: 'images/specialists/avatar-2.png'},
        { id: 4, name: 'Шагалова Полина', speciality: 'Стоматолог', img: 'images/specialists/avatar-3.png'},
      ],
      s: []
    };
  },
  methods: {
    selectButton(buttonId) {
      this.selectedButton = buttonId;
      this.buttons.map(item => {
        if (this.selectedButton === item.id) {
          console.log(item.name);
          this.selectedName = item.name;
          this.selectedImg = item.img;
          this.selectedSpeciality = item.speciality;
        }
      });
    },
  },
  setup() {
  const assetsStore = useAssets();
  return {
    assetsStore,
  }
}
};
</script>

<style lang="scss" scoped>
@import '/assets/styles/style.scss';

  .specialists-container {
    display: flex;
    gap: 36px;

    .specialists-list {
      display: flex;
      flex-direction: column;
      gap: 14px;

      .specialists-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        border-radius: 10px;
        padding: 10px;
        border: 1px solid var(--stroke, #E9E9E9);
        background: white;
      } 
    }
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

  .specialists-inner {
    display: flex;
    gap: 16px;

      &__img {
        width: 308px;
        height: 308px;
        border-radius: 15px;
        border: 1px solid #EDEDED;

          img {
            width: 308px;
            height: 308px;
            border-radius: 15px;
          }
      }

      &__info {
        @include flex-column-start;
        justify-content: space-between;

        &-name {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 10px;
        }

        &-numbers{
          display: flex;
          align-items: center;
          text-align: center;
          gap: 20px;
        }

        &-btn {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-bottom: 54px;
        }
      }
  }

// button.active {
//   background-color: blue;
//   color: white;
// }

</style>