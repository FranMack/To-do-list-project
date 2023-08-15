import React from "react";
import logo from "../assets/logoIcono.png"
import MenuIcon from '@mui/icons-material/Menu';
import { Box,IconButton } from "@mui/material";
import TemporaryDrawer from "../commons/hambuerguerMenu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Navbar(){

    const user = useSelector((state) => state.user);

    return (

        <nav className="navbar">

            <Link to={user.name ? (`/user/${user.username}`): ("/")}>  <img className="iconoNavbar" src={logo} alt="icono"/></Link>

         <Box sx={{marginRight:"2%",display:"flex", alignItems:"center"}}>
           <TemporaryDrawer style/>
           </Box>

        </nav>
    )
}

export default Navbar;