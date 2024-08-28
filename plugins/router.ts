export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const router = useRouter();
    let lastHash = ""; // Переменная для хранения последнего хэша

    const handleScroll = async (hash: string) => {
      if (hash) {
        await new Promise((resolve) => setTimeout(resolve, 300)); // Небольшая задержка для отрисовки контента

        const element = document.getElementById(hash.slice(1));
        if (element) {
          const top =
            element.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    };

    router.options.scrollBehavior = async (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      }

      if (to.hash) {
        await handleScroll(to.hash);
        lastHash = to.hash; // Обновляем последний хэш
      }

      return { left: 0, top: 0 };
    };

    nuxtApp.hook("page:finish", () => {
      const currentHash = window.location.hash;
      if (currentHash !== lastHash) {
        handleScroll(currentHash);
        lastHash = currentHash; // Обновляем последний хэш
      }
    });

    window.addEventListener("hashchange", () => {
      const currentHash = window.location.hash;
      if (currentHash === lastHash) {
        // Принудительно обрабатываем скролл, если хэш не изменился
        handleScroll(currentHash);
      } else {
        handleScroll(currentHash);
        lastHash = currentHash; // Обновляем последний хэш
      }
    });
  }
});
