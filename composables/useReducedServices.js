export default function (data) {
  const navigationServices = data.reduce((result, item) => {
    const { category, heading } = item?.attributes;

    const directionInner = category?.data?.attributes;
    const categoryInner =
      category?.data?.attributes?.napravleniya_uslug_1_col?.data?.attributes;

    let categoryIndex = result?.findIndex(
      (cat) => cat?.title === categoryInner?.heading,
    );
    if (categoryIndex === -1 && categoryInner?.heading) {
      categoryIndex = result?.length;
      result.push({
        id: categoryIndex + 1,
        title: categoryInner?.heading,
        path: `/${categoryInner?.slug}`,
        directions: [],
        order: categoryInner?.order,
      });
    }

    let directionIndex = result?.[categoryIndex]?.directions?.findIndex(
      (dir) => dir?.title === directionInner?.name,
    );

    if (directionIndex === -1) {
      directionIndex = result?.[categoryIndex]?.directions?.length;
      result?.[categoryIndex]?.directions?.push({
        id: directionIndex + 1,
        title: directionInner?.name,
        path: `/${linkTransform(directionInner?.name)}`,
        services: [],
      });
    }

    result?.[categoryIndex]?.directions?.[directionIndex]?.services?.push({
      ...item,
      id: item?.id,
      title: heading,
      path: `/${item?.attributes?.slug}`,
    });

    return result?.sort((a, b) => a?.order - b?.order);
  }, []);

  return navigationServices;
}
