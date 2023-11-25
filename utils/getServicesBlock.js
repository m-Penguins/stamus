import PriceList from "@/components/dynamicBlock/PriceList.vue";
import SliderSpecialists from "@/components/dynamicBlock/SliderSpecialists.vue";
import Reviews from "@/components/dynamicBlock/Reviews.vue";

export default function (component) {
  switch (component) {
    case "blocks-story.uslugi":
      return PriceList;
    case "blocks-story.speczialisty":
      return SliderSpecialists;
    case "blocks-story.otzyvy":
      return Reviews;

    default:
      "";
  }
}
