import React, { ReactElement } from "react";
import NavBar from "../../components/nav-bar/nav-bar-component";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Props {
    // eslint-disable-next-line
    child: ReactElement<any, any>;
}

export const NavBarPage: React.FC<Props> = (
    { child }: Props
) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    return (<div className="page-nav-bar">
        {isAuthenticated ? <NavBar /> : null}
        {child}
    </div>);
};