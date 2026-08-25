import React, { useContext, useEffect, useState } from "react";
import { ContextuserData } from "../Context/ProfileContext";
import { auth } from "../Services/Firebase";
import { Updateprofile } from "../Services/Api";
import type { EditProfileValues } from "../Types/EditProfiletype";
import { useNavigate } from "react-router-dom";
import { successToast } from "../Components/Toaster";
import { FaRegUser } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";

const EditProfile = () => {
  let { userData } = useContext(ContextuserData);
  const [editData, setEditdata] = useState<EditProfileValues>({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  useEffect(() => {
    if (userData) {
      setEditdata({
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      });
    }
  }, [userData]);

  let navigate = useNavigate();
  const handleChance = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setEditdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let uid = auth?.currentUser?.uid;
    if (!uid) {
      return;
    }
    await Updateprofile(uid, editData);
    successToast("profile updated Successfully");
    navigate("/dashboard/profile");
  };

  return (
    <>
      <div className="shadow-custom1 p-5 rounded-md space-y-6">
        <div className="flex items-center justify-between border-b border-gray-300">
          <h3 className="text-2xl text-indigo-500 font-heading font-semibold capitalize ">Edit Profile <span className="block text-xs text-gray-400 font-medium mt-1 mb-6 font-secondary">Update your profile information and keep your details up to date.</span> </h3>
          <Link  to='/dashboard/profile' className="border-2 bg-indigo-500 hover:bg-indigo-500 text-sm font-heading font-semibold px-6 py-2 text-white rounded-lg transition bg-bule-50 flex items-center gap-2.5 border-none outline-none"> <span><FaRegUser size={20} /> </span> Profile </Link>
        </div>
        <div className="form-item flex items-start gap-3">
          <span className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 text-xl">
            <FaRegUser />
          </span>
          <div className="w-full">
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-gray-700 mb-2 "
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              name="fullName"
              value={editData?.fullName}
              onChange={handleChance}
              className="w-full h-12 px-5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 font-medium outline-none"
            />
          </div>
        </div>

        <div className="form-item flex items-start gap-3">
          <span className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 text-xl">
            <FiMail />
          </span>
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2 "
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={editData?.email}
              onChange={handleChance}
              className="w-full h-12 px-5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 font-medium outline-none"
            />
          </div>
        </div>
        <div className="form-item flex items-start gap-3">
          <span className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 text-xl">
            <FiPhone />
          </span>

          <div className="w-full">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-semibold text-gray-700 mb-2 "
            >
              PhoneNumber
            </label>
            <input
              type="text"
              placeholder="PhoneNumber"
              name="phoneNumber"
              value={editData?.phoneNumber}
              onChange={handleChance}
              className="w-full h-12 px-5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 font-medium outline-none"
            />
          </div>
        </div>
        <hr className="text-gray-200" />
        <button onClick={handleSubmit} className="border-2 border-indigo-400 hover:bg-indigo-200 text-sm font-heading font-semibold px-6 py-2 text-indigo-600  rounded-lg transition bg-indigo-50 flex items-center gap-2.5"> <span><FaRegUser size={16} /></span> Update Profile </button>

      </div>
    </>
  );
};

export default EditProfile;
