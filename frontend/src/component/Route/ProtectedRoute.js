import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const useAuth = ()=>{
    if (isAuthenticated === false) {
        return true;
      }

      if (isAdmin === true && user.role !== "admin") {
        return true ;
      }
  }
  const auth = useAuth();
  return (
    <Fragment>
     {loading === false && (<Fragment>
     {auth?<Navigate to='/login'/> :(<Outlet/>)}
     </Fragment>) }
    </Fragment>
  );
};

export default ProtectedRoute;