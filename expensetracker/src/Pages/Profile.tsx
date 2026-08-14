import { Link } from "react-router-dom"

const Profile = () => {
  return (
    <>
      <div className="profie-container">
          <div className="form-item">
            <label>Name</label>
            <input type="text" placeholder="Name" />
             </div>
          <div className="form-item">
            <label >Email</label>
            <input type="email" placeholder="Email" />
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