import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getToken } from "../utils/token";

export const useFetchProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await axios.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    },
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: "updateProfile",
    mutationFn: async (data) => {
      console.log("dsfasfasf", data);
      const response = await axios.put("/user/profile", data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });
};
