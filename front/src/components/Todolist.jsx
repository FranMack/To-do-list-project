import React from "react";
import TodoItem from "../commons/TodoItem";
import {
    Box,
    Stack,
   
  } from "@mui/material";

  


function TodoList({todos}){

    return(
    <Box sx={{width:"80%"}}>
        <Stack  sx={{marginTop:"5%",display:"flex", alignItems:"center"}}>
            {todos.map((todo,i)=>{return(
                <TodoItem key={i} todo={todo} />
            )})}
        </Stack>
    </Box>)
}



export default TodoList;