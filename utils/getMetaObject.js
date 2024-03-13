export default (metaData, baseUrl) => {
  return {
    title: metaData?.metaTitle ?? "stamus.ru",
    meta: [
      { name: "description", content: metaData?.metaDescription },
      { name: "keywords", content: metaData?.metaTags },
      {
        name: "twitter:title",
        content: metaData?.metaTitle,
      },
      {
        name: "twitter:description",
        content: metaData?.metaDescription,
      },

      {
        name: "twitter:image",
        content: metaData?.metaImage?.data?.attributes?.url
          ? baseUrl + metaData?.metaImage?.data?.attributes?.url
          : "",
      },
      {
        property: "og:title",
        content: metaData?.metaTitle,
      },
      {
        property: "og:description",
        content: metaData?.metaDescription,
      },
      {
        property: "og:image",
        content: metaData?.metaImage?.data?.attributes?.url
          ? baseUrl + metaData?.metaImage?.data?.attributes?.url
          : "",
      },
    ],
  };
};
