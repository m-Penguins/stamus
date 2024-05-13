<<<<<<< HEAD
import { defineStore } from "pinia";
import useReducedServices from "@/composables/useReducedServices";

export const useService = defineStore("useServices", {
  state: () => ({
    dataService: [],
  }),
  getters: {
    getStateService: (state) => state.dataService,

    getAllServicesArray: (state) => {
      const services = state.dataService
        .flatMap((el) => el.directions)
        .flatMap((el) => el.services);
      return services;
    },

    getServicesGroupExcluded: (state) => {
      return (serviceId) => {
        const foundStoreItem = state.dataService?.map((item) =>
          item?.directions.find((el) => {
            return el?.services?.find(
              (s) => String(s?.id) === String(serviceId),
            );
          }),
        );

        return foundStoreItem?.[0]?.services?.filter((s) => {
          return String(s?.id) !== String(serviceId);
        });
      };
    },
  },

  actions: {
    async fetchdataService(apiBaseUrl) {
      // const res = await axios.get(`${apiBaseUrl}services?populate=deep`);
      const baseDataStore = useBaseDataStore();

      const { data } = await useFetch(`${apiBaseUrl}services`, {
        query: {
          populate: "category.uslugas.*,category.napravleniya_uslug_1_col.*",
          sort: "order:asc",
          "pagination[pageSize]": 300,
        },
      });

      baseDataStore.allServices = data.value;

      const navigationServices = useReducedServices(data?.value?.data);

      this.dataService = navigationServices;
    },
  },
});
=======
import { defineStore } from "pinia";
import useReducedServices from "@/composables/useReducedServices";

export const useService = defineStore("useServices", {
  state: () => ({
    dataService: [],
  }),
  getters: {
    getStateService: (state) => state.dataService,

    getAllServicesArray: (state) => {
      const services = state.dataService
        .flatMap((el) => el.directions)
        .flatMap((el) => el.services);
      return services;
    },

    getServicesGroupExcluded: (state) => {
      return (serviceId) => {
        const foundStoreItem = state.dataService?.map((item) =>
          item?.directions.find((el) => {
            return el?.services?.find(
              (s) => String(s?.id) === String(serviceId),
            );
          }),
        );

        return foundStoreItem?.[0]?.services?.filter((s) => {
          return String(s?.id) !== String(serviceId);
        });
      };
    },
  },

  actions: {
    async fetchdataService(apiBaseUrl) {
      // const res = await axios.get(`${apiBaseUrl}services?populate=deep`);
      const baseDataStore = useBaseDataStore();

      const { data } = await useFetch(`${apiBaseUrl}services`, {
        query: {
          populate: "category.uslugas.*,category.napravleniya_uslug_1_col.*",
          sort: "order:asc",
          "pagination[pageSize]": 300,
        },
      });

      baseDataStore.allServices = data.value;

      const navigationServices = useReducedServices(data?.value?.data);

      this.dataService = navigationServices;
    },
  },
});
>>>>>>> a32cc7504d371827e54429370578101f655096b2
