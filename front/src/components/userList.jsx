import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TodoList from "./Todolist";
import {
  Box,
 
  FormControl,
  Input,
  FormHelperText,
  IconButton,
} from "@mui/material";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../redux/todos.slice";
import Navbar from "./navbar";
import { orderByDate } from "../../utils.js/functions";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "./loading";


function UserList() {
  const dispatch=useDispatch()
  //const [task, setTask] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.user);
  const todos=useSelector((state)=>state.todos)
  const theme=useSelector((state)=>state.theme)

  const username = user.username;

  


 

  const listId=useParams().id;
  const nameList=useParams().nameList;


  

  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:3000/api/activities/all/${listId}`)
        .then((res) => {dispatch(setTodos(orderByDate(res.data)))
          setIsLoading(false)})
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
      task: Yup.string()
      .required("Required field")
      .max(22, 'Maximum characters allowed 22')
    }),

    onSubmit:(values)=>{

      axios
      .post(`http://localhost:3000/api/activities/create`, { task:values.task, listId:listId })
      .then(() => singUpForm.resetForm(""))
      .then(() =>
        axios
          .get(`http://localhost:3000/api/activities/all/${listId}`)
          .then((res) => dispatch(setTodos(orderByDate(res.data))))
          
      )
      .catch((error) => {
        console.log(error);
      });


    }
  })


  
console.log("errors",singUpForm.touched.task)
  return (
    isLoading ? (<Loading/>) :( <>
      <Navbar />
      <Box
        component="form"
        onSubmit={singUpForm.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          minHeight:"92vh",
          fontSize: "1.5rem",
          backgroundColor:`${theme.bgColor}`,
          color:`${theme.textColor}`
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
                backgroundColor:`${theme.bgColor}`,
                color:`${theme.textColor}`,
                borderBottom: `solid 1px ${theme.textColor}`,
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
    </>)
   
  );
}

export default UserList;
