<template>
  <div class="mob">
    <div
      class="education-mob"
      v-for="(event, index) in displayedEvents"
      :key="event"
    >
      <div class="education-mob-container">
        <div>{{ event.years }}</div>
        <!-- <div class="education-mob-point"></div> -->
        <!-- <div>{{ event.category }}</div> -->
      </div>
      <div>
        <div class="education-mob-title">
          {{ event.educationalInstitution }}
        </div>
      </div>
    </div>
    <div class="timeline-box" v-if="events.length >= 5">
      <button class="timeline-btn" @click="toggleShowMore">
        {{ showMoreText }}
        <div v-if="!showAll" class="timeline-svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M6 8L10 12L14 8"
              stroke="#7F838C"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div v-else class="timeline-svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M6 12L10 8L14 12"
              stroke="#232D5B"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
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
@import "/assets/styles/style.scss";
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

.mob {
  display: none;
}

@media (max-width: 670px) {
  .mob {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
}

.education-mob {
  width: 100%;
  display: flex;
  padding: 10px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid var(--stroke, #e9e9e9);
}

.education-mob-container {
  display: flex;
  align-items: center;
  gap: 6px;
  @include body-12-regular;
  color: #525660;
  opacity: 0.7;
}

.education-mob-point {
  width: 4px;
  height: 4px;
  opacity: 0.2;
  border-radius: 50px;
  background-color: #525660;
}

.education-mob-title {
  @include body-16-regular;
  color: #1e2433;
}
</style>
