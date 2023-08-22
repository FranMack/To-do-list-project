import React from "react";
import {IconButton } from "@mui/material";
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