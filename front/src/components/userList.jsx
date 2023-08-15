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
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import { useTodosContext } from "../context/todos.context";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./navbar";
import { orderByDate } from "../../utils.js/functions";

function UserList() {
  const { todos, setTodos } = useTodosContext();
  const [task, setTask] = useState("");

  const user = useSelector((state) => state.user);

  const username = user.username;

  const handleTask = (element) => {
    setTask(element.target.value);
  };

  const addTodo = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3000/api/activities/create`, { task, username })
      .then(() => setTask(""))
      .then(() =>
        axios
          .get(`http://localhost:3000/api/activities/all/${username}`)
          .then((res) => setTodos(orderByDate(res.data)))
      )
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:3000/api/activities/all/${username}`)
        .then((res) => setTodos(orderByDate(res.data)))
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <Box
        component="form"
        onSubmit={addTodo}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
        }}
      >
        <h3 style={{ marginTop: "5%", fontWeight: "bolder" }}>LIST OF TASKS</h3>

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
              onChange={handleTask}
              value={task}
              type="text"
              placeholder="Agregar tarea"
              sx={{
                marginBottom: "5%",
                textAlign: "center",
                textAlign: "center",
                "& input": {
                  textAlign: "center",
                },
              }}
            />
          </FormControl>
          <IconButton type="submit">
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default UserList;
