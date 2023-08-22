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
import { useSelector } from "react-redux";
import { setUser } from "../redux/user.slice";
import { useDispatch } from "react-redux";

function ItemList({ lista, email, handleLists }) {
  const navigate = useNavigate();
  const theme=useSelector((state)=>state.theme)
  const dispatch=useDispatch()

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
      navigate(`/lists/${ nameList || lista.nameList}/${lista.id}`);
    }
  };

  useEffect(() => {
    if (!edit) {
      axios
        .put("http://localhost:3000/api/list/edit-list-name", {
          listId,
          nameList,
        })
        .then(() => {axios.get(`http://localhost:3000/api/list/all/${email}`)})
        .then((res)=>{dispatch(setUser(res.data))})
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
        borderBottom: `solid 1px ${theme.textColor}`,
        marginTop: "2%",
        color:`${theme.textColor}`,
      
        
      }}
    >
      <DeleteIcon sx={{ "&:active":{color:"red"},cursor: "pointer"}} onClick={deleteItem} />

      <input
        readOnly={edit}
        style={{
          outline: "none",
          border: "none",
          color: `${edit ? theme.textColor : "#5893d4"}`,
          backgroundColor:`${theme.bgColor}`,
         
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
        sx={{ color: `${edit ? theme.textColor : "#5893d4"}` }}
      />
    </List>
  );
}

export default ItemList;
