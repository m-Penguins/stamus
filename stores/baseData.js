import { defineStore } from "pinia";

export const useBaseDataStore = defineStore("base-data-store", () => {
  const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
  const clinics = ref(null);
  const directions = ref(null);

  const getClinics = async () => {
    const { data: clinicsData } = await useFetch(`${apiBaseUrl}clinics`, {
      query: {
        populate: "deep",
      },
    });

    clinics.value = clinicsData.value;
  };

  const getDirections = async () => {
    const { data: directionsData } = await useFetch(
      `${apiBaseUrl}main-derections`,
      {
        query: {
          populate: "deep",
        },
      },
    );

    directions.value = directionsData.value;
  };

  return {
    clinics,
    directions,
    getClinics,
    getDirections,
  };
});
