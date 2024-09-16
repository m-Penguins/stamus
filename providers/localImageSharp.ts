import { joinURL } from "ufo";
import type { ProviderGetImage } from "@nuxt/image-edge";
import { createOperationsGenerator } from "#image";

export const getImage: ProviderGetImage = (
  src,
  { modifiers, baseURL = "https://stamus.ru/server/uploads" } = {},
) => {
  const operationsGenerator = createOperationsGenerator({
    keyMap: {
      width: "width",
      height: "height",
      resize: "resize",
      fit: "fit",
      position: "positon",
      trim: "trim",
      format: "format",
      quality: "quality",
      rotate: "rotate",
      enlarge: "enlarge",
      flip: "flip",
      flop: "flop",
      sharpen: "sharpen",
      median: "median",
      gamma: "gamma",
      negate: "negate",
      normalize: "normalize",
      threshold: "threshold",
      grayscale: "grayscale",
      animated: "animated",
    },
    joinWith: "&",
    formatter: (key: string, value: string) => `${key}=${value}`,
  });

  const operations = operationsGenerator(modifiers as any);

  return {
    url: joinURL(baseURL, `${src}?${operations}`),
  };
};
