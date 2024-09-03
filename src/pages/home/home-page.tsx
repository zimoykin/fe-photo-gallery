// import { useSelector } from "react-redux";
import Box from "../../components/box-component";
import './home-style.css';
// import { RootState } from "../../store";
// import { useTheme } from "../../contexts/theme/theme-context";
// import { useEffect } from "react";

export const Home: React.FC = () => {
    // const { theme, setTheme } = useTheme();
    // const thema = useSelector((state: RootState) => state.thema.thema) || 'light';
    // setTheme(thema);
    // useEffect(() => {
    //     document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    // }, [theme]);

    return (
        <div className="home-container">
            <div className="box-container">
                <Box />
            </div>
        </div>
    );
};