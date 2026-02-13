import React from "react";
import Header from "./components/layouts/header/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <main className="flex-1 flex">
        {/* <Register /> */}
        <Login/>
      </main>
    </div>
  );
}

export default App;
