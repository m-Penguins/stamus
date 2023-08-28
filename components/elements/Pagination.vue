<template>
  <ul class="pagination">
    <li v-for="pageNumber in totalPages" :key="pageNumber" :class="['page-item', { active: pageNumber === currentPage }]">
      <a @click="setCurrentPage(pageNumber)" class="page-link">{{ pageNumber }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    setCurrentPage(pageNumber) {
      this.$emit('update:currentPage', pageNumber);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/style.scss';
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0 90px;
  gap: 22px;
}

.page-item {
  @include body-14-regular;
  color: $gray-text;
  cursor: pointer;
}

.page-item a {
  text-decoration: none;
}

.page-item.active a {
  border-radius: 5px;
  border: 1px solid var(--dissabled, #CFD5E1);
  padding: 4px 10px;
}
</style>