<script setup>
import { textAboutImportantArray } from '../../stores/mockData';
import { mockArrayDirection } from '../../stores/mockData'
import { mockArrayServicesCard } from '../../stores/mockData'
import { mockArrayOurSpecialistsTwoDoctors } from '../../stores/mockData'
const route = useRoute()
const cards = [
        { id: 1, text: 'Длинное наименование симптома' },
        { id: 2, text: 'Наименование симптома' },
        { id: 3, text: 'наименование симптома' },
        { id: 4, text: 'Длинное наименование симптома Длинное наименование симптома' },
        { id: 5, text: 'Длинное наименование симптома' },
        { id: 6, text: 'Наименование симптома' },
        { id: 7, text: 'Наименование' },
      ]
const solution = [
   { id: 1, title: "Снятие мягкого пигментированного налета методом Air Flow", text: 'Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены. С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта не даёт нам иного выбора, кроме определения приоретизации разума над эмоциями. Разнообразный и богатый опыт говорит нам, что укрепление и развитие внутренней структуры в значительной степени обусловливает важность системы массового участия.' },
   { id: 2, title: "Снятие над-/под- десневого камня УЗ аппаратом", text: 'Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены. С учётом сложившейся международной обстановки, над эмоциями. Разнообразный и богатый опыт говорит нам, что укрепление и развитие внутренней структуры в значительной степени обусловливает важность системы массового участия.' },
   { id: 3, title: "Полировка зубов щеткой и пастой", text: 'Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены. С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта не даёт нам иного выбора, кроме определения приоретизации разума над эмоциями. Разнообразный и богатый опыт говорит нам, что укрепление и развитие внутренней структуры в значительной степени обусловливает важность системы массового участия.' },
   { id: 4, title: "Снятие мягкого пигментированного налета методом Air Flow", text: 'Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены. С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта не даёт нам иного выбора, кроме определения приоретизации разума над эмоциями. Разнообразный и богатый опыт говорит нам, что укрепление и развитие внутренней структуры в значительной степени обусловливает важность системы массового участия.' },
   { id: 5, title: "Аппликация на зубы АПФ гель 4 минуты", text: 'Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены.' },
]      
const imagesScroll = ['video1.png', 'video2.png', 'video3.png','video3.png','video3.png','video3.png'];
</script>

<template>
 <div>
    <elements-main-info 
      title="ЧЛХ остеотомия" 
      text="Небольшое описание в несколько строчек" 
      imgBg="portfolio-category.png" 
      imgAdaptiv="portfolio-category-adaptiv.png" 
      :isButtonBase="false"
      :isTimeAndPriceCard="true"
      time="2-4 посещения"
      money="50-100 тыс. ₽"
      :breadcrumbs="[
        {
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Портфолио',
          url: '/portfolio'
        },
         {
            title: 'ЧЛХ остеотомия',
            url: `/portfolio/${route.params.id}`
          }
    ]"
    />
    <blocks-symptoms-block title="Симптомы, с которыми обратился клиент" :cards="cards"/>
    <blocks-video-block
      title="Проблема" 
      text="Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены. С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта не даёт нам иного выбора, кроме определения приоретизации разума над эмоциями. Разнообразный и богатый опыт говорит нам, что укрепление и развитие внутренней структуры в значительной степени обусловливает важность системы массового участия." 
      :isProblems="true"
    />
    <div>
      <blocks-solution-block title="Решение" :cards="solution"/>
    </div>
    <div class="attending-physicians-block">
      <h3 class="attending-physicians-block-title">Лечащие врачи</h3>
      <div class="attending-physicians-block-cards">
        <div  class="attending-physicians-block-card" v-for="item in mockArrayOurSpecialistsTwoDoctors" :key="item" >
          <elements-name-specialty-photo-card :specialists="item" @click="$router.push(`/specialists/` + 1)"/>
        </div>
      </div>
    </div>
    <blocks-gallery />
    <blocks-cases-direction text="Другие кейсы" :dataDirection="mockArrayDirection"/>
    <blocks-main-form />
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/styles/style.scss';
.attending-physicians-block {
  width: 1280px;
  max-width: 100%;
  margin: 0 auto 100px;
}

.attending-physicians-block-title {
  @include body-22-medium-Neue;
  color: $dark-blue-subtitle;
  padding-bottom: 40px;
}

.attending-physicians-block-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.attending-physicians-block-card {
  max-width: 308px;
}

@media (max-width: 500px) {
  .attending-physicians-block-card {
    max-width: 100%;
  }
}


</style>