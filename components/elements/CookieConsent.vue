<<<<<<< HEAD
<template>
  <div v-if="!cookieConsentAccepted" class="cookie-consent">
    <div class="cookie-message">Мы используем файлы cookie</div>
    <elements-button-base @click="acceptCookieConsent" title="Хорошо" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      cookieConsentAccepted: true,
    };
  },
  mounted() {
    this.cookieConsentAccepted =
      localStorage.getItem("cookieConsentAccepted") === "true";
  },
  methods: {
    acceptCookieConsent() {
      localStorage.setItem("cookieConsentAccepted", "true");
      this.cookieConsentAccepted = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/styles/style.scss";
.cookie-consent {
  display: flex;
  align-items: center;
  gap: 20px;
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 100%;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 5px 5px 45px -5px rgba(30, 32, 40, 0.08);
  z-index: 100;
  padding: 20px;
  max-width: 405px;
}

@media (max-width: 540px) {
  .cookie-consent {
    flex-direction: column;
    align-items: flex-start;
    max-width: 70%;
  }
}

.cookie-message {
  @include body-16-regular;
  color: #525660;
}

button {
  background: #fff;
  color: #333;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
=======
<template>
    <div v-if="!cookieConsentAccepted" class="cookie-consent">
      <div class="cookie-message">
        Мы используем файлы cookie
      </div>
      <elements-button-base @click="acceptCookieConsent" title="Хорошо"/>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cookieConsentAccepted: true,
      };
    },
    mounted() {
      this.cookieConsentAccepted = localStorage.getItem('cookieConsentAccepted') === 'true';
    },
    methods: {
      acceptCookieConsent() {
        localStorage.setItem('cookieConsentAccepted', 'true');
        this.cookieConsentAccepted = true;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  @import '/assets/styles/style.scss';
  .cookie-consent {
    display: flex;
    align-items: center;
    gap: 20px;
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 100%;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 5px 5px 45px -5px rgba(30, 32, 40, 0.08);
    z-index: 100;
    padding: 20px;
    max-width: 405px
  }
  
  .cookie-message {
    @include body-16-regular;
    color: #525660;
  }
  
  button {
    background: #fff;
    color: #333;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
  </style>
>>>>>>> a32cc7504d371827e54429370578101f655096b2
