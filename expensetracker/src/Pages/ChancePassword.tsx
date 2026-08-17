import React, { useState } from 'react'
import { auth } from '../Services/Firebase'
import { EmailAuthProvider,reauthenticateWithCredential } from 'firebase/auth'
import { updatePassword } from 'firebase/auth'
import { errorToast, successToast } from '../Components/Toaster'
import { useNavigate } from 'react-router-dom'

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
        <div className="form-item">
            <label htmlFor="CurrenPassword">Curren Password</label>
            <input type="password" name='CurrenPassword' value={currentPassword} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setcurrentPassword(e.target.value)} />
        </div>
        <div className="form-item">
            <label htmlFor="newpassword">newpassword</label>
            <input type="password" name='newpassword' value={newPassword} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setNewPassword(e.target.value)} />
        </div>
        <button onClick={handlePassword}>Chance Password</button>
    </>
  )
}

export default ChancePassword