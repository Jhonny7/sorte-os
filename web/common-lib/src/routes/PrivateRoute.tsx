import LocalStorageEncryptService from "./../services/LocalStorageEncrypt";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return !!LocalStorageEncryptService.getFromLocalStorage("userSession", true);
};

export const PrivateRoute = () => {
  let access = isAuthenticated();
  return access ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
