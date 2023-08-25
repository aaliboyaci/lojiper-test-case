import axios from "axios";
import { fetchUsers } from "./userValidation";
import { User, currentUser } from "@/app/Interfaces/uiRelatedTypes";

export const saveUser = async (user: User) => {
  try {
    const allUserData = await fetchUsers();
    const userWithSameUsername = allUserData?.find(
      (userTest: currentUser) => user.username === userTest.username
    );

    if (userWithSameUsername) {
      console.error("Bu kullanıcı adı zaten mevcut.");
      return false;
    } else {
      const response = await axios.post("/api/", user);
      if (response.status === 201) {
        console.log("Kullanıcı başarıyla kaydedildi:", response.data);
      }
      return true;
    }
  } catch (error) {
    console.error("Kullanıcı kaydetme hatası:", error);
  }
};
