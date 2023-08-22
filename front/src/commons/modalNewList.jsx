import React, { useEffect } from "react";


import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import { setUser } from "../redux/user.slice";
import { useSelector } from "react-redux/es/hooks/useSelector";

import {
  Box,
  Stack,
  FormControl,
  Input,
  FormHelperText,
  Button,
  Modal,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";

function ModalNewList({ handleModal, openModal, email, handleLists }) {

  const theme=useSelector((state)=>state.theme)
  
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (openModal) {
      singUpForm.resetForm();
    }
  }, [openModal]);

  const singUpForm = useFormik({
    initialValues: {
      nameList: "",
    },
    validationSchema: Yup.object({
      nameList: Yup.string()
      .required("List name is required")
      .max(22, 'Maximum characters allowed 22')
    }),
    

    onSubmit: (values) => {
      axios
        .post(`http://localhost:3000/api/list/create`, {
          nameList: values.nameList,
          email: email,
        })
        .then(() => singUpForm.resetForm())
        .then(() => {
          handleModal();
        })
    
        .catch((error) => {
          console.log(error);
        });
    },
  });


  console.log("modal",openModal)

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
            height: "35%",
            backgroundColor: `${theme.bgColor}`,
           
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between	",
          }}
        >
          <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
            {" "}
            <CloseIcon sx={{ marginRight: "3%" }} onClick={handleModal} />
          </Box>

          <Stack spacing={2} sx={{ display: "flex", alignItems: "center",marginTop:"15%" }}>
            <FormControl>
              <Input
                id="nameList"
                value={singUpForm.values.nameList}
                onChange={singUpForm.handleChange}
                onBlur={singUpForm.handleBlur}
                type="text"
                placeholder="New List of tasks"
                sx={{
                  color:`${theme.textColor}`,
                  borderBottom:`1px solid ${theme.textColor}`,
                  marginBottom: "5%",
                  textAlign: "center",
                  textAlign: "center",
                  "& input": {
                    textAlign: "center",
                  },
                }}
              />
              <FormHelperText
                id="lastname-helper"
                sx={{ textAlign: "center", color: "red" }}
              >
                {singUpForm.touched.nameList && singUpForm.errors.nameList
                  ? ` ${singUpForm.errors.nameList}`
                  : ""}
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
              marginBottom: "10%",
            }}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default ModalNewList;
