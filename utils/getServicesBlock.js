import PriceList from "@/components/dynamicBlock/PriceList.vue";
import SliderSpecialists from "@/components/dynamicBlock/SliderSpecialists.vue";
import Reviews from "@/components/dynamicBlock/Reviews.vue";
import Opisanie from "@/components/dynamicBlock/Opisanie.vue";
import SliderVideo from "@/components/dynamicBlock/SliderVideo.vue";
import Banner from "@/components/dynamicBlock/Banner.vue";

export default function (component) {
  switch (component) {
    case "blocks-story.uslugi":
      return PriceList;
    case "blocks-story.speczialisty":
      return SliderSpecialists;
    case "blocks-story.otzyvy":
      return Reviews;
    case "blocks-story.opisanie-uslugi":
      return Opisanie;
    case "blocks-story.video":
      return SliderVideo;
    case "blocks-story.banner":
      return Banner;

    default:
      "";
  }
}
