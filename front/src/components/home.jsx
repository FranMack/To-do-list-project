import React from "react";
import Logo from "../commons/logo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ModalLogin from "../commons/modalLogin";

import { Box, Button } from "@mui/material";

function Home() {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  
  };

  return (
    <>
      <ModalLogin openModal={openModal} handleModal={handleModal} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
          
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Logo />
          <h3
            style={{
              fontWeight: "bold",
              fontFamily: "fantasy",
              fontSize: "3rem",
              color: "#5893d4",
            }}
          >
            TO DO LIST
          </h3>
        </Box>
        <Button
          onClick={handleModal}
          variant="contained"
          sx={{
            marginTop: 5,
            paddingInline: 6,
            fontSize: "1.2rem",
            backgroundColor: "#5893d4",
          }}
        >
          Login
        </Button>
        <Button component={Link} to="/register" sx={{ marginTop: 2 }}>
          Registrarse
        </Button>
      </Box>
    </>
  );
}

export default Home;
