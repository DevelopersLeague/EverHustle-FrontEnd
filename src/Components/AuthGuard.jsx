import { Redirect } from "react-router-dom";
import { useAuth } from "../context/auth.context";

function AuthGuard({ children, to }) {
  const { authState } = useAuth();
  if (authState.user) {
    return <>{children}</>;
  } else {
    return <Redirect to={to} />;
  }
}

export default AuthGuard;
