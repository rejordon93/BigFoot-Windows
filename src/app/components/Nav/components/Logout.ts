import axios from "axios";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.delete("/api/logout");

      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      router.push("/login");
    }
  };

  return { logout };
};
