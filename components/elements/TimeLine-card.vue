<template>
  <div class="timeline">
    <div
      class="timeline-item"
      v-for="(event, index) in displayedEvents"
      :key="event?.id"
    >
      <div class="cards">
        <div class="timeline-date">
          {{ event.years ? formatDate(event.years) : "" }}
        </div>
        <div class="timeline-title">{{ event.educationalInstitution }}</div>
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

<script setup>
const props = defineProps({
  events: Array,
});
console.log(props.events);
const showAll = ref(false);
const displayedEvents = ref(props.events.slice(0, 4));

const showMoreText = computed(() =>
  showAll.value ? "Скрыть" : "Показать ещё",
);

const toggleShowMore = () => {
  showAll.value = !showAll.value;
  displayedEvents.value = showAll.value
    ? props.events
    : props.events.slice(0, 4);
};

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/style.scss";
.timeline {
  width: fit-content;
}
.timeline-item {
  .lines {
    .last {
      border: 3px solid #cfd5e1;
      width: 14px;
      height: 14px;
      background: #232d5b;
      margin-left: -2px;
    }
  }
}

.lines {
  .dot {
    width: 10px;
    height: 10px;
    border: 1px solid #cfd5e1;
    border-radius: 7px;
  }

  .line {
    height: 34px;
    width: 1px;
    background: #cfd5e1;
    margin-left: 4.2px;
  }
}
.cards {
  margin-left: 4px;
  display: flex;
  align-items: baseline;
  gap: 10px;
  width: 100%;
  border-left: 1px solid #e9e9e9;
  padding-left: 10px;
  position: relative;
  padding-bottom: 20px;
}

.cards::before {
  content: "";
  position: absolute;
  width: 7px;
  height: 7px;
  background: white;
  border-radius: 999px;
  left: -5px;
  top: 7px;
  border: 2px solid #cfd5e1;
}

.timeline-item {
  display: flex;
}

.timeline-date {
  @include body-12-regular;
  color: $placeholder;
  width: fit-content;
  white-space: nowrap;
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
