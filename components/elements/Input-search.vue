<template>
  <div class="input-base">
    <form @submit.prevent="search">
      <input
        type="text"
        :placeholder="placeholder"
        v-model="searchTerm"
        class="input bg"
      />
    </form>
    <button @click="search" class="btn-search">
      <img src="../../assets/images/icons/icon_search.svg" alt="icon search" />
    </button>
    <button @click="clearInput" v-if="searchTerm" class="btn-close">
      <img src="../../assets/images/icons/close.svg" alt="icon close" />
    </button>
  </div>
</template>

<script setup>
defineProps(["placeholder"]);

const emit = defineEmits(["enterPressed"]);

const router = useRouter();

const searchTerm = ref("");

const search = () => {
  if (searchTerm.value) {
    router.push({
      path: "/search",
      query: { term: searchTerm.value },
      replace: true,
    });
    emit("enterPressed");
  }
};
const clearInput = () => {
  searchTerm.value = "";
};
</script>

<style scoped lang="scss">
.input-base {
  width: 308px;
  position: relative;
}

.bg {
  background: white;
  padding: 14px 20px 14px 46px;
}

.btn-search,
.btn-close {
  border: none;
  outline: none;
  background: transparent;
}

.btn-search {
  height: 20px;
  width: 20px;
  position: absolute;
  bottom: 17px;
  left: 20px;
  cursor: pointer;
}

.btn-close {
  height: 20px;
  width: 20px;
  position: absolute;
  bottom: 17px;
  right: 20px;
  cursor: pointer;
}

.input:focus {
  color: #525660;
}

.input-error {
  border-color: red;
}

.error-message {
  color: red;
}
</style>
