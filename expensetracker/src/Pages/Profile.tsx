import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextuserData } from "../Context/ProfileContext";
import ProfileSkeleton from "../Components/ProfileSkeleton";
import { handleDelete } from "./Logout";

const Profile = () => {
  const { userData, loading } = useContext(ContextuserData);
  let navigate = useNavigate();
  if (loading) {
    return <ProfileSkeleton />;
  }
  return (
    <>
      <div className="profie-container">
        <div className="form-item">
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={userData?.fullName}
            readOnly
          />
        </div>
        <div className="form-item">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={userData?.email}
            readOnly
          />
        </div>
        <div className="form-item">
          <label>Name</label>
          <input
            type="text"
            placeholder="phoneNumber"
            value={userData?.phoneNumber}
            readOnly
          />
        </div>
        <div className="button-group">
          <Link to={"editprofile"}> Edit Profile</Link>
          <Link to={"chancepassword"}> Chance Password</Link>
          <button onClick={() => handleDelete(navigate)}> Logout </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
