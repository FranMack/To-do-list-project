import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/user.slice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

export default function TemporaryDrawer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [state, setState] =useState({
    right: false,
  });

  const[url_img,setUrl_img]=useState("")



  useEffect(()=>{

    axios.get(`http://localhost:3000/api/user/info/${user.email}`)
    .then((res)=>setUrl_img(res.data.url_img))
    .catch((error)=>{console.log(error)})

  },[])




  const handleLogout = () => {
    console.log("Cerrando sesión");
    axios
      .post(
        "http://localhost:3000/api/user/logout",
        { token: "token" },
        { withCredentials: true }
      )
      .then(() => {
        dispatch(setUser({})); // Despacha la acción
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <Avatar src={user.url_img ?(user.url_img):(url_img)} sx={{ marginRight: "5%" }}></Avatar>
          {user.username}
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem  component={Link} to="/profile" disablePadding sx={{color:"black"}}>
          <ListItemButton>
            <ListItemIcon>
              <IconButton>
                <AccountCircleIcon />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>

        <ListItem  onClick={handleLogout} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <IconButton>
                <LogoutIcon />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
