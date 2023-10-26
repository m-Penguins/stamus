<template>
  <ul class="pagination">
    <li
      v-if="totalPages > 1"
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      :class="['page-item', { active: pageNumber === currentPage }]"
      @click="setCurrentPage(pageNumber)"
    >
      <div class="page-link">
        {{ pageNumber }}
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    setCurrentPage(pageNumber) {
      this.$emit("update:currentPage", pageNumber);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/style.scss";
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0 90px;
  gap: 6px;
}

.page-item {
  @include body-14-regular;
  color: $gray-text;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(.active):hover {
    border-radius: 5px;
    background: #f0f0f0;
    color: #232d5b;
  }
}

.page-item a {
  text-decoration: none;
}

.page-item.active {
  border-radius: 5px;
  border: 1px solid var(--dissabled, #cfd5e1);
  padding: 4px 10px;
}
</style>
