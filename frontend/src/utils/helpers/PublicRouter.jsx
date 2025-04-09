import { Navigate, Outlet } from "react-router";

const PublicRouter = () => {
    const auth = localStorage.getItem("auth");
    return auth ? <Outlet/> : <Navigate to= "/login" />
}

export default PublicRouter;
