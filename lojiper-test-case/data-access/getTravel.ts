import axios from "axios";
import { TravelData } from "@/src/Interfaces/uiRelatedTypes";

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
    .catch(() => {
      return [];
    });
}
