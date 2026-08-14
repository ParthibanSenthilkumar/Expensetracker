import React, { useContext, useEffect, useState } from "react";
import { ContextuserData } from "../Context/ProfileContext";
import { auth } from "../Services/Firebase";
import { Updateprofile } from "../Services/Api";
import type { EditProfileValues } from "../Types/EditProfiletype";
import { useNavigate } from "react-router-dom";
import { successToast } from "../Components/Toaster";

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
      <div className="profie-container">
        <div className="form-item">
          <label htmlFor="fullName">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="fullName"
            value={editData?.fullName}
            onChange={handleChance}
          />
        </div>
        <div className="form-item">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={editData?.email}
            onChange={handleChance}
          />
        </div>
        <div className="form-item">
          <label htmlFor="phoneNumber">PhoneNumber</label>
          <input
            type="text"
            placeholder="PhoneNumber"
            name="phoneNumber"
            value={editData?.phoneNumber}
            onChange={handleChance}
          />
        </div>
        <div className="button-group">
          <button onClick={handleSubmit}> Update Profile </button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
