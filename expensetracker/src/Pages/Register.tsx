import { useForm } from "react-hook-form"
import type { FormValues } from "../Types/Registertype"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { getuserdetails } from "../Services/Api"
import { auth } from "../Services/Firebase"


const Register = () => {
    const { register,handleSubmit,formState:{errors},reset }=useForm<FormValues> ()
    const FormSubmit = async (data:FormValues)=>{
        try{
            let registerAuth= await  createUserWithEmailAndPassword (auth,
                data.email,
                data.password
             )
             let uid=registerAuth.user.uid
             await getuserdetails({
                ...data,
                uid,
                createAt:new Date().toISOString()
             })
             reset()
        }
        catch(err){
            if(err instanceof Error){
                console.log(err.message)
            }
        }
    }
  return (
    <>
    <div className="heading">
        <h2 className="section_title"> Register  </h2>
    </div>
    <form onSubmit={handleSubmit(FormSubmit)}>
        <div className="form_item">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" {...register("fullName",{
                required:"enter Your fullName"
            })} />
            {
                errors.fullName && 
                <p>{ errors.fullName?.message}  </p>
            }
        </div>
        <div className="form_item">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register("email",{
                required:"enter Your email"
            })} />
            {
                errors.email && 
                <p>{ errors.email?.message}  </p>
            }
        </div>
        <div className="form_item">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register("password",{
                required:"enter Your password"
            })} />
            {
                errors.password && 
                <p>{ errors.password?.message}  </p>
            }
        </div>
        <div className="form_item">
            <label htmlFor="phoneNumber">PhoneNumber</label>
            <input type="text" id="phoneNumber" {...register("phoneNumber",{
                required:"enter Your password"
            })} />
            {
                errors.phoneNumber && 
                <p>{ errors.phoneNumber?.message}  </p>
            }
        </div>
        <button type="submit"> Register Now </button>
    </form>
    </>
  )
}

export default Register