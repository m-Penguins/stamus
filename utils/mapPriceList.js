export default function (priceList) {
  return (
    priceList?.map((el) => {
      const item = el?.attributes?.servicePrice?.map((single) => {
        return {
          id: single?.id,
          heading: single?.heading,
          price: single?.price,
          isRecommended: single?.isRecommended,
          isPopular: single?.isPopular,
          isDemand: single?.isDemand,
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
