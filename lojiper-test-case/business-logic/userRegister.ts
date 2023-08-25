import axios from "axios";
import { User } from "./userValidation";

export const saveUser = async (user: User) => {
  try {
    const response = await axios.post("/api/", user);
    if (response.status === 201) {
      console.log("Kullanıcı başarıyla kaydedildi:", response.data);
    }
  } catch (error) {
    console.error("Kullanıcı kaydetme hatası:", error);
  }
};
