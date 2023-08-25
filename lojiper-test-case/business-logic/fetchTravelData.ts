import { TravelData } from "@/app/Interfaces/uiRelatedTypes";
import { UserSearchQuery } from "@/app/Context/mainProvider";
import { getTravelData } from "@/data-access/getTravel";

export function fetchTravelData(
  userSearchQuery: UserSearchQuery
): Promise<TravelData | null> {
  return getTravelData()
    .then((allTravelData) => {
      const matchingTravel = allTravelData.find((travel: TravelData) => {
        return (
          travel.departCity === userSearchQuery.departCity &&
          travel.arrivalCity === userSearchQuery.arrivalCity &&
          travel.date === userSearchQuery.inputDate
        );
      });

      if (matchingTravel) {
        console.log("Eşleşen sefer:", matchingTravel);
        return matchingTravel;
      } else {
        console.log("Eşleşen sefer bulunamadı");
        return null;
      }
    })
    .catch((error) => {
      console.error("Veri alımı hatası:", error);
      return null;
    });
}
