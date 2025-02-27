import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Signup Mutation
export const useSignUpMutationOne = () => {
  return useMutation({
    mutationKey: "signup",
    mutationFn: async (data) => {
      const response = await axios.post("/user/register", data);
      return response.data;
    },
  });
};
// Login Mutation
export const useLoginMutation = () => {
  return useMutation({
    mutationKey: "login",
    mutationFn: async (data) => {
      const response = await axios.post("/user/login", data);
      return response.data;
    },
  });
};

// Resend OTP Mutation

export const useResendOtpMutation = () => {
  return useMutation({
    mutationKey: "resendotp",
    mutationFn: async (data) => {
      const response = await axios.post("/user/resend-otp", data);
      return response.data;
    },
  });
};
// Verify OTP Mutation
export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationKey: "verifyotp",
    mutationFn: async (data) => {
      const response = await axios.post("/user/verify-otp", data);
      return response.data;
    },
  });
};

//forgot password
export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationKey: "forgotpassword",
    mutationFn: async (data) => {
      const response = await axios.post("user/forget-password", data);
      return response.data;
    },
  });
};

//reset password
export const useResetPasswordMutation = () => {
  return useMutation({
    mutationKey: "resetpassword",
    mutationFn: async (data) => {
      const response = await axios.post("user/reset-password", data);
      return response.data;
    },
  });
};

// ValidateOtp
export const useValidateOtpMutation = () => {
  return useMutation({
    mutationKey: "validateOtp",
    mutationFn: async (data) => {
      const response = await axios.post("user/validate-forget-otp", data);
      return response.data;
    },
  });
};

export const useAddCustomerMutation = () => {
  return useMutation({
    mutationKey: "addCustomer",
    mutationFn: async (data) => {
      const response = await axios.post("customer/data", data);
      return response.data;
    },
  });
};
