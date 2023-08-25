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
