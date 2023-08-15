import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, List, Checkbox } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTodosContext } from "../context/todos.context";
import { orderByDate } from "../../utils.js/functions";

function TodoItem({ todo }) {
  const username = useParams().username;
  const id = todo.id;
  const { todos, setTodos } = useTodosContext();
  const [checked, setChecked] = useState(todo.complete);

  const deleteItem = () => {
    axios
      .delete(`http://localhost:3000/api/activities/${username}/${id}`)
      .then(() =>
        axios
          .get(`http://localhost:3000/api/activities/all/${username}`)
          .then((res) => setTodos(orderByDate(res.data)))
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const taskCompleted = () => {
    axios
      .put(`http://localhost:3000/api/activities/${username}/${id}`, {
        complete: !checked,
      })
      .then(() =>
      axios
        .get(`http://localhost:3000/api/activities/all/${username}`)
        .then((res) => setTodos(orderByDate(res.data)))
    )
      .then(() => setChecked(!checked))
      .catch((error) => {
        console.log(error);
      });
  };





  return (
    <List
      sx={{
        display: "flex",
        width: { xs: '100%', md: '50%' },
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "1.3rem",
        borderBottom: "solid 1px grey",
      }}
    >
      <Checkbox onClick={taskCompleted} checked={checked} />
      {checked === false ? (
        <p>{todo.task}</p>
      ) : (
        <p style={{ textDecoration: "line-through" }}>{todo.task}</p>
      )}

      <DeleteIcon onClick={deleteItem} sx={{"&:hover":{color:"red"} }} />
    </List>
  );
}

export default TodoItem;
