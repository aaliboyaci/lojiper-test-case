import { TravelData } from "@/app/Interfaces/uiRelatedTypes";
import { UserSearchQuery } from "@/app/Context/mainProvider";
import { getBusSeatData } from "@/data-access/getBusSeatData";
import {
  BusSeatData,
  Seat,
} from "@/app/api/travelData/busSeatData/busSeatData";

export function fetchBusSeatData(id: number): Promise<BusSeatData | null> {
  return getBusSeatData()
    .then((busSeatData) => {
      const matchingTravel = busSeatData[id];

      if (matchingTravel) {
        return matchingTravel;
      } else {
        console.warn("Eşleşen otobüs verisi bulunamadı.");
        return null;
      }
    })
    .catch((error) => {
      console.error("Veri alımı hatası:", error);
      return null;
    });
}
