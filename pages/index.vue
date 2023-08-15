<template>
  <blocks-main-primary-banner />
  <BlocksMainBanner 
    :title="'Лечим не только зубы'"
    :text="'Многопрофильная детская клиника СтамусМед'"
    :titleLink="'Узнать подробнее'"
    link="#"
    bgColor="light-blue-gradient"
    type="true"
    img="girl.png"
  />
  <blocks-main-areas />
  <blocks-main-specialists />
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
  <blocks-main-popularServices />
  <BlocksMainBanner 
    :title="'Первое место в Краснодаре'"
    :text="'Независимый всеройсийский портал Продокторов'"
    :titleLink="'Записаться онлайн'"
    link="#"
    bgColor="blue-gradient"
    img="mobile.svg"
    bigImg=true
  />
  <blocks-main-feedback />
  <BlocksMainBanner 
    :title="'Лучшая детская стоматология'"
    :text="'среди частных детских стоматологий Краснодара по версии экспертного журнала Startsmile при поддержке ИД “КоммерстантЪ”'"
    :additionalText="' *1 место в рейтинге детских стоматологических клиник Краснодара за 2022 (клиники, которым более 3-х лет)'"
    :titleLink="'Узнать подробнее'"
    link="#"
    bgColor="dark-red"
    img="image.png"
  />
  <blocks-main-articles />
  <blocks-main-seo 
    title="СЕО текст"
    text="Как уже неоднократно упомянуто, непосредственные участники технического прогресса неоднозначны и будут разоблачены.
          С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта не даёт нам иного выбора, 
          кроме определения приоретизации разума над эмоциями. Разнообразный и богатый опыт говорит нам, 
          что укрепление и развитие внутренней структуры в значительной степени обусловливает важность системы массового участия."
    img="rectangle.png"      
  />
  <blocks-main-form />
</template>