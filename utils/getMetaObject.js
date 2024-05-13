<<<<<<< HEAD
import microTags from "@/utils/microTags.json";

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
        property: "og:url",
        content: "https://stamus.ru",
      },
      {
        property: "og:type",
        content: "website",
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
    script: [
      {
        type: "application/ld+json",
        children: microTags,
      },
    ],
  };
};
=======
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
>>>>>>> a32cc7504d371827e54429370578101f655096b2
