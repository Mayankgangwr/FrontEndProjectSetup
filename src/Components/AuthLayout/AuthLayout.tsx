import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IAuthLayout {
    children: React.ReactNode;
    authentication: boolean;
}
const Protected: React.FC<IAuthLayout> = ({ children, authentication }) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState<boolean>(true);
    const authStatus = useSelector((state: any) => state.auth.status);

    useEffect(() => {
        if (authStatus !== authentication) {
            navigate(authentication ? '/login' : '/');
        }
        setLoader(false);
    }, [authStatus, navigate, authentication]);

    return loader ? <h1>loading...</h1> : <>{children}</>;
}
export default Protected;