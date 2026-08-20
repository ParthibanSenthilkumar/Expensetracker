import { Link, Outlet, useNavigate } from "react-router-dom"
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { TbReport } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FaWallet } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { handleDelete } from "../Pages/Logout";

const Sidebar = () => {
    let navigate=useNavigate()
  return (
    <>
    <div className="wrapper flex items-stretch min-h-screen">
        <div className="sidebar min-h-screen w-[240px] p-3 bg-[#e2eafc]">
            <Link to='' className="text-xl font-bold py-3  mb-3 block text-[#6366f1] inline-flex items-center gap-2.5  " ><span className="bg-violet-300 p-2 rounded-md"> <FaWallet className="text-white text-base"  /></span> Expense Tracker </Link>
            <Link to='' className="nav_link" > <span><MdSpaceDashboard /></span> Dashboard</Link>
            <Link to='transactions' className="nav_link"> <span><AiOutlineTransaction /></span> Transactions</Link>
            <Link to='addTransaction' className="nav_link"> <span><GrTransaction /></span> AddTransaction</Link>
            <Link to='reports' className="nav_link" > <span><TbReport /></span> Reports</Link>
            <Link to='profile' className="nav_link"> <span><CgProfile /></span> Profile</Link>
            <button  className="nav_link" onClick={()=>handleDelete(navigate)} > <span></span> Logout</button>
        </div>
        <div className="grow ">
        <div className="top_bar flex items-start  justify-between px-4 py-5">
            <div className="head"> 
                <h3 className="text-3xl text-gray-950 font-bold ">Welcome</h3>
                <p className="text-sm text-gray-500 ">Lorem, ipsum. Lorem ipsum dolor sit.</p>
            </div>
            <div className="icons flex items-center gap-2.5 mt-1">
                <span className="bg-gray-200 p-[7px] rounded-md text-xl"><IoNotifications /></span>
                <span className="flex items-center gap-3 text-xl "><FaUser /> <h3 className="text-base font-semibold text-gray-950 mt-2 leading-3 "> Parthiban <span className="font-medium text-sm text-gray-400 block"> User Account</span> </h3> </span>
            </div>
        </div>
        <div className="main-content p-10">
            <Outlet />
        </div>
        </div>
    </div>
    </>
  )
}

export default Sidebar