import React from "react";
import Header from "./components/layouts/header/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GoogleSuccess from "./pages/GoogleSuccess";
import Home from "./pages/Home";

function App() {
  return (
  

      <div className="min-h-screen flex flex-col ">
      <Header />

      <main className="flex-1 flex">
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/google-success" element={<GoogleSuccess />} />

          <Route path="/" element={<Login />} />
        </Routes>
      </main>
    </div>

  
  );
}

export default App;
