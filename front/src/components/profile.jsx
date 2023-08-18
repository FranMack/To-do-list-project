import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  Box,
  Grid,
  Avatar,
  Stack,
  FormControl,
  Input,
  FormHelperText,
  Button,
  Alert
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/user.slice";
import Navbar from "./navbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ModalImageTooLarge from "../commons/modalImageTooLarge";

function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [url_img, setUrl_img] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edit, setEdit] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
		setShowModal(false);
	};
  
  const handleEdit = () => {
    setEdit(!edit);
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


  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/api/user/info/${user.email}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (user.name) {
            setUrl_img(res.data.url_img);
            setName(res.data.name);
            setLastname(res.data.lastname);
            setEmail(res.data.email);
            setPassword(res.data.password);
            setUsername(res.data.username);
          }
          singUpForm.setValues({
            name: res.data.name,
            lastname: res.data.lastname,
            username: res.data.username,
            email: res.data.email,
            password: res.data.password,
            url_img: res.data.url_img,
          });
        })
        .catch((error) => {
          console.log(err);
        });
    }
  }, [user]);

  const singUpForm = useFormik({
    initialValues: {
      name: name,
      lastname: lastname,
      username: username,
      email: email,
      password: password,
      url_img: url_img,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "firstname minimum 1 character")
        .matches(/^[A-Za-z\s]+$/,"firstname can only contain letters and spaces")
        .required("firstname is required"),
      lastname: Yup.string()
        .min(1, "lastname minimum 1 character")
        .matches(/^[A-Za-z\s]+$/,"firstname can only contain letters and spaces")
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
        .put("http://localhost:3000/api/user/info/edit", {
          name: values.name,
          lastname: values.lastname,
          username: values.username,
          url_img: url_img,
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          dispatch(setUser(res.data))
          toast.success("Changes saved successfully")
        })
        .then(() => {
          setEdit(true)
          
        })

        .catch((error) => {
          const captureError =
            error.response.data.errors[0].msg || error.response.data.errors || "An error occurred during registration";
          setErrorMessage(captureError);
          console.log(error)});
    },
  });



  console.log("url_img", url_img);
  console.log("lastname", lastname);

  return (
    <>
      <Navbar />
      <ModalImageTooLarge showModal={showModal} handleCloseModal={handleCloseModal}/>
      <Box sx={{boxShadow:"5px 5px 5px 5px",width:{ xs: "100vw", md: "30vw" },height:{ xs: "90vh", md: "87vh" }, margin:"0 auto", marginTop:{md:"1%"} }}>
      <Box
        component="form"
        onSubmit={singUpForm.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          width:"100%",
          fontSize: "1.5rem",
          
        }}
      >
        <h2 style={{ fontWeight: "bold", marginTop: "5%" }}>PROFILE</h2>
        <Grid
          container
          sx={{
            width: "100%",

            display: "flex",
            justifyContent: "start",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "5%",
            }}
          >
            <input
              disabled={edit}
              id="user_image"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />

            <label htmlFor="user_image" style={{cursor:"pointer"}}>
              {url_img ? (
                <Avatar src={url_img} sx={{width:{ xs: 100, md: 140 },height:{ xs: 100, md: 140 } }}></Avatar>
              ) : name && lastname ? (
                <Avatar
                sx={{width:{ xs: 100, md: 140 },height:{ xs: 100, md: 140 } }}
                >{`${name[0].toUpperCase()}${lastname[0].toLocaleUpperCase()}`}</Avatar>
              ) : (
                <Avatar sx={{width:{ xs: 100, md: 140 },height:{ xs: 100, md: 140 } }}></Avatar>
              )}
            </label>
          </Grid>

          <Stack
            spacing={1}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
             marginTop:{ xs: "5%", md: "3%" }}}
          >
           <FormControl sx={{width: { xs: '50%', md: '50%' },}}>
              <Input
                disabled={edit}
                id="name"
                type="text"
                aria-describedby="name-helper"
                value={singUpForm.values.name}
                onChange={singUpForm.handleChange}
                onBlur={singUpForm.handleBlur}
                sx={{textAlign: "center",
                "& input": {
                  textAlign: "center",
                }}}
              />
              <FormHelperText id="name-helper" sx={{ textAlign: "center" }}>
              {singUpForm.touched.name && singUpForm.errors.name ? (
                  <p style={{ color: "red" }}>
                    El nombre debe estar compuesto por letras
                  </p>
                ) : (
                  "Name"
                )}
              </FormHelperText>
            </FormControl>

            <FormControl sx={{width: { xs: '50%', md: '50%' },}}>
              <Input
                disabled={edit}
                id="lastname"
                type="text"
                aria-describedby="lastname-helper"
                value={singUpForm.values.lastname}
                onChange={singUpForm.handleChange}
                onBlur={singUpForm.handleBlur}
                sx={{textAlign: "center",
                "& input": {
                  textAlign: "center",
                }}}
              />
              <FormHelperText id="lastname-helper" sx={{ textAlign: "center" }}>
              {singUpForm.touched.lastname && singUpForm.errors.lastname ? (
                  <p style={{ color: "red" }}>
                    El apellido debe estar compuesto por letras
                  </p>
                ) : (
                  "Lasname"
                )}
              </FormHelperText>
            </FormControl>

            <FormControl sx={{width: { xs: '50%', md: '50%' }}}>
              <Input
                disabled={edit}
                id="username"
                type="text"
                aria-describedby="username-helper"
                value={singUpForm.values.username}
                onChange={singUpForm.handleChange}
                onBlur={singUpForm.handleBlur}
                sx={{textAlign: "center",
                "& input": {
                  textAlign: "center",
                }}}
              />
              <FormHelperText id="email-helper" sx={{ textAlign: "center" }}>
              {singUpForm.touched.username && singUpForm.errors.username ? (
                  <p style={{ color: "red" }}>
                    El nombre de usuario debe estar compuesto por letras
                  </p>
                ) : (
                  "Username"
                )}
              </FormHelperText>
            </FormControl>
            <FormControl></FormControl>

            <FormControl sx={{width: { xs: '50%', md: '50%' },}}>
              <Input
                disabled={true}
                id="email"
                type="email"
                aria-describedby="email-helper"
                value={singUpForm.values.email}
                onChange={singUpForm.handleChange}
                onBlur={singUpForm.handleBlur}
                sx={{textAlign: "center",
                "& input": {
                  textAlign: "center",
                }}}
              />
              <FormHelperText id="email-helper" sx={{ textAlign: "center" }}>
              {singUpForm.touched.email && singUpForm.errors.email ? (
                  <p style={{ color: "red" }}>Email invalido </p>
                ) : (
                  "Email"
                )}
              </FormHelperText>
            </FormControl>
            <FormControl sx={{width: { xs: '50%', md: '50%' }}}>
              <Input
                disabled={edit}
                id="passsword"
                type="password"
                aria-describedby="password-helper"
                value={singUpForm.values.password}
                onChange={singUpForm.handleChange}
                onBlur={singUpForm.handleBlur}
                sx={{textAlign: "center",
                "& input": {
                  textAlign: "center",
                }}}
              />
              <FormHelperText id="password-helper" sx={{ textAlign: "center" }}>
              {singUpForm.touched.password && singUpForm.errors.password ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    Al menos 8 caracteres, un letra mayuscula y un simbolo{" "}
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
        {edit === false ? (
          <Button
            onClick={singUpForm.handleSubmit}
            variant="contained"
            sx={{ marginTop: 4, marginBottom: 8 }}
          >
            Save
          </Button>
        ) : (
          <Button
            onClick={handleEdit}
            variant="contained"
            sx={{ marginTop: 4, marginBottom: 8, backgroundColor:"#5893d4" }}
          >
            Edit
          </Button>
        )}
      </Box>
      </Box>
    </>
  );
}

export default Profile;
