import { defineStore } from "pinia";
import axios from "axios";
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
      try {
        const res = await axios.get(`${apiBaseUrl}services?populate=deep`);
        const { data } = res;
        const navigationServices = useReducedServices(data.data);
        // console.log(navigationServices);

        this.dataService = navigationServices;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
