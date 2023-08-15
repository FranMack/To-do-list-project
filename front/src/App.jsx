import React, { useState, useEffect } from "react";
import Registro from "./components/registro usuario";
import Profile from "./components/profile";
import Login from "./components/login";
import Home from "./components/home";
import UserList from "./components/userList";
import { Routes, Route } from "react-router";
import { useDispatch, } from "react-redux";
import { setUser } from "./redux/user.slice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";
import RegisterFormik from "./components/registerFormik";

function App() {
  const dispacth = useDispatch();

  const navigate=useNavigate()


  useEffect(() => {
  
console.log("ANTES DEL AXIOS")
    axios
      .get("http://localhost:3000/api/user/me",{ withCredentials: true })
      .then((res) =>res.data)
      .then((user) =>  {dispacth(setUser(user))
        navigate(`/user/${user.username}`)})
      .catch(({ error }) => {
        console.error(error)
        navigate("/")
      });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterFormik />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:username" element={<UserList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
