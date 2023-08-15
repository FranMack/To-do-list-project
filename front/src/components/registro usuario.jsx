import React, { useState } from "react";
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
  IconButton
} from "@mui/material";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavbarRegister from "./NavbarRegister";

function Registro() {
  const navigate = useNavigate();
  const [url_img, setUrl_img] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username,setUsername]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUrl_img(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleLastname = (event) => {
    setLastname(event.target.value);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/api/user/register", {
        name,
        url_img,
        lastname,
        email,
        password,
        username
      })
      .then((res) => res.data)
      .then(() => navigate("/login"))

      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <>
    <NavbarRegister/>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "90vh",
          width:"100vw",
          fontSize: "1.5rem",
         
        }}
      >

        <h2>USER REGISTER</h2>
        <Grid
          container
          sx={{
            width: "100%",

            display: "flex",
            justifyContent: "start",
            marginTop: "5%",
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
              style={{display:"none"}}
              onChange={handleImageUpload}
            />

            <label htmlFor="user_image">

              {url_img ? (<Avatar src={url_img} sx={{ width: 100, height: 100, }}></Avatar>):name && lastname ?
              (<Avatar sx={{ width: 100, height: 100, }}>{`${name[0].toUpperCase()}${lastname[0].toLocaleUpperCase()}`}</Avatar>):
              (<Avatar sx={{ width: 100, height: 100, }}></Avatar>)  }
              
            </label>
          </Grid>

     
            <Stack
              spacing={1}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                marginTop: "5%",
              }}
            >
              <FormControl>
                <Input
                  id="name"
                  type="text"
                  aria-describedby="name-helper"
                  value={name}
                  onChange={handleName}
                />
                <FormHelperText id="name-helper" sx={{ textAlign: "center" }}>
                  Name
                </FormHelperText>
              </FormControl>

              <FormControl>
                <Input
                  id="lastname"
                  type="text"
                  aria-describedby="lastname-helper"
                  value={lastname}
                  onChange={handleLastname}
                />
                <FormHelperText
                  id="lastname-helper"
                  sx={{ textAlign: "center" }}
                >
                  Lastname
                </FormHelperText>
              </FormControl>

              <FormControl>
                <Input
                  id="username"
                  type="text"
                  aria-describedby="username-helper"
                  value={username}
                  onChange={handleUsername}
                />
                <FormHelperText id="email-helper" sx={{ textAlign: "center" }}>
                  User name
                </FormHelperText>
              </FormControl>
              <FormControl></FormControl>

              <FormControl>
                <Input
                  id="email"
                  type="email"
                  aria-describedby="email-helper"
                  value={email}
                  onChange={handleEmail}
                />
                <FormHelperText id="email-helper" sx={{ textAlign: "center" }}>
                  Email
                </FormHelperText>
              </FormControl>
              <FormControl>
                <Input
                  id="passsword"
                  type="password"
                  aria-describedby="password-helper"
                  value={password}
                  onChange={handlePassword}
                />
                <FormHelperText
                  id="password-helper"
                  sx={{ textAlign: "center" }}
                >
                  Password
                </FormHelperText>
              </FormControl>
            </Stack>
    

        
        </Grid>
        <Button type="submit" variant="contained" sx={{ marginTop: 4, marginBottom:8}}>
        Sign in
          </Button>
      </Box>
    </>
  );
}

export default Registro;
