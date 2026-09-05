import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { TbReport } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FaWallet } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { handleDelete } from "../Pages/Logout";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { MdAccountBalanceWallet } from "react-icons/md";
import { useContext, useState } from "react";
import { ContextuserData } from "../Context/ProfileContext";

const Sidebar = () => {
  let navigate = useNavigate();
  let [isopen, setisopen] = useState(false);
  const handleClose = () => {
    setisopen(false);
  };
  const { userData } = useContext(ContextuserData);

  return (
    <>
      <div className="wrapper flex items-stretch min-h-screen">
        {isopen && (
          <div className="fixed inset-0 z-30 bg-black/30 md:hidden"></div>
        )}
        <div
          className={`sidebar fixed top-0 left-0 z-40 min-h-screen max-w-[250px] w-full p-3 bg-[#e2eafc] transition-transform duration-300 ${isopen ? "translate-x-0" : "-translate-x-full"} md:static md:translate-x-0`}
        >
          <Link
            to=""
            className="text-xl font-bold py-3  mb-3 block text-[#6366f1] inline-flex items-center gap-2.5  "
          >
           <img src="../assets/images/logo.png" alt="logo" className="" />
          </Link>
          <Link to="" className="nav_link" onClick={handleClose}>
            <span>
              <MdSpaceDashboard />
            </span>
            Dashboard
          </Link>
          <Link to="addTransaction" className="nav_link" onClick={handleClose}>
            <span>
              <GrTransaction />
            </span>
            AddTransaction
          </Link>
          <Link to="transactions" className="nav_link" onClick={handleClose}>
            <span>
              <AiOutlineTransaction />
            </span>
            Transactions
          </Link>
          <Link to="reports" className="nav_link" onClick={handleClose}>
            <span>
              <TbReport />
            </span>
            Reports
          </Link>
          <Link to="budget" className="nav_link" onClick={handleClose}>
            <span>
              <MdAccountBalanceWallet />
            </span>
            Budget
          </Link>
          <Link to="profile" className="nav_link" onClick={handleClose}>
            <span>
              <CgProfile />
            </span>
            Profile
          </Link>
          <button className="nav_link" onClick={() => handleDelete(navigate)}>
            <span>
              <FiLogOut />
            </span>
            Logout
          </button>
        </div>
        <div className="grow min-w-0">
          <div className="top_bar grid grid-cols-2 items-center gap-4 px-4 py-4 md:py-5">
            <div className="head">
              <h3 className="text-xl sm:text-2xl md:text-3xl text-gray-950 font-bold font-heading">
                Welcome
              </h3>
              <p className="hidden md:block text-xs lg:text-sm text-gray-500 font-secondary mt-1">
                Track your income and expenses, manage your budget, and stay on
                top of your finances.
              </p>
            </div>
            <div className="icons flex items-center justify-end gap-2.5">
              <span className="bg-gray-200  p-2 rounded-md text-xl shrink-0">
                <IoNotifications />
              </span>
              <span className="flex items-center gap-2 text-xl">
                <span>
                  <FaUser
                    size={1}
                    className="shrink-0 h-9 w-9 flex items-center justify-center p-2  bg-indigo-50 text-indigo-600 rounded-lg"
                  />
                </span>
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-indigo-600 mt-1 capitalize truncate max-w-[100px] sm:max-w-none">
                  {userData?.fullName ?? ""}
                  <span className="font-medium text-[10px] sm:text-xs text-gray-400 block leading-3">
                    User Account
                  </span>
                </h3>
              </span>
              {isopen ? (
                <button
                  onClick={() => setisopen(false)}
                  className="md:hidden z-50 bg-indigo-100 rounded-lg h-9 w-9 flex items-center justify-center shrink-0"
                >
                  <FiX size={18} />
                </button>
              ) : (
                <button
                  onClick={() => setisopen(true)}
                  className="md:hidden z-50 bg-indigo-100 rounded-lg h-9 w-9 flex items-center justify-center shrink-0"
                >
                  <FiMenu size={18} />
                </button>
              )}
            </div>
          </div>
          <div className="main-content p-6 md:p-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
