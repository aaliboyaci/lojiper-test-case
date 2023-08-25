// userValidation.ts (istemci tarafı)
import axios from "axios"; // İstekleri göndermek için axios veya fetch gibi bir kütüphane kullanabilirsiniz.

export interface currentUser {
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  email: string;
  firstName: string;
  gender: string;
  lastName: string;
  password: string;
  username: string;
}
export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  username: string;
}
const fetchUsers = async () => {
  const response = await axios.get("/api/");
  if (response.status === 200) {
    return response.data;
  }
};

export async function validateUserLogin(
  username: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>,
  setUserName: React.Dispatch<React.SetStateAction<string>>
): Promise<User | undefined> {
  try {
    setIsLoading(true);
    const allUserData = await fetchUsers();
    console.log(allUserData);
    const user: User | undefined = allUserData?.find(
      (user: currentUser) => user.username === username
    );

    if (user && user.password === password) {
      console.log("doğrulama başarılı");
      setIsLoading(false);
      setError("");
      setIsLogin(true);
      setUserName(user.firstName);
      return user;
    } else {
      setIsLoading(false);
      setError("Kullanıcı adı veya parola hatalı");
    }
  } catch (error) {
    setIsLoading(false);
    setError("Kullanıcı adı veya parola hatalı");
  }
}
