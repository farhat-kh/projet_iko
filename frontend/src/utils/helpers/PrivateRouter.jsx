import { Navigate, Outlet } from "react-router";

const PrivateRouer = () => {
   const auth = localStorage.getItem('auth');
   return auth ? <Outlet/> : <Navigate to='/login' />
}

export default PrivateRouer;