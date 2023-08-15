import React from "react";
import logo from "../assets/logo.png"
import MenuIcon from '@mui/icons-material/Menu';
import { Box,IconButton } from "@mui/material";
import TemporaryDrawer from "../commons/hambuerguerMenu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function NavbarRegister(){

    const user = useSelector((state) => state.user);

    return (

        <nav className="navbar">

          <IconButton component={Link} to="/">
            <ArrowBackIcon/>
            <h3 style={{marginLeft:"3%",color:"grey"}}>Back</h3>
            </IconButton>

        </nav>
    )
}

export default NavbarRegister;