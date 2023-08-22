import React from "react";
import logo from "../assets/logoIcono.png"
import MenuIcon from '@mui/icons-material/Menu';
import { Box,IconButton } from "@mui/material";
import TemporaryDrawer from "../commons/hambuerguerMenu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Navbar(){

    const user = useSelector((state) => state.user);
    const theme=useSelector((state)=>state.theme)

    return (

        <nav style={{ width: "100vw",
            height: "8vh",
            position:"relative",
            zIndex:"2",
            backgroundColor:`${theme.bgColor}`,
            color:"lightgray",
            boxShadow: "2px 2px 2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",}}>

            <Link to={user.name ? (`/user/${user.username}`): ("/")}>  <img className="iconoNavbar" src={logo} alt="icono"/></Link>

         <Box sx={{marginRight:"2%",display:"flex", alignItems:"center"}}>
           <TemporaryDrawer />
           </Box>

        </nav>
    )
}

export default Navbar;