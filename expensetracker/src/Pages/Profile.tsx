import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import type { FormValues } from "../Types/Registertype"
import { auth } from "../Services/Firebase"
import { getUserDetails } from "../Services/Api"
import { errorToast } from "../Components/Toaster"
import Loader from "../Components/Loader"

const Profile = () => {

  const [userData,setUserdata]=useState<FormValues | null>(null)
  const [loading,setLoading]=useState<boolean>(true)

    useEffect(()=>{
      const getProfile=async()=>{
        try{
         setLoading(true)
          let uid=auth?.currentUser?.uid
          if(!uid){
            return
          }
         let data= await getUserDetails(uid)
         setUserdata(data)
        }
        catch(err){
          if(err instanceof Error){
            errorToast(err.message)
            console.log(err.message)  
          }
        }
        finally{
          setLoading(false)
        }
      }
      getProfile()
    },[])
    if(loading){
      return <Loader />
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