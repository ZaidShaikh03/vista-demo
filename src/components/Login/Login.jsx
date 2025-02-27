import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  InputLabel,
  Input,
  Paper,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import user from "../../assets/Sattvalumina/Loginimg/user.png";
import mail from "../../assets/Sattvalumina/Loginimg/sms.png";
import phone from "../../assets/Sattvalumina/Loginimg/phone.png";
import eye from "../../assets/Sattvalumina/Loginimg/eye-slash.png";
import lock from "../../assets/Sattvalumina/Loginimg/lock.png";
import OtpInput from "react-otp-input";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
// import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  useForgotPasswordMutation,
  useLoginMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useSignUpMutationOne,
  useVerifyOtpMutation,
  useValidateOtpMutation,
  useAddCustomerMutation,
} from "../../hooks/auth.js";
import Cookies from "js-cookie";

const Login = ({
  loginmodal,
  setloginmodal,
  otpmodal,
  setotpmodal,
  setIsLogin,
  isLogin,
  forgototpmodal,
  setforgototpmodal,
  settext,
  setSellerLoginModel,
  sellerLoginModel,
}) => {
  // const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [emailstore, setEmailStore] = useState("");
  const [forgotemailstore, setForgotEmailStore] = useState("");

  const navigate = useNavigate();

  // useEffect(() => {
  //   setloginmodal(true);
  // }, []);

  const loginmodalClose = () => {
    setloginmodal(false);
  };

  const otpmodalClose = () => {
    setotpmodal(false);
    setforgototpmodal(false);
  };

  // const handleSignup = () => {
  //   // setIsOtpModal(true); // Open OTP modal
  //   // setIsLogin(false); // Close login modal
  //   setotpmodal(true);
  //   setloginmodal(false);
  // };

  const modalClose = () => {
    setotpmodal(false); // Close OTP modal
    setIsLogin(false); // Close login modal
  };

  const handleOtpVerification = () => {
    // Handle OTP verification logic
    setotpmodal(false);
    // navigate("/dashboard");
    modalClose();
  };

  // const handleclosemodal = () => {
  //   setIsOtpModal(false); // Close OTP modal
  //   setIsLogin(false); // Close login modal
  // };

  const handleChange = (enteredOtp) => {
    const combinedOtp = enteredOtp.split("").join("");
    setOtp(combinedOtp);
  };

  const phoneNumber = "+91902233445598"; // Example phone number
  // Function to format phone number
  const formatPhoneNumber = (number) => {
    const cleanedNumber = String(number).replace(/\D/g, "");

    // Ensure the cleaned number has enough digits (at least 10 digits for the number)
    if (cleanedNumber.length < 10) {
      return "Invalid phone number";
    }

    const countryCode = cleanedNumber.slice(0, 2); // Get country code (e.g., '91')
    const firstPart = cleanedNumber.slice(2, 4); // First 2 digits after country code
    const lastPart = cleanedNumber.slice(-2); // Last 2 digits

    // Construct formatted phone number
    return `+${countryCode} ${firstPart} *******${lastPart}`;
  };

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const {
    register: customerDataRegister,
    handleSubmit: customerDataHandleSubmit,
    reset: customerDataReset,
    setValue: customerDataSetValue,
    watch: customerDataWatch,
    setError: customerDataSetError,
    formState: { errors: customerDataErrors },
  } = useForm();
  console.log(errors, "errorszzz here", customerDataErrors);
  const onSubmit = async (data) => {
    if (isLogin) {
      await handleLogin(data);
    } else {
      await handleSignup(data);
    }
  };
  const customerDataAdd = async (data) => {
    addCustomer(data, {
      onSuccess: (res) => {
        console.log(res, "res");
        toast.success(res.message ?? "", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSellerLoginModel(false);
      },
      onError: (error) => {
        console.error("data add Error:", error.message);
        toast.error(
          error.message ?? "Something went wrong please try again later.",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      },
    });
  };
  const { mutate: signUp, isPending: signUpLoading } = useSignUpMutationOne();
  const { mutate: login, isLoading: loginLoading } = useLoginMutation();
  const { mutate: resendotp, isPending: resendOtpLoading } =
    useResendOtpMutation();
  const { mutate: varifyotp, isPending: verifyLoading } =
    useVerifyOtpMutation();
  const { mutate: forgotpassword, isLoading: forgotPasswordLoading } =
    useForgotPasswordMutation();
  const { mutate: resetpasswordmutate, isLoading: resetPasswordLoading } =
    useResetPasswordMutation();
  const { mutate: validateotpmutate, isLoading: validateOtpLoading } =
    useValidateOtpMutation();
  const { mutate: addCustomer, isPending: addCustomerLoading } =
    useAddCustomerMutation();
  const handleSignup = async (data) => {
    try {
      // Structure the data for signup
      const signupData = {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      };

      await signUp(signupData, {
        onSuccess: (res) => {
          console.log(res, "res");
          toast.success(res.message ?? "Unknown error", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setEmailStore(data?.email);
          setotpmodal(true); // Open OTP modal
          setloginmodal(false); // Close signup modal
        },
        onError: (error) => {
          toast.error(error.message ?? "Unknown error", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
      });
    } catch (error) {
      toast.error("Error during registration: " ?? error.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleLogin = async (data) => {
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };
      await login(loginData, {
        onSuccess: (res) => {
          Cookies.set("jwt", res.data.token);
          settext("Logout");
          toast.success(res.message ?? "Unknown error", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setloginmodal(false);
        },
        onError: (error) => {
          toast.error(error.message ?? "Unknown error", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
      });
    } catch (error) {
      toast.error("Error during login" ?? error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleResendOtp = async (data) => {
    try {
      const handleResendOtpdata = {
        email: emailstore,
      };
      await resendotp(handleResendOtpdata, {
        onSuccess: (res) => {
          // console.log("OTP Resent Successfully:", res);
          toast.success(res.message ?? "Unknown error", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setOtpError("");
        },
        onError: (error) => {
          console.error("Registration Error:", error.message);
          toast.error(error.message ?? "Failed to Resend OTP:", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
      });
    } catch (error) {
      console.error("Error during OTP resend:", error);

      toast.error(error.message ?? "Unknown error", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setOtpError("An error occurred while resending OTP.");
    }
  };

  const handleVerifyOtp = async (data) => {
    try {
      const handleVerifyOtpdata = {
        email: emailstore,
        otp: parseInt(otp),
      };

      await varifyotp(handleVerifyOtpdata, {
        onSuccess: (res) => {
          Cookies.set("jwt", res.data.token);
          toast.success(res.message ?? "Unknown error", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setotpmodal(false);
          loginmodalClose();
          // navigate("/floorplan");
        },

        onError: (error) => {
          toast.erorr(error.message ?? "Unknown error", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setOtpError(error.message || "Invalid OTP.");
        },
      });
    } catch (error) {
      toast.error(error.message ?? "Unknown error", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setOtpError("An error occurred during OTP verification.");
    }
  };

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    if (data) {
      setIsEmailSubmitted(true);
    }
  }, [isEmailSubmitted]);

  const handleforgotpassword = async (data) => {
    try {
      const forgotdata = {
        email: data.email,
      };
      await forgotpassword(forgotdata, {
        onSuccess: (res) => {
          toast.success(res.message ?? "Unknown error", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setForgotEmailStore(data.email);
          setloginmodal(true);
          setforgototpmodal(true);
          setIsEmailSubmitted(true);
        },
        onError: (error) => {
          toast.error(error.message ?? "Unknown error", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
      });
    } catch (error) {
      toast.error("Error during login" ?? error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handlevalidateotp = async (data) => {
    try {
      const handleVerifyOtpdata = {
        email: forgotemailstore,
        otp: parseInt(otp),
      };

      await validateotpmutate(handleVerifyOtpdata, {
        onSuccess: (res) => {
          setData(res?.data);
          toast.success(res.message ?? "Unknown error", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          // setIsEmailSubmitted(true);
          setforgototpmodal(false);
        },

        onError: (error) => {
          toast.erorr(error.message ?? "Unknown error", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setOtpError(error.message || "Invalid OTP.");
        },
      });
    } catch (error) {
      toast.error(error.message ?? "Unknown error", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setOtpError("An error occurred during OTP verification.");
    }
  };

  const handlePasswordSubmit = async (data) => {
    try {
      const resetpassword = {
        email: forgotemailstore,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      if (resetpassword.password !== resetpassword.confirmPassword) {
        toast.error("Passwords do not match", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }

      await resetpasswordmutate(resetpassword, {
        onSuccess: (res) => {
          toast.success(res.message ?? "Unknown error", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setloginmodal(false);
          setIsForgotPassword(false);
        },
        onError: (error) => {
          toast.error(error.message ?? "Unknown error", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
      });
    } catch (error) {
      toast.error("Error during login" ?? error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <Box>
      <Modal open={loginmodal} onClose={loginmodalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // bgcolor: "background.paper",
            bgcolor: "#121212",
            borderRadius: "8px",
            boxShadow: 24,
            outline: "none",
            p: 3,
            width: 400,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <CloseIcon
              onClick={() => {
                loginmodalClose();
              }}
              style={{
                width: "12%",
                color: "white",
                cursor: "pointer",
                PointerEvent: "all",
              }}
            />
          </Box>

          <Modal open={loginmodal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "#121212",
                borderRadius: "8px",
                outline: "none",
                boxShadow: 24,
                p: 3,
                width: 400,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <CloseIcon
                  onClick={() => loginmodalClose()}
                  style={{
                    width: "12%",
                    color: "white",
                    cursor: "pointer",
                    PointerEvent: "all",
                  }}
                />
              </Box>

              {/* Conditional Rendering for Forgot Password */}
              {isForgotPassword ? (
                <>
                  {!isEmailSubmitted ? (
                    <Box>
                      {/* Collect Email */}
                      <Typography
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: 25,
                          fontWeight: 600,
                          textAlign: "center",
                          color: "#E5E5E5",
                        }}
                      >
                        Forgot Password
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: 13.78,
                          fontWeight: 400,
                          textAlign: "center",
                          color: "#959595",
                          mb: 3,
                        }}
                      >
                        Enter your email and reset your password.
                      </Typography>
                      <form onSubmit={handleSubmit(handleforgotpassword)}>
                        <Box
                          sx={{ width: "100%", mx: "auto", maxWidth: "380px" }}
                        >
                          <InputLabel sx={InputLableText}>Email</InputLabel>
                          <Box sx={InputBox}>
                            <img
                              src={mail}
                              width={"15px"}
                              height={"15px"}
                              alt="mailicon"
                            />
                            <Input
                              disableUnderline
                              placeholder="Enter your email"
                              sx={PlaceHolderColor}
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value:
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                  message: "Enter a valid email address",
                                },
                              })}
                              name="email"
                            />
                          </Box>
                          {errors.email && (
                            <Typography
                              sx={{ color: "red", fontSize: "12px", mt: 1 }}
                            >
                              {errors.email.message}
                            </Typography>
                          )}
                        </Box>

                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          sx={{
                            mt: 2,
                            background: "#2D3794",
                            textTransform: "none",
                          }}
                          type="submit"
                          disabled={forgotpassword.isLoading}
                        >
                          {/*  "Forgot Password" */}
                          {forgotPasswordLoading ? (
                            <CircularProgress
                              size={24}
                              sx={{ color: "white", marginRight: 1 }}
                            />
                          ) : (
                            "Next"
                          )}
                        </Button>
                      </form>
                    </Box>
                  ) : (
                    <Box>
                      {/* Collect New Password */}
                      <Typography
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: 25,
                          fontWeight: 600,
                          textAlign: "center",
                          color: "#E5E5E5",
                        }}
                      >
                        Reset Password
                      </Typography>
                      <form onSubmit={handleSubmit(handlePasswordSubmit)}>
                        {/* Password Field */}
                        <Box
                          sx={{ width: "100%", mx: "auto", maxWidth: "380px" }}
                        >
                          <InputLabel sx={InputLableText}>Password</InputLabel>
                          <Box sx={InputBox}>
                            <img
                              src={lock}
                              width={"15px"}
                              height={"15px"}
                              alt="lockicon"
                            />
                            <Input
                              disableUnderline
                              placeholder="Enter password"
                              sx={PlaceHolderColor}
                              {...register("password", {
                                required: "Password is required",
                                minLength: {
                                  value: 6,
                                  message:
                                    "Password must be at least 6 characters",
                                },
                              })}
                              type={showPassword ? "text" : "password"}
                            />
                            {showPassword ? (
                              <img
                                onClick={handlePasswordVisibility}
                                src={eye}
                                width={"15px"}
                                height={"15px"}
                                alt="eyeicon"
                              />
                            ) : (
                              <VisibilityOffIcon
                                onClick={handlePasswordVisibility}
                                sx={{
                                  pointerEvents: "all",
                                  color: "gray",
                                  width: "15px",
                                  height: "15px",
                                }}
                              />
                            )}
                          </Box>
                          {errors.password && (
                            <Typography
                              sx={{ color: "red", fontSize: "12px", mt: 1 }}
                            >
                              {errors.password.message}
                            </Typography>
                          )}
                        </Box>

                        {/* Confirm Password Field */}
                        <Box
                          sx={{ width: "100%", mx: "auto", maxWidth: "380px" }}
                        >
                          <InputLabel sx={InputLableText}>
                            Confirm Password
                          </InputLabel>
                          <Box sx={InputBox}>
                            <img
                              src={lock}
                              width={"15px"}
                              height={"15px"}
                              alt="lockicon"
                            />
                            <Input
                              disableUnderline
                              placeholder="Confirm password"
                              sx={PlaceHolderColor}
                              {...register("confirmPassword", {
                                required: "Confirm Password is required",
                                validate: (value) =>
                                  value === watch("password") ||
                                  "Passwords do not match",
                              })}
                              type={showPassword ? "text" : "password"}
                            />
                            {showPassword ? (
                              <img
                                onClick={handlePasswordVisibility}
                                src={eye}
                                width={"15px"}
                                height={"15px"}
                                alt="eyeicon"
                              />
                            ) : (
                              <VisibilityOffIcon
                                onClick={handlePasswordVisibility}
                                sx={{
                                  pointerEvents: "all",
                                  color: "gray",
                                  width: "15px",
                                  height: "15px",
                                }}
                              />
                            )}
                          </Box>
                          {errors.confirmPassword && (
                            <Typography
                              sx={{ color: "red", fontSize: "12px", mt: 1 }}
                            >
                              {errors.confirmPassword.message}
                            </Typography>
                          )}
                        </Box>

                        {/* Submit Button */}
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          sx={{ mt: 2, background: "#2D3794" }}
                          type="submit"
                        >
                          {/* "Reset Password" */}
                          {resetPasswordLoading ? (
                            <CircularProgress
                              size={24}
                              sx={{ color: "white", marginRight: 1 }}
                            />
                          ) : (
                            "Submit"
                          )}
                        </Button>
                      </form>
                    </Box>
                  )}{" "}
                </>
              ) : (
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: 25,
                      fontWeight: 600,
                      textAlign: "center",
                      color: "#E5E5E5",
                    }}
                  >
                    {isLogin ? "Log In" : "Sign Up"}
                  </Typography>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Full Name Field */}
                    {!isLogin && (
                      <Box
                        sx={{ width: "100%", mx: "auto", maxWidth: "380px" }}
                      >
                        <InputLabel sx={InputLableText}>Full Name</InputLabel>
                        <Box sx={InputBox}>
                          <img
                            src={user}
                            width={"15px"}
                            height={"15px"}
                            alt="usericon"
                          />
                          <Input
                            disableUnderline
                            placeholder="Enter your name"
                            sx={PlaceHolderColor}
                            {...register("fullName", {
                              required: "Full Name is required",
                            })}
                            name="fullName"
                          />
                        </Box>
                        {errors.fullName && (
                          <Typography
                            sx={{ color: "red", fontSize: "12px", mt: 1 }}
                          >
                            {errors.fullName.message}
                          </Typography>
                        )}
                      </Box>
                    )}

                    {/* Email Field */}

                    <Box sx={{ width: "100%", mx: "auto", maxWidth: "380px" }}>
                      <InputLabel sx={InputLableText}>Email</InputLabel>
                      <Box sx={InputBox}>
                        <img
                          src={mail}
                          width={"15px"}
                          height={"15px"}
                          alt="mailicon"
                        />
                        <Input
                          disableUnderline
                          placeholder="Enter your email"
                          sx={PlaceHolderColor}
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                              message: "Enter a valid email address",
                            },
                          })}
                          name="email"
                        />
                      </Box>
                      {errors.email && (
                        <Typography
                          sx={{ color: "red", fontSize: "12px", mt: 1 }}
                        >
                          {errors.email.message}
                        </Typography>
                      )}
                    </Box>

                    {/* Phone Number Field */}
                    {!isLogin && (
                      <Box
                        sx={{ width: "100%", mx: "auto", maxWidth: "380px" }}
                      >
                        <InputLabel sx={InputLableText}>Phone no.</InputLabel>
                        <Box sx={InputBox}>
                          <img
                            src={phone}
                            width={"15px"}
                            height={"15px"}
                            alt="phoneicon"
                          />
                          <Input
                            disableUnderline
                            placeholder="+91"
                            sx={PlaceHolderColor}
                            {...register("phoneNumber", {
                              required: "Phone number is required",
                              pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Enter a valid phone number",
                              },
                            })}
                            name="phoneNumber"
                          />
                        </Box>

                        {errors.phoneNumber && (
                          <Typography
                            sx={{ color: "red", fontSize: "12px", mt: 1 }}
                          >
                            {errors.phoneNumber.message}
                          </Typography>
                        )}
                      </Box>
                    )}

                    {/* Password Field */}
                    <Box sx={{ width: "100%", mx: "auto", maxWidth: "380px" }}>
                      <InputLabel sx={InputLableText}>Password</InputLabel>
                      <Box sx={InputBox}>
                        <img
                          src={lock}
                          width={"15px"}
                          height={"15px"}
                          alt="lockicon"
                        />
                        <Input
                          disableUnderline
                          placeholder="Enter password"
                          sx={PlaceHolderColor}
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters",
                            },
                          })}
                          type={showPassword ? "text" : "password"}
                          name="password"
                        />
                        {showPassword ? (
                          <img
                            onClick={handlePasswordVisibility}
                            src={eye}
                            width={"15px"}
                            height={"15px"}
                            alt="eyeicon"
                          />
                        ) : (
                          <VisibilityOffIcon
                            onClick={handlePasswordVisibility}
                            sx={{
                              pointerEvents: "all",
                              color: "gray",
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        )}
                      </Box>
                      {errors.password && (
                        <Typography
                          sx={{ color: "red", fontSize: "12px", mt: 1 }}
                        >
                          {errors.password.message}
                        </Typography>
                      )}
                    </Box>

                    {isLogin && (
                      <Box
                        sx={{
                          width: "100%",
                        }}
                      >
                        <Typography
                          sx={{
                            textAlign: "end",
                            justifyContent: "flex-end",
                            fontFamily: "Roboto",
                            fontSize: "12px",
                            fontWeight: 400,
                            color: "rgba(225, 225, 225, 1)",
                            mt: 0.5,

                            cursor: "pointer",
                          }}
                          onClick={() => setIsForgotPassword(true)}
                        >
                          Frogot Password?
                        </Typography>
                      </Box>
                    )}

                    {/* Submit Button */}
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2, background: "#2D3794" }}
                      type="submit"
                    >
                      {signUpLoading ? (
                        <>
                          <CircularProgress
                            size={24}
                            sx={{ color: "white", marginRight: 1 }}
                          />
                        </>
                      ) : loginLoading ? (
                        <>
                          <CircularProgress
                            size={24}
                            sx={{ color: "white", marginRight: 1 }}
                          />
                        </>
                      ) : isLogin ? (
                        "Sign In"
                      ) : (
                        "Sign Up"
                      )}
                    </Button>
                  </form>
                  {isLogin ? (
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pt: 2,
                        PointerEvent: "auto",
                        margin: "0 auto",
                        color: "white",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      Don't have an account?&nbsp;
                      <span
                        onClick={() => setIsLogin(!isLogin)}
                        style={{
                          color: "#2D3794",
                          cursor: "pointer",
                        }}
                      >
                        Sign Up
                      </span>
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pt: 2,
                        margin: "0 auto",
                        color: "white",
                        PointerEvent: "auto",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      Already have an account&nbsp;
                      <span
                        onClick={() => setIsLogin(!isLogin)}
                        style={{
                          color: "#2D3794",
                          cursor: "pointer",
                        }}
                      >
                        Log In
                      </span>
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Modal>
        </Box>
      </Modal>

      <Modal open={otpmodal} onClose={otpmodalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // bgcolor: "background.paper",
            bgcolor: "#121212",
            outline: "none",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            width: 450,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <CloseIcon
              onClick={() => {
                otpmodalClose();
              }}
              style={{
                width: "12%",
                color: "white",
                cursor: "pointer",
                PointerEvent: "all",
              }}
            />
          </Box>

          <Typography
            sx={{
              color: "white",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            OTP Verification
          </Typography>

          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: 13.78,
              fontWeight: 400,
              textAlign: "center",
              color: "#959595",
            }}
          >
            Enter the verification code we just sent to your number{" "}
            {/* {formatPhoneNumber(phoneNumber)} */}
            {emailstore}
          </Typography>

          <Paper elevation={0} sx={otpContainer}>
            <OtpInput
              inputStyle={OtpBox}
              value={otp}
              onChange={handleChange}
              numInputs={6}
              isInputNum={true}
              shouldAutoFocus={true}
              skipDefaultStyles={true}
              containerStyle={{
                gap: "1rem",
              }}
              separateAfter={false}
              renderInput={(props) => (
                <input
                  {...props}
                  type="number" // Changed to 'tel' to show numeric keyboard on mobile
                  maxLength={1}
                  style={{
                    ...OtpBox,
                    // Add these styles to remove spinner for mobile browsers
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                  }}
                />
              )}
            />
          </Paper>

          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pt: 2,
              PointerEvent: "auto",
              margin: "0 auto",
              color: "white",
              fontFamily: "Roboto",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            Didn’t receive code?&nbsp;
            <span
              onClick={handleResendOtp}
              style={{
                color: "#2D3794",
                cursor: "pointer",
              }}
            >
              {resendOtpLoading ? (
                <CircularProgress
                  size={24}
                  sx={{ color: "white", marginRight: 1 }}
                />
              ) : (
                "Resend"
              )}
            </span>
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "10px",
              mt: 2,
            }}
          >
            <Button
              onClick={() => {
                setotpmodal(false);
                setloginmodal(false);
              }}
              variant="outlined"
              sx={{
                color: "white",
                border: "1px solid gray",
                width: "49%",
                fontFamily: "Roboto",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#2D3794",
                  border: "none",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleVerifyOtp}
              variant="outlined"
              sx={{
                color: "white",
                pointerEvents: "all",
                border: "1px solid gray",
                textTransform: "none",
                fontFamily: "Roboto",
                width: "49%",
                "&:hover": {
                  backgroundColor: "#2D3794",
                  border: "none",
                },
              }}
            >
              {verifyLoading ? (
                <CircularProgress
                  size={24}
                  sx={{ color: "white", marginRight: 1 }}
                />
              ) : (
                "Verify"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={forgototpmodal} onClose={otpmodalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            outline: "none",
            transform: "translate(-50%, -50%)",
            // bgcolor: "background.paper",
            bgcolor: "#121212",

            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            width: 450,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <CloseIcon
              onClick={otpmodalClose}
              style={{
                width: "12%",
                color: "white",
                cursor: "pointer",
                PointerEvent: "all",
              }}
            />
          </Box>

          <Typography
            sx={{
              color: "white",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            OTP Verification
          </Typography>

          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: 13.78,
              fontWeight: 400,
              textAlign: "center",
              color: "#959595",
            }}
          >
            Enter the verification code we just sent to your number{" "}
            {/* {formatPhoneNumber(phoneNumber)} */}
            {forgotemailstore}
          </Typography>

          <Paper elevation={0} sx={otpContainer}>
            <OtpInput
              inputStyle={OtpBox}
              value={otp}
              onChange={handleChange}
              numInputs={6}
              isInputNum={true}
              shouldAutoFocus={true}
              skipDefaultStyles={true}
              containerStyle={{
                gap: "1rem",
              }}
              separateAfter={false}
              renderInput={(props) => (
                <input
                  {...props}
                  type="number" // Changed to 'tel' to show numeric keyboard on mobile
                  maxLength={1}
                  style={{
                    ...OtpBox,
                    // Add these styles to remove spinner for mobile browsers
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                  }}
                />
              )}
            />
          </Paper>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "10px",
              mt: 2,
            }}
          >
            <Button
              onClick={() => {
                setotpmodal(false);
                setloginmodal(false);
                setforgototpmodal(false);
              }}
              variant="outlined"
              sx={{
                color: "white",
                border: "1px solid gray",
                width: "49%",
                fontFamily: "Roboto",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#2D3794",
                  border: "none",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handlevalidateotp}
              variant="outlined"
              sx={{
                color: "white",
                pointerEvents: "all",
                border: "1px solid gray",
                textTransform: "none",
                fontFamily: "Roboto",
                width: "49%",
                "&:hover": {
                  backgroundColor: "#2D3794",
                  border: "none",
                },
              }}
            >
              {/* "Validate OTP" */}
              {validateOtpLoading ? (
                <CircularProgress
                  size={24}
                  sx={{ color: "white", marginRight: 1 }}
                />
              ) : (
                "Verify"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={sellerLoginModel}
        onClose={() => {
          setSellerLoginModel(false);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // bgcolor: "background.paper",
            bgcolor: "#121212",
            outline: "none",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            width: 450,
          }}
        >
          <Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <CloseIcon
                onClick={() => {
                  setSellerLoginModel(false);
                }}
                style={{
                  width: "12%",
                  color: "white",
                  cursor: "pointer",
                  PointerEvent: "all",
                }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: 25,
                fontWeight: 600,
                textAlign: "center",
                color: "#E5E5E5",
              }}
            >
              Seller Login
            </Typography>

            <form onSubmit={customerDataHandleSubmit(customerDataAdd)}>
              {/* Full Name Field */}
              {/* {!isLogin && ( */}
              <Box sx={{ width: "100%", mx: "auto", maxWidth: "380px" }}>
                <InputLabel sx={InputLableText}>
                  Customer's Full Name
                </InputLabel>
                <Box sx={InputBox}>
                  <img
                    src={user}
                    width={"15px"}
                    height={"15px"}
                    alt="usericon"
                  />
                  <Input
                    disableUnderline
                    placeholder="Enter your name"
                    sx={PlaceHolderColor}
                    {...customerDataRegister("customerFullName", {
                      required: "Full Name is required",
                    })}
                    name="customerFullName"
                  />
                </Box>
                {customerDataErrors.customerFullName && (
                  <Typography sx={{ color: "red", fontSize: "12px", mt: 1 }}>
                    {customerDataErrors.customerFullName.message}
                  </Typography>
                )}
              </Box>
              {/* )} */}
              {/* Email Field */}
              <Box sx={{ width: "100%", mx: "auto", maxWidth: "380px" }}>
                <InputLabel sx={InputLableText}>Customer's Email</InputLabel>
                <Box sx={InputBox}>
                  <img
                    src={mail}
                    width={"15px"}
                    height={"15px"}
                    alt="mailicon"
                  />
                  <Input
                    disableUnderline
                    placeholder="Enter your email"
                    sx={PlaceHolderColor}
                    {...customerDataRegister("customerEmail", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    name="customerEmail"
                  />
                </Box>
                {customerDataErrors.customerEmail && (
                  <Typography sx={{ color: "red", fontSize: "12px", mt: 1 }}>
                    {customerDataErrors.customerEmail.message}
                  </Typography>
                )}
              </Box>
              {/* Phone Number Field */}
              {/* {!isLogin && ( */}
              <Box sx={{ width: "100%", mx: "auto", maxWidth: "380px" }}>
                <InputLabel sx={InputLableText}>
                  {" "}
                  Customer's Phone no.
                </InputLabel>
                <Box sx={InputBox}>
                  <img
                    src={phone}
                    width={"15px"}
                    height={"15px"}
                    alt="phoneicon"
                  />
                  <Input
                    disableUnderline
                    placeholder="+91"
                    sx={PlaceHolderColor}
                    {...customerDataRegister("customerPhoneNumber", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid phone number",
                      },
                    })}
                    name="customerPhoneNumber"
                  />
                </Box>

                {customerDataErrors.customerPhoneNumber && (
                  <Typography sx={{ color: "red", fontSize: "12px", mt: 1 }}>
                    {customerDataErrors.customerPhoneNumber.message}
                  </Typography>
                )}
              </Box>
              {/* )} */}
              {/* Password Field */}
              {/* <Box sx={{ width: "100%", mx: "auto", maxWidth: "380px" }}>
                <InputLabel sx={InputLableText}>Password</InputLabel>
                <Box sx={InputBox}>
                  <img
                    src={lock}
                    width={"15px"}
                    height={"15px"}
                    alt="lockicon"
                  />
                  <Input
                    disableUnderline
                    placeholder="Enter password"
                    sx={PlaceHolderColor}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    name="password"
                  />
                  {showPassword ? (
                    <img
                      onClick={handlePasswordVisibility}
                      src={eye}
                      width={"15px"}
                      height={"15px"}
                      alt="eyeicon"
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={handlePasswordVisibility}
                      sx={{
                        pointerEvents: "all",
                        color: "gray",
                        width: "15px",
                        height: "15px",
                      }}
                    />
                  )}
                </Box>
                {errors.password && (
                  <Typography sx={{ color: "red", fontSize: "12px", mt: 1 }}>
                    {errors.password.message}
                  </Typography>
                )}
              </Box> */}
              {/* {!isLogin && ( */}
              <Box sx={{ width: "100%", mx: "auto", maxWidth: "380px" }}>
                <InputLabel sx={InputLableText}>Salesman</InputLabel>
                {/* <Box sx={InputBox}> */}
                <Select
                  disableUnderline
                  {...customerDataRegister("leadBy", { required: true })}
                  value={customerDataWatch("leadBy")}
                  onChange={(e) =>
                    customerDataSetValue("leadBy", e.target.value)
                  }
                  displayEmpty
                  type="select"
                  placeholder="Please enter your subject"
                  sx={{
                    width: "100%",
                    height: "36px",
                    mt: "8px",
                    background: "#1E1E1E",
                    border: "1px solid #333333",
                    color: customerDataWatch("leadBy") ? "white" : "#888",
                  }}
                  name="leadBy"
                >
                  {/* <MenuItem value="" disabled>
                    Select Type
                  </MenuItem> */}
                  <MenuItem value="ramesh">Stefan</MenuItem>
                  <MenuItem value="Salesman">Damon</MenuItem>
                  <MenuItem value="Salesman">Klaus</MenuItem>
                </Select>
              </Box>

              {/* Submit Button */}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2, background: "#2D3794" }}
                type="submit"
              >
                {addCustomerLoading ? (
                  <>
                    <CircularProgress
                      size={24}
                      sx={{ color: "white", marginRight: 1 }}
                    />
                  </>
                ) : (
                  "Add Customer"
                )}
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Login;

const InputBox = {
  width: "auto",
  height: "40px",
  // background: "rgba(243, 246, 249, 0.5)",
  backgroundColor: "#1E1E1E",
  borderRadius: "3px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignContent: "center",
  pl: 1,
  pr: 1,
  mt: 0.5,
};

const PlaceHolderColor = {
  width: "100%",
  maxWidth: "380px",
  height: "100%",
  pl: 1,
  bgcolor: "transparent",
  color: "white",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontSize: "15px",
  fontWeight: 400,

  lineHeight: "21px",
  display: "flex",
  alignItems: "center",
  // color: " rgba(107, 122, 153, 0.2)",
  // color: "cadetblue"
};

const InputLableText = {
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontSize: "15px",
  fontWeight: 400,
  lineHeight: "21px",
  display: "flex",
  alignItems: "center",
  color: "white",
  mt: 1.5,
};

const CountryCode = {
  color: "white",
  fontSize: "15px",
  fontWeight: 400,
  pl: 1,
};

const OtpBox = {
  textAlign: "center",
  fontFamily: "Roboto",
  fontStyle: "normal",
  borderRadius: "16px", // Keep your rounded corners style
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  lineHeight: 19,
  background: "white", // Default background set to white
  color: "black",
  width: "50px",
  height: "49px",
  border: "2px solid #7676761A", // Default border color
  "& .MuiInputBase-input": {
    textAlign: "center",
  },
  "&:hover": {
    background: "white", // Ensures background stays white on hover
    color: "black", // Ensures text remains black
    border: "2px solid #ADADAD", // Optional: You can keep or change the border on hover
  },
  "&:focus": {
    outline: "none", // Remove any default focus outline
    border: "2px solid #ADADAD", // Optional: You can set a focus-specific border
  },
};

const otpContainer = {
  display: "flex",
  background: "transparent",
  justifyContent: "center",
  gap: "2rem",
  marginTop: "15px",
  "&:hover": {
    background: "transparent",
  },
};
