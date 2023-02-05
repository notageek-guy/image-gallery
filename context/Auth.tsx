import { createContext, FC, useContext, useEffect, useState } from "react";

import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
interface userData {
  userProviderId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhotoLink: string;
}
export const AuthContext = createContext({
  currentUser: null,
  userData: {
    userProviderId: "",
    userId: "",
    userName: "",
    userEmail: "",
    userPhotoLink: "",
  },
});

const AuthProvider: FC<{
  children: React.ReactNode | React.ReactNode[] | JSX.Element;
}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null) as any;
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{
    userProviderId: string;
    userId: string;
    userName: string;
    userEmail: string;
    userPhotoLink: string;
  }>({
    userProviderId: "",
    userId: "",
    userName: "",
    userEmail: "",
    userPhotoLink: "",
  });
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const requiredData: userData = {
          userProviderId: user.providerData[0].providerId,
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          userPhotoLink: user.photoURL,
        } as any;
        setUserData(requiredData);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);
  
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const UseAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
