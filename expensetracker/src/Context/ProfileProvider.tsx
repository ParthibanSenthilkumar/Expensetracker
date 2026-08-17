import React, { useEffect, useState } from "react";
import type { FormValues } from "../Types/Registertype";
import { auth } from "../Services/Firebase";
import { getUserDetails } from "../Services/Api";
import { errorToast } from "../Components/Toaster";
import { ContextuserData } from "./ProfileContext";
import { onAuthStateChanged } from "firebase/auth";

interface ChildProp {
  children: React.ReactNode;
}

const ProfileProvider = ({ children }: ChildProp) => {
  const [userData, setUserData] = useState<FormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserData(null);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getUserDetails(user.uid);
        setUserData(data);
      } catch (err) {
        if (err instanceof Error) {
          errorToast(err.message);
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ContextuserData.Provider value={{ userData, loading }}>
      {children}
    </ContextuserData.Provider>
  );
};

export default ProfileProvider;
