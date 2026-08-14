
import { useContext } from "react"
import { Link } from "react-router-dom"
import { ContextuserData } from "../Context/ProfileContext"
import ProfileSkeleton from "../Components/ProfileSkeleton"
const Profile = () => {
    const {userData,loading}=useContext(ContextuserData)
    if(loading){
      return <ProfileSkeleton />
    }
  return (
    <>
      <div className="profie-container">
          <div className="form-item">
              <label>Name</label>
              <input type="text" placeholder="Name" value={userData?.fullName} readOnly />
            </div>
          <div className="form-item">
            <label >Email</label>
            <input type="email" placeholder="Email" value={userData?.email}  readOnly/>
          </div>
            <div className="form-item">
              <label>Name</label>
              <input type="text" placeholder="phoneNumber" value={userData?.phoneNumber} readOnly />
            </div>
            <div className="button-group">
              <Link to={'editprofile'}> Edit Profile</Link>
              <Link to={'/'}> Chance Password</Link>
              <button> Logout </button>
          </div>
      </div>
    </>
  )
}

export default Profile