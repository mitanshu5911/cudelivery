import Header from "./components/layouts/header/Header.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { Route, Routes } from "react-router-dom";
import GoogleSuccess from "./pages/GoogleSuccess.jsx";
import Home from "./pages/Home.jsx";
import ProtectedLayout from "./components/layouts/ProtectedRoute.jsx";
import Profile from "./pages/Profile.jsx";
import ProfileProtectedLayout from "./components/layouts/ProfileProtectedLayout.jsx";
import RoleProtectedLayout from "./components/layouts/RoleProtectedLayout.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex">
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/google-success" element={<GoogleSuccess />} />

          
          <Route element={<ProtectedLayout />}>
            <Route path="/profile" element={<Profile />} />

            <Route element={<ProfileProtectedLayout />}>

              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />

              <Route element={<RoleProtectedLayout allowedRoles={["Hosteller"]}/>}>
              </Route>

               <Route element={<RoleProtectedLayout allowedRoles={["DayScholar"]}/>}>
              </Route>
            
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;