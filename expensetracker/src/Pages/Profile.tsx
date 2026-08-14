
import { useContext } from "react"
import { Link } from "react-router-dom"
import { ContextuserData } from "../Types/Context/ProfileContext"
import ProfileSkeleton from "../Components/ProfileSkeleton"
const Profile = () => {

    const {userData,loading}=useContext(ContextuserData)
    console.log(userData,"userData");
    
    if(loading){
      return <p>loading</p>
    }
  return (
    <>
      <div className="profie-container">
          <div className="form-item">
              <label>Name</label>
              <input type="text" placeholder="Name" value={userData?.fullName} />
            </div>
          <div className="form-item">
            <label >Email</label>
            <input type="email" placeholder="Email" value={userData?.email} />
          </div>
            <div className="form-item">
              <label>Name</label>
              <input type="text" placeholder="phoneNumber" value={userData?.phoneNumber} />
            </div>
            <div className="button-group">
              <Link to={'/'}> Edit Profile</Link>
              <Link to={'/'}> Chance Password</Link>
              <button> Logout </button>
          </div>
      </div>
    </>
  )
}

export default Profile