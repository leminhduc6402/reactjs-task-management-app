import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";

type Props = {
  children: React.ReactNode;
};

const RoleBaseRoute = (props: any) => {
  const user = useAppSelector((state) => state.account.user);
  if (user._id === "") {
    return <>{props.children}</>;
  } else {
    return <div>Not Found</div>;
  }
};

const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  return (
    <>
      {isAuthenticated ? (
        <RoleBaseRoute>{children}</RoleBaseRoute>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default ProtectedRoute;
