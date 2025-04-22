import { useAuthContext } from "./hooks/useAuthContext";
import { renderRoutes as renderRoutesFn } from "./routes";

const RoutesWrapper = ({ routes }) => {
  // const { user } = useAuthContext();
  // let userRole = null;
  // let isAuthenticated =  null;
  
  // if (user) {
  //   userRole = user.useRole
  //   isAuthenticated = true
  // }
  
  // return renderRoutesFn(routes, { userRole, isAuthenticated });

  // const { user } = useAuthContext();
  let userRole = "admin";
  let isAuthenticated =  true;
  
  // if (user) {
    // userRole = "Admin"
    // isAuthenticated = true
  // }
  
  return renderRoutesFn(routes, { userRole, isAuthenticated });
};

export default RoutesWrapper;
