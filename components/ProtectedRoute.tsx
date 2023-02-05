import { useRouter } from "next/router";
import { useAuth } from "@/context/Auth";
import { useEffect } from "react";
interface childProps {
  children?: React.ReactNode | React.ReactNode[] | JSX.Element;
}

const ProtectedRoute: React.FC<childProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const router = useRouter();
  if (typeof window === "undefined") return null;
    if (currentUser) {
    return <>{children}</>;
  } else {
    router.push("/login");
    return null;
  }
};

export default ProtectedRoute;
