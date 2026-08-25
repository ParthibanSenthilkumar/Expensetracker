import { onAuthStateChanged, type User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../Services/Firebase";
import Loader from "../Components/Loader";

interface productrouteprop {
  children: React.ReactNode;
}
const ProtectRoutes = ({ children }: productrouteprop) => {
  let [ProtectUser, setProtectUser] = useState<User | null>(null);
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    let unSubscribe = onAuthStateChanged(auth, async (User) => {  
      setProtectUser(User);
      setloading(false);
    });
    return () => unSubscribe();
  }, []);
  if (loading) {
    return <div className="flex items-center justify-center h-screen w-screen"><Loader /></div>;
  }
  if (!ProtectUser) {
   return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectRoutes;
