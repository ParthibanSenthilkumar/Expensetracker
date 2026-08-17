import { signOut } from "firebase/auth";
import { auth } from "../Services/Firebase";
import type { NavigateFunction } from "react-router-dom";
import { errorToast, successToast } from "../Components/Toaster";

export const handleDelete = async (navigate: NavigateFunction) => {
  try {
    await signOut(auth);
    localStorage.clear();
    navigate("/");
    successToast("Logout Successfully");
  } catch (error) {
    if (error instanceof Error) {
      errorToast(error.message);
      console.error("Logout error:", error);
    }
  }
};
