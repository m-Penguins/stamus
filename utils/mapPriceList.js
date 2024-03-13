export default function (priceList) {
  return (
    priceList?.map((el) => {
      const item = el?.attributes?.servicePrice?.map((single) => {
        return {
          id: single?.id,
          heading: single?.heading,
          price: single?.price,
          Sale_popular: single?.Sale_popular,
          tags: single?.tags,
          link: "/prices",
        };
      });
      return {
        title: el?.attributes?.Title,
        services: item,
      };
    }) ?? []
  );
}
