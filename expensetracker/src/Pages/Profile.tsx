import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextuserData } from "../Context/ProfileContext";
import ProfileSkeleton from "../Components/ProfileSkeleton";
import { handleDelete } from "./Logout";
import { FaRegUser } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { TbLockPassword } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";
import { FiMail, FiPhone } from "react-icons/fi";

const Profile = () => {
  const { userData, loading } = useContext(ContextuserData);
  let navigate = useNavigate();
  if (loading) {
    return <ProfileSkeleton />;
  }
  return (
    <>
      <div className="shadow-custom1 p-5 md:p-7 rounded-md">
        <div className="flex items-center gap-5 pb-6 border-b border-gray-200 mb-7">
          <div className="shrink-0">
            <img
              src="../assets/images/avatar.png"
              alt="Profile"
              className="w-26 h-26 rounded-full object-cover border-4 border-indigo-100 "
            />
          </div>
          <div>
            <h3 className="text-2xl text-gray-800 font-heading font-semibold">
              My Profile
            </h3>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              View and manage your personal information
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-start gap-5">
            <div className="shrink-0">
              <span className=" w-10 h-10 md:w-14 md:h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 text-xl">
                <FaRegUser />
              </span>
            </div>
            <div className="w-full">
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={userData?.fullName ?? ""}
                readOnly
                className="w-full h-12 px-5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 font-medium outline-none"
              />
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="shrink-0">
              <span className="w-10 h-10 md:w-14 md:h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 text-xl">
                <FiMail />
              </span>
            </div>

            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={userData?.email ?? ""}
                readOnly
                className="w-full h-12 px-5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 font-medium outline-none"
              />
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="shrink-0">
              <span className="w-10 h-10 md:w-14 md:h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 text-xl">
                <FiPhone />
              </span>
            </div>

            <div className="w-full">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Phone Number
              </label>

              <input
                id="phoneNumber"
                type="text"
                value={userData?.phoneNumber ?? ""}
                readOnly
                className="w-full h-12 px-5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 font-medium outline-none"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-8 pt-6 border-t border-gray-200">
          <Link
            to="editprofile"
            className="w-full md:flex-1 h-12 border-2 border-indigo-500 text-indigo-600 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-indigo-50 transition"
          >
            <FiEdit3 size={20} />
            <span>Edit Profile</span>
          </Link>

          <Link
            to="chancepassword"
            className="w-full md:flex-1 h-12 border-2 border-blue-500 text-blue-600 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-blue-50 transition"
          >
            <TbLockPassword size={21} />
            <span>Change Password</span>
          </Link>

          <button
            onClick={() => handleDelete(navigate)}
            className="w-full md:flex-1 h-12 border-2 border-red-400 text-red-500 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-red-50 transition"
          >
            <LuLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
