import axios from "axios";
import { TravelData, User, currentUser } from "@/app/Interfaces/uiRelatedTypes";
import { MainContext, UserSearchQuery } from "@/app/Context/mainProvider";
import { useContext } from "react";

export function getTravelData(): Promise<TravelData[]> {
  return axios
    .get("/api/travelData/")
    .then((response) => {
      if (response.status === 200) {
        return response.data as TravelData[];
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error("Veri alımı hatası:", error);
      return [];
    });
}

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
