<template>
  <NuxtLink 
  v-if="type" 
  :href="link" 
  class="wrapper">
    <p v-html="title" class="text text-gray"></p>
    <div>
      <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="svg" d="M1 4C0.723858 4 0.5 4.22386 0.5 4.5C0.5 4.77614 0.723858 5 1 5V4ZM17.3536 4.85355C17.5488 4.65829 17.5488 4.34171 17.3536 4.14645L14.1716 0.964466C13.9763 0.769204 13.6597 0.769204 13.4645 0.964466C13.2692 1.15973 13.2692 1.47631 13.4645 1.67157L16.2929 4.5L13.4645 7.32843C13.2692 7.52369 13.2692 7.84027 13.4645 8.03553C13.6597 8.2308 13.9763 8.2308 14.1716 8.03553L17.3536 4.85355ZM1 5H17V4H1V5Z" fill="#525660"/>
      </svg>
    </div>
  </NuxtLink>
  <NuxtLink v-else :href="link" class="wrapper">
    <p v-html="title" class="text text-white"></p>
    <div class="arrow-white">
      <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="svg" id="Vector 4" d="M1 4C0.723858 4 0.5 4.22386 0.5 4.5C0.5 4.77614 0.723858 5 1 5V4ZM17.3536 4.85355C17.5488 4.65829 17.5488 4.34171 17.3536 4.14645L14.1716 0.964466C13.9763 0.769204 13.6597 0.769204 13.4645 0.964466C13.2692 1.15973 13.2692 1.47631 13.4645 1.67157L16.2929 4.5L13.4645 7.32843C13.2692 7.52369 13.2692 7.84027 13.4645 8.03553C13.6597 8.2308 13.9763 8.2308 14.1716 8.03553L17.3536 4.85355ZM1 5H17V4H1V5Z" fill="white"/>
      </svg>
    </div>
  </NuxtLink>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      link: {
        type: String,
        default: '#'
      },
      type: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="scss">
@import '/assets/styles/style.scss';
  .wrapper {
    display: flex;
    align-items: center;

    .text {
      @include body-14-regular;
      padding-right: 6px;
    }

    .text-gray {
      color: $gray-text;
    }

    .text-white {
      color: $white;
    }
  }

  .wrapper {
    &:hover {
      .svg {
        fill: #232D5B;
      }
      .text {
        transition: all .3s ease;
        color: #232D5B;
      }
      .text-white {
        transition: all .3s ease;
        color: $white;
        opacity: 0.6;
    }
    .arrow-white {
      .svg {
        fill:white;
        transition: all .3s ease;
        opacity: 0.6;
      }
    }
    }
  }
</style>