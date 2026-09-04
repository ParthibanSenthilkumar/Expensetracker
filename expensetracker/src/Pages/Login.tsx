import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Services/Firebase";
import { Link, useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../Components/Toaster";
import { useState } from "react";
import Loader from "../Components/Loader";
import { FaStarOfLife } from "react-icons/fa";

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
      let currentUser = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      let uid = currentUser?.user.uid;
      console.log(uid, "uid");
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
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader />
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="flex w-full max-w-[1100px] shadow-custom1 rounded-2xl overflow-hidden">
        {/* ========== LEFT SIDE ========== */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#6366f1] relative overflow-hidden items-center justify-center p-12">
          {/* circles */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-white/10"></div>
          <div className="absolute top-1/3 right-10 w-40 h-40 rounded-full bg-white/5"></div>

          <div className="relative z-10 text-white max-w-md">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Expense Tracker
            </h1>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Take control of your finances. Track expenses, manage budgets, and
              gain clear insights into your spending — all in one place.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                  <FaStarOfLife />
                </div>
                <span className="text-white/90 text-sm font-medium">
                  Simple & intuitive interface
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                  <FaStarOfLife />
                </div>
                <span className="text-white/90 text-sm font-medium">
                  Real-time expense tracking
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                  <FaStarOfLife />
                </div>
                <span className="text-white/90 text-sm font-medium">
                  Secure & private
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========== RIGHT SIDE ========== */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-8 py-12 md:px-12">
          <div className="w-full max-w-[420px]">
            <div className="mb-8">
              <h2 className="section-title mb-2 text-[#393939]">Login</h2>
              <p className="text-sm font-medium text-gray-500">
                Welcome to Expense Tracker
              </p>
            </div>

            <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
              <div className="form_item">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#393939] mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#393939] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 focus:border-[#6366f1] transition-all duration-200"
                  {...register("email", {
                    required: "enter your Email",
                  })}
                />
                {errors.email && (
                  <p className="errors mt-1.5 text-sm">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="form_item">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#393939] mb-1.5"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#393939] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 focus:border-[#6366f1] transition-all duration-200"
                  {...register("password", {
                    required: "enter the Password",
                  })}
                />
                {errors.password && (
                  <p className="errors mt-1.5 text-sm">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#6366f1] hover:bg-[#5558e6] text-white text-sm font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
              >
                Login
              </button>
              <p className="text-sm text-gray-500 text-center mt-6">
                Already have an account?{" "}
                <Link
                  to="/register"
                  className="text-base font-bold text-[#6366f1] hover:text-[#5558e6] transition-colors"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
