<template>
  <div class="seo-block block-size">
    <div class="seo-block-img">
      <img src="@/assets/images/blocks/rectangle.png" alt="rectangle"/>
    </div>
    <div class="seo-block-text">
      <h2 class="seo-block-text__title p-bt-14">СЕО текст, который описывает всю суть</h2>
      <p class="seo-block-text__text">Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены.
          С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта не даёт нам иного выбора, 
          кроме определения приоретизации разума над эмоциями. Разнообразный и богатый опыт говорит нам, 
          что укрепление и развитие внутренней структуры в значительной степени обусловливает важность системы массового участия. 
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/assets/styles/style.scss';
  .seo-block {

    .seo-block-img {
      margin-right: 16px;
    }

    .seo-block-text {
      @include flex-column-center;
      justify-content: center;
      width: 524px;
      height: 494px;
      padding: 20px 40px;
      border-radius: 45px;
      background: #F9F9FA;
      backdrop-filter: blur(22.5px);

      &__title {
        @include body-22-medium-Neue;
        color: $dark-blue-subtitle;
      }

      &__text {
        @include body-14-regular;
        color: $gray-text;
      }
    }
    
  }
</style>