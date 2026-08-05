import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Services/Firebase";
import { Link, useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../Components/Toaster";
import { useState } from "react";
import Loader from "../Components/Loader";
interface LoginValues {
  email: string;
  password: string;
}
const Login = () => {
  const [loading, setloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginValues>();
  const navigate = useNavigate();
  const formSubmit = async (data: LoginValues) => {
    try {
      setloading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      reset();
      navigate("/dashboard");
      successToast("Login Successfully");
    } catch (err) {
      if (err instanceof Error) {
        errorToast(err.message);
        console.log(err.message);
      }
    } finally {
      setloading(false);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-full min-w-full">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <section className="mt-20 ">
        <div className="container-lg">
          <div className="shadow-custom1 max-w-[600px] mx-auto p-8 rounded">
            <div className="heading">
              <h2 className="section-title  mb-2 text-[#393939] "> Login </h2>
              <p className="text-sm font-medium text-gray-500 mb-6">
                Welcome to Expense Tracker{" "}
              </p>
            </div>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="form_item my-5">
                <label htmlFor="email"> Email</label>
                <input
                  type="text"
                  {...register("email", {
                    required: "enter your Email",
                  })}
                />
                {errors.email && (
                  <p className="errors"> {errors.email?.message} </p>
                )}
              </div>
              <div className="form_item">
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "enter the Password",
                  })}
                />
                {errors.password && (
                  <p className="errors">{errors.password?.message}* </p>
                )}
              </div>
              <button
                type="submit"
                className="mt-5 w-full p-3 bg-[#6366f1] text-white rounded"
              >
                Login
              </button>
              <h6 className="text-sm text-gray-500 mt-5 text-center">
                {" "}
                Already have an accont?{" "}
                <Link
                  to={"/register"}
                  className="text-base  font-bold text-[#6366f1]"
                >
                  Register
                </Link>{" "}
              </h6>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
