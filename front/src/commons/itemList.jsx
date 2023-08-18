import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, List, Checkbox } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTodosContext } from "../context/todos.context";
import { orderByDate } from "../../utils.js/functions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ItemList({ lista, email, handleLists }) {
  const navigate = useNavigate();

  const [nameList, setNameList] = useState("");
  const handleNameList = (event) => {
    setNameList(event.target.value);
  };
  const [auxiliar,setAuxiliar]=useState(true)
  const [edit, setEdit] = useState(true);
  const handleEdit = () => {
    if(edit){
      setAuxiliar(!auxiliar)
      setNameList(lista.nameList)
    }
    
    setEdit(!edit);

    
   
    
  };

  const listId = lista.id;

  const deleteItem = () => {
    axios
      .delete(`http://localhost:3000/api/list/${listId}`)
      .then(() =>
        axios.get(`http://localhost:3000/api/list/all/${email}`).then((res) => {
          handleLists(orderByDate(res.data));
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLink = () => {
    if (edit) {
      navigate(`/lists/${lista.nameList}/${lista.id}`);
    }
  };

  useEffect(() => {
    if (!edit) {
      axios
        .put("http://localhost:3000/api/list/edit-list-name", {
          listId,
          nameList,
        })
        .then((res) => console.log(res.data))
        .catch((error) => {
          console.log(error);
        });
    }
  }, [nameList]);


console.log("nameList",nameList)
  return (
    <List
      sx={{
        display: "flex",
        width: { xs: '100%', md: '50%' },
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "1.3rem",
        borderBottom: "solid 1px grey",
        marginTop: "2%",
        color: "black",
      }}
    >
      <DeleteIcon onClick={deleteItem} sx={{"&:active":{color:"red"},cursor: "pointer" }} />

      <input
        readOnly={edit}
        style={{
          outline: "none",
          border: "none",
          color: `${edit ? "black" : "#5893d4"}`,
          fontSize: "1.3rem",
          textAlign: "center",
          "& input": {
            textAlign: "center",
          },
        }}
        value={edit && !nameList && auxiliar ? lista.nameList : !nameList && !auxiliar ? nameList :nameList }
        onChange={handleNameList}
        onClick={handleLink}
      />

      <EditIcon
        onClick={handleEdit}
        sx={{ color: `${edit ? "black" : "#5893d4"}` }}
      />
    </List>
  );
}

export default ItemList;
