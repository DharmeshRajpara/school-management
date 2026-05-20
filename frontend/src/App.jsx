import "./App.css";
import Admin from "./pages/Admin";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Facultys from "./pages/Facultys";
import Student from "./pages/Student";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import FacultyLogin from "./pages/LoginFaculty";
import { Toaster } from "react-hot-toast";
import LoginAdmin from "./pages/LoginAdmin";
import { ProtectedRoute, ProtectedRouteLogin } from "./routes/ProtectedRoute";
import {
  ProtecctedRoutesFaculty,
  ProtecctedRoutesFacultyLogin,
} from "./routes/ProtecctedRoutesFaculty";
import {
  ProtectedRoutesStudent,
  Protectestudentlogin,
} from "./routes/ProtectedRoutesStudent";

import { TooltipProvider } from "./components/ui/tooltip";
import AdminStundetData from "./pages/AdminStundetData";
import AdminFacultyData from "./pages/AdminFacultyData";
function App() {
  return (
    <TooltipProvider>
    <BrowserRouter>
      <Toaster position="top-center" />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin-student"
          element={
            <ProtectedRoute>
              <AdminStundetData />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin-faculty"
          element={
            <ProtectedRoute>
              <AdminFacultyData />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin-login"
          element={
            <ProtectedRouteLogin>
              <LoginAdmin />
            </ProtectedRouteLogin>
          }
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/student-login"
          element={
            <Protectestudentlogin>
              <Login />
            </Protectestudentlogin>
          }
        ></Route>
        <Route
          path="/student"
          element={
            <ProtectedRoutesStudent>
              <Student />
            </ProtectedRoutesStudent>
          }
          ></Route>
        <Route
          path="/faculty-login"
          element={
            <ProtecctedRoutesFacultyLogin>
              <FacultyLogin />
            </ProtecctedRoutesFacultyLogin>
          }
          ></Route>
        <Route
          path="/faculty"
          element={
            <ProtecctedRoutesFaculty>
              <Facultys />
            </ProtecctedRoutesFaculty>
          }
          ></Route>
      </Routes>
    </BrowserRouter>
          </TooltipProvider>
  );
}

export default App;
