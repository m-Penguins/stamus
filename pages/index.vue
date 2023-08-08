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
    img="cards.svg"
  />
  <blocks-main-popularServices />
  <BlocksMainBanner 
    :title="'Первое место в Краснодаре'"
    :text="'Независимый всеройсийский портал Продокторов'"
    :titleLink="'Записаться онлайн'"
    link="#"
    bgColor="blue-gradient"
    img="mobile.svg"
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
  <blocks-main-seo />
  <blocks-main-form />
</template>