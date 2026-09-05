import { useForm } from "react-hook-form";
import type { FormValues } from "../Types/Registertype";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getuserdetails } from "../Services/Api";
import { auth } from "../Services/Firebase";
import { Link } from "react-router-dom";
import { errorToast, successToast } from "../Components/Toaster";
import Loader from "../Components/Loader";
import { useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import favicon from "/assets/images/favicon.png"

const Register = () => {
  const [loading, setloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const FormSubmit = async (data: FormValues) => {
    try {
      setloading(true);
      let registerAuth = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      let uid = registerAuth.user.uid;
      await getuserdetails(
        {
          ...data,
          createAt: new Date().toISOString(),
        },
        uid,
      );
      reset();
      successToast("Register Successfully");
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
        {/* ========== LEFT SIDE(Branding) ========== */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#6366f1] relative overflow-hidden items-center justify-center p-12">
          {/* Decorative circles */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-white/10"></div>
          <div className="absolute top-1/3 right-10 w-40 h-40 rounded-full bg-white/5"></div>

          <div className="relative z-10 text-white max-w-md">
           <div className="flex items-center gap-3 mb-8">
          <img
            src={favicon}  
            alt="FinPulse Icon"
            className="h-20 w-auto"
          />
          <div>
            <h1 className="text-2xl font-bold text-white leading-none font-heading">FinPulse</h1>
            <p className="text-sm text-white/80 mt-1 font-secondary">Personal Finance Management</p>
          </div>
          </div>
            <p className="text-lg font-secondary text-white/90 mb-8 leading-relaxed">
              Take control of your finances. Track expenses, manage budgets, and
              gain clear insights into your spending — all in one place.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                  <FaStarOfLife />
                </div>
                <span className="text-white/90 text-sm font-medium font-secondary">
                  Free to get started
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                  <FaStarOfLife />
                </div>
                <span className="text-white/90 text-sm font-medium font-secondary">
                  Secure authentication
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                  <FaStarOfLife />
                </div>
                <span className="text-white/90 text-sm font-medium font-secondary">
                  Easy expense management
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========== RIGHT SIDE  ========== */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-8 py-12 md:px-12">
          <div className="w-full max-w-[420px]">
            <div className="mb-8">
              <h2 className="section-title mb-2 text-[#393939]">Register</h2>
              <p className="text-sm font-medium text-gray-500">
                Welcome to Finpulse
              </p>
            </div>

            <form onSubmit={handleSubmit(FormSubmit)} className="space-y-5">
              <div className="form_item">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-[#393939] mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#393939] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 focus:border-[#6366f1] transition-all duration-200"
                  {...register("fullName", {
                    required: "enter Your fullName",
                  })}
                />
                {errors.fullName && (
                  <p className="errors mt-1.5 text-sm">
                    {errors.fullName?.message}
                  </p>
                )}
              </div>
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
                    required: "enter Your email",
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
                    required: "enter Your password",
                  })}
                />
                {errors.password && (
                  <p className="errors mt-1.5 text-sm">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="form_item">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-[#393939] mb-1.5"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#393939] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 focus:border-[#6366f1] transition-all duration-200"
                  {...register("phoneNumber", {
                    required: "enter Your phone number",
                  })}
                />
                {errors.phoneNumber && (
                  <p className="errors mt-1.5 text-sm">
                    {errors.phoneNumber?.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#6366f1] hover:bg-[#5558e6] text-white text-sm font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] mt-2"
              >
                Register Now
              </button>
              <p className="text-sm text-gray-500 text-center mt-6">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-base font-bold text-[#6366f1] hover:text-[#5558e6] transition-colors"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
