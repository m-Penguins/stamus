import { defineStore } from "pinia";

export const useBaseDataStore = defineStore("base-data-store", () => {
  const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
  const clinics = ref(null);
  const directions = ref(null);
  const popularServices = ref(null);
  const allServices = ref(null);
  const footerData = ref(null);

  const getClinics = async () => {
    const { data: clinicsData } = await useFetch(`${apiBaseUrl}clinics`, {
      // query: {
      //   populate: "deep",
      // },
    });

    clinics.value = clinicsData.value;
  };

  const getDirections = async () => {
    const { data: directionsData } = await useFetch(
      `${apiBaseUrl}main-derections`,
      {
        query: {
          sort: "order:asc",
        },
      },
    );
    directions.value = directionsData.value;
  };

  const getPopularServices = async () => {
    const { data: popData } = await useFetch(`${apiBaseUrl}popular-service`, {
      query: {
        populate: "deep",
      },
    });

    popularServices.value = popData.value;
  };

  return {
    footerData,
    clinics,
    directions,
    popularServices,
    allServices,
    getClinics,
    getDirections,
    getPopularServices,
  };
});
