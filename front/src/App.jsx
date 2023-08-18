import React, { useState, useEffect } from "react";
import Profile from "./components/profile";
import Home from "./components/home";
import UserHome from "./components/userHome";
import UserList from "./components/userList";
import { Routes, Route } from "react-router";
import { useDispatch, } from "react-redux";
import { setUser } from "./redux/user.slice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";
import RegisterFormik from "./components/registerFormik";
import Loading from "./components/loading";

import "react-toastify/dist/ReactToastify.css";
import { toast,ToastContainer } from "react-toastify";

function App() {
  const dispacth = useDispatch();

  const navigate=useNavigate()


 useEffect(() => {
  
console.log("ANTES DEL AXIOS")
    axios
      .get("http://localhost:3000/api/user/me",{ withCredentials: true })
      .then((res) =>res.data)
      .then((user) =>  {dispacth(setUser(user))
        navigate(`/user/${user.username}`)
      })
      .catch(({ error }) => {
        console.error(error)
        navigate("/")
      });
  }, []);

  return (
    <>
    <ToastContainer/>

      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/register" element={<RegisterFormik />} />
        <Route path="/user/:username" element={<UserHome/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/lists/:nameList/:id" element={<UserList/>}/>
        <Route path="/loading" element={<Loading/>}/>
      </Routes>
    </>
  );
}

export default App;
