import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Pages/Dashboard";
import Transactions from "../Pages/Transactions";
import Addtransactions from "../Pages/Addtransactions";
import Reports from "../Pages/Reports";
import Profile from "../Pages/Profile";
import Transdetails from "../Pages/Transdetails";
import EditProfile from "../Pages/EditProfile";
import ChancePassword from "../Pages/ChancePassword";
import ProtectRoutes from "../Hooks/ProtectRoutes";

const Allroutes = () => {
  return (
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
      </Route>
    </Routes>
  );
};

export default Allroutes;
