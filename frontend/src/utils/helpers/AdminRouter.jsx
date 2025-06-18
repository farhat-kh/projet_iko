import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const AdminRouter = () => {

    const { auth } = useContext(AuthContext);
    const isAdmin = auth?.user?.role === "admin";
    const isSuperAdmin = auth?.user?.role === "superadmin";
    return isAdmin || isSuperAdmin ? <Outlet/> : <Navigate to='/login' />
}

export default AdminRouter;