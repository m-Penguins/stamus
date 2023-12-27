<script setup>
const props = defineProps(["mainSpecialists"]);

const selectedIndex = ref(0);
</script>

<template>
  <div class="container-size specialists">
    <div class="specialists-subject">
      <h2 class="specialists-heading-title">Наши врачи</h2>
      <elements-link-with-arrow
        type
        title="Смотреть всех врачей"
        link="/team"
      />
    </div>
    <div class="specialists-container">
      <div class="specialists-list">
        <button
          v-for="(person, index) in props.mainSpecialists"
          :key="person.id"
          :class="{ active: selectedIndex === index }"
          @click="selectedIndex = index"
          class="specialists-btn"
        >
          <div class="div-with-line" v-if="selectedIndex === index"></div>
          <div class="specialists-btn__img">
            <img :src="person?.img" />
          </div>
          <div class="specialists-box">
            <div class="specialists-box__name">{{ person?.name }}</div>
            <div class="specialists-box__spec">{{ person?.category }}</div>
          </div>
        </button>
      </div>
      <div class="specialists-inner">
        <div class="specialists-inner__img">
          <img :src="props.mainSpecialists?.[selectedIndex]?.imgBig" />
        </div>
        <div class="specialists-inner__info">
          <div class="specialists-inner__info-name">
            <h2 class="specialists-heading">
              {{ props.mainSpecialists?.[selectedIndex]?.name }}
            </h2>
            <p class="specialists-desc">
              {{ props.mainSpecialists?.[selectedIndex]?.category }}
            </p>
          </div>

          <p class="description">
            {{ mainSpecialists?.[selectedIndex]?.description }}
          </p>

          <div class="specialists-inner__info-btn">
            <elements-button-base
              title="О докторе"
              @click="
                $router.push(
                  `/team/${props.mainSpecialists?.[selectedIndex]?.id}`,
                )
              "
              class="specialists-btn-base"
            />
            <elements-link-with-arrow
              type
              title="Смотреть портфолио"
              :to="`/team/${props.mainSpecialists?.[selectedIndex]?.id}#portfolio`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";

.specialists {
  padding-top: 80px;
}

.div-with-line {
  border-radius: 0px 15px 16px 0px;
  background: var(--accent, #232d5b);
  width: 3px;
  height: 24px;
  position: absolute;
  left: -1px;
  top: 28px;
}
.specialists-subject {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 529px;
  max-width: 100%;
  padding-bottom: 40px;
}

.specialists-heading {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
}

.specialists-heading-title {
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

    max-height: 370px;
    overflow-y: auto;

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
    border: 1px solid var(--stroke, #e9e9e9);
    background: white;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      border: 1px solid #d5d5d5;
      color: var(--accent, #232d5b);
    }

    .specialists-box__name {
      &:hover {
        color: $hover;
      }
    }

    .specialists-box__name {
      &:active {
        color: $dark-blue-subtitle;
      }
    }

    &:active {
      border: 1px solid var(--stroke, #e9e9e9);
      color: $click;
    }

    &__img {
      width: 60px;
      height: 60px;
      border-radius: 5px;
      background: #e8e8e8;
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
  align-items: flex-end;
  gap: 16px;

  &__img {
    width: 308px;
    height: 308px;
    img {
      width: 308px;
      height: 308px;
      border-radius: 15px;

      object-fit: cover;
    }
  }

  &__info {
    @include flex-column-start;
    // justify-content: space-between;
    gap: 30px;

    max-width: 400px;

    &-name {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-top: 10px;
    }

    &-numbers {
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
      margin-top: 27px;
    }
  }
}

@media (max-width: 1220px) {
  .specialists {
    padding-top: 0;
  }
  .specialists-subject {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .specialists-inner__info-btn {
    margin-top: 0;
  }

  .specialists-heading {
    font-size: 20px;
  }

  .specialists-container {
    gap: 20px;

    .specialists-list {
      flex-direction: unset;
      overflow-x: scroll;
      white-space: nowrap;
      gap: 10px;
    }
    .specialists-list::-webkit-scrollbar {
      display: none;
    }
  }

  .specialists-inner {
    gap: 14px;
    &__img {
      width: 332px;
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
      border-left: 1px solid #ededed;
      border-right: 1px solid #ededed;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 37% 74%;
      }
    }
  }
}

@media (max-width: 734px) {
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
    gap: 10px;

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
      align-self: center;
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
