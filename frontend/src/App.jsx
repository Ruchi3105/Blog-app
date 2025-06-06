import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Settings from "./pages/Settings";
import { Context } from "../context/Context";
import TopBar from "./components/Topbar";
import Header from "./components/Header";
import About from "./pages/About";
import AddCat from "./pages/AddCat";
import CategoryHome from "./pages/CategoryHome";
import Footer from "./pages/Footer";

const App = () => {
  const { user } = useContext(Context);
  return (
    <div className="container">
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Header />} />
        <Route path="/blogs" element={<Home />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/add-category" element={user ? <AddCat /> : <Login />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/home" element={<CategoryHome/>}/>
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
