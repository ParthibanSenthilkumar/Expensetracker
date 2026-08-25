import React, { useState } from 'react'
import { auth } from '../Services/Firebase'
import { EmailAuthProvider,reauthenticateWithCredential } from 'firebase/auth'
import { updatePassword } from 'firebase/auth'
import { errorToast, successToast } from '../Components/Toaster'
import { useNavigate } from 'react-router-dom'
import { TbPasswordUser } from "react-icons/tb";
import { PiPasswordBold } from "react-icons/pi";
import { Link } from 'react-router-dom'
import { FaUser } from "react-icons/fa";

const ChancePassword = () => {
    let [currentPassword,setcurrentPassword]=useState("")
    let [newPassword,setNewPassword]=useState("")
    let navigate=useNavigate()
    const handlePassword= async (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        let user = auth.currentUser
        let userEmail=user?.email
        if(!user || !userEmail ){
            return
        }
        try{
            const credential = EmailAuthProvider.credential(
            userEmail!,
            currentPassword
            );
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user,newPassword)
            setcurrentPassword("")
            setNewPassword("")
            navigate("/dashboard/profile")
            successToast("password successfully")
        }
        catch(err){
            if(err instanceof Error){
                errorToast(err.message)
                console.log(err.message);
            }
        }
    }
  return (
    <>
        <div className="shadow-custom1 p-5 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-300">
            <h3 className="text-2xl text-indigo-500 font-heading font-semibold capitalize ">Change Password<span className="block text-xs text-gray-400 font-medium mt-1 mb-6 font-secondary">Update your password to keep your account secure.</span> </h3>
                <Link  to='/dashboard/profile' className="border-2 bg-indigo-500 hover:bg-indigo-500 text-sm font-heading font-semibold px-6 py-2 text-white  rounded-lg transition bg-bule-50 flex items-center gap-2.5 border-none outline-none"> <span><FaUser size={20} /> </span> Profile </Link>
            </div>
            
            <div className="form-item flex items-start gap-3 ">
                <span  className='w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 text-xl'><TbPasswordUser /></span>
                <div className="w-full">
                <label htmlFor="CurrenPassword" className='block text-sm font-semibold text-gray-700 mb-2' >Curren Password</label>
                <input type="password" name='CurrenPassword' className='className="w-full h-12 px-5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 font-medium outline-none"' value={currentPassword} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setcurrentPassword(e.target.value)} />
                </div>
            </div>
            <div className="form-item flex items-start gap-3">
                <span className='w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 text-xl'><TbPasswordUser /></span>
                <div className="w-full">
                <label htmlFor="newpassword" className='block text-sm font-semibold text-gray-700 mb-2'>newpassword</label>
                <input type="password" name='newpassword' className='className="w-full h-12 px-5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 font-medium outline-none"' value={newPassword} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setNewPassword(e.target.value)} />
                </div>
            </div>
            <hr className="text-gray-200" />
            <button onClick={handlePassword} className="border-2 border-blue-500 hover:bg-indigo-200 text-sm font-heading font-semibold px-6 py-2 text-blue-600  rounded-lg transition bg-bule-50 flex items-center gap-2.5"> <span><PiPasswordBold size={20} /></span> Chance Password</button>
        </div>
    </>
  )
}

export default ChancePassword