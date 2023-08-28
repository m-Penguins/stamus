<template>
    <div>
    <h1>Search Results</h1>
    <p>Search term: {{ searchTerm }}</p>
  </div>
</template>


<script>
export default {
  fetch({ query }) {
    const searchTerm = query.term
    return { searchTerm }
  }
}
</script>