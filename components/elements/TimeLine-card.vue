<template>
  <div class="timeline">
    <div class="timeline-item" v-for="(event, index) in displayedEvents" :key="event.id">
      <div class="lines">
        <div class="dot" :class="{'last': event.date === 'н.в.'}"></div>
        <div class="line" v-if="index !== events.length - 1 && index !== displayedEvents.length - 1"></div>
      </div>
      <div class="cards">
        <h4 class="timeline-date">{{ event.date }}</h4>
        <h4 class="timeline-title">{{ event.title }}</h4>
        <h4 class="timeline-category">{{ event.category }}</h4>
      </div>
    </div>
    <div class="timeline-box" v-if="events.length === 5">
      <button class="timeline-btn" @click="toggleShowMore">
        {{ showMoreText }}
        <div v-if="!showAll" class="timeline-svg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M6 8L10 12L14 8" stroke="#7F838C" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div v-else class="timeline-svg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M6 12L10 8L14 12" stroke="#232D5B" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    events: Array,
  },
  data() {
    return {
      displayedEvents: this.events.slice(0, 4),
      showAll: false,
    };
  },
  computed: {
    showMoreText() {
      return this.showAll ? "Скрыть" : "Показать ещё";
    },
  },
   methods: {
    toggleShowMore() {
      this.showAll = !this.showAll;
      if (this.showAll) {
        this.displayedEvents = this.events;
      } else {
        this.displayedEvents = this.events.slice(0, 4);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/styles/style.scss';
.timeline {
  width: fit-content;
}
.timeline-item {
  .lines {
    .last {
      border: 3px solid #CFD5E1;
      width: 14px;
      height: 14px;
      background: #232D5B;
      margin-left: -2px;
    }
  }
}

.lines {
  .dot {
    width: 10px;
    height: 10px;
    border: 1px solid #CFD5E1;
    border-radius: 7px;
  }
  
  .line {
    height: 34px;
    width: 1px;
    background: #CFD5E1;
    margin-left: 4.2px;
  }
}
.cards {
  margin-left: 10px;
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-top: -7px;
}

.timeline-item {
  display: flex;
}

.timeline-date {
  @include body-12-regular;
  color: $placeholder;
}

.timeline-title {
  @include body-16-regular;
  color: $gray-text;
      min-width: 175px;
}

.timeline-category {
  @include body-14-regular;
  color: $placeholder;
}

.timeline-box {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.timeline-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  @include body-14-medium;
  color: $gray-text;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.timeline-svg {
  display: flex;
  align-items: center;
}

</style>