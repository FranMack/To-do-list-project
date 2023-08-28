import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Box,
  Grid,
  Avatar,
  Stack,
  FormControl,
  Input,
  FormHelperText,
  Button,
  Alert,
 
} from "@mui/material";

import NavbarRegister from "./NavbarRegister";
import { useFormik } from "formik";
import * as Yup from "yup";
import ModalLogin from "../commons/modalLogin";
import ModalImageTooLarge from "../commons/modalImageTooLarge";


function RegisterFormik() {
  const [url_img, setUrl_img] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
		setShowModal(false);
	};

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const maxSizeInBytes = 1024 * 60;

    if (file && file.size > maxSizeInBytes) {
			setShowModal(true);
			return;
		}
    const reader = new FileReader();
    reader.onload = () => {
      setUrl_img(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
    setEmail("");
    setPassword("");
  };



  const singUpForm = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      url_img: "",
      email: "",
      password: "",
      username: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "firstname minimum 1 character")
        .required("firstname is required"),
      lastname: Yup.string()
        .min(1, "lastname minimum 1 character")
        .required("lastname is required"),
      email: Yup.string().email("invalid email").required("email is required"),
      username: Yup.string()
        .min(4, "username minimum 4 characters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .matches(
          /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          "password must contain at least one special character"
        )
        .matches(/\d/, "password must contain at least one number")
        .matches(/[a-z]/, "password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "password must contain at least one capital letter")
        .required("password is required"),
    }),

    onSubmit: (values) => {
      axios
        .post(
          "http://localhost:3000/api/user/register",
          {
            name: values.name,
            lastname: values.lastname,
            username: values.username,
            email: values.email,
            password: values.password,
            url_img: url_img,
          },
          { withCredentials: true }
        )
        .then((res) => res.data)
        .then(() => {
          toast.success("User created");
          handleModal(true);
        })

        .catch((error) => {
          const captureError =
            error.response.data.errors[0].msg ||
            error.response.data.errors ||
            "An error occurred during registration";
          setErrorMessage(captureError);

          console.log(error);
        });
    },
  });

  return (
    <>
      <NavbarRegister />
      <ModalLogin openModal={openModal} handleModal={handleModal} />
      <ModalImageTooLarge handleCloseModal={handleCloseModal} showModal={showModal}/>
      <Box
        sx={{
          boxShadow: "5px 5px 5px 5px",
          width: { xs: "100vw", md: "30vw" },
          height: { md: "87vh" },
          margin: "0 auto",
          marginTop: { md: "1%" },
        }}
      >
        <Box
          component="form"
          onSubmit={singUpForm.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            width: "100%",
            fontSize: "1.5rem",
          }}
        >
          <h2 style={{ marginTop: "5%" }}>USER REGISTER</h2>
          <Grid
            container
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "start",
              marginTop: { xs: "5%", md: "1%" },
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                id="user_image"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />

              <label htmlFor="user_image">
                {url_img ? (
                  <Avatar
                    src={url_img}
                    sx={{
                      width: { xs: 100, md: 140 },
                      height: { xs: 100, md: 140 },
                    }}
                  ></Avatar>
                ) : singUpForm.values.name && singUpForm.values.lastname ? (
                  <Avatar
                    sx={{
                      width: { xs: 100, md: 140 },
                      height: { xs: 100, md: 140 },
                    }}
                  >{`${singUpForm.values.name[0].toUpperCase()}${singUpForm.values.lastname[0].toLocaleUpperCase()}`}</Avatar>
                ) : (
                  <Avatar
                    sx={{
                      width: { xs: 100, md: 140 },
                      height: { xs: 100, md: 140 },
                    }}
                  ></Avatar>
                )}
              </label>
            </Grid>

            <Stack
              spacing={1}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                marginTop: { xs: "5%", md: "3%" },
                fontSize:"2.5rem"
              }}
            >
              <FormControl sx={{ width: { xs: "50%", md: "50%" } }}>
                <Input
                  id="name"
                  type="text"
                  required
                  aria-describedby="name-helper"
                  value={singUpForm.values.name}
                  onChange={singUpForm.handleChange}
                  onBlur={singUpForm.handleBlur}
                  sx={{
                    textAlign: "center",
                    "& input": {
                      textAlign: "center",
                    },
                  }}
                />
                <FormHelperText id="name-helper" sx={{ textAlign: "center" }}>
                  {singUpForm.touched.name && singUpForm.errors.name ? (
                    <p style={{ color: "red" }}>
                      {singUpForm.errors.name}
                    </p>
                  ) : (
                    "Name"
                  )}
                </FormHelperText>
              </FormControl>

              <FormControl sx={{ width: { xs: "50%", md: "50%" } }}>
                <Input
                  id="lastname"
                  type="text"
                  required
                  aria-describedby="lastname-helper"
                  value={singUpForm.values.lastname}
                  onChange={singUpForm.handleChange}
                  onBlur={singUpForm.handleBlur}
                  sx={{
                    textAlign: "center",
                    "& input": {
                      textAlign: "center",
                    },
                  }}
                />
                <FormHelperText
                  id="lastname-helper"
                  sx={{ textAlign: "center" }}
                >
                  {singUpForm.touched.lastname && singUpForm.errors.lastname ? (
                    <p style={{ color: "red" }}>
                      {singUpForm.errors.lastname }
                    </p>
                  ) : (
                    "Lasname"
                  )}
                </FormHelperText>
              </FormControl>

              <FormControl sx={{ width: { xs: "50%", md: "50%" } }}>
                <Input
                  id="username"
                  type="text"
                  aria-describedby="username-helper"
                  required
                  value={singUpForm.values.username}
                  onChange={singUpForm.handleChange}
                  onBlur={singUpForm.handleBlur}
                  sx={{
                    textAlign: "center",
                    "& input": {
                      textAlign: "center",
                    },
                  }}
                />
                <FormHelperText id="email-helper" sx={{ textAlign: "center" }}>
                  {singUpForm.touched.username && singUpForm.errors.username ? (
                    <p style={{ color: "red" }}>
                      {singUpForm.errors.username}
                    </p>
                  ) : (
                    "Username"
                  )}
                </FormHelperText>
              </FormControl>
              <FormControl></FormControl>

              <FormControl sx={{ width: { xs: "50%", md: "50%" } }}>
                <Input
                  id="email"
                  type="email"
                  required
                  aria-describedby="email-helper"
                  value={singUpForm.values.email}
                  onChange={singUpForm.handleChange}
                  onBlur={singUpForm.handleBlur}
                  sx={{
                    textAlign: "center",
                    "& input": {
                      textAlign: "center",
                    },
                  }}
                />
                <FormHelperText id="email-helper" sx={{ textAlign: "center" }}>
                  {singUpForm.touched.email && singUpForm.errors.email ? (
                    <p style={{ color: "red" }}>{singUpForm.errors.email} </p>
                  ) : (
                    "Email"
                  )}
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ width: { xs: "50%", md: "50%" } }}>
                <Input
                  id="password"
                  type="password"
                  required
                  aria-describedby="password-helper"
                  value={singUpForm.values.password}
                  onChange={singUpForm.handleChange}
                  onBlur={singUpForm.handleBlur}
                  sx={{
                    textAlign: "center",
                    "& input": {
                      textAlign: "center",
                    },
                  }}
                />
                <FormHelperText
                  id="password-helper"
                  sx={{ textAlign: "center" }}
                >
                  {singUpForm.touched.password && singUpForm.errors.password ? (
                    <p style={{ color: "red" }}>{singUpForm.errors.password}
                    </p>
                  ) : (
                    "Password"
                  )}
                </FormHelperText>
              </FormControl>
            </Stack>
          </Grid>
          {errorMessage && (
            <Box sx={{ marginTop: 2 }}>
              <Alert severity="error" variant="outlined">
                {errorMessage}
              </Alert>
            </Box>
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#5893d4",
              paddingInline: 4,
              fontSize: "1.2rem",
              marginTop: { xs: "5%", md: "1%" },
              marginBottom: { xs: "5%", md: "5%" },
            }}
          >
            Sign in
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default RegisterFormik;
