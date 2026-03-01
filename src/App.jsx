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
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import GuestRoute from "./components/layouts/GuestRoute.jsx";
import CreateRequest from "./pages/request/CreateRequest.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex">
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/google-success" element={<GoogleSuccess />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>

          <Route element={<ProtectedLayout />}>
            <Route path="/profile" element={<Profile />} />

            <Route element={<ProfileProtectedLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />

              <Route
                element={<RoleProtectedLayout allowedRoles={["Hosteller"]} />}
              >
                <Route path="/create_request" element={<CreateRequest/>}/>
              </Route>

              <Route
                element={<RoleProtectedLayout allowedRoles={["DayScholar"]} />}
              ></Route>
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
