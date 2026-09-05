import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../Components/Loader";
import Sidebar from "../Components/Sidebar";
import ProtectRoutes from "../Hooks/ProtectRoutes";
import NotFound from "../Pages/NotFound";

const Login = lazy(() => import("../Pages/Login"));
const Register = lazy(() => import("../Pages/Register"));

const Dashboard = lazy(() => import("../Pages/Dashboard"));
const Transactions = lazy(() => import("../Pages/Transactions"));
const Addtransactions = lazy(() => import("../Pages/Addtransactions"));
const Reports = lazy(() => import("../Pages/Reports"));
const Profile = lazy(() => import("../Pages/Profile"));
const Transdetails = lazy(() => import("../Pages/Transdetails"));
const EditProfile = lazy(() => import("../Pages/EditProfile"));
const ChancePassword = lazy(() => import("../Pages/ChancePassword"));
const Budget = lazy(() => import("../Pages/Budget"));


const Allroutes = () => {
  return (
    <Suspense fallback={ 
      <div className="flex items-center justify-center h-screen w-screen">
          <Loader />
        </div>
    }>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={ <ProtectRoutes> <Sidebar /> </ProtectRoutes>}>
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="trans-details/:id" element={<Transdetails />} />
        <Route path="addTransaction" element={<Addtransactions />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/editprofile" element={<EditProfile />} />
        <Route path="profile/chancepassword" element={<ChancePassword />} />
        <Route path="budget" element={ <Budget /> } />
      </Route>
      <Route path="*" element={<NotFound /> } />
    </Routes>
    </Suspense>
  );
};

export default Allroutes;
