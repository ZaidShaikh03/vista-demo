import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { useFetchProfile, useUpdateProfile } from "../../hooks/profile";
import { toast } from "react-toastify";

export default function DynamicModal({ profilemodal, setProfilemodal }) {
  const handleCloseprofilemodal = () => setProfilemodal(false);

  const {
    data: fetchedProfile,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useFetchProfile();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      residency: "",
      city: "",
    },
    fetchedProfile,
    mode: "onBlur",
  });

  const { mutate: updateProfile } = useUpdateProfile();

  // Populate form with fetched profile data
  useEffect(() => {
    if (fetchedProfile) {
      setValue("fullName", fetchedProfile.fullName);
      setValue("phoneNumber", fetchedProfile.phoneNumber || "");
      setValue("residency", fetchedProfile.residency || "");
      setValue("city", fetchedProfile.city || "");
    }
  }, [fetchedProfile]);

  useEffect(() => {
    if (profilemodal) {
      refetchProfile();
    }
  }, [profilemodal, refetchProfile]);

  const [loadingState, setLoadingState] = useState({
    updateProfile: false,
  });

  // Submit handler
  console.log("errors", errors);
  const onSubmit = (data) => {
    // const fullName = `${data.firstName} ${data.lastName}`.trim();
    // const payload = { ...data, fullName };
    console.log("data here", data);
    setLoadingState((prev) => ({ ...prev, updateProfile: true }));
    const payload = {
      fullName: data.fullName || "",
      phoneNumber: data.phoneNumber,
      email: data.email,
      residency: data.residency,
      city: data.city,
    };

    updateProfile(payload, {
      onSuccess: () => {
        setLoadingState((prev) => ({ ...prev, updateProfile: false }));
        toast.success("Profile updated successfully!");
        setProfilemodal(false);
        refetchProfile();
      },

      onError: (error) => {
        setLoadingState((prev) => ({ ...prev, updateProfile: false }));
        toast.error(`Error updating profile: ${error.message}`);
      },
    });
  };

  // if (isProfileLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Modal
        open={profilemodal}
        onClose={handleCloseprofilemodal}
        aria-labelledby="profile-update"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            minWidth: {
              xl: 650,
              lg: 650,
              md: 450,
              sm: 400,
              xs: 310,
            },
            bgcolor: "#121212",
            color: "white",
            border: "1px solid #121212",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                width: "95%",
                height: "100%",
                textAlign: "center",
              }}
            >
              PROFILE UPDATE
            </Typography>
            <CloseIcon
              onClick={handleCloseprofilemodal}
              style={{
                width: "5%",
                cursor: "pointer",
                PointerEvent: "all",
              }}
            />
          </Box>

          <Box
            component="form"
            display="grid"
            gap={2}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box
              sx={{
                ...formtextfeildmainbox,
                mt: 3,
              }}
            >
              <Box sx={{ width: "100%", mx: "auto", maxWidth: "630px" }}>
                <InputLabel sx={InputLableText}>Full Name</InputLabel>
                <Box sx={InputBox}>
                  <Input
                    {...register("fullName", {
                      required: "Full Name is required",
                    })}
                    disableUnderline
                    placeholder="Please enter your name"
                    sx={PlaceHolderColor}
                    name="fullName"
                    required
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={formtextfeildmainbox}>
              <Box sx={{ width: "90%", mx: "auto", maxWidth: "380px" }}>
                <InputLabel sx={InputLableText}>Email</InputLabel>
                <Box sx={InputBox}>
                  <Input
                    // disabled
                    disableUnderline
                    // placeholder="Please enter your name"
                    sx={PlaceHolderColor}
                    value={fetchedProfile?.email}
                    name="name"
                    required
                  />
                </Box>
              </Box>
              <Box sx={{ width: "90%", mx: "auto", maxWidth: "380px" }}>
                <InputLabel sx={InputLableText}>Phone Number</InputLabel>
                <Box sx={InputBox}>
                  <span style={CountryCode}>+91</span>
                  <Input
                    {...register("phoneNumber", {
                      required: "Phone Number is required",
                    })}
                    disableUnderline
                    // placeholder="Please enter your name"
                    sx={PlaceHolderColor}
                    name="phoneNumber"
                    required
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={formtextfeildmainbox}>
              <Box sx={{ width: "90%", mx: "auto", maxWidth: "380px" }}>
                <InputLabel sx={InputLableText}>Residency</InputLabel>
                {/* <Box sx={InputBox}> */}
                <Select
                  disableUnderline
                  {...register("residency", { required: true })}
                  value={watch("residency")}
                  onChange={(e) => setValue("residency", e.target.value)}
                  displayEmpty
                  type="select"
                  placeholder="Please enter your subject"
                  sx={{
                    width: "100%",
                    height: "36px",
                    mt: "8px",
                    background: "#1E1E1E",
                    border: "1px solid #333333",
                    color: watch("residency") ? "white" : "#888",
                  }}
                  name="category"
                >
                  <MenuItem value="" disabled>
                    Select Resident
                  </MenuItem>
                  <MenuItem value="Resident">Resident</MenuItem>
                  <MenuItem value="Non-Resident">Non-Resident</MenuItem>
                </Select>
              </Box>{" "}
              <Box sx={{ width: "90%", mx: "auto", maxWidth: "380px" }}>
                <InputLabel sx={InputLableText}>City</InputLabel>
                {/* <Box sx={InputBox}> */}
                <Select
                  disableUnderline
                  {...register("city", { required: true })}
                  value={watch("city")}
                  onChange={(e) => setValue("city", e.target.value)}
                  displayEmpty
                  type="select"
                  placeholder="Please enter your subject"
                  sx={{
                    width: "100%",
                    height: "36px",
                    mt: "8px",
                    background: "#1E1E1E",
                    border: "1px solid #333333",
                    color: watch("city") ? "white" : "#888",
                  }}
                  name="category"
                >
                  <MenuItem value="" disabled>
                    Select City
                  </MenuItem>
                  <MenuItem value="Surat">Surat</MenuItem>
                  <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
                </Select>
              </Box>
            </Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              sx={{
                width: "30%",
                height: "45px",
                mt: 2,
                textTransform: "none",
                margin: "0 auto",
                backgroundColor: "#444",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              {loadingState.updateProfile ? (
                <>
                  <CircularProgress
                    size={24}
                    sx={{ color: "white", marginRight: 1 }}
                  />
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

const InputBox = {
  width: "auto",
  height: "40px",
  background: "#1E1E1E",
  border: "1px solid #333333",
  borderRadius: "3px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignContent: "center",
  pl: 3,
  pr: 1,
  mt: 1,
};

const PlaceHolderColor = {
  width: "100%",
  maxWidth: "380px",
  height: "100%",
  bgcolor: "transparent",
  color: "white",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "15px",
  lineHeight: "21px",
  display: "flex",
  alignItems: "center",
  // color: " rgba(107, 122, 153, 0.2)",
  // color: "cadetblue",
};

const InputLableText = {
  fontStyle: "normal",
  lineHeight: "21px",
  display: "flex",
  alignItems: "center",
  fontFamily: "Roboto",
  fontSize: 13,
  fontWeight: 400,
  color: "#BDBDBD",
  textAlign: "left",
};

const CountryCode = {
  color: "white",
  fontSize: "15px",
  fontWeight: 400,
  marginRight: "10px", // Space between country code and input field
};

const formtextfeildmainbox = {
  display: "flex",
  flexDirection: "row",
  gap: "30px",
};
