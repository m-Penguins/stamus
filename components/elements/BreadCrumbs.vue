<template>
  <div class="breadcrumbs">
    <div class="container-crumb">
      <div class="content"
      :class="typeColorWhite ? 'styleColor' : ''">
        <NuxtLink
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="index"
          :class="['breadcrumbs-text', {['pre']: index < breadcrumbs.length - 1} ]"
          :to="breadcrumb.url"
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
    }, 
    typeColorWhite: {
      type: Boolean,
      default: false
    }
  },
   setup() {
    const store = useActuveLink();
    return {
      store
    }
   }
}
</script>

<style lang="scss" scoped>
@import '/assets/styles/style.scss';

.styleColor  {
  .breadcrumbs-text {
    color: #CFD5E1;
  }
}

.breadcrumbs {
  .container-crumb {
    .styleColor {
      :before {
        color: white !important;
        opacity: 0.5;
      }
    }
  }
}

.breadcrumbs {
  flex-direction: unset;
  overflow-x: scroll;
  white-space: nowrap;
  .styleColor  {
    .pre {
      color: white;
    }
  }
}

.breadcrumbs::-webkit-scrollbar {
    display: none;
  }

// .breadcrumbs {
//   .styleColor:before {
//     color: white;
//   }
// }

.breadcrumbs {
  position: relative;
  width: 100%;
  margin-top: 138px;

  @media screen and (max-width: 600px) {
    margin-top: 50px;
  }

  @media screen and (max-width: 1200px) {
    margin-top: 88px
  }
  .pre {
    color: $gray-text;
    align-items: baseline;
  }
  &-text {
    display: flex;
    position: relative;
    color: $placeholder;
    @include body-12-regular;
    text-decoration: none;
    align-items: center;
    &:last-child {
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
.container-crumb {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .content {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    height: 30px;
    :before {
      position: relative;
      top: 0!important;
      font-size: 14px;
      line-height: 140%;
      content: "/";
      padding-right: 6px;
      padding-left: 6px;
      color: $placeholder;
      opacity: 0.5;
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

@media screen and (max-width: 1110px) {
  .breadcrumbs {
    margin-bottom: 60px;
  }
}

  @media (max-width: 650px) {
    .breadcrumbs {
      margin-bottom: 0px;
    }
  }
</style>