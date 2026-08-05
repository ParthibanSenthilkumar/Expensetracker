import { useForm } from "react-hook-form";
import type { FormValues } from "../Types/Registertype";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getuserdetails } from "../Services/Api";
import { auth } from "../Services/Firebase";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const FormSubmit = async (data: FormValues) => {
    try {
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
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };
  return (
    <>
      <section className="my-20">
        <div className="container-lg">
          <div className="shadow-custom1 max-w-[600px] mx-auto p-8 rounded">
            <h2 className="section-title  mb-2 text-[#393939]"> Register </h2>
            <p className="text-sm font-medium text-gray-500 mb-6">
              Welcome to Expense Tracker
            </p>
            <form onSubmit={handleSubmit(FormSubmit)}>
              <div className="form_item mb-2">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  {...register("fullName", {
                    required: "enter Your fullName",
                  })}
                />
                {errors.fullName && (
                  <p className="errors">{errors.fullName?.message} </p>
                )}
              </div>
              <div className="form_item mb-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "enter Your email",
                  })}
                />
                {errors.email && (
                  <p className="errors">{errors.email?.message} </p>
                )}
              </div>
              <div className="form_item mb-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "enter Your password",
                  })}
                />
                {errors.password && (
                  <p className="errors">{errors.password?.message} </p>
                )}
              </div>
              <div className="form_item mb-2">
                <label htmlFor="phoneNumber">PhoneNumber</label>
                <input
                  type="text"
                  id="phoneNumber"
                  {...register("phoneNumber", {
                    required: "enter Your password",
                  })}
                />
                {errors.phoneNumber && (
                  <p className="errors">{errors.phoneNumber?.message} </p>
                )}
              </div>
              <button
                type="submit"
                className="mt-5 w-full p-3 bg-[#6366f1] text-white rounded cursor-pointer"
              >
                {" "}
                Register Now{" "}
              </button>
              <h6 className="text-sm text-gray-500 mt-5 text-center">
                {" "}
                Already have an accont?{" "}
                <Link
                  to={"/login"}
                  className="text-base  font-bold text-[#6366f1] "
                >
                  Login
                </Link>{" "}
              </h6>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
