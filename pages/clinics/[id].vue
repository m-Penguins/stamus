<template>
   <elements-main-info 
    title="Клиника на Хакурате" 
    text="Краснодар,ул. Хакурате 34" 
    imgBg="clinic6.png" 
    imgAdaptiv="clinic6-adaptive.png" 
    :isButtonBase="false"
    :typeColorWhite="item"
    :typeColorWhiteText="item"
    :breadcrumbs="breadcrumbs"
  />
  <blocks-video-block 
    title="О клинике" 
    text="Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены. С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта не даёт нам иного выбора, кроме определения приоретизации разума над эмоциями. Разнообразный и богатый опыт говорит нам, что укрепление и развитие внутренней структуры в значительной степени обусловливает важность системы массового участия."
  />
  <blocks-chief-doctor-block :specialists="mockArray" />
  <blocks-services-block :addresData="addresData" title="Оказываемые услуги" :isLink="false"/>
  <blocks-gallery />
  <blocks-our-specialists title="Наши специалисты" :data="mockArrayOurSpecialists"/>
  <BlocksMainBanner 
    :title="'Добровольное медицинское страхование'"
    :text="'которое в отличие от обязательного обеспечивает получение гражданином дополнительных медицинских услуг'"
    :titleLink="'Узнать подробнее'"
    link="#"
    bgColor="light-blue"
    type="true"
    img="cards2.png"
    bigImg=true
  />
  <blocks-main-feedback />
  <blocks-clinics-adress text="Кейсы по направлению" 
  :dataDirection="mockArrayDirection" />
  <blocks-main-form />
</template>

<script>
import { mockArrayOurSpecialists } from '../../stores/mockData'
export default {
  data() {
    return {
      item: true
    };
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.item = window.innerWidth <= 1110 ? false : true;
    }
  },
  setup() {
    const mockArrayDirection = [
      { name: 'Краснодар, Платановый бульвар 19/3', img:"clinics/clinic6.png"},
      { name: 'Краснодар, Платановый бульвар 19/3', img:"clinics/clinic7.png"},
      { name: 'Краснодар, Платановый бульвар 19/3', img:"clinics/clinic8.png"},
      { name: 'Краснодар, Платановый бульвар 19/3', img:"clinics/clinic9.png"},
    ]
    const mockArray = 
      {
        name: 'Овсоян Григорий', 
        category: 'Челюстно-лицевой хирург', 
        img:"main-doctor.png", 
        text:"Лишь элементы политического процесса неоднозначны и будут призваны к ответу. Кстати,  элементы политического процесса набирают популярность среди определенных слоев населения, а значит, должны быть в равной степени предоставлены сами себе. Таким образом, сложившаяся структура организации способствует повышению качества своевременного выполнения сверхзадачи. Мы вынуждены отталкиваться от того, что сплочённость команды профессионалов прекрасно подходит для реализации как самодостаточных, так и внешне зависимых концептуальных решений. И нет сомнений, что независимые государства, инициированные исключительно синтетически." 
      }
    const route = useRoute()
    const breadcrumbs = [
        {
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Клиники',
          url: '/clinics'
        },
        {
          title: `${route.params.id}`,
          url: `/clinics/${route.params.id}`
        }
      ]  
   return {
      route,
      breadcrumbs,
      mockArray,
      mockArrayOurSpecialists,
      mockArrayDirection
    };
  }
};
</script>