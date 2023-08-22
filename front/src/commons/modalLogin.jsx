import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import { setUser } from "../redux/user.slice";
import { setTheme } from "../redux/theme.slice";

import {
  Box,
  Stack,
  FormControl,
  Input,
  FormHelperText,
  Button,
  Modal,
  Alert
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";

function ModalLogin({ handleModal, openModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
 

  useEffect(() => {
    if (openModal) {
      singUpForm.resetForm();
    }
    setErrorMessage("")

  }, [openModal]);

 

  const singUpForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("invalid email").required("email is required"),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
    }),

    onSubmit: (values) => {
      axios
        .post(
          "http://localhost:3000/api/user/login",
          { email:values.email, password:values.password },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("payload",res.data)
          dispatch(setUser(res.data.payload));

          return res.data.payload.username;
        })
        .then((username) => {
          navigate(`/user/${username}`);
          toast.success("Login successful");
        })
        .then(()=>{
          if(!window.localStorage.theme){

            const objetoJSON = JSON.stringify({
              bgColor: "white",
              textColor: "gray",
            });
            window.localStorage.setItem("theme",objetoJSON)
            
            dispatch(
              setTheme(JSON.parse(localStorage.getItem("theme")))
            );
            
          }
          else{
            dispatch(
              setTheme(JSON.parse(localStorage.getItem("theme")))
            );

          }
        })
        .catch((error) => {

          const capturedErrors=error.response.data.errors


          setErrorMessage(capturedErrors)
          toast.error(capturedErrors)
          console.log(error);
        });
    },
  });



  console.log("email", email);
  console.log("password", password);

  return (
    <>
      <Modal
        open={openModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          component="form"
          onSubmit={singUpForm.handleSubmit}
          sx={{
            width: {xs:"80%",md:"30%"},
            height: "45%",
            backgroundColor: "white",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
            {" "}
            <CloseIcon sx={{ marginRight: "3%" }} onClick={handleModal} />
          </Box>

          <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
            <FormControl sx={{ width: "80%" }}>
              <Input
                id="email"
                type="email"
                aria-describedby="email-helper"
                value={singUpForm.values.email}
                onChange={singUpForm.handleChange}
                onBlur={singUpForm.handleBlur}
              />
              <FormHelperText id="email-helper" sx={{ textAlign: "center" }}>
                {singUpForm.touched.email && singUpForm.errors.email ? (
                  <p style={{ color: "red" }}>{singUpForm.errors.email}</p>
                ) : (
                  "Email"
                )}
              </FormHelperText>
            </FormControl>
            <FormControl sx={{ width: "80%" }}>
              <Input
                id="password"
                type="password"
                aria-describedby="password-helper"
                value={singUpForm.values.password}
                onChange={singUpForm.handleChange}
                onBlur={singUpForm.handleBlur}
              />
              <FormHelperText id="password-helper" sx={{ textAlign: "center" }}>
                {singUpForm.touched.password && singUpForm.errors.password ? (
                  <p style={{ color: "red" }}>{singUpForm.errors.password}</p>
                ) : (
                  "Password"
                )}
              </FormHelperText>
            </FormControl>
          </Stack>
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
              marginTop: 3,
              paddingInline: 4,
              fontSize: "1.1rem",
              backgroundColor: "#5893d4",
              marginBottom: "5%",
            }}
          >
            Login
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default ModalLogin;
