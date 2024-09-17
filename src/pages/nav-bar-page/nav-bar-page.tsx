import React, { ReactElement, useEffect } from "react";
import NavBar from "../../components/nav-bar/nav-bar-component";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "./nav-bar-page-style.css";
import { useNavigate } from "react-router-dom";

interface Props {
    child: ReactElement;
    secure?: boolean;
}

export const NavBarPage: React.FC<Props> = (
    { child, secure }: Props
) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated && secure) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate, secure]);

    return (<div className="page-nav-bar">
        <>
            <NavBar />
            {child}
        </>
    </div>);
};