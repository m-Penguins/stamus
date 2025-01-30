import { defineStore, acceptHMRUpdate } from "pinia";

export const usePlaceholdersStore = defineStore("placeholders-store", () => {
  const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
  const portTotalPages= ref()
  const teamTotalPages = ref();
  const artiTotalPages = ref();
  const imagePlaceholders = ref({
    articles: "",
    portfoliosBig: "",
    portfoliosSmall: "",
    services: "",
    specialists: "",
    priceListPDF: "",
  });

  const getImagePlaceholders = async () => {
    const { data: placeholdersData } = await useFetch(
      `${apiBaseUrl}placeholder`,
      {
        query: {
          populate:
            "servicesPlaceholder.*,specialistsPlaceholder.*,portfoliosPlaceholderSmall.*,portfoliosPlaceholderBig.*,articlesPlaceholder.*,priceListPdf.*",
        },
      },
    );

    const placeholders = placeholdersData.value?.data?.attributes;

    imagePlaceholders.value = {
      articles: placeholders?.articlesPlaceholder?.data?.attributes?.url ?? "",
      portfoliosBig:
        placeholders?.portfoliosPlaceholderBig?.data?.attributes?.url ?? "",
      portfoliosSmall:
        placeholders?.portfoliosPlaceholderSmall?.data?.attributes?.url ?? "",
      services: placeholders?.servicesPlaceholder?.data?.attributes?.url ?? "",
      specialists:
        placeholders?.specialistsPlaceholder?.data?.attributes?.url ?? "",
      priceListPDF: placeholders?.priceListPdf?.data?.attributes?.url ?? "",
    };
  };

  return {
    portTotalPages,
    teamTotalPages,
    artiTotalPages,
    imagePlaceholders,
    getImagePlaceholders,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(usePlaceholdersStore, import.meta.hot),
  );
}
