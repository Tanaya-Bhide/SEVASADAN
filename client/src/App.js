import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notifications from "./pages/Notifications";
import Userslist from "./pages/Admin/Userslist";
import DoctorsList from "./pages/Admin/DoctorsList";
import Profile from "./pages/Doctor/Profile";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import Patient from "./pages/Admin/Patient";
import Patientlist from "./pages/Admin/Patientlist";
import View from "./pages/Admin/View";
import Update from "./pages/Admin/Update";
import AddBed from "./components/Addbed";
import AllBed from "./components/Bed";
import ListMedicine from "./components/ListMedicine";
import EditMedicine from "./components/EditMedicine";
import AddMedicine from "./components/AddMedicine";
import Landing from "./pages/Landing";
import BillingModule from "./pages/Admin/BillingModule";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/landing"
          element={
            <PublicRoute>
              <Landing />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/bill"
          element={
            <ProtectedRoute>
              <BillingModule/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoute>
              <ApplyDoctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/userslist"
          element={
            <ProtectedRoute>
              <Userslist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/doctorslist"
          element={
            <ProtectedRoute>
              <DoctorsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view/:id"
          element={
            <ProtectedRoute>
              <View />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute>
              <Update />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search-patient"
          element={
            <ProtectedRoute>
              <Patientlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/profile/:userId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book-appointment/:doctorId"
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute>
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register-patient"
          element={
            <ProtectedRoute>
              <Patient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addbed"
          element={
            <ProtectedRoute>
              <AddBed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/getbed"
          element={
            <ProtectedRoute>
              <AllBed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addinven"
          element={
            <ProtectedRoute>
              <AddMedicine />
            </ProtectedRoute>
          }
        />
        <Route
          path="/getinven"
          element={
            <ProtectedRoute>
              <ListMedicine />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:id"
          element={
            <ProtectedRoute>
              <EditMedicine />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
