import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

interface PrivateRoutesProps {
    children: JSX.Element
}

export const PrivateRoutes = ({children}: PrivateRoutesProps): JSX.Element => {
    const login = useSelector<RootState>(state => state.users.login) || localStorage.getItem('contact-login')
    
    return login ? children : <Navigate to="/" replace />;
}