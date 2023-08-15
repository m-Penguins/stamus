<template>
  <blocks-dentistry 
    title="Детская стоматология"
    text="Небольшое описание в несколько строчек"
    imgBg="girl.png"
    imgAdaptiv="girl-adaptiv.png"
    titleSeo="Описание клиники"
    textSeo="Как уже неоднократно упомянуто, непосредственные участники 
      технического прогресса неоднозначны и будут разоблачены. С 
      учётом сложившейся международной обстановки, 
      высококачественный прототип будущего проекта не даёт нам иного выбора, 
      кроме определения приоретизации разума над эмоциями. Разнообразный и богатый опыт говорит нам, 
      что укрепление и развитие внутренней структуры в значительной степени обусловливает важность 
      системы массового участия. "
    :imgSeo="'block1.png'"
    :data="mockArray"
    :addresData="mockArrayAddresSelect"
  />
</template>

<script setup>
  const mockArray = [
    {name: 'Овсоян Григорий', category: 'Челюстно-лицевой хирург', img:"avatar-4.png" },
    {name: 'Унаньян Карина', category: 'Стоматолог-терапевт', img:"avatar-5.png" },
    {name: 'Маашев Магомед', category: 'Стоматолог-хирург', img:"avatar-6.png"},
    {name: 'Шагалова Полина', category: 'Стоматолог', img:"avatar-7.png"},
    ];

  const mockArrayAddresSelect = [
    {name: 'Клиника на Московской', tel: '+7 (999) 888 - 77 - 66', email:"hakurate@stamus-info.ru", address:"Краснодар, ул. Московская 140" },
    {name: 'Клиника на Хакурате', tel: '+7 (999) 888 - 77 - 66', email:"hakurate@stamus-info.ru", address:"Краснодар, ул. Хакурате 34" },
    {name: 'Клиника на Мачуги', tel: '+7 (999) 888 - 77 - 66', email:"hakurate@stamus-info.ru", address:"Краснодар, ул. Мачуги 1/1"},
    {name: 'Клиника на Черкасской', tel: '+7 (999) 888 - 77 - 66', email:"hakurate@stamus-info.ru", address:"Краснодар, ул. Черкасская 17"},
    {name: 'Клиника на Гимназической', tel: '+7 (999) 888 - 77 - 66', email:"hakurate@stamus-info.ru", address:"Краснодар, ул. Гимназическая 85"},
    {name: 'Клиника на Платановом бульваре', tel: '+7 (999) 888 - 77 - 66', email:"hakurate@stamus-info.ru", address:"Краснодар, Платановый бульвар 19/3"},
    {name: 'Клиника на Средней', tel: '+7 (999) 888 - 77 - 66', email:"hakurate@stamus-info.ru", address:"Краснодар, ул. Средняя 1/3"},
    ];
</script>