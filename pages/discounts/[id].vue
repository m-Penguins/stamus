<template>
  <blocks-discounts-banner-dital 
    :breadcrumbs="breadcrumbs" 
  />
  <blocks-main-form />
</template>

<script>
  export default {
    props: {
    },
    data() {
      return {
      };
    },
    setup() {
      const breadcrumbs = [{
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Акции и скидки',
          url: '/discounts'
        },
        {
          title: 'Счастливые часы',
          url: `/discounts/schastlivye-chasy`
        }]
      return {
        breadcrumbs,
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/style.scss';

</style>