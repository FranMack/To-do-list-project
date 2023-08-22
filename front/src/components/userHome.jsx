import React, { useState } from "react";
import Navbar from "./navbar";
import { useEffect } from "react";
import axios from "axios";

import { Box, Button } from "@mui/material";

import ItemList from "../commons/itemList";
import { useSelector } from "react-redux";
import { orderByDate } from "../../utils.js/functions";
import ModalNewList from "../commons/modalNewList";
import Loading from "./loading";

function UserHome() {
  const [isLoading, setIsLoading] = useState(true);
  const [lists, setList] = useState([]);

  const handleLists = (list) => {
    setList(list);
  };

  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const user = useSelector((state) => state.user);

  const email = user.email;
  const name = user.name;

  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:3000/api/list/all/${email}`)
        .then((res) => {
          setList(orderByDate(res.data));
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user, openModal]);

  console.log("lists", lists);

  const theme=useSelector((state)=>state.theme)

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Navbar />
      <ModalNewList
        openModal={openModal}
        handleModal={handleModal}
        email={email}
        handleLists={handleLists}
      />

      <Box
        sx={{
          margin:"0 auto",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          fontSize: "1.7rem",
          flexDirection: "column",
          minHeight: "92vh",
          width:{xs:"100vw",md:"80vw"},
          backgroundColor:`${theme.bgColor}`,
          color:`${theme.textColor}`
        
        }}
      >
        <Box sx={{ marginTop: { xs: "10%", md: "5%" } }}>
          <h3 style={{ fontWeight: "bolder" }}>
            WELLCOME:{" "}
            <span
              style={{ color: "#5893d4", textDecoration: "none" }}
            >{`${name}`}</span>
          </h3>
        </Box>

        <Box
          sx={{
            marginTop: { xs: "10%", md: "3%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
          }}
        >
          <Button
            variant="contained"
            onClick={handleModal}
            sx={{ backgroundColor: "#5893d4" }}
          >
            <h4 style={{ fontSize: "1.3rem", color: "white" }}> NEW LIST</h4>
          </Button>{" "}
        </Box>

        {lists.length > 0 && (
          <>
            <Box sx={{ marginTop: { xs: "10%", md: "4%" } }}>
              <h3
                style={{
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  textDecorationLine: "underline",
                
                }}
              >
                YOUR LISTS
              </h3>
            </Box>
            <ul
              style={{
                width: "80%",
                marginTop: "3%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {lists.map((lista, i) => {
                return (
                  <ItemList
                    email={email}
                    lista={lista}
                    handleLists={handleLists}
                    key={i}
                  />
                );
              })}
            </ul>
          </>
        )}
      </Box>
    </>
  );
}

export default UserHome;
