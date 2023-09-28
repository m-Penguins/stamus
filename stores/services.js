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
  },
  actions: {
    async fetchdataService(apiBaseUrl) {
      try {
        const res = await axios.get(`${apiBaseUrl}services?populate=deep`);
        const { data } = res;
        const navigationServices = useReducedServices(data.data);

        this.dataService = navigationServices;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
