<template>
  <div class="container-size specialists">
    <div class="specialists-subject">
      <h2 class="specialists-heading">Наши специалисты</h2>
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
          <div class="div-with-line" v-if="selectedButton === button.id"></div>
          <div class="specialists-btn__img">
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
          <img :src="assetsStore.useAsset(`${selectedBigImg}`)"/>
        </div>
        <div class="specialists-inner__info">
          <div class="specialists-inner__info-name">
            <h2 class="specialists-heading">{{selectedName}}</h2>
            <p class="specialists-desc">{{selectedSpeciality}}</p>
          </div>
          <div class="specialists-inner__info-numbers">
            <div>
              <p class="specialists-numbers">6</p>
              <p class="specialists-box__spec">лет опыта</p>
            </div>
            <div>
              <p class="specialists-numbers">24</p>
              <p class="specialists-box__spec">отзыва</p>
            </div>
            <div>
              <p class="specialists-numbers">667</p>
              <p class="specialists-box__spec">консультаций</p>
            </div>
          </div>
          <div class="specialists-inner__info-btn">
            <elements-button-base title="О докторе" class="specialists-btn-base"/>
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
      selectedBigImg: 'images/specialists/avatar-7.png',
      buttons: [
        { id: 1, name: 'Овсоян Григорий', speciality: 'Стоматолог-терапевт', img: 'images/specialists/avatar.png', imgBig:'images/specialists/avatar-4.png'},
        { id: 2, name: 'Унаньян Карина', speciality: 'Челюстно-лицевой хирург', img: 'images/specialists/avatar-1.png', imgBig:'images/specialists/avatar-7.png'},
        { id: 3, name: 'Маашев Магомед', speciality: 'Стоматолог-хирург', img: 'images/specialists/avatar-2.png', imgBig:'images/specialists/avatar-6.png'},
        { id: 4, name: 'Шагалова Полина', speciality: 'Стоматолог', img: 'images/specialists/avatar-3.png', imgBig:'images/specialists/avatar-5.png'},
      ],
    };
  },
  methods: {
    selectButton(buttonId) {
      this.selectedButton = buttonId;
      this.buttons.map(item => {
        if (this.selectedButton === item.id) {
          this.selectedName = item.name;
          this.selectedImg = item.img;
          this.selectedSpeciality = item.speciality;
          this.selectedBigImg = item.imgBig;
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

.div-with-line {
  border-radius: 0px 15px 16px 0px;
  background: var(--accent, #232D5B);
  width: 3px;
  height: 24px;
  position: absolute;
  left: -1px;
  top: 28px;
}
  .specialists-subject {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 529px;
    max-width: 100%;
    padding-bottom: 40px;
  }

  .specialists-heading {
    @include body-22-medium-Neue;
    color: $dark-blue-subtitle;
  }

  .specialists-desc {
    @include body-16-regular;
    color: $placeholder;
  }

  .specialists-container {
    display: flex;
    flex-wrap: wrap;
    gap: 36px;

    .specialists-list {
      display: flex;
      flex-direction: column;
      gap: 14px;

        .active {
          position: relative;
        }
    }

      .specialists-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        border-radius: 10px;
        padding: 10px;
        border: 1px solid var(--stroke, #E9E9E9);
        background: white;

        &:hover {
          border: 1px solid #D5D5D5;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
      }

      .specialists-box__name {
        &:hover {
          color: $hover;
        }
      }

      .specialists-box__name {
        &:active  {
          color: $dark-blue-subtitle;
        }
      }

        &:active {
          border: 1px solid var(--stroke, #E9E9E9);
          color: $click;
        }

          &__img {
            width: 60px;
            height: 60px;
            border-radius: 5px;
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

          .specialists-numbers {
            @include body-22-semi-bold;
            color: $hover;
          }
        }

        &-btn {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-bottom: 61px;
        }
      }
  }

  @media (max-width: 1017px) {
  .specialists-subject {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .specialists-container {
    gap: 20px;

    .specialists-list {
      flex-direction: unset;
      overflow-x: scroll;
      white-space: nowrap;
    }
    .specialists-list::-webkit-scrollbar {
      display: none;
    }
  }

  .specialists-inner {
    gap: 14px;
      &__img {
        width: 332px;;
        height: 333px;

          img {
            width: 333px;
            height: 333px;
          }
      }

      &__info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 20px;
      }
  }
}

  @media (max-width: 734px) {
    .specialists-inner {
      width: 100%;
      gap: 14px;

       &__img {
        width: 38%;
        height: 333px;
        border-radius: 15px;
        border-left: 1px solid  #EDEDED;
        border-right: 1px solid  #EDEDED;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 37% 74%;
          }
        }
    }
}

  @media (max-width: 675px) {
    .specialists {
      margin: 0 auto 80px !important;
    }
    .specialists-btn-base {
      width: 80%;
      height: auto;
    }
    .specialists-inner__info-btn {
      flex-wrap: wrap;
      padding-bottom: 0;
    }
    .specialists-inner {
      width: 100%;
      gap: 14px;

       &__img {
        width: 50%;
       }
    }
}

  @media (max-width: 585px) {
    .specialists-btn-base {
      width: 100%;
    }

    .specialists-inner {
       &__img {
        width: 67%;

       }
    }
}
  @media (max-width: 556px) {
    .specialists-inner {
      flex-wrap: wrap;

      &__img {
        width: 343px;
        height: 343px;
      }

      &__info-btn {
        flex-wrap: nowrap;
      }
  }
  .specialists-btn-base {
    width: max-content;
  }
}
</style>