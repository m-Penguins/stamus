<template>
  <div />
</template>

<script setup>
const schemaOrgData = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "Стамус",
  url: "https://stamus.ru/",
  logo: "https://stamus.ru/favicon.ico",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-861-205-92-38",
    contactType: "customer service",
    availableLanguage: ["Russian"],
  },
  department: [
    {
      "@type": "MedicalClinic",
      name: "Клиника на Хакурате",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Хакурате 34",
        addressLocality: "Краснодар",
        addressCountry: "RU",
      },
      openingHours: "Mo-Su 09:00-21:00",
    },
    {
      "@type": "MedicalClinic",
      name: "Клиника на Мачуги",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Мачуги 1/1",
        addressLocality: "Краснодар",
        addressCountry: "RU",
      },
      openingHours: "Mo-Su 09:00-21:00",
    },
    {
      "@type": "MedicalClinic",
      name: "Клиника на Московской",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Московская 140",
        addressLocality: "Краснодар",
        addressCountry: "RU",
      },
      openingHours: "Mo-Su 09:00-21:00",
    },
    {
      "@type": "MedicalClinic",
      name: "Клиника на Гимназической",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Гимназическая 85",
        addressLocality: "Краснодар",
        addressCountry: "RU",
      },
      openingHours: "Mo-Su 09:00-21:00",
    },
    {
      "@type": "MedicalClinic",
      name: "Клиника на Черкасской",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Черкасская 17",
        addressLocality: "Краснодар",
        addressCountry: "RU",
      },
      openingHours: "Mo-Su 09:00-21:00",
    },
    {
      "@type": "MedicalClinic",
      name: "Клиника на Старокубанской",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Старокубанская 123/1",
        addressLocality: "Краснодар",
        addressCountry: "RU",
      },
      openingHours: "Mo-Su 09:00-21:00",
    },
  ],

  medicalSpecialty: ["Dentistry", "Pediatric", "OralSurgery", "Anesthesia"],
};

useHead({
  script: [
    {
      type: "application/ld+json",
      json: JSON.stringify(schemaOrgData),
    },
  ],
});
</script>
