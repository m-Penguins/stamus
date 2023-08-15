<template>
  <div class="breadcrumbs">
    <div class="container-crumb">
      <div class="content">
        <NuxtLink
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="index"
          :class="['breadcrumbs-text', {['pre']: index < breadcrumbs.length - 1} ]"
          :to="route(breadcrumb.url)"
          @click="index === 0 ? store.togglerLink(index) : null"
        >
          {{ breadcrumb.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { useActuveLink } from '../../stores/activeLink';

export default {
  props: {
    breadcrumbs: {
      type: Array,
      default: () => []
    }
  },
   setup() {
    const store = useActuveLink();
    const route = useRoute()

    return {
      store,
      route
    }
   }
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
  position: relative;
  width: 100%;
  margin-top: 150px;
  margin-bottom: 78px;

  @media screen and (max-width: 600px) {
    margin-top: 50px;
  }
  @media screen and (max-width: 680px), (max-width: 1000px) and (max-height: 500px) {
    width: 300px;
  }

  @media screen and (max-width: 1200px) {
    margin-bottom: 48px;
  }
  .pre {
    color: #000000;
  }
  &-text {
    display: flex;
    position: relative;
    color: #C4C4C4;
    text-decoration: none;
    font-size: 14px;
    line-height: 140%;
    &:last-child {
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 1000px;
    }
    @media screen and (max-width: 1179px) {
      &:last-child {
        width: 500px;
      }
    }
    @media screen and (max-width: 680px), (max-width: 1000px) and (max-height: 500px) {
      &:last-child {
        width: 200px;
      }
    }
  }
.container-crumb {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media screen and (max-width: 680px), (max-width: 1000px) and (max-height: 500px) {
    width: 300px;
  }
  .content {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 30px;
    :before {
      position: relative;
      top: 0!important;
      font-size: 14px;
      line-height: 140%;
      content: "/";
      padding-right: 3px;
      padding-left: 3px;
      color: #000000;
      opacity: 0.6;
      top: 2px;

      @media screen and (max-width: 680px), (max-width: 1000px) and (max-height: 500px) {
        font-size: 10px;
        line-height: 16px;
      }
    }
    :first-child:before{
      display: none;
    }
  }
  .arrow {
    margin-top: 2px;
    margin-bottom: 19px;
  }
}
}
</style>