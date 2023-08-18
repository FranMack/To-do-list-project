import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TodoList from "./Todolist";
import {
  Box,
  Grid,
  Avatar,
  Stack,
  FormControl,
  Input,
  FormHelperText,
  Button,
  IconButton,
  Icon,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useParams } from "react-router-dom";
import { useTodosContext } from "../context/todos.context";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./navbar";
import { orderByDate } from "../../utils.js/functions";
import { useFormik } from "formik";
import * as Yup from "yup";


function UserList() {
  const { todos, setTodos } = useTodosContext();
  const [task, setTask] = useState("");

  const user = useSelector((state) => state.user);

  const username = user.username;


 

  const listId=useParams().id;
  const nameList=useParams().nameList;


  

  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:3000/api/activities/all/${listId}`)
        .then((res) => setTodos(orderByDate(res.data)))
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  const singUpForm=useFormik({

    initialValues:{
      task:""
    },
    validationSchema: Yup.object({
      task: Yup.string().required("Required field"),
    }),

    onSubmit:(values)=>{

      axios
      .post(`http://localhost:3000/api/activities/create`, { task:values.task, listId:listId })
      .then(() => singUpForm.resetForm(""))
      .then(() =>
        axios
          .get(`http://localhost:3000/api/activities/all/${listId}`)
          .then((res) => setTodos(orderByDate(res.data)))
      )
      .catch((error) => {
        console.log(error);
      });


    }
  })


  
console.log("todo",todos)
  return (
    <>
      <Navbar />
      <Box
        component="form"
        onSubmit={singUpForm.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
        }}
      >
        <h3 style={{ marginTop: "5%", fontWeight: "bolder" }}>{nameList}</h3>

        <TodoList todos={todos} />

        <Box
          sx={{
            marginTop: "5%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <FormControl>
            <Input
            id="task"
              onChange={singUpForm.handleChange}
              onBlur={singUpForm.handleBlur}
              value={singUpForm.values.task}
              type="text"
              placeholder="Add a new task"
              sx={{
                marginBottom: "5%",
                textAlign: "center",
                textAlign: "center",
                "& input": {
                  textAlign: "center",
                },
              }}
            />
            <FormHelperText id="task-helper" sx={{ textAlign: "center" }}>
                {singUpForm.touched.task && singUpForm.errors.task ? (
                  <p style={{ color: "red" }}>{singUpForm.errors.task}</p>
                ) : (
                  ""
                )}
              </FormHelperText>
          </FormControl>
          <IconButton type="submit" >
            <AddCircleIcon fontSize="large" sx={{color:"#5893d4"}} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default UserList;
