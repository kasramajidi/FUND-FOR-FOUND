import { ReactNode, ComponentType, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = <P extends ProtectedRouteProps>(
  WrappedComponent: ComponentType<P>
) => {
  const Wrapper = (props: P) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const redirectToLogin = useCallback(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, router]);

    useEffect(() => {
      redirectToLogin();
    }, [redirectToLogin]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default ProtectedRoute;
