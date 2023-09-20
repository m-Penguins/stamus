<template>
  <div class="info">
    <div 
      v-for="(item, index) in mockInfoMain" 
      :key="index"
      class="info-card"
      :class="{ 'open': item.isOpen }"
    >
      <div class="info-card__box" @click="toggleAccordion(index)" >
        <h3 class="accordion-title">{{ item.title }}</h3>
        <div v-if="!item.isOpen">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22L32 22.003M22 12V32" stroke="#525660" stroke-linecap="round"/>
          <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="#E9E9E9"/>
          </svg>
        </div>
        <div v-else>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.9985L32 22.0015" stroke="#525660" stroke-linecap="round"/>
          <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="#E9E9E9"/>
          </svg>
        </div>
      </div>
      <div class="accordion-content">
        <div v-if="item.id === 1">
          <div class="accordion-content-text">
            <p class="accordion-content-title">{{ item.text }}</p>
            <p>{{ item.text2 }}</p>
            <p>{{ item.text3 }}</p>
            <p>{{ item.text4 }}</p>
            <p>{{ item.text5 }}</p>
            <p class="accordion-content-subtitle">{{ item.text6 }}</p>
          </div>
          <p class="accordion-content-subtext">{{ item.text7 }}</p>
        </div>
        <div v-if="item.id === 2">
          <div class="accordion-content-text">
            <p class="accordion-content-title">{{ item.text }}</p>
            <NuxtLink :to="'#'" class="header-nav-item link-info-doc">{{ item.text2 }}</NuxtLink>
            <NuxtLink :to="'#'" class="header-nav-item link-info-doc">{{ item.text3 }}</NuxtLink>
            <NuxtLink :to="'#'" class="header-nav-item link-info-doc">{{ item.text4 }}</NuxtLink>
            <NuxtLink :to="'#'" class="header-nav-item link-info-doc">{{ item.text5 }}</NuxtLink>
          </div>
        </div>
        <div v-if="item.id === 3">
          <div class="accordion-content-text">
            <elements-link-with-arrow type="true" title="Открыть" href="#"/>
          </div>
        </div>
        <div v-if="item.id === 4">
          <div class="accordion-content-text">
            <p class="accordion-content-title">{{ item.text }}</p>
            <p>{{ item.text2 }}</p>
            <p>{{ item.text3 }}</p>
          </div>
        </div>
        <div v-if="item.id === 5">
          <div class="accordion-content-text">
            <elements-link-with-arrow type="true" title="Открыть" href="#"/>
          </div>
        </div>
        <div v-if="item.id === 6">
          <div class="accordion-content-text">
            <p>{{ item.text }}</p>
            <p>{{ item.text2 }}</p>
            <p>{{ item.text3 }}</p>
            <p>{{ item.text4 }}</p>
            <p>{{ item.text5 }}</p>
            <p>{{ item.text6 }}</p>
            <p>{{ item.text7 }}</p>
            <p>{{ item.text8 }}</p>
            <p>{{ item.text9 }}</p>
          </div>
        </div>
        <div v-if="item.id === 7">
          <div class="accordion-content-text">
            <p>{{ item.text }}</p>
            <p>{{ item.text2 }}</p>
            <p>{{ item.text3 }}</p>
            <p>{{ item.text4 }}</p>
            <p>{{ item.text5 }}</p>
          </div>
        </div>
        <div v-if="item.id === 8" class="info-links-box">
          <div class="accordion-content-text">
            <elements-link-with-arrow type="true" title="Открыть" href="#"/>
          </div>
          <div class="accordion-content-text">
            <elements-link-with-arrow type="true" title="Открыть" href="#"/>
          </div>
        </div>
        <div v-if="item.id === 9">
          <div class="accordion-content-text">
            <p>{{ item.text }}</p>
            <p>{{ item.text2 }}</p>
            <p>{{ item.text3 }}</p>
            <p>{{ item.text4 }}</p>
            <p>{{ item.text5 }}</p>
            <p>{{ item.text6 }}</p>
            <p>{{ item.text7 }}</p>
            <p>{{ item.text8 }}</p>
            <p>{{ item.text9 }}</p>
          </div>
        </div>
        <div v-if="item.id === 10">
          <div class="accordion-content-text">
            <elements-link-with-arrow type="true" title="Открыть" href="#"/>
          </div>
        </div>
        <div v-if="item.id === 11" class="info-links-box">
          <div class="accordion-content-text">
            <elements-link-with-arrow type="true" title="Открыть" href="#"/>
          </div>
          <div class="accordion-content-text">
            <elements-link-with-arrow type="true" title="Детская клиника" href="#"/>
          </div>
        </div>
        <div v-if="item.id === 12">
          <div class="accordion-content-text">
            <elements-link-with-arrow type="true" title="Открыть" href="#"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mockInfoMain } from '../../stores/mockData'
export default {
  props: {
    data: Array,
  },
 data() {
    return {
      mockInfoMain
    };
  },
  methods: {
    toggleAccordion(index) {
      this.mockInfoMain.forEach((item, i) => {
        if (i === index) {
          item.isOpen = !item.isOpen;
        } else {
          item.isOpen = false;
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/style.scss';

.info-links-box {
  display: flex;
  align-items: center;
  gap: 20px;
}

.link-info-doc {
  width: fit-content;
}

.info-card {
  .accordion-content {
    max-height: 0px;
    opacity: 0;
    transition: max-height 0.3s ease, opacity 0.5s ease, margin-top 0.3s ease;
  }
  &.open {
    .accordion-content {
      margin-top: 16px;
      max-height: 300px;
      opacity: 1;
    }
  }
}
  

.accordion-content-subtitle {
  margin: 24px 0 24px;
}

.accordion-content-subtext {
  @include body-12-regular;
  color: $placeholder;
}

.accordion-content-text {
  display: flex;
  flex-direction: column;
  gap: 14px;
  @include body-14-regular;
  color: $gray-text;
}

.accordion-content-title {
  padding-bottom: 10px;
}

.accordion-title {
  @include body-18-regular;
  color: $dark-blue-subtitle;
  width: 95%;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  display: flex;
  width: 100%;
  padding: 14px 20px;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid var(--stroke, #E9E9E9);
  transition: .3s;

  &__box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    cursor: pointer;
  }
}

.info-card:hover {
  border: 1px solid var(--stroke, #CFD5E1);
}

@media (max-width: 900px) {
  .accordion-title {
    font-size: 16px;
  }
}

</style>