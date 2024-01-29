export default function (reviews) {
  return (
    reviews?.map((el) => ({
      name: el?.attributes?.name,
      grade: el?.attributes?.review,
      date: el?.attributes?.date,
      text: el?.attributes?.text,
      publishedAt: el?.attributes?.publishedAt,
    })) ?? []
  );
}
