import { defineStore } from 'pinia'
import axios from 'axios'
import { linkTransforms } from './linkTransform'

export const useService = defineStore('useServices', {
    state: () => ({
        dataService: []
    }),
    getters: {
        getStateService: (state) => state.dataService
    },
    actions: {
        async fetchdataService() {
            try {
                const res = await axios(`http://176.99.11.245:7777/api/services?populate=deep`)
                const data = await res.data;
                const navigationServices = data.data.reduce((result, item) => {
                    const { category, direction, heading } = item.attributes;
                  
                    let categoryIndex = result.findIndex((cat) => cat.title === category);
                    const assetsStorelinkTransform = linkTransforms();
                    if (categoryIndex === -1) {
                      categoryIndex = result.length;
                      result.push({
                        id: categoryIndex + 1,
                        title: category,
                        path: `/${assetsStorelinkTransform.linkTransform(category)}`,
                        directions: [],
                      });
                    }
                  
                    let directionIndex = result[categoryIndex].directions.findIndex(
                      (dir) => dir.title === direction
                    );
                  
                    if (directionIndex === -1) {
                      directionIndex = result[categoryIndex].directions.length;
                      result[categoryIndex].directions.push({
                        id: directionIndex + 1,
                        title: direction,
                        services: [],
                      });
                    }
                  
                    result[categoryIndex].directions[directionIndex].services.push({
                      id: item.id,
                      title: heading,
                    });
                  
                    return result;
                  }, []);
                  
                  console.log(navigationServices);
                this.dataService = navigationServices
                
            } catch (error) {
                console.log(error);
            }
            }
        },
  })