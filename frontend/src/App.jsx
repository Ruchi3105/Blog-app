import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Settings from "./pages/Settings";
import { Context } from "../context/Context";
import TopBar from "./components/Topbar";
import Header from "./components/Header";

const App = () => {
  // const {user} = useContext(Context);
  return (
    <div className="container">
      {/* <Navbar /> */}
      <TopBar />
       <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
        <Route path="/post/:postId" element={<Single />} /> */}
      </Routes> 
    </div>
  );
};

export default App;
