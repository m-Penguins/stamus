import PriceList from "@/components/dynamicBlock/PriceList.vue";
import SliderSpecialists from "@/components/dynamicBlock/SliderSpecialists.vue";

export default function (component) {
  switch (component) {
    case "blocks-story.uslugi":
      return PriceList;
    case "blocks-story.speczialisty":
      return SliderSpecialists;

    default:
      "";
  }
}
