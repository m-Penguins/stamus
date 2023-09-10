<template>
  <div class="education-block">
    <div class="education-block-wrap">
      <h2 class="education-block-title" v-html="title"></h2>
       <elements-time-line-card :events="events" />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    events: Array,
    title: String
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/style.scss';

.education-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 100px;
}

.education-block-wrap {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
}

.education-block-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
  padding-bottom: 30px;
}

</style>