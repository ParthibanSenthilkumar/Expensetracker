
import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Services/Firebase'
import { useNavigate } from 'react-router-dom'
interface LoginValues{
    email:string,
    password:string
}
const navigate=useNavigate()
const Login = () => {
    const { register,handleSubmit,formState:{errors},reset }=useForm<LoginValues>()
    const formSubmit= async (data:LoginValues) =>{
        try{
            await signInWithEmailAndPassword( auth,
                data.email,data.password
             )
             navigate('/')
          reset()   
        }
        catch(err){
            if( err instanceof Error){
                console.log(err.message);  
            }
        }
    }
  return (
    <>
    <div className="heading">
        <h2> Login </h2>
    </div>
    <form onSubmit={handleSubmit(formSubmit)}>
        <div className="form_item">
            <label htmlFor="email"> Email</label>
            <input type="text" {...register("email",{
                required:"enter your Email"
            })} />
            {
                errors.email && 
                <p> {errors.email?.message} </p>
            }
        </div>
        <div className="form_item">
            <label htmlFor="password">password</label>
            <input type="text" {...register("password",{
                required:"enter the Password"
            })}  />
            {
                errors.password && 
                <p>{errors.password?.message} </p>
            }
        </div>
    </form>
    </>
  )
}

export default Login