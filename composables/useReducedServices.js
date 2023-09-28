export default function (data) {
  const navigationServices = data.reduce((result, item) => {
    const { category, direction, heading } = item.attributes;

    let categoryIndex = result.findIndex((cat) => cat.title === category);
    if (categoryIndex === -1) {
      categoryIndex = result.length;
      result.push({
        id: categoryIndex + 1,
        title: category,
        path: `/${linkTransform(category)}`,
        directions: [],
      });
    }

    let directionIndex = result[categoryIndex].directions.findIndex(
      (dir) => dir.title === direction,
    );

    if (directionIndex === -1) {
      directionIndex = result[categoryIndex].directions.length;
      result[categoryIndex].directions.push({
        id: directionIndex + 1,
        title: direction,
        path: `/${linkTransform(direction)}`,
        services: [],
      });
    }

    result[categoryIndex].directions[directionIndex].services.push({
      id: item.id,
      title: heading,
      path: `/${linkTransform(heading)}`,
    });

    return result;
  }, []);

  return navigationServices;
}
