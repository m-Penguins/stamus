import { defineNuxtPlugin } from "#app";
import { useRouter } from "vue-router";

export default defineNuxtPlugin(() => {
  const router = useRouter();

  router.options.scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        top: 100,
        behavior: "smooth",
      };
    } else {
      return { top: 0 };
    }
  };

  router.afterEach((to) => {
    if (to.hash) {
      const element = document.getElementById(to.hash.slice(1));
      console.log(element)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          window.scrollBy(0, -120); // Чтобы компенсировать фиксированный верхний отступ, если он есть
        }, 300);
      }
    }
  });
});
