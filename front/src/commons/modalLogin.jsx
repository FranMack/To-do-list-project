import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import { setUser } from "../redux/user.slice";

import {
  Box,
  Stack,
  FormControl,
  Input,
  FormHelperText,
  Button,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ModalLogin({ handleModal, openModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/user/login",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setUser(res.data.payload));
        return res.data.payload.username;
      })
      .then((username) => {
        toast.success("Iniciaste sesión");
        navigate(`/user/${username}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          onSubmit={handleSubmit}
          sx={{
            width: "80%",
            height: "40%",
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
                value={email}
                onChange={handleEmail}
              />
              <FormHelperText id="email-helper" sx={{ textAlign: "center" }}>
                Email
              </FormHelperText>
            </FormControl>
            <FormControl sx={{ width: "80%" }}>
              <Input
                id="passsword"
                type="password"
                aria-describedby="password-helper"
                value={password}
                onChange={handlePassword}
              />
              <FormHelperText id="password-helper" sx={{ textAlign: "center" }}>
                Password
              </FormHelperText>
            </FormControl>
          </Stack>
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
